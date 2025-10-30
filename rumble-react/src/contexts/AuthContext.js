/**
 * Refactored Auth Context
 * Uses the new useAuth hook for cleaner separation of concerns
 */
import React, { createContext, useContext } from 'react';
import { useAuth as useAuthHook } from '../hooks';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  // Use our custom hook for all auth logic
  const authState = useAuthHook();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};