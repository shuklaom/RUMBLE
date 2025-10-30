/**
 * useApi Hook
 * Custom hook for making API calls with loading, error, and success states
 */
import { useState, useCallback } from 'react';
import { API_CONFIG, ERROR_MESSAGES } from '../constants';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiRequest = useCallback(async (endpoint, options = {}) => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setLoading(false);
      
      return {
        success: true,
        data,
        status: response.status,
      };
    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error);
      setError(error.message || ERROR_MESSAGES.NETWORK_ERROR);
      setLoading(false);
      
      return {
        success: false,
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
        status: error.status || 500,
      };
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    apiRequest,
    clearError,
  };
};

export default useApi;