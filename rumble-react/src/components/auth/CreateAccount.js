import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BubbleBackground from '../common/BubbleBackground';
import { useAuth } from '../../contexts/AuthContext';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false); // Developer toggle for bubbles
  const navigate = useNavigate();
  const { signup, isAuthenticated, error: authError } = useAuth();

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

  // Developer tool: Toggle bubbles with 'B' key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key && e.key.toLowerCase() === 'b' && e.ctrlKey) {
        e.preventDefault();
        setShowBubbles(prev => !prev);
        console.log(`Bubbles ${!showBubbles ? 'enabled' : 'disabled'} - Press Ctrl+B to toggle`);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showBubbles]);

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords don't match";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate field name to prevent object injection
    const validFields = ['email', 'password', 'confirmPassword'];
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
      
      await signup(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create an account');
      console.error('Signup error:', err);
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

      {/* Optional bubbles background - toggleable with Ctrl+B */}
      {showBubbles && <BubbleBackground />}

      {/* Developer tool indicator */}
      <div className="absolute top-4 right-4 z-50">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-slate-300 border border-slate-600/50">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${showBubbles ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
            <span>Bubbles {showBubbles ? 'ON' : 'OFF'}</span>
          </div>
          <div className="text-slate-400 mt-1">Press Ctrl+B to toggle</div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Create account card */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              {/* RUMBLE Logo */}
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-slate-900 font-black text-2xl">R</span>
                </div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  RUMBLE
                </h1>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-slate-400">Join RUMBLE to manage your autonomous cleanup robot</p>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl mb-6 text-center backdrop-blur-sm" role="alert">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            
            {/* Create account form */}
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                {/* Email input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ${
                        formErrors.email 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-600 focus:ring-emerald-500/50 hover:border-slate-500'
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
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ${
                        formErrors.password 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-600 focus:ring-emerald-500/50 hover:border-slate-500'
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

                {/* Confirm Password input */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ${
                        formErrors.confirmPassword 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-600 focus:ring-emerald-500/50 hover:border-slate-500'
                      }`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      aria-invalid={!!formErrors.confirmPassword}
                      aria-describedby={formErrors.confirmPassword ? "confirm-password-error" : undefined}
                      required
                    />
                  </div>
                  {formErrors.confirmPassword && (
                    <p id="confirm-password-error" className="text-red-400 text-sm mt-2 flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{formErrors.confirmPassword}</span>
                    </p>
                  )}
                </div>
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
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
                  className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-lg px-3 py-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Home</span>
                </Link>
              </div>
              
              {/* Login link */}
              <div className="text-center">
                <p className="text-slate-400">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded px-1"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
