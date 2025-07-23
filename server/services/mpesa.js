const axios = require('axios');
const moment = require('moment');

class MpesaService {
  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY;
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    this.businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
    this.passkey = process.env.MPESA_PASSKEY;
    this.environment = process.env.MPESA_ENVIRONMENT || 'sandbox';
    this.baseURL = process.env.MPESA_BASE_URL || 'https://sandbox.safaricom.co.ke';
    this.callbackURL = process.env.MPESA_CALLBACK_URL;
    
    this.accessToken = null;
    this.tokenExpiresAt = null;
  }

  // Generate OAuth access token
  async getAccessToken() {
    try {
      if (this.accessToken && this.tokenExpiresAt && Date.now() < this.tokenExpiresAt) {
        return this.accessToken;
      }

      const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
      
      const response = await axios.get(`${this.baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiresAt = Date.now() + (response.data.expires_in * 1000) - 60000; // 1 minute buffer
      
      return this.accessToken;
    } catch (error) {
      console.error('Error getting M-Pesa access token:', error.response?.data || error.message);
      throw new Error('Failed to get M-Pesa access token');
    }
  }

  // Generate password for STK Push
  generatePassword() {
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = Buffer.from(`${this.businessShortCode}${this.passkey}${timestamp}`).toString('base64');
    return { password, timestamp };
  }

  // Initiate STK Push (Lipa na M-Pesa Online)
  async stkPush(phoneNumber, amount, accountReference, transactionDesc) {
    try {
      const accessToken = await this.getAccessToken();
      const { password, timestamp } = this.generatePassword();
      
      // Format phone number (remove leading 0 and add 254)
      const formattedPhone = phoneNumber.startsWith('0') 
        ? `254${phoneNumber.slice(1)}` 
        : phoneNumber.startsWith('+254') 
        ? phoneNumber.slice(1) 
        : phoneNumber;

      const requestData = {
        BusinessShortCode: this.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount), // M-Pesa requires integer amounts
        PartyA: formattedPhone,
        PartyB: this.businessShortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: this.callbackURL,
        AccountReference: accountReference || 'ZetuList',
        TransactionDesc: transactionDesc || 'ZetuList Payment'
      };

      const response = await axios.post(`${this.baseURL}/mpesa/stkpush/v1/processrequest`, requestData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        checkoutRequestId: response.data.CheckoutRequestID,
        merchantRequestId: response.data.MerchantRequestID,
        responseCode: response.data.ResponseCode,
        responseDescription: response.data.ResponseDescription,
        customerMessage: response.data.CustomerMessage
      };
    } catch (error) {
      console.error('STK Push error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.errorMessage || 'Payment initiation failed',
        details: error.response?.data
      };
    }
  }

  // Query STK Push transaction status
  async stkPushQuery(checkoutRequestId) {
    try {
      const accessToken = await this.getAccessToken();
      const { password, timestamp } = this.generatePassword();

      const requestData = {
        BusinessShortCode: this.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId
      };

      const response = await axios.post(`${this.baseURL}/mpesa/stkpushquery/v1/query`, requestData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        resultCode: response.data.ResultCode,
        resultDesc: response.data.ResultDesc,
        merchantRequestId: response.data.MerchantRequestID,
        checkoutRequestId: response.data.CheckoutRequestID
      };
    } catch (error) {
      console.error('STK Push query error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.errorMessage || 'Query failed'
      };
    }
  }

  // C2B (Customer to Business) Register URLs
  async registerC2BUrls() {
    try {
      const accessToken = await this.getAccessToken();

      const requestData = {
        ShortCode: this.businessShortCode,
        ResponseType: 'Completed',
        ConfirmationURL: `${this.callbackURL}/c2b/confirmation`,
        ValidationURL: `${this.callbackURL}/c2b/validation`
      };

      const response = await axios.post(`${this.baseURL}/mpesa/c2b/v1/registerurl`, requestData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        responseDescription: response.data.ResponseDescription
      };
    } catch (error) {
      console.error('C2B URL registration error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.errorMessage || 'URL registration failed'
      };
    }
  }

  // B2C (Business to Customer) payment
  async b2cPayment(phoneNumber, amount, commandId = 'BusinessPayment', remarks = 'ZetuList Refund') {
    try {
      const accessToken = await this.getAccessToken();
      
      const formattedPhone = phoneNumber.startsWith('0') 
        ? `254${phoneNumber.slice(1)}` 
        : phoneNumber.startsWith('+254') 
        ? phoneNumber.slice(1) 
        : phoneNumber;

      const requestData = {
        InitiatorName: process.env.MPESA_INITIATOR_NAME || 'testapi',
        SecurityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
        CommandID: commandId,
        Amount: Math.round(amount),
        PartyA: this.businessShortCode,
        PartyB: formattedPhone,
        Remarks: remarks,
        QueueTimeOutURL: `${this.callbackURL}/b2c/timeout`,
        ResultURL: `${this.callbackURL}/b2c/result`,
        Occasion: 'ZetuList Transaction'
      };

      const response = await axios.post(`${this.baseURL}/mpesa/b2c/v1/paymentrequest`, requestData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        conversationId: response.data.ConversationID,
        originatorConversationId: response.data.OriginatorConversationID,
        responseCode: response.data.ResponseCode,
        responseDescription: response.data.ResponseDescription
      };
    } catch (error) {
      console.error('B2C payment error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.errorMessage || 'B2C payment failed'
      };
    }
  }

  // Transaction status query
  async transactionStatus(transactionId) {
    try {
      const accessToken = await this.getAccessToken();

      const requestData = {
        Initiator: process.env.MPESA_INITIATOR_NAME || 'testapi',
        SecurityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
        CommandID: 'TransactionStatusQuery',
        TransactionID: transactionId,
        PartyA: this.businessShortCode,
        IdentifierType: '4',
        ResultURL: `${this.callbackURL}/transaction-status/result`,
        QueueTimeOutURL: `${this.callbackURL}/transaction-status/timeout`,
        Remarks: 'ZetuList Transaction Status Query',
        Occasion: 'Status Check'
      };

      const response = await axios.post(`${this.baseURL}/mpesa/transactionstatus/v1/query`, requestData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        conversationId: response.data.ConversationID,
        originatorConversationId: response.data.OriginatorConversationID,
        responseDescription: response.data.ResponseDescription
      };
    } catch (error) {
      console.error('Transaction status query error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.errorMessage || 'Status query failed'
      };
    }
  }

  // Account balance query
  async accountBalance() {
    try {
      const accessToken = await this.getAccessToken();

      const requestData = {
        Initiator: process.env.MPESA_INITIATOR_NAME || 'testapi',
        SecurityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
        CommandID: 'AccountBalance',
        PartyA: this.businessShortCode,
        IdentifierType: '4',
        Remarks: 'ZetuList Balance Query',
        QueueTimeOutURL: `${this.callbackURL}/balance/timeout`,
        ResultURL: `${this.callbackURL}/balance/result`
      };

      const response = await axios.post(`${this.baseURL}/mpesa/accountbalance/v1/query`, requestData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        conversationId: response.data.ConversationID,
        originatorConversationId: response.data.OriginatorConversationID,
        responseDescription: response.data.ResponseDescription
      };
    } catch (error) {
      console.error('Account balance query error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.errorMessage || 'Balance query failed'
      };
    }
  }

  // Format phone number for M-Pesa
  formatPhoneNumber(phoneNumber) {
    // Remove any spaces, hyphens, or special characters
    let formatted = phoneNumber.replace(/[\s\-\(\)]/g, '');
    
    // Handle different formats
    if (formatted.startsWith('0')) {
      formatted = '254' + formatted.slice(1);
    } else if (formatted.startsWith('+254')) {
      formatted = formatted.slice(1);
    } else if (!formatted.startsWith('254')) {
      formatted = '254' + formatted;
    }
    
    return formatted;
  }

  // Validate phone number
  isValidKenyanNumber(phoneNumber) {
    const formatted = this.formatPhoneNumber(phoneNumber);
    // Kenyan mobile numbers: 254[7|1]XXXXXXXX
    return /^254[71]\d{8}$/.test(formatted);
  }
}

module.exports = new MpesaService();