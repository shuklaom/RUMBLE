import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { robotService } from '../../services/apiMock';

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [robotData, setRobotData] = useState([]);
  const [selectedRobotId, setSelectedRobotId] = useState('');
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { currentUser, token, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch robots and dashboard stats when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all robots
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

  // Handle robot selection change
  const handleRobotChange = async (e) => {
    const robotId = e.target.value;
    setSelectedRobotId(robotId);
    
    try {
      const robot = await robotService.getRobotById(robotId, token);
      setSelectedRobot(robot);
    } catch (err) {
      console.error('Error fetching robot details:', err);
      setError('Failed to load robot details.');
    }
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((e) => {
    if (isDropdownOpen && !e.target.closest('#userProfile')) {
      setIsDropdownOpen(false);
    }
  }, [isDropdownOpen]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          {/* RUMBLE Robot Selector Dropdown */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <select 
              className="appearance-none w-52 bg-gray-800/90 backdrop-blur border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-xl focus:outline-none transition duration-200 ease-out"
              value={selectedRobotId}
              onChange={handleRobotChange}
            >
              {robotData.map(robot => (
                <option key={robot.id} value={robot.id}>
                  {robot.name}
                </option>
              ))}
            </select>
          </div>
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <div id="userProfile" className="relative">
            {/* User Profile Preview and Click Dropdown */}
            <div onClick={toggleDropdown} className="flex items-center space-x-4 cursor-pointer">
              <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 h-10 rounded-full border border-white/30" />
              <div>
                <p className="text-sm text-gray-300">Welcome,</p>
                <p className="font-bold">{currentUser?.name || 'User'}</p>
              </div>
            </div>
            {/* Dropdown Menu */}
            <div 
              className={`absolute right-0 mt-2 w-52 z-50 bg-gray-800/90 backdrop-blur border border-white/20 text-white rounded-md shadow-xl py-2 ${isDropdownOpen ? '' : 'hidden'} transition duration-200 ease-out`}
            >
              {/* Settings Option */}
              <a href="#settings" className="block px-4 py-2 hover:bg-white/20 flex items-center gap-2">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94a7.49,7.49,0,0,0,.05-.94,7.49,7.49,0,0,0-.05-.94l2.11-1.65a.5.5,0,0,0,.12-.64l-2-3.46a.5.5,0,0,0-.6-.22l-2.49,1a7.3,7.3,0,0,0-1.62-.94l-.38-2.65a.5.5,0,0,0-.49-.42H9.91a.5.5,0,0,0-.49.42l-.38,2.65a7.3,7.3,0,0,0-1.62.94l-2.49-1a.5.5,0,0,0-.6.22l-2,3.46a.5.5,0,0,0,.12.64L4.86,11.06a7.49,7.49,0,0,0,0,1.88L2.75,14.59a.5.5,0,0,0-.12.64l2,3.46a.5.5,0,0,0,.6.22l2.49-1a7.3,7.3,0,0,0,1.62.94l.38,2.65a.5.5,0,0,0,.49.42h4.18a.5.5,0,0,0,.49-.42l.38-2.65a7.3,7.3,0,0,0,1.62-.94l2.49,1a.5.5,0,0,0,.6-.22l2-3.46a.5.5,0,0,0-.12-.64Zm-7.14,2.56a3.5,3.5,0,1,1,3.5-3.5A3.5,3.5,0,0,1,12,15.5Z"/></svg>
                Settings
              </a>
              {/* Logout Option */}
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-400 hover:bg-white/20 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"></path></svg>
                Logout
              </button>
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
            {/* Placeholder for future map integration */}
            <div className="h-64 bg-black/20 rounded-xl flex items-center justify-center">
              {selectedRobot && (
                <div className="text-center">
                  <div className="text-gray-300 mb-2">{selectedRobot.name}</div>
                  <div className="text-sm text-gray-400">
                    Lat: {selectedRobot.location.lat.toFixed(6)}<br />
                    Lng: {selectedRobot.location.lng.toFixed(6)}
                  </div>
                </div>
              )}
              {!selectedRobot && (
                <span className="text-gray-300">Select a robot to view location</span>
              )}
            </div>
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
  );
};

export default Dashboard;
