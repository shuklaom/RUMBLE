/**
 * Application Constants
 * Central location for all application constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://10.29.162.147:8080',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/create-account',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
};

// Application Info
export const APP_INFO = {
  NAME: 'RUMBLE',
  DESCRIPTION: 'Autonomous Trash Collection Robot Interface',
  VERSION: '1.0.0',
};

// UI Constants
export const UI_CONFIG = {
  SIDEBAR_WIDTH: '256px',
  HEADER_HEIGHT: '64px',
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
};

// Robot Status Constants
export const ROBOT_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  CHARGING: 'charging',
  MAINTENANCE: 'maintenance',
  COLLECTING: 'collecting',
  RETURNING: 'returning',
};

// Robot Commands
export const ROBOT_COMMANDS = {
  START: 'start',
  STOP: 'stop',
  RETURN_HOME: 'return_home',
  CHARGE: 'charge',
  MAINTENANCE: 'maintenance',
};

// Form Validation
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  ROBOT_ID_LENGTH: 6,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  REGISTRATION_FAILED: 'Registration failed. Please try again.',
  ROBOT_COMMAND_FAILED: 'Failed to send command to robot.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  REGISTRATION_SUCCESS: 'Account created successfully!',
  ROBOT_COMMAND_SUCCESS: 'Command sent successfully!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
};

// Loading Messages
export const LOADING_MESSAGES = {
  LOGGING_IN: 'Logging in...',
  REGISTERING: 'Creating account...',
  LOADING_DASHBOARD: 'Loading dashboard...',
  SENDING_COMMAND: 'Sending command...',
};