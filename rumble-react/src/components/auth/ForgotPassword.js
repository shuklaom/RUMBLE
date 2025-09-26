import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');

  const headerText = "Reset Password";

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= headerText.length) {
        setTypedText(headerText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await apiService.forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center relative overflow-hidden">
        <div className="relative z-10 w-full max-w-md p-8">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-10 rounded-2xl shadow-2xl">
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
                Email Sent!
              </h2>
              <p className="text-slate-400">
                Check your inbox for password reset instructions
              </p>
            </div>

            {/* Success Message */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-6">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-emerald-400 font-medium">Password reset email sent!</p>
                  <p className="text-slate-400 text-sm mt-1">
                    We've sent instructions to <span className="text-white font-medium">{email}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Instructions */}
            <div className="text-center text-sm text-slate-400 mb-6">
              <p>Didn't receive the email? Check your spam folder or</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
              >
                try again
              </button>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-10 rounded-2xl shadow-2xl">
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
            <p className="text-slate-400">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl mb-6 animate-shake">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
                  placeholder="Enter your email address"
                  disabled={loading}
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-8h-4M4 12H0m15.364-7.364l-2.828 2.828M7.464 16.536l-2.828 2.828m0-12.728l2.828 2.828m8.484 8.484l2.828 2.828" />
                  </svg>
                  <span>Sending Reset Email...</span>
                </div>
              ) : (
                'Send Reset Email'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <div className="text-slate-400 text-sm">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
            
            <div className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link
                to="/create-account"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Create one
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;