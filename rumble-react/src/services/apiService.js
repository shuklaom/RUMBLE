/**
 * Real API Service for RUMBLE Application
 * Replaces apiMock.js with actual HTTP calls to the server
 */

const API_BASE_URL = 'http://sddec25-16.ece.iastate.edu:8080';

/**
 * HTTP utility functions
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses or errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    // Parse JSON response
    const data = await response.json();
    return {
      success: true,
      data,
      status: response.status,
    };
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    return {
      success: false,
      error: error.message,
      status: error.status || 500,
    };
  }
};

/**
 * User Registration
 * POST /users/
 */
export const registerUser = async (userData) => {
  const { name, email, password, username } = userData;
  
  // Map frontend fields to API expected format
  const requestBody = {
    name,
    emailId: email,
    userPassword: password,
    username,
    robotId: Math.floor(Math.random() * 1000000) + 100000, // Generate random robotId for now
  };

  const result = await apiRequest('/users/', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });

  if (result.success) {
    return {
      success: true,
      message: result.data.message || 'User registered successfully',
      user: {
        id: username, // Use username as ID for now
        name,
        email,
        username,
      },
    };
  } else {
    return {
      success: false,
      message: result.error || 'Registration failed',
    };
  }
};

/**
 * User Login
 * Tries multiple common authentication patterns to find the working endpoint
 */
export const loginUser = async (credentials) => {
  const { email, password } = credentials;
  
  // Common authentication endpoint patterns to try
  const authAttempts = [
    {
      endpoint: '/users/login',
      body: { emailId: email, userPassword: password },
      description: 'Standard login with emailId'
    },
    {
      endpoint: '/auth/login', 
      body: { emailId: email, userPassword: password },
      description: 'Auth endpoint with emailId'
    },
    {
      endpoint: '/login',
      body: { emailId: email, userPassword: password }, 
      description: 'Simple login with emailId'
    },
    {
      endpoint: '/users/authenticate',
      body: { emailId: email, userPassword: password },
      description: 'Authenticate endpoint with emailId'
    },
    {
      endpoint: '/users/login',
      body: { email: email, password: password },
      description: 'Standard login with email/password'
    }
  ];

  // Try each authentication pattern
  for (const attempt of authAttempts) {
    console.log(`Trying login: ${attempt.description} - ${attempt.endpoint}`);
    
    const result = await apiRequest(attempt.endpoint, {
      method: 'POST',
      body: JSON.stringify(attempt.body),
    });

    // If successful, return the result
    if (result.success) {
      console.log(`✅ Login successful with: ${attempt.description}`);
      
      // Extract user data from response
      const responseData = result.data;
      
      return {
        success: true,
        message: responseData.message || 'Login successful',
        user: {
          // Try to extract user info from various possible response formats
          id: responseData.id || responseData.userId || email,
          name: responseData.name || responseData.userName || '',
          email: responseData.emailId || responseData.email || email,
          username: responseData.username || responseData.userName || '',
          robotId: responseData.robotId || null,
        },
        token: responseData.token || responseData.accessToken || null,
        // Store which endpoint worked for future optimization
        workingEndpoint: attempt.endpoint,
        workingFormat: attempt.body,
      };
    } else {
      console.log(`❌ Login failed with: ${attempt.description} - ${result.error}`);
    }
  }

  // If all attempts failed
  console.log('❌ All login attempts failed');
  return {
    success: false,
    message: 'Authentication failed. Please check your credentials or contact support.',
    attempts: authAttempts.map(a => a.description),
  };
};

/**
 * Verify Authentication Token
 * Uses GET /users/ to verify if user session is valid
 */
export const verifyToken = async (token) => {
  // For now, try to get user data to verify the session
  // This might need to be adjusted based on how your server handles authentication
  
  try {
    const userResult = await getUserData();
    
    if (userResult.success) {
      return {
        success: true,
        user: userResult.user,
        message: 'Token verified successfully',
      };
    } else {
      return {
        success: false,
        message: 'Token verification failed - user data not accessible',
      };
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return {
      success: false,
      message: 'Token verification failed',
    };
  }
};

/**
 * Get User Data
 * GET /users/ - Returns user profile information
 */
export const getUserData = async (userIdentifier) => {
  // Note: Need to determine if this endpoint takes query parameters
  // or how to specify which user to retrieve
  const result = await apiRequest('/users/', {
    method: 'GET',
  });

  if (result.success) {
    return {
      success: true,
      user: {
        id: result.data.id,
        name: result.data.name,
        email: result.data.emailId,
        username: result.data.username,
        robotId: result.data.robotId,
      },
    };
  } else {
    return {
      success: false,
      message: result.error || 'Failed to retrieve user data',
    };
  }
};

/**
 * Get User Dashboard Data
 * TODO: Determine dashboard data endpoints
 */
export const getDashboardData = async (userId) => {
  // For now, use getUserData as it contains robot information
  const userResult = await getUserData(userId);
  
  if (userResult.success) {
    return {
      success: true,
      data: {
        user: userResult.user,
        robotId: userResult.user.robotId,
        // Mock additional dashboard data until we know the real endpoints
        totalBattles: 0,
        wins: 0,
        losses: 0,
        rank: 'Unranked',
      },
    };
  } else {
    return {
      success: false,
      message: 'Failed to retrieve dashboard data',
    };
  }
};

/**
 * Default export with all API functions
 */
const apiService = {
  registerUser,
  loginUser,
  verifyToken,
  getUserData,
  getDashboardData,
};

export default apiService;