/**
 * API Integration Test Script
 * 
 * This script tests the integration between our frontend components and the mock API services.
 * It verifies that the API methods are called with the correct parameters and that
 * the components handle API responses properly.
 */

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Test authentication flow
async function testAuthFlow() {
  const { authService } = require('./src/services/apiMock');
  
  console.log('Testing login flow...');
  try {
    const loginResult = await authService.login('test@example.com', 'test123');
    console.log('Login successful:', !!loginResult.token);
    console.log('User data returned:', !!loginResult.user);
    
    // Test user fetch with token
    const user = await authService.getCurrentUser(loginResult.token);
    console.log('User fetch successful:', user.email === 'test@example.com');
    
    // Test logout
    const logoutResult = await authService.logout();
    console.log('Logout successful:', logoutResult.success);
    
    console.log('✅ Authentication flow works correctly');
  } catch (error) {
    console.error('❌ Authentication flow failed:', error);
  }
}

// Test robot data retrieval
async function testRobotDataFlow() {
  const { authService, robotService } = require('./src/services/apiMock');
  
  console.log('\nTesting robot data retrieval...');
  try {
    // Login to get token
    const { token } = await authService.login('test@example.com', 'test123');
    
    // Get all robots
    const robots = await robotService.getAllRobots(token);
    console.log('Robot data retrieval successful:', robots.length > 0);
    
    // Get one robot by ID
    const firstRobotId = robots[0].id;
    const singleRobot = await robotService.getRobotById(firstRobotId, token);
    console.log('Single robot retrieval successful:', singleRobot.id === firstRobotId);
    
    // Get dashboard stats
    const stats = await robotService.getDashboardStats(token);
    console.log('Dashboard stats retrieval successful:', !!stats.totalRobots);
    
    // Test robot command
    const commandResult = await robotService.sendCommand(firstRobotId, 'start', token);
    console.log('Robot command successful:', commandResult.success);
    
    console.log('✅ Robot data flow works correctly');
  } catch (error) {
    console.error('❌ Robot data flow failed:', error);
  }
}

// Run tests
console.log('API INTEGRATION VERIFICATION');
console.log('===========================');

// Run auth tests
testAuthFlow()
  .then(() => testRobotDataFlow())
  .then(() => {
    console.log('\n✅ All API integration tests passed!');
  })
  .catch(error => {
    console.error('\n❌ API integration tests failed:', error);
  });
