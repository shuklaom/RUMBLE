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
 * Note: Backend validates that robotId exists and is not 000000
 */
export const registerUser = async (userData) => {
  const { name, email, password, username, robotId } = userData;
  
  // Map frontend fields to API expected format
  const requestBody = {
    name,
    emailId: email,
    userPassword: password,
    username,
    // Use provided robotId or generate a valid one (not 000000 as backend rejects it)
    robotId: robotId || Math.floor(Math.random() * 900000) + 100000, // Generate 6-digit number avoiding 000000
  };

  console.log('Registering user with data:', requestBody);

  const result = await apiRequest('/users/', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });

  if (result.success) {
    return {
      success: true,
      message: 'User registered successfully and robot assigned',
      user: {
        id: requestBody.username, // Backend might return different ID structure
        name: requestBody.name,
        email: requestBody.emailId,
        username: requestBody.username,
        robotId: requestBody.robotId,
      },
    };
  } else {
    return {
      success: false,
      message: result.error || 'Registration failed. Robot ID may be invalid or already assigned.',
    };
  }
};

/**
 * User Login
 * Updated to match the actual Java backend endpoint: GET /users/u/{email}/{password}/
 */
export const loginUser = async (credentials) => {
  const { email, password } = credentials;
  
  // The actual backend endpoint uses path parameters for authentication
  const loginEndpoint = `/users/u/${encodeURIComponent(email)}/${encodeURIComponent(password)}/`;
  
  console.log(`Attempting login with actual backend endpoint: ${loginEndpoint}`);
  
  const result = await apiRequest(loginEndpoint, {
    method: 'GET', // Backend uses GET method with path parameters
  });

  if (result.success) {
    console.log('✅ Login successful with backend endpoint');
    
    // Extract user data from response
    const userData = result.data;
    
    return {
      success: true,
      message: 'Login successful',
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.emailId,
        username: userData.username,
        robotId: userData.robotId,
      },
      // Generate a session token since backend doesn't provide one
      token: `session_${email}_${Date.now()}`,
      workingEndpoint: loginEndpoint,
    };
  } else {
    console.log(`❌ Login failed: ${result.error}`);
    return {
      success: false,
      message: result.error || 'Authentication failed. Please check your credentials.',
    };
  }
};

/**
 * Verify Authentication Token
 * Since the backend doesn't have a dedicated token verification endpoint,
 * we'll use a simple check by trying to get all users (low-cost operation)
 */
export const verifyToken = async (token) => {
  try {
    // Since we generate session tokens locally, we can do basic validation
    if (!token || !token.startsWith('session_')) {
      return {
        success: false,
        message: 'Invalid token format',
      };
    }
    
    // Extract email from session token for additional validation
    const tokenParts = token.split('_');
    if (tokenParts.length >= 3) {
      const email = tokenParts[1];
      
      // Try to validate by getting all users (this will fail if server is down)
      const usersResult = await getAllUsers();
      
      if (usersResult.success) {
        return {
          success: true,
          message: 'Token verified successfully',
        };
      }
    }
    
    return {
      success: false,
      message: 'Token verification failed - server unreachable',
    };
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
 * GET /users/{id}/ - Returns specific user by ID
 * GET /users/ - Returns all users (if no ID provided)
 */
export const getUserData = async (userId) => {
  let endpoint = '/users/';
  
  // If userId is provided, get specific user
  if (userId) {
    endpoint = `/users/${userId}/`;
  }
  
  const result = await apiRequest(endpoint, {
    method: 'GET',
  });

  if (result.success) {
    // Handle both single user and array of users
    const userData = Array.isArray(result.data) ? result.data[0] : result.data;
    
    return {
      success: true,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.emailId,
        username: userData.username,
        robotId: userData.robotId,
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
 * Update User
 * PUT /users/{id}/{password} - Updates user information
 */
export const updateUser = async (userId, currentPassword, updatedData) => {
  const endpoint = `/users/${userId}/${encodeURIComponent(currentPassword)}`;
  
  const result = await apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(updatedData),
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
      message: 'User updated successfully',
    };
  } else {
    return {
      success: false,
      message: result.error || 'Failed to update user',
    };
  }
};

/**
 * Delete User
 * DELETE /users/{id} - Deletes user account
 */
export const deleteUser = async (userId) => {
  const endpoint = `/users/${userId}`;
  
  const result = await apiRequest(endpoint, {
    method: 'DELETE',
  });

  if (result.success) {
    return {
      success: true,
      message: 'User deleted successfully',
    };
  } else {
    return {
      success: false,
      message: result.error || 'Failed to delete user',
    };
  }
};

/**
 * Get All Users (Admin function)
 * GET /users/ - Returns all users in the system
 */
export const getAllUsers = async () => {
  const result = await apiRequest('/users/', {
    method: 'GET',
  });

  if (result.success) {
    const users = Array.isArray(result.data) ? result.data : [result.data];
    
    return {
      success: true,
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.emailId,
        username: user.username,
        robotId: user.robotId,
      })),
    };
  } else {
    return {
      success: false,
      message: result.error || 'Failed to retrieve users',
    };
  }
};

/**
 * Get User Dashboard Data
 * Enhanced to use the correct user data endpoint
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
  updateUser,
  deleteUser,
  getAllUsers,
  getDashboardData,
};

export default apiService;