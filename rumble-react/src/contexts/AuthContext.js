import React, { createContext, useState, useContext, useEffect } from 'react';
import apiService from '../services/apiService';

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
        
        // Verify token with the real API
        apiService.verifyToken(storedToken)
          .then((result) => {
            if (result.success) {
              // Only set user as authenticated if token verification succeeds
              setCurrentUser(user);
              setToken(storedToken);
            } else {
              // If token verification fails, log the user out
              console.log('Token verification failed, clearing stored auth data');
              localStorage.removeItem('rumbleUser');
              localStorage.removeItem('rumbleToken');
              setCurrentUser(null);
              setToken(null);
            }
          })
          .catch(() => {
            // If token verification fails, log the user out
            console.log('Token verification error, clearing stored auth data');
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
      const response = await apiService.loginUser({ email, password });
      
      if (response.success) {
        // Store user and token
        localStorage.setItem('rumbleUser', JSON.stringify(response.user));
        
        // Store token if provided, otherwise use email as fallback identifier
        const authToken = response.token || `session_${email}_${Date.now()}`;
        localStorage.setItem('rumbleToken', authToken);
        
        // Update state
        setCurrentUser(response.user);
        setToken(authToken);
        
        // Log successful login endpoint for debugging
        if (response.workingEndpoint) {
          console.log(`✅ Login successful using: ${response.workingEndpoint}`);
        }
        
        return response.user;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Signup function
  const signup = async (userData) => {
    setError(null);
    try {
      const response = await apiService.registerUser(userData);
      
      if (response.success) {
        // Store user and token
        localStorage.setItem('rumbleUser', JSON.stringify(response.user));
        
        // Generate a session token since the server doesn't return one
        const authToken = `session_${userData.email}_${Date.now()}`;
        localStorage.setItem('rumbleToken', authToken);
        
        // Update state
        setCurrentUser(response.user);
        setToken(authToken);
        
        return response.user;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    // Clear local storage and state (no server logout endpoint needed)
    localStorage.removeItem('rumbleUser');
    localStorage.removeItem('rumbleToken');
    setCurrentUser(null);
    setToken(null);
    setError(null);
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
