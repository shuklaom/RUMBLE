/**
 * Refactored Login Component
 * Uses new architecture with custom hooks, UI components, and proper separation of concerns
 */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks';
import { Button, Input, Card, Alert } from '../ui';
import { ROUTES, VALIDATION_RULES } from '../../constants';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, error: authError, clearError } = useAuth();
  const [typedText, setTypedText] = useState('');
  
  const welcomeText = "Welcome Back";

  // Form validation rules
  const validationRules = {
    email: {
      required: true,
      type: 'email',
      label: 'Email',
    },
    password: {
      required: true,
      minLength: VALIDATION_RULES.PASSWORD_MIN_LENGTH,
      label: 'Password',
    },
  };

  // Initialize form with custom hook
  const {
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = useForm(
    { email: '', password: '' },
    validationRules
  );

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
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  // Handle form submission
  const onSubmit = async (formValues) => {
    clearError(); // Clear any previous errors
    
    const result = await login(formValues);
    
    if (result.success) {
      navigate(ROUTES.DASHBOARD);
    }
    // Error handling is managed by useAuth hook and displayed via authError
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-slate-900 font-black text-xl">R</span>
              </div>
              <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                RUMBLE
              </h1>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">
              {typedText}
              <span className="animate-pulse">|</span>
            </h2>
            <p className="text-slate-400">
              Sign in to your RUMBLE account to manage your robots
            </p>
          </div>

          {/* Error Alert */}
          {authError && (
            <Alert variant="error" onClose={clearError} className="mb-6">
              {authError}
            </Alert>
          )}

          {/* Login Form */}
          <Card>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
              }}
              className="space-y-6"
            >
              <Input
                {...getFieldProps('email')}
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                fullWidth
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
              />

              <Input
                {...getFieldProps('password')}
                type="password"
                label="Password"
                placeholder="Enter your password"
                fullWidth
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-500 bg-slate-700 border-slate-600 rounded focus:ring-emerald-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-slate-300">Remember me</span>
                </label>
                
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                loading={isSubmitting}
                fullWidth
                size="lg"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Sign up link */}
            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Don't have an account?{' '}
                <Link
                  to={ROUTES.REGISTER}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side - Background/Animation */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-900/20 via-slate-900 to-cyan-900/20 items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">
            Autonomous Robot Management
          </h3>
          <p className="text-slate-400 max-w-md">
            Monitor, control, and optimize your RUMBLE robots from anywhere. 
            Real-time tracking, automated scheduling, and intelligent waste collection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;