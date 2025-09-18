import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/apiMock';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for stored user and token on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('rumbleUser');
    const storedToken = localStorage.getItem('rumbleToken');
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        
        // Verify token with the mock API
        authService.getCurrentUser(storedToken)
          .then(() => {
            // Only set user as authenticated if token verification succeeds
            setCurrentUser(user);
            setToken(storedToken);
          })
          .catch(() => {
            // If token verification fails, log the user out
            console.log('Token verification failed, clearing stored auth data');
            localStorage.removeItem('rumbleUser');
            localStorage.removeItem('rumbleToken');
            setCurrentUser(null);
            setToken(null);
          });
      } catch (error) {
        // If stored user data is corrupted, clear it
        console.log('Corrupted user data found, clearing localStorage');
        localStorage.removeItem('rumbleUser');
        localStorage.removeItem('rumbleToken');
        setCurrentUser(null);
        setToken(null);
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setError(null);
    try {
      const response = await authService.login(email, password);
      
      // Store user and token
      localStorage.setItem('rumbleUser', JSON.stringify(response.user));
      localStorage.setItem('rumbleToken', response.token);
      
      // Update state
      setCurrentUser(response.user);
      setToken(response.token);
      
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Signup function
  const signup = async (email, password) => {
    setError(null);
    try {
      const response = await authService.register(email, password);
      
      // Store user and token
      localStorage.setItem('rumbleUser', JSON.stringify(response.user));
      localStorage.setItem('rumbleToken', response.token);
      
      // Update state
      setCurrentUser(response.user);
      setToken(response.token);
      
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (token) {
        await authService.logout();
      }
    } finally {
      // Clear local storage and state regardless of API response
      localStorage.removeItem('rumbleUser');
      localStorage.removeItem('rumbleToken');
      setCurrentUser(null);
      setToken(null);
      setError(null);
    }
  };

  // Function to clear authentication state (for debugging/testing)
  const clearAuth = () => {
    localStorage.removeItem('rumbleUser');
    localStorage.removeItem('rumbleToken');
    setCurrentUser(null);
    setToken(null);
    setError(null);
  };

  // Context value
  const value = {
    currentUser,
    token,
    login,
    signup,
    logout,
    clearAuth,
    error,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
