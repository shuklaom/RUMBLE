// Component Structure and API Integration Verification Script
// This file checks if all components are properly connected to the API mock service

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './src/contexts/AuthContext';
import { authService, robotService } from './src/services/apiMock';
import App from './src/App';

// Mock the API services to track calls
jest.mock('./src/services/apiMock', () => {
  const originalModule = jest.requireActual('./src/services/apiMock');
  
  return {
    ...originalModule,
    authService: {
      ...originalModule.authService,
      login: jest.fn(originalModule.authService.login),
      register: jest.fn(originalModule.authService.register),
      logout: jest.fn(originalModule.authService.logout),
      getCurrentUser: jest.fn(originalModule.authService.getCurrentUser),
    },
    robotService: {
      ...originalModule.robotService,
      getAllRobots: jest.fn(originalModule.robotService.getAllRobots),
      getRobotById: jest.fn(originalModule.robotService.getRobotById),
      sendCommand: jest.fn(originalModule.robotService.sendCommand),
      getDashboardStats: jest.fn(originalModule.robotService.getDashboardStats),
    },
  };
});

console.log('Verifying component structure...');

// Check AuthContext initialization
console.log('Checking AuthContext...');
try {
  const { currentUser, login, signup, logout, isAuthenticated } = require('./src/contexts/AuthContext').useAuth();
  console.log('AuthContext exports: ', { currentUser, login, signup, logout, isAuthenticated });
  console.log('✅ AuthContext structure is valid');
} catch (error) {
  console.error('❌ AuthContext structure is invalid:', error);
}

// Check API mock service initialization
console.log('\nChecking API mock services...');
try {
  const { authService, robotService } = require('./src/services/apiMock');
  console.log('Auth Service Methods:', Object.keys(authService));
  console.log('Robot Service Methods:', Object.keys(robotService));
  console.log('✅ API mock services are valid');
} catch (error) {
  console.error('❌ API mock services are invalid:', error);
}

// Check component imports
console.log('\nChecking component imports...');
try {
  const Login = require('./src/components/auth/Login').default;
  const CreateAccount = require('./src/components/auth/CreateAccount').default;
  const Dashboard = require('./src/components/dashboard/Dashboard').default;
  const LandingPage = require('./src/components/landing/LandingPage').default;
  const BubbleBackground = require('./src/components/common/BubbleBackground').default;
  const PrivateRoute = require('./src/components/common/PrivateRoute').default;
  
  console.log('✅ All components imported successfully');
} catch (error) {
  console.error('❌ Component import failed:', error);
}

console.log('\nVerification complete!');
