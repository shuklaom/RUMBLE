/**
 * RUMBLE API Service Mock
 * 
 * This file provides mock implementations of the API services that will later
 * be connected to the actual backend. This allows for development and testing
 * without requiring the backend to be running.
 */

// Simulated database of users
const users = [
  {
    id: '1',
    email: 'admin@rumble.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User',
    role: 'user'
  },
  {
    id: '3',
    email: 'john@example.com',
    password: 'john123',
    name: 'John Smith',
    role: 'user'
  }
];

// Simulated robot data with user ownership
const robots = [
  {
    id: 'RUMBLE-001',
    name: 'Trash Collector Alpha',
    status: 'active',
    batteryLevel: 87,
    location: { lat: 42.026211, lng: -93.646301 },
    lastCollection: '2025-01-15T09:30:00Z',
    trashCollected: 34.2, // in kg
    nextScheduled: '2025-01-17T08:00:00Z',
    ownerId: '1' // Owned by admin@rumble.com
  },
  {
    id: 'RUMBLE-002',
    name: 'Trash Collector Beta',
    status: 'charging',
    batteryLevel: 22,
    location: { lat: 42.024753, lng: -93.644450 },
    lastCollection: '2025-01-16T11:15:00Z',
    trashCollected: 28.7, // in kg
    nextScheduled: '2025-01-17T13:00:00Z',
    ownerId: '1' // Owned by admin@rumble.com
  },
  {
    id: 'RUMBLE-003',
    name: 'Trash Collector Gamma',
    status: 'maintenance',
    batteryLevel: 0,
    location: { lat: 42.028612, lng: -93.650123 },
    lastCollection: '2025-01-14T16:45:00Z',
    trashCollected: 42.1, // in kg
    nextScheduled: '2025-01-18T09:30:00Z',
    ownerId: '2' // Owned by test@example.com
  },
  {
    id: 'RUMBLE-004',
    name: 'Campus Cleaner',
    status: 'active',
    batteryLevel: 65,
    location: { lat: 42.027123, lng: -93.647890 },
    lastCollection: '2025-01-16T14:20:00Z',
    trashCollected: 18.4, // in kg
    nextScheduled: '2025-01-17T16:00:00Z',
    ownerId: '2' // Owned by test@example.com
  },
  {
    id: 'RUMBLE-005',
    name: 'Eco Cleaner Pro',
    status: 'charging',
    batteryLevel: 45,
    location: { lat: 42.025789, lng: -93.648234 },
    lastCollection: '2025-01-16T10:30:00Z',
    trashCollected: 31.2, // in kg
    nextScheduled: '2025-01-17T12:00:00Z',
    ownerId: '3' // Owned by john@example.com
  }
];

// Helper function to extract user ID from mock token
const getUserIdFromToken = (token) => {
  if (!token || !token.startsWith('mock-jwt-token-')) {
    throw new Error('Invalid token');
  }
  
  // Extract user ID from token format: mock-jwt-token-{timestamp}-{userId}
  const parts = token.split('-');
  return parts[parts.length - 1];
};

