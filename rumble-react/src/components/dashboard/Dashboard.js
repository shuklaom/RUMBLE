import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { robotService } from '../../services/apiMock';
import RobotMap from '../maps/RobotMap';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [robotData, setRobotData] = useState([]);
  const [selectedRobotId, setSelectedRobotId] = useState('');
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { currentUser, token, logout } = useAuth();
  const navigate = useNavigate();

  // Load dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch robots owned by user
        const robots = await robotService.getAllRobots(token);
        setRobotData(robots);
        
        // Set the first robot as selected by default
        if (robots.length > 0 && !selectedRobotId) {
          setSelectedRobotId(robots[0].id);
          setSelectedRobot(robots[0]);
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
      // Fetch the robot details
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
      
      if (result.success) {
        // Refresh the selected robot data
        const updatedRobot = await robotService.getRobotById(selectedRobotId, token);
        setSelectedRobot(updatedRobot);
        
        // Refresh the robots list
        const robots = await robotService.getAllRobots(token);
        setRobotData(robots);
        
        // Refresh dashboard stats
        const stats = await robotService.getDashboardStats(token);
        setDashboardStats(stats);
      } else {
        setError(`Failed to ${command} robot: ${result.message}`);
      }
    } catch (err) {
      console.error(`Error sending ${command} command:`, err);
      setError(`Failed to ${command} robot. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
      case 'idle': return 'text-slate-300';
      default: return 'text-slate-400';
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return 'N/A';
    
    // Convert string to Date object if necessary
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) return 'Invalid Date';
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  };

  if (loading && !dashboardStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading RUMBLE Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-80 bg-slate-800/40 backdrop-blur-xl border-r border-slate-700/50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* My Robots Section */}
          <div className="flex items-center justify-between p-6 border-b border-slate-600/50">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <h2 className="text-xl font-bold text-white">My Robots</h2>
            </div>
            <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">
              {robotData.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {robotData.map(robot => (
                <button
                  key={robot.id}
                  onClick={() => handleRobotSelection(robot.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    selectedRobotId === robot.id
                      ? 'bg-cyan-500/20 border-2 border-cyan-400/50 shadow-lg backdrop-blur-sm'
                      : 'bg-slate-700/30 border-2 border-transparent hover:bg-slate-700/50 hover:border-slate-600/50 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        robot.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                        robot.status === 'charging' ? 'bg-yellow-500/20 text-yellow-400' :
                        robot.status === 'maintenance' ? 'bg-red-500/20 text-red-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{robot.name}</h3>
                        <p className={`text-sm ${getStatusColor(robot.status)}`}>
                          {formatStatus(robot.status)}
                        </p>
                      </div>
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
          </div>

          <div className="border-t border-slate-600/50 p-4 space-y-2">
            {/* Settings Item */}
            <button className="w-full flex items-center gap-3 p-3 text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">Settings</span>
            </button>
            
            {/* Logout Item */}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 relative z-10">
        <div className="max-w-7xl mx-auto p-6">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md text-slate-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center animate-pulse-glow">
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

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

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

          {/* Map & Robot Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Live Cleaning Map Panel */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-white">Live Robot Location</h2>
              <RobotMap
                robots={robotData}
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
                  <li className="flex justify-between items-center">
                    <span className="text-slate-400">Status:</span>
                    <span className={`font-semibold ${getStatusColor(selectedRobot.status)}`}>
                      {formatStatus(selectedRobot.status)}
                    </span>
                  </li>
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
                  <li className="flex justify-between items-center">
                    <span className="text-slate-400">Last Collection:</span>
                    <span className="font-semibold text-white">
                      {formatDate(selectedRobot.lastCollection)}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-400">Trash Collected:</span>
                    <span className="font-semibold text-emerald-400">
                      {selectedRobot.trashCollected.toFixed(1)} kg
                    </span>
                  </li>
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

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;