import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BubbleBackground from '../common/BubbleBackground';
import { useAuth } from '../../contexts/AuthContext';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }
    
    // Username validation
    if (!formData.username) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
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
    const validFields = ['name', 'username', 'email', 'password', 'confirmPassword'];
    if (!validFields.includes(name)) {
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field-specific error when user types
    // eslint-disable-next-line security/detect-object-injection
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
      
      await signup({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create an account');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 relative overflow-hidden">
      {/* Container for animated bubbles */}
      <BubbleBackground />

      {/* Form card container */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl w-full max-w-md shadow-lg z-10">
        <h1 className="rumble-text mb-6">Create Account</h1>
        
        {error && (
          <div className="bg-red-500/20 text-red-100 p-3 rounded-lg mb-4 text-center" role="alert">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {/* Name input */}
          <div>
            <label htmlFor="name" className="block uppercase tracking-wide text-white text-xs font-bold mb-2">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="appearance-none block w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white/30 focus:border-white transition-all duration-300"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              aria-describedby={formErrors.name ? "name-error" : undefined}
              aria-invalid={!!formErrors.name}
            />
            {formErrors.name && (
              <p id="name-error" className="text-red-300 text-xs italic mt-1" role="alert">
                {formErrors.name}
              </p>
            )}
          </div>

          {/* Username input */}
          <div>
            <label htmlFor="username" className="block uppercase tracking-wide text-white text-xs font-bold mb-2">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="appearance-none block w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white/30 focus:border-white transition-all duration-300"
              placeholder="Choose a username"
              autoComplete="username"
              required
              aria-describedby={formErrors.username ? "username-error" : undefined}
              aria-invalid={!!formErrors.username}
            />
            {formErrors.username && (
              <p id="username-error" className="text-red-300 text-xs italic mt-1" role="alert">
                {formErrors.username}
              </p>
            )}
          </div>

          {/* Email input */}
          <div>
            <label htmlFor="email" className="block uppercase tracking-wide text-white text-xs font-bold mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className={`w-full p-3 rounded-xl bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                formErrors.email ? 'border border-red-500' : ''
              }`}
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!formErrors.email}
              aria-describedby={formErrors.email ? "email-error" : undefined}
              required
            />
            {formErrors.email && (
              <p id="email-error" className="text-red-300 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Password input fields */}
          <div>
            <label htmlFor="password" className="block uppercase tracking-wide text-white text-xs font-bold mb-2">Password</label>
            {/* Password field */}
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              className={`w-full mb-3 p-3 rounded-xl bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                formErrors.password ? 'border border-red-500' : ''
              }`}
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!formErrors.password}
              aria-describedby={formErrors.password ? "password-error" : undefined}
              required
            />
            {formErrors.password && (
              <p id="password-error" className="text-red-300 text-sm mt-1">{formErrors.password}</p>
            )}
            
            {/* Confirm password field */}
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className={`w-full p-3 rounded-xl bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                formErrors.confirmPassword ? 'border border-red-500' : ''
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
              aria-invalid={!!formErrors.confirmPassword}
              aria-describedby={formErrors.confirmPassword ? "confirm-password-error" : undefined}
              required
            />
            {formErrors.confirmPassword && (
              <p id="confirm-password-error" className="text-red-300 text-sm mt-1">{formErrors.confirmPassword}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="inline-block bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-white/50 mb-4"
          >
            ← Back to Home
          </Link>
        </div>
        
        <p className="text-center text-white">
          Already have an account? <Link to="/login" className="underline text-blue-300 hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Log In</Link>
        </p>      </div>
    </div>
  );
};

export default CreateAccount;
