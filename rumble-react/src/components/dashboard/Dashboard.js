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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-2xl animate-spin-slow"></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center text-white">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg">Loading RUMBLE Dashboard...</p>
            <p className="text-slate-500 text-sm mt-2">Connecting to your robots</p>
          </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-2xl animate-spin-slow"></div>
      </div>

      {/* Sidebar */}
      <div 
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-80 bg-slate-800/40 backdrop-blur-xl border-r border-slate-700/50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-600/50">
            <h2 className="text-xl font-bold text-white">My Robots</h2>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/50 transition duration-200"
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
                      ? 'bg-emerald-500/20 border-2 border-emerald-400/50 shadow-lg backdrop-blur-sm'
                      : 'bg-slate-700/30 border-2 border-transparent hover:bg-slate-700/50 hover:border-slate-600/50 backdrop-blur-sm'
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
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Shared with Me</h3>
                </div>
                {sharedRobotData.map(robot => (
                  <button
                    key={robot.id}
                    onClick={() => handleRobotSelection(robot.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 relative ${
                      selectedRobotId === robot.id
                        ? 'bg-cyan-500/20 border-2 border-cyan-400/50 shadow-lg backdrop-blur-sm'
                        : 'bg-slate-700/30 border-2 border-transparent hover:bg-slate-700/50 hover:border-slate-600/50 backdrop-blur-sm'
                    }`}
                  >
                    {/* Shared indicator badge */}
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center gap-1 bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded-full">
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
                        <p className="text-xs text-slate-500 mt-1">
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
          <div className="border-t border-slate-600/50 p-4 space-y-2">
            <button className="w-full flex items-center gap-3 p-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14,12.94a7.49,7.49,0,0,0,.05-.94,7.49,7.49,0,0,0-.05-.94l2.11-1.65a.5.5,0,0,0,.12-.64l-2-3.46a.5.5,0,0,0-.6-.22l-2.49,1a7.3,7.3,0,0,0-1.62-.94l-.38-2.65a.5.5,0,0,0-.49-.42H9.91a.5.5,0,0,0-.49.42l-.38,2.65a7.3,7.3,0,0,0-1.62.94l-2.49-1a.5.5,0,0,0-.6.22l-2,3.46a.5.5,0,0,0,.12.64L4.86,11.06a7.49,7.49,0,0,0,0,1.88L2.75,14.59a.5.5,0,0,0-.12.64l2,3.46a.5.5,0,0,0,.6.22l2.49-1a7.3,7.3,0,0,0,1.62.94l.38,2.65a.5.5,0,0,0,.49.42h4.18a.5.5,0,0,0,.49-.42l.38-2.65a7.3,7.3,0,0,0,1.62-.94l2.49,1a.5.5,0,0,0,.6-.22l2-3.46a.5.5,0,0,0-.12-.64Zm-7.14,2.56a3.5,3.5,0,1,1,3.5-3.5A3.5,3.5,0,0,1,12,15.5Z"/>
              </svg>
              Settings
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
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
      <div className="flex-1 lg:ml-0 relative z-10">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            {/* Left Section - Logo and Navigation */}
            <div className="flex items-center space-x-6">
              {/* Hamburger Menu Button */}
              <button
                id="hamburger-button"
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/50 transition duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* RUMBLE Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-slate-900 font-black text-xl">R</span>
                </div>
                <div>
                  <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    RUMBLE
                  </h1>
                  <p className="text-xs text-slate-400">Dashboard</p>
                </div>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">
                  {(currentUser?.name || 'User').charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-400">Welcome,</p>
                <p className="font-bold text-white">{currentUser?.name || 'User'}</p>
              </div>
            </div>
          </header>

        {/* Display error if any */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl mb-6 text-center backdrop-blur-sm" role="alert">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        {dashboardStats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Active Robots */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-xl shadow-lg text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-2">Active Robots</p>
              <p className="text-2xl font-bold text-emerald-400">
                {dashboardStats.activeRobots} / {dashboardStats.totalRobots}
              </p>
            </div>
            {/* Trash Collected */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-xl shadow-lg text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-2">Trash Collected</p>
              <p className="text-2xl font-bold text-cyan-400">
                {dashboardStats.totalTrashCollected.toFixed(1)} kg
              </p>
            </div>
            {/* Robots in Maintenance */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-xl shadow-lg text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-2">In Maintenance</p>
              <p className="text-2xl font-bold text-yellow-400">
                {dashboardStats.robotsInMaintenance}
              </p>
            </div>
            {/* Average Battery Level */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-xl shadow-lg text-center">
              <div className="flex items-center justify-center mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  dashboardStats.averageBatteryLevel > 70 ? 'bg-green-500/20' : 
                  dashboardStats.averageBatteryLevel > 30 ? 'bg-yellow-500/20' : 'bg-red-500/20'
                }`}>
                  <svg className={`w-6 h-6 ${getBatteryColor(dashboardStats.averageBatteryLevel)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-2">Avg. Battery</p>
              <p className={`text-2xl font-bold ${getBatteryColor(dashboardStats.averageBatteryLevel)}`}>
                {Math.round(dashboardStats.averageBatteryLevel)}%
              </p>
            </div>
          </div>
        )}

        {/* Map & Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Cleaning Map Panel */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Live Robot Location</h2>
            {/* Interactive Map */}
            <RobotMap
              robots={robotData}
              sharedRobots={sharedRobotData}
              selectedRobot={selectedRobot}
              onRobotSelect={handleRobotSelection}
              height="300px"
              className="rounded-lg overflow-hidden border border-slate-600/50"
            />
          </div>

          {/* Robot Status Panel */}
          {selectedRobot && (
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">Robot Status</h2>
              <ul className="space-y-4">
                {/* Current status */}
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Status:</span>
                  <span className={`font-semibold ${getStatusColor(selectedRobot.status)}`}>
                    {formatStatus(selectedRobot.status)}
                  </span>
                </li>
                {/* Battery level */}
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Battery Level:</span>
                  <div className="flex items-center">
                    <div className="w-32 h-3 bg-slate-700 rounded-full mr-2 overflow-hidden">
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
                  <span className="text-slate-400">Last Collection:</span>
                  <span className="font-semibold text-white">
                    {formatDate(selectedRobot.lastCollection)}
                  </span>
                </li>
                {/* Trash collected */}
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Trash Collected:</span>
                  <span className="font-semibold text-emerald-400">
                    {selectedRobot.trashCollected.toFixed(1)} kg
                  </span>
                </li>
                {/* Next scheduled */}
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Next Scheduled:</span>
                  <span className="font-semibold text-white">
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
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Start
                  </button>
                )}
                
                {selectedRobot.status === 'active' && (
                  <button 
                    onClick={() => sendRobotCommand('stop')}
                    disabled={loading}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50"
                  >
                    Stop
                  </button>
                )}
                
                {selectedRobot.status !== 'charging' && (
                  <button 
                    onClick={() => sendRobotCommand('charge')}
                    disabled={loading}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50"
                  >
                    Charge
                  </button>
                )}
                
                {selectedRobot.status !== 'maintenance' && (
                  <button 
                    onClick={() => sendRobotCommand('maintenance')}
                    disabled={loading}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50"
                  >
                    Maintenance
                  </button>
                )}
              </div>
            </div>
          )}
          
          {!selectedRobot && (
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-xl shadow-lg flex items-center justify-center h-64">
              <p className="text-slate-400">Select a robot to view status</p>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