// Authentication service
export const authService = {
  login: async (email, password) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Remove password from returned user object
      const { password, ...userWithoutPassword } = user;
      
      // Simulate JWT token
      const token = `mock-jwt-token-${Date.now()}-${user.id}`;
      
      return {
        user: userWithoutPassword,
        token
      };
    } else {
      throw new Error('Invalid email or password');
    }
  },
  
  register: async (email, password) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      throw new Error('User already exists with this email');
    }
    
    // Create new user
    const newUser = {
      id: String(users.length + 1),
      email,
      password,
      name: email.split('@')[0],
      role: 'user'
    };
    
    // Add to our mock database
    users.push(newUser);
    
    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Simulate JWT token
    const token = `mock-jwt-token-${Date.now()}-${newUser.id}`;
    
    return {
      user: userWithoutPassword,
      token
    };
  },
  
  logout: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return { success: true };
  },
  
  getCurrentUser: async (token) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!token || !token.startsWith('mock-jwt-token-')) {
      throw new Error('Invalid token');
    }
    
    // Extract user ID from token
    const userId = token.split('-').pop();
    const user = users.find(u => u.id === userId);
    
    if (user) {
      // Remove password from returned user object
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      throw new Error('User not found');
    }
  },

  forgotPassword: async (email) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user exists
    const user = users.find(u => u.email === email);
    
    if (!user) {
      // For security, we don't reveal if the email exists or not
      // In a real app, you might still want to show success to prevent email enumeration
      throw new Error('If this email exists in our system, you will receive a password reset link.');
    }
    
    // In a real app, this would:
    // 1. Generate a secure reset token
    // 2. Store it in the database with an expiration time
    // 3. Send an email with the reset link
    
    // For demo purposes, we'll just return success
    return {
      success: true,
      message: 'Password reset email sent successfully'
    };
  },

  resetPassword: async (token, newPassword) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would:
    // 1. Verify the reset token
    // 2. Check if it's not expired
    // 3. Update the user's password
    // 4. Invalidate the reset token
    
    // For demo purposes, we'll just return success
    return {
      success: true,
      message: 'Password reset successfully'
    };
  }
};

// Robot management service
export const robotService = {
  getAllRobots: async (token) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Validate token and get user ID
    const userId = getUserIdFromToken(token);
    
    // Filter robots owned by this user
    const userOwnedRobots = robots.filter(robot => robot.ownerId === userId);
    
    return userOwnedRobots;
  },
  
  getRobotById: async (robotId, token) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate token and get user ID
    const userId = getUserIdFromToken(token);
    
    const robot = robots.find(r => r.id === robotId);
    
    if (!robot) {
      throw new Error('Robot not found');
    }
    
    // Check if user owns this robot
    if (robot.ownerId !== userId) {
      throw new Error('Access denied to this robot');
    }
    
    return robot;
  },
  
  sendCommand: async (robotId, command, token) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Validate token and get user ID
    const userId = getUserIdFromToken(token);
    
    const robot = robots.find(r => r.id === robotId);
    
    if (!robot) {
      throw new Error('Robot not found');
    }
    
    // Check if user owns this robot
    if (robot.ownerId !== userId) {
      throw new Error('Access denied to control this robot');
    }
    
    // Process command
    switch (command) {
      case 'start':
        if (robot.status === 'charging' && robot.batteryLevel < 20) {
          throw new Error('Battery level too low to start operation');
        }
        robot.status = 'active';
        break;
      case 'stop':
        robot.status = 'idle';
        break;
      case 'charge':
        robot.status = 'charging';
        break;
      case 'maintenance':
        robot.status = 'maintenance';
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
    
    return {
      success: true,
      robot: { ...robot }
    };
  },
  
  getDashboardStats: async (token) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Validate token and get user ID
    const userId = getUserIdFromToken(token);
    
    // Get user's owned robots only
    const userOwnedRobots = robots.filter(robot => robot.ownerId === userId);
    
    // Calculate statistics based on user's owned robots only
    const activeRobots = userOwnedRobots.filter(r => r.status === 'active').length;
    const totalRobots = userOwnedRobots.length;
    const totalTrashCollected = userOwnedRobots.reduce((sum, robot) => sum + robot.trashCollected, 0);
    const averageBatteryLevel = totalRobots > 0 ? 
      userOwnedRobots.reduce((sum, robot) => sum + robot.batteryLevel, 0) / totalRobots : 0;
    
    return {
      activeRobots,
      totalRobots,
      totalTrashCollected,
      averageBatteryLevel,
      robotsInMaintenance: userOwnedRobots.filter(r => r.status === 'maintenance').length,
      robotsCharging: userOwnedRobots.filter(r => r.status === 'charging').length
    };
  }
};
