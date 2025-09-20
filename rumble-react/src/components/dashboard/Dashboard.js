import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { robotService } from '../../services/apiMock';
import RobotMap from '../maps/RobotMap';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [robotData, setRobotData] = useState([]);
  const [sharedRobotData, setSharedRobotData] = useState([]);
  const [selectedRobotId, setSelectedRobotId] = useState('');
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { currentUser, token, logout } = useAuth();
  const navigate = useNavigate();

  // Mock function to simulate fetching shared robots
  const fetchSharedRobots = async (token) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock shared robots data - in real implementation this would be an API call
    // For now, we'll return some shared robots occasionally to test the UI
    const mockSharedRobots = [
      {
        id: 'SHARED-001',
        name: 'Campus Cleaner (Shared)',
        status: 'active',
        batteryLevel: 65,
        location: { lat: 42.027123, lng: -93.647890 },
        lastCollection: '2025-01-16T14:20:00Z',
        trashCollected: 18.4,
        nextScheduled: '2025-01-17T16:00:00Z',
        isShared: true,
        sharedBy: 'Iowa State University'
      },
      {
        id: 'SHARED-002',
        name: 'Trash collector Delta',
        status: 'active',
        batteryLevel: 72,
        location: { lat: 42.025456, lng: -93.645123 },
        lastCollection: '2025-01-16T12:45:00Z',
        trashCollected: 23.7,
        nextScheduled: '2025-01-17T14:30:00Z',
        isShared: true,
        sharedBy: 'mike.wilson@company.com'
      }
    ];
    
    // Return shared robots for demo purposes
    // In real implementation, this would be based on actual sharing permissions
    return mockSharedRobots; // Always return shared robots for testing
  };

  // Fetch robots and dashboard stats when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all robots (owned by user)
        const robots = await robotService.getAllRobots(token);
        setRobotData(robots);
        
        // Fetch shared robots (mock implementation for now)
        // In a real implementation, this would be a separate API call
        const sharedRobots = await fetchSharedRobots(token);
        setSharedRobotData(sharedRobots);
        
        // Set the first robot as selected by default (prefer owned robots)
        const allRobots = [...robots, ...sharedRobots];
        if (allRobots.length > 0 && !selectedRobotId) {
          setSelectedRobotId(allRobots[0].id);
          setSelectedRobot(allRobots[0]);
        }
        
        // Fetch dashboard statistics
        const stats = await robotService.getDashboardStats(token);
        setDashboardStats(stats);
        
        setError('');
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchData();
    }
  }, [token, selectedRobotId]);

  // Handle robot selection from sidebar
  const handleRobotSelection = async (robotId) => {
    setSelectedRobotId(robotId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
    
    try {
      // Check if it's a shared robot first
      const sharedRobot = sharedRobotData.find(robot => robot.id === robotId);
      if (sharedRobot) {
        setSelectedRobot(sharedRobot);
        return;
      }
      
      // Otherwise, fetch from the regular robot service
      const robot = await robotService.getRobotById(robotId, token);
      setSelectedRobot(robot);
    } catch (err) {
      console.error('Error fetching robot details:', err);
      setError('Failed to load robot details.');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Send command to robot (start, stop, charge, maintenance)
  const sendRobotCommand = async (command) => {
    if (!selectedRobotId) return;
    
    try {
      setLoading(true);
      const result = await robotService.sendCommand(selectedRobotId, command, token);
      
      // Update the selected robot with the new status
      setSelectedRobot(result.robot);
      
      // Refresh dashboard stats
      const stats = await robotService.getDashboardStats(token);
      setDashboardStats(stats);
      
      setError('');
    } catch (err) {
      console.error(`Error sending ${command} command:`, err);
      setError(`Failed to ${command} robot. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Close sidebar when clicking outside (for mobile)
  const handleClickOutside = useCallback((e) => {
    if (isSidebarOpen && !e.target.closest('#sidebar') && !e.target.closest('#hamburger-button')) {
      setIsSidebarOpen(false);
    }
  }, [isSidebarOpen]);

  // Add event listener for clicks outside the dropdown
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  if (loading && !dashboardStats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Format battery status color based on level
  const getBatteryColor = (level) => {
    if (level > 70) return 'text-green-300';
    if (level > 30) return 'text-yellow-300';
    return 'text-red-300';
  };

  // Format robot status color and text
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-300';
      case 'charging': return 'text-yellow-300';
      case 'maintenance': return 'text-red-300';
      case 'idle': return 'text-blue-300';
      default: return 'text-gray-300';
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Format date to human-readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white flex">
      {/* Sidebar */}
      <div 
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-gray-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-md border-r border-white/10 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-white">My Robots</h2>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Robot List */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* My Robots Section */}
            <div className="space-y-3 mb-6">
              {robotData.map(robot => (
                <button
                  key={robot.id}
                  onClick={() => handleRobotSelection(robot.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    selectedRobotId === robot.id
                      ? 'bg-white/20 border-2 border-blue-400/50 shadow-lg backdrop-blur-sm'
                      : 'bg-white/5 border-2 border-transparent hover:bg-white/10 hover:border-white/20 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{robot.name}</h3>
                      <p className={`text-sm ${getStatusColor(robot.status)}`}>
                        {formatStatus(robot.status)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`text-sm font-medium ${getBatteryColor(robot.batteryLevel)}`}>
                        {robot.batteryLevel}%
                      </div>
                      <div className="w-16 h-2 bg-black/30 rounded-full mt-1 overflow-hidden">
                        <div 
                          className={`h-full ${robot.batteryLevel > 70 ? 'bg-green-400' : robot.batteryLevel > 30 ? 'bg-yellow-400' : 'bg-red-400'}`} 
                          style={{ width: `${robot.batteryLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Shared Robots Section - Only show if there are shared robots */}
            {sharedRobotData.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-2 mb-3">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Shared with Me</h3>
                </div>
                {sharedRobotData.map(robot => (
                  <button
                    key={robot.id}
                    onClick={() => handleRobotSelection(robot.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 relative ${
                      selectedRobotId === robot.id
                        ? 'bg-white/20 border-2 border-purple-400/50 shadow-lg backdrop-blur-sm'
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10 hover:border-white/20 backdrop-blur-sm'
                    }`}
                  >
                    {/* Shared indicator badge */}
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center gap-1 bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        Shared
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pr-16">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{robot.name}</h3>
                        <p className={`text-sm ${getStatusColor(robot.status)}`}>
                          {formatStatus(robot.status)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          by {robot.sharedBy}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`text-sm font-medium ${getBatteryColor(robot.batteryLevel)}`}>
                          {robot.batteryLevel}%
                        </div>
                        <div className="w-16 h-2 bg-black/30 rounded-full mt-1 overflow-hidden">
                          <div 
                            className={`h-full ${robot.batteryLevel > 70 ? 'bg-green-400' : robot.batteryLevel > 30 ? 'bg-yellow-400' : 'bg-red-400'}`} 
                            style={{ width: `${robot.batteryLevel}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Persistent Settings and Logout */}
          <div className="border-t border-white/20 p-4 space-y-2">
            <button className="w-full flex items-center gap-3 p-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14,12.94a7.49,7.49,0,0,0,.05-.94,7.49,7.49,0,0,0-.05-.94l2.11-1.65a.5.5,0,0,0,.12-.64l-2-3.46a.5.5,0,0,0-.6-.22l-2.49,1a7.3,7.3,0,0,0-1.62-.94l-.38-2.65a.5.5,0,0,0-.49-.42H9.91a.5.5,0,0,0-.49.42l-.38,2.65a7.3,7.3,0,0,0-1.62.94l-2.49-1a.5.5,0,0,0-.6.22l-2,3.46a.5.5,0,0,0,.12.64L4.86,11.06a7.49,7.49,0,0,0,0,1.88L2.75,14.59a.5.5,0,0,0-.12.64l2,3.46a.5.5,0,0,0,.6.22l2.49-1a7.3,7.3,0,0,0,1.62.94l.38,2.65a.5.5,0,0,0,.49.42h4.18a.5.5,0,0,0,.49-.42l.38-2.65a7.3,7.3,0,0,0,1.62-.94l2.49,1a.5.5,0,0,0,.6-.22l2-3.46a.5.5,0,0,0-.12-.64Zm-7.14,2.56a3.5,3.5,0,1,1,3.5-3.5A3.5,3.5,0,0,1,12,15.5Z"/>
              </svg>
              Settings
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            {/* Hamburger Menu Button */}
            <button
              id="hamburger-button"
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700/50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <h1 className="text-3xl font-extrabold">Dashboard</h1>
            
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 h-10 rounded-full border border-white/30" />
              <div>
                <p className="text-sm text-gray-300">Welcome,</p>
                <p className="font-bold">{currentUser?.name || 'User'}</p>
              </div>
            </div>
          </header>

        {/* Display error if any */}
        {error && (
          <div className="bg-red-500/20 text-red-100 p-3 rounded-lg mb-6 text-center" role="alert">
            {error}
          </div>
        )}

        {/* Stats Summary */}
        {dashboardStats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Active Robots */}
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl shadow text-center">
              <p className="text-sm text-gray-300">Active Robots</p>
              <p className="text-2xl font-bold text-blue-300">
                {dashboardStats.activeRobots} / {dashboardStats.totalRobots}
              </p>
            </div>
            {/* Trash Collected */}
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl shadow text-center">
              <p className="text-sm text-gray-300">Trash Collected</p>
              <p className="text-2xl font-bold text-green-300">
                {dashboardStats.totalTrashCollected.toFixed(1)} kg
              </p>
            </div>
            {/* Robots in Maintenance */}
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl shadow text-center">
              <p className="text-sm text-gray-300">In Maintenance</p>
              <p className="text-2xl font-bold text-purple-300">
                {dashboardStats.robotsInMaintenance}
              </p>
            </div>
            {/* Average Battery Level */}
            <div className="bg-white/10 backdrop-blur p-5 rounded-xl shadow text-center">
              <p className="text-sm text-gray-300">Avg. Battery</p>
              <p className={`text-2xl font-bold ${getBatteryColor(dashboardStats.averageBatteryLevel)}`}>
                {Math.round(dashboardStats.averageBatteryLevel)}%
              </p>
            </div>
          </div>
        )}

        {/* Map & Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Cleaning Map Panel */}
          <div className="bg-white/10 backdrop-blur p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Live Robot Location</h2>
            {/* Interactive Map */}
            <RobotMap
              robots={robotData}
              sharedRobots={sharedRobotData}
              selectedRobot={selectedRobot}
              onRobotSelect={handleRobotSelection}
              height="300px"
              className="rounded-lg overflow-hidden"
            />
          </div>

          {/* Robot Status Panel */}
          {selectedRobot && (
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Robot Status</h2>
              <ul className="space-y-4">
                {/* Current status */}
                <li className="flex justify-between items-center">
                  <span>Status:</span>
                  <span className={`font-semibold ${getStatusColor(selectedRobot.status)}`}>
                    {formatStatus(selectedRobot.status)}
                  </span>
                </li>
                {/* Battery level */}
                <li className="flex justify-between items-center">
                  <span>Battery Level:</span>
                  <div className="flex items-center">
                    <div className="w-32 h-3 bg-gray-700 rounded-full mr-2 overflow-hidden">
                      <div 
                        className={`h-full ${selectedRobot.batteryLevel > 70 ? 'bg-green-500' : selectedRobot.batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{ width: `${selectedRobot.batteryLevel}%` }}
                      ></div>
                    </div>
                    <span className={`font-semibold ${getBatteryColor(selectedRobot.batteryLevel)}`}>
                      {selectedRobot.batteryLevel}%
                    </span>
                  </div>
                </li>
                {/* Last collection */}
                <li className="flex justify-between items-center">
                  <span>Last Collection:</span>
                  <span className="font-semibold">
                    {formatDate(selectedRobot.lastCollection)}
                  </span>
                </li>
                {/* Trash collected */}
                <li className="flex justify-between items-center">
                  <span>Trash Collected:</span>
                  <span className="font-semibold text-green-300">
                    {selectedRobot.trashCollected.toFixed(1)} kg
                  </span>
                </li>
                {/* Next scheduled */}
                <li className="flex justify-between items-center">
                  <span>Next Scheduled:</span>
                  <span className="font-semibold">
                    {formatDate(selectedRobot.nextScheduled)}
                  </span>
                </li>
              </ul>
              
              {/* Robot control buttons */}
              <div className="mt-6 flex flex-wrap gap-2 justify-end">
                {selectedRobot.status !== 'active' && (
                  <button 
                    onClick={() => sendRobotCommand('start')}
                    disabled={loading || selectedRobot.status === 'maintenance' || (selectedRobot.status === 'charging' && selectedRobot.batteryLevel < 20)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Start
                  </button>
                )}
                
                {selectedRobot.status === 'active' && (
                  <button 
                    onClick={() => sendRobotCommand('stop')}
                    disabled={loading}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
                  >
                    Stop
                  </button>
                )}
                
                {selectedRobot.status !== 'charging' && (
                  <button 
                    onClick={() => sendRobotCommand('charge')}
                    disabled={loading}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                  >
                    Charge
                  </button>
                )}
                
                {selectedRobot.status !== 'maintenance' && (
                  <button 
                    onClick={() => sendRobotCommand('maintenance')}
                    disabled={loading}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50"
                  >
                    Maintenance
                  </button>
                )}
              </div>
            </div>
          )}
          
          {!selectedRobot && (
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl shadow flex items-center justify-center h-64">
              <p className="text-gray-300">Select a robot to view status</p>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
