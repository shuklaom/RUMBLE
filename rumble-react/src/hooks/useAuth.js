/**
 * useAuth Hook
 * Custom hook for authentication logic and user management
 */
import { useState, useCallback, useEffect } from 'react';
import { generateSessionToken, isValidSessionToken } from '../utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';
import useApi from './useApi';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { apiRequest, error: apiError, clearError } = useApi();

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('rumble_user');
    const savedToken = localStorage.getItem('rumble_token');

    if (savedUser && savedToken && isValidSessionToken(savedToken)) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('rumble_user');
        localStorage.removeItem('rumble_token');
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    const { email, password } = credentials;
    
    // The actual backend endpoint uses path parameters for authentication
    const loginEndpoint = `/users/u/${encodeURIComponent(email)}/${encodeURIComponent(password)}/`;
    
    console.log(`Attempting login with endpoint: ${loginEndpoint}`);
    
    const result = await apiRequest(loginEndpoint, {
      method: 'GET',
    });

    if (result.success) {
      console.log('✅ Login successful');
      
      // Extract user data from response
      const userData = result.data;
      const sessionToken = generateSessionToken(email);
      
      const user = {
        id: userData.id,
        name: userData.name,
        email: userData.emailId,
        username: userData.username,
        robotId: userData.robotId,
      };

      // Save to state
      setUser(user);
      setToken(sessionToken);
      
      // Save to localStorage
      localStorage.setItem('rumble_user', JSON.stringify(user));
      localStorage.setItem('rumble_token', sessionToken);
      
      return {
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user,
        token: sessionToken,
      };
    } else {
      console.log(`❌ Login failed: ${result.error}`);
      return {
        success: false,
        message: result.error || ERROR_MESSAGES.INVALID_CREDENTIALS,
      };
    }
  }, [apiRequest]);

  // Register function
  const register = useCallback(async (userData) => {
    const { name, email, password, username, robotId } = userData;
    
    // Map frontend fields to API expected format
    const requestBody = {
      name,
      emailId: email,
      userPassword: password,
      username,
      robotId: robotId || Math.floor(Math.random() * 900000) + 100000,
    };

    console.log('Registering user with data:', requestBody);

    const result = await apiRequest('/users/', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    if (result.success) {
      return {
        success: true,
        message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
        user: {
          id: requestBody.username,
          name: requestBody.name,
          email: requestBody.emailId,
          username: requestBody.username,
          robotId: requestBody.robotId,
        },
      };
    } else {
      return {
        success: false,
        message: result.error || ERROR_MESSAGES.REGISTRATION_FAILED,
      };
    }
  }, [apiRequest]);

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('rumble_user');
    localStorage.removeItem('rumble_token');
    
    return {
      success: true,
      message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
    };
  }, []);

  // Verify token function
  const verifyToken = useCallback(async (tokenToVerify) => {
    try {
      if (!tokenToVerify || !isValidSessionToken(tokenToVerify)) {
        return {
          success: false,
          message: 'Invalid token format',
        };
      }
      
      // For now, we'll consider session tokens valid
      // In a real app, you'd verify with the server
      return {
        success: true,
        message: 'Token verified successfully',
      };
    } catch (error) {
      console.error('Token verification error:', error);
      return {
        success: false,
        message: 'Token verification failed',
      };
    }
  }, []);

  return {
    user,
    token,
    loading,
    error: apiError,
    login,
    register,
    logout,
    verifyToken,
    clearError,
    isAuthenticated: !!user && !!token,
  };
};

export default useAuth;