import { useState } from 'react';
import { toast } from 'react-toastify';
import { Mail, Lock, UserRound, Phone } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      if (formData.email && formData.password) {
        try {
          console.log("BACKEND:", import.meta.env.VITE_BACKEND_URL);
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: formData.email,
    password: formData.password,
  }),
});

          const data = await res.json();
          if (res.ok) {
            toast.success(`Welcome back, ${data.name || 'user'}!`);
            console.log('Login success:', data);
          } else {
            toast.error(data.message || 'Login failed');
          }
        } catch (err) {
          toast.error('Something went wrong logging in.');
          console.error(err);
        }
      } else {
        toast.error('Please fill in all fields');
      }
    } else {
      if (formData.name && formData.phone && formData.email && formData.password) {
        if (formData.password === formData.confirmPassword) {
          try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    password: formData.password,
  }),
});


            const data = await res.json();
            if (res.ok) {
              toast.success('Account created successfully!');
              console.log('Registration success:', data);
            } else {
              toast.error(data.message || 'Registration failed');
            }
          } catch (err) {
            toast.error('Something went wrong signing up.');
            console.error(err);
          }
        } else {
          toast.error('Passwords do not match');
        }
      } else {
        toast.error('Please fill in all fields');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {isLogin ? 'Login to your account' : 'Create a new account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="relative">
                <UserRound className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                  placeholder="Name"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                  placeholder="Phone"
                />
              </div>
            </>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
              placeholder="Email address"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
              placeholder="Password"
            />
          </div>
          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                placeholder="Confirm Password"
              />
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}
