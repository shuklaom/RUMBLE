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
  }
];

// Simulated robot data
const robots = [
  {
    id: 'RUMBLE-001',
    name: 'Trash Collector Alpha',
    status: 'active',
    batteryLevel: 87,
    location: { lat: 42.026211, lng: -93.646301 },
    lastCollection: '2025-01-15T09:30:00Z',
    trashCollected: 34.2, // in kg
    nextScheduled: '2025-01-17T08:00:00Z'
  },
  {
    id: 'RUMBLE-002',
    name: 'Trash Collector Beta',
    status: 'charging',
    batteryLevel: 22,
    location: { lat: 42.024753, lng: -93.644450 },
    lastCollection: '2025-01-16T11:15:00Z',
    trashCollected: 28.7, // in kg
    nextScheduled: '2025-01-17T13:00:00Z'
  },
  {
    id: 'RUMBLE-003',
    name: 'Trash Collector Gamma',
    status: 'maintenance',
    batteryLevel: 0,
    location: { lat: 42.028612, lng: -93.650123 },
    lastCollection: '2025-01-14T16:45:00Z',
    trashCollected: 42.1, // in kg
    nextScheduled: '2025-01-18T09:30:00Z'
  }
];

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
  }
};

// Robot management service
export const robotService = {
  getAllRobots: async (token) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Validate token (in a real app, this would be done by the server)
    if (!token || !token.startsWith('mock-jwt-token-')) {
      throw new Error('Unauthorized');
    }
    
    return robots;
  },
  
  getRobotById: async (robotId, token) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate token
    if (!token || !token.startsWith('mock-jwt-token-')) {
      throw new Error('Unauthorized');
    }
    
    const robot = robots.find(r => r.id === robotId);
    
    if (robot) {
      return robot;
    } else {
      throw new Error('Robot not found');
    }
  },
  
  sendCommand: async (robotId, command, token) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Validate token
    if (!token || !token.startsWith('mock-jwt-token-')) {
      throw new Error('Unauthorized');
    }
    
    const robot = robots.find(r => r.id === robotId);
    
    if (!robot) {
      throw new Error('Robot not found');
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
    
    // Validate token
    if (!token || !token.startsWith('mock-jwt-token-')) {
      throw new Error('Unauthorized');
    }
    
    // Calculate statistics
    const activeRobots = robots.filter(r => r.status === 'active').length;
    const totalRobots = robots.length;
    const totalTrashCollected = robots.reduce((sum, robot) => sum + robot.trashCollected, 0);
    const averageBatteryLevel = robots.reduce((sum, robot) => sum + robot.batteryLevel, 0) / totalRobots;
    
    return {
      activeRobots,
      totalRobots,
      totalTrashCollected,
      averageBatteryLevel,
      robotsInMaintenance: robots.filter(r => r.status === 'maintenance').length,
      robotsCharging: robots.filter(r => r.status === 'charging').length
    };
  }
};
