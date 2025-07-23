const express = require('express');
const router = express.Router();
const mpesaService = require('../services/mpesa');
const auth = require('../middleware/auth');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Household = require('../models/Household');

// Initiate M-Pesa payment (STK Push)
router.post('/mpesa/stkpush', auth, async (req, res) => {
  try {
    const { phoneNumber, amount, description, type = 'subscription' } = req.body;

    // Validate input
    if (!phoneNumber || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and amount are required'
      });
    }

    if (!mpesaService.isValidKenyanNumber(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid Kenyan phone number'
      });
    }

    if (amount < 1 || amount > 70000) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be between KSH 1 and KSH 70,000'
      });
    }

    // Create payment record
    const payment = new Payment({
      user: req.user.id,
      amount: amount,
      currency: 'KSH',
      type: type,
      method: 'mpesa',
      phoneNumber: mpesaService.formatPhoneNumber(phoneNumber),
      description: description || 'ZetuList Payment',
      status: 'pending'
    });

    await payment.save();

    // Initiate STK Push
    const stkResponse = await mpesaService.stkPush(
      phoneNumber,
      amount,
      `ZETU${payment._id.toString().slice(-8).toUpperCase()}`,
      description || 'ZetuList Payment'
    );

    if (stkResponse.success) {
      // Update payment with M-Pesa details
      payment.mpesaCheckoutRequestId = stkResponse.checkoutRequestId;
      payment.mpesaMerchantRequestId = stkResponse.merchantRequestId;
      await payment.save();

      res.json({
        success: true,
        message: 'Payment initiated successfully. Please check your phone for the M-Pesa prompt.',
        paymentId: payment._id,
        checkoutRequestId: stkResponse.checkoutRequestId,
        customerMessage: stkResponse.customerMessage
      });
    } else {
      payment.status = 'failed';
      payment.failureReason = stkResponse.error;
      await payment.save();

      res.status(400).json({
        success: false,
        message: stkResponse.error || 'Payment initiation failed',
        paymentId: payment._id
      });
    }
  } catch (error) {
    console.error('STK Push error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Check payment status
router.get('/status/:paymentId', auth, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check if user owns this payment
    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // If payment is still pending and we have a checkout request ID, query M-Pesa
    if (payment.status === 'pending' && payment.mpesaCheckoutRequestId) {
      const queryResponse = await mpesaService.stkPushQuery(payment.mpesaCheckoutRequestId);
      
      if (queryResponse.success) {
        // Update payment status based on M-Pesa response
        if (queryResponse.resultCode === '0') {
          payment.status = 'completed';
          payment.completedAt = new Date();
        } else if (queryResponse.resultCode !== '1032') { // 1032 means still pending
          payment.status = 'failed';
          payment.failureReason = queryResponse.resultDesc;
        }
        await payment.save();
      }
    }

    res.json({
      success: true,
      payment: {
        id: payment._id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        type: payment.type,
        description: payment.description,
        createdAt: payment.createdAt,
        completedAt: payment.completedAt,
        failureReason: payment.failureReason
      }
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// M-Pesa callback handler
router.post('/mpesa/callback', async (req, res) => {
  try {
    const { Body } = req.body;
    
    if (!Body || !Body.stkCallback) {
      return res.status(400).json({
        success: false,
        message: 'Invalid callback data'
      });
    }

    const callback = Body.stkCallback;
    const checkoutRequestId = callback.CheckoutRequestID;
    const resultCode = callback.ResultCode;
    const resultDesc = callback.ResultDesc;

    // Find payment by checkout request ID
    const payment = await Payment.findOne({ mpesaCheckoutRequestId: checkoutRequestId });
    
    if (!payment) {
      console.log('Payment not found for checkout request ID:', checkoutRequestId);
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    if (resultCode === 0) {
      // Payment successful
      const metadata = callback.CallbackMetadata?.Item || [];
      const amount = metadata.find(item => item.Name === 'Amount')?.Value;
      const mpesaReceiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
      const transactionDate = metadata.find(item => item.Name === 'TransactionDate')?.Value;
      const phoneNumber = metadata.find(item => item.Name === 'PhoneNumber')?.Value;

      payment.status = 'completed';
      payment.completedAt = new Date();
      payment.mpesaReceiptNumber = mpesaReceiptNumber;
      payment.mpesaTransactionDate = transactionDate ? new Date(transactionDate.toString()) : new Date();
      
      if (phoneNumber) {
        payment.phoneNumber = phoneNumber.toString();
      }

      await payment.save();

      // Handle subscription activation if this is a subscription payment
      if (payment.type === 'subscription') {
        const user = await User.findById(payment.user);
        if (user) {
          user.subscription.plan = 'premium';
          user.subscription.isActive = true;
          user.subscription.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
          await user.save();
        }
      }

      console.log('Payment completed successfully:', {
        paymentId: payment._id,
        amount: amount,
        receiptNumber: mpesaReceiptNumber
      });

    } else {
      // Payment failed
      payment.status = 'failed';
      payment.failureReason = resultDesc;
      await payment.save();

      console.log('Payment failed:', {
        paymentId: payment._id,
        resultCode: resultCode,
        resultDesc: resultDesc
      });
    }

    // Send acknowledgment to M-Pesa
    res.json({
      ResultCode: 0,
      ResultDesc: 'Accepted'
    });

  } catch (error) {
    console.error('M-Pesa callback error:', error);
    res.status(500).json({
      ResultCode: 1,
      ResultDesc: 'Internal server error'
    });
  }
});

// Get user's payment history
router.get('/history', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const payments = await Payment.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-mpesaCheckoutRequestId -mpesaMerchantRequestId');

    const total = await Payment.countDocuments({ user: req.user.id });

    res.json({
      success: true,
      payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Refund payment (B2C)
router.post('/refund/:paymentId', auth, async (req, res) => {
  try {
    const { reason } = req.body;
    const payment = await Payment.findById(req.params.paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (payment.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Only completed payments can be refunded'
      });
    }

    if (payment.refunded) {
      return res.status(400).json({
        success: false,
        message: 'Payment already refunded'
      });
    }

    // Initiate B2C refund
    const refundResponse = await mpesaService.b2cPayment(
      payment.phoneNumber,
      payment.amount,
      'BusinessPayment',
      reason || 'ZetuList Refund'
    );

    if (refundResponse.success) {
      payment.refunded = true;
      payment.refundedAt = new Date();
      payment.refundReason = reason;
      payment.refundTransactionId = refundResponse.conversationId;
      await payment.save();

      res.json({
        success: true,
        message: 'Refund initiated successfully',
        refundId: refundResponse.conversationId
      });
    } else {
      res.status(400).json({
        success: false,
        message: refundResponse.error || 'Refund failed'
      });
    }
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;