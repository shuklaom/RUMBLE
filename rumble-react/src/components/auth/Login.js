import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated, error: authError } = useAuth();

  const welcomeText = "Welcome Back";

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= welcomeText.length) {
        setTypedText(welcomeText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Sync error state with context error
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate field name to prevent object injection
    const validFields = ['email', 'password'];
    if (!validFields.includes(name)) {
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-2xl animate-spin-slow"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login card */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              {/* RUMBLE Logo */}
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                  <span className="text-slate-900 font-black text-2xl">R</span>
                </div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                  RUMBLE
                </h1>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                {typedText}
                <span className="animate-pulse">|</span>
              </h2>
              <p className="text-slate-400">Sign in to manage your autonomous cleanup robot</p>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl mb-6 text-center backdrop-blur-sm animate-shake" role="alert">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            
            {/* Login form */}
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                {/* Email input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-emerald-400">
                      <svg className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 transform hover:scale-[1.01] focus:scale-[1.01] ${
                        formErrors.email 
                          ? 'border-red-500 focus:ring-red-500/50 animate-pulse' 
                          : 'border-slate-600 focus:ring-emerald-500/50 hover:border-slate-500 focus:shadow-lg focus:shadow-emerald-500/20'
                      }`}
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                      required
                    />
                  </div>
                  {formErrors.email && (
                    <p id="email-error" className="text-red-400 text-sm mt-2 flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{formErrors.email}</span>
                    </p>
                  )}
                </div>
                
                {/* Password input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-emerald-400">
                      <svg className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 transform hover:scale-[1.01] focus:scale-[1.01] ${
                        formErrors.password 
                          ? 'border-red-500 focus:ring-red-500/50 animate-pulse' 
                          : 'border-slate-600 focus:ring-emerald-500/50 hover:border-slate-500 focus:shadow-lg focus:shadow-emerald-500/20'
                      }`}
                      value={formData.password}
                      onChange={handleChange}
                      aria-invalid={!!formErrors.password}
                      aria-describedby={formErrors.password ? "password-error" : undefined}
                      required
                    />
                  </div>
                  {formErrors.password && (
                    <p id="password-error" className="text-red-400 text-sm mt-2 flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{formErrors.password}</span>
                    </p>
                  )}
                </div>
              </div>
              
              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2 relative z-10">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <span className="relative z-10">Sign In</span>
                  )}
                </button>
              </div>
            </form>
            
            {/* Footer links */}
            <div className="mt-8 space-y-4">
              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-800/40 text-slate-400">or</span>
                </div>
              </div>
              
              {/* Back to home link */}
              <div className="text-center">
                <Link 
                  to="/" 
                  className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-lg px-3 py-2 hover:scale-105 transform group"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Home</span>
                </Link>
              </div>
              
              {/* Create account link */}
              <div className="text-center">
                <p className="text-slate-400">
                  Don't have an account?{' '}
                  <Link 
                    to="/create-account" 
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded px-1"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  );
};

export default Login;
