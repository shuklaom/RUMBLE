import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, clearAuth } = useAuth();
  const navigate = useNavigate();

  const handleClearAuth = () => {
    clearAuth();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center animate-pulse-glow">
                <span className="text-slate-900 font-black text-xl">R</span>
              </div>
              <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                RUMBLE
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#features" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#technology" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 relative group">
                Technology
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#team" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 relative group">
                Team
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-200 group-hover:w-full"></span>
              </a>
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 hover:border-emerald-400 px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-slate-300 hover:text-emerald-400 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Completely Redesigned */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse delay-500"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm font-medium">Autonomous Environmental Technology</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              RUMBLE
            </span>
            <span className="block text-2xl md:text-4xl lg:text-5xl font-bold text-slate-300 mt-4">
              Autonomous Outdoor Cleanup
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-4xl mx-auto leading-relaxed">
            The future of environmental sustainability meets cutting-edge robotics. 
            <span className="text-emerald-400 font-semibold"> RUMBLE</span> autonomously tackles America's 
            <span className="text-red-400 font-semibold"> 50 billion piece litter crisis</span> 
            using advanced machine learning and navigation systems.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6">
              <div className="text-3xl font-black text-red-400 mb-2">50B+</div>
              <div className="text-slate-300 text-sm">Pieces of litter polluting US waterways annually</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6">
              <div className="text-3xl font-black text-emerald-400 mb-2">100%</div>
              <div className="text-slate-300 text-sm">Autonomous operation with ML-powered detection</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6">
              <div className="text-3xl font-black text-cyan-400 mb-2">24/7</div>
              <div className="text-slate-300 text-sm">Continuous cleanup with auto-charging capability</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#features" 
              className="group bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/50 flex items-center space-x-2"
            >
              <span>Discover How It Works</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            {!isAuthenticated && (
              <button 
                onClick={() => navigate('/create-account')} 
                className="bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 hover:border-emerald-400 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </section>
      {/* Enhanced Features Section */}
      <section id="features" className="relative py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">Core Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Why <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">RUMBLE</span>?
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Revolutionary autonomous technology that scales environmental cleanup beyond human limitations, 
              making sustainable cities a reality through intelligent robotics.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                  Smart Litter Detection
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Advanced machine learning models precisely identify and classify cans, bottles, and debris while 
                  intelligently avoiding natural obstacles and maintaining safe operation protocols.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  Safe Navigation
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Multi-sensor fusion technology detects pedestrians, vehicles, and structures in real-time, 
                  ensuring completely safe autonomous operation in busy public spaces and residential areas.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  Fully Autonomous
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Complete independence with GPS navigation, automatic charging dock return, and remote server 
                  communication—delivering 24/7 cleanup capability with zero human intervention required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack - Redesigned */}
      <section id="technology" className="relative py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">Technology</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Cutting-Edge <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Tech Stack</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Where advanced hardware engineering meets sophisticated AI algorithms to create 
              the most capable autonomous outdoor cleanup system ever developed.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Hardware Section */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-emerald-400">Hardware & Sensors</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Advanced Camera Systems</h4>
                    <p className="text-slate-400 text-sm">High-resolution imaging for real-time litter detection and precise classification algorithms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Radar & Proximity Sensors</h4>
                    <p className="text-slate-400 text-sm">Multi-directional obstacle detection ensuring safe navigation around people and vehicles</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">GPS Navigation System</h4>
                    <p className="text-slate-400 text-sm">Precision positioning and autonomous route planning for comprehensive area coverage</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Onboard Storage System</h4>
                    <p className="text-slate-400 text-sm">Efficient collection and storage mechanisms for various types of lightweight debris</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Software Section */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-400">Software & AI</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Machine Learning Models</h4>
                    <p className="text-slate-400 text-sm">Deep learning algorithms for precise litter identification and environmental understanding</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Embedded Control Systems</h4>
                    <p className="text-slate-400 text-sm">Real-time decision making and autonomous navigation with microsecond response times</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Remote Communication</h4>
                    <p className="text-slate-400 text-sm">Secure data logging, system monitoring, and over-the-air updates for continuous improvement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Autonomous Charging</h4>
                    <p className="text-slate-400 text-sm">Smart power management with automatic dock return and wireless charging capabilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Completely Redesigned */}
      <section className="relative py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">System Overview</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              How <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">RUMBLE</span> Works
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Advanced autonomous systems work in perfect harmony to deliver unprecedented 
              environmental cleanup capabilities through intelligent robotics.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Process Steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-emerald-400 mb-3 flex items-center">
                      🎯 Detection & Navigation
                    </h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      Multi-sensor fusion technology combines cameras, radar, and GPS to create a comprehensive 
                      understanding of the environment, detecting obstacles and navigation hazards in real-time.
                    </p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                        <span>360° obstacle detection and avoidance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                        <span>Real-time path planning and optimization</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                        <span>Safe operation around people and vehicles</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center">
                      🗑️ Smart Litter Recognition
                    </h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      Advanced machine learning models analyze visual data to identify and classify different 
                      types of litter while distinguishing between collectible debris and natural objects.
                    </p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        <span>Computer vision for precise object classification</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        <span>Automated pickup and storage mechanisms</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        <span>Efficient collection route optimization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center">
                      🔋 Autonomous Power Management
                    </h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      Intelligent power monitoring ensures continuous operation through automatic charging dock 
                      navigation and wireless power transfer for extended autonomous missions.
                    </p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>Automatic return to charging station</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>Remote server monitoring and control</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>Extended operational uptime (24/7 capable)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Diagram */}
            <div className="sticky top-8">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                    RUMBLE System Architecture
                  </h3>
                  <p className="text-slate-400">
                    Integrated sensor array enabling autonomous navigation and intelligent litter detection
                  </p>
                </div>
                
                {/* System Diagram Image */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-2xl">
                  <img 
                    src="/rumble-system-diagram.png" 
                    alt="RUMBLE System Architecture showing robot with integrated sensors, obstacle detection, autonomous navigation, litter collection, charging dock, and server connectivity"
                    className="w-full h-auto max-w-2xl mx-auto"
                  />
                </div>

                {/* System Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">100%</div>
                    <div className="text-xs text-slate-400">Autonomous Operation</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">24/7</div>
                    <div className="text-xs text-slate-400">Continuous Cleanup</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="mt-16 text-center">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Integrated Intelligence</h3>
              <p className="text-lg text-slate-400 leading-relaxed">
                This comprehensive approach enables RUMBLE to operate autonomously in complex outdoor environments, 
                making real-time intelligent decisions about navigation, litter collection, and power management 
                while ensuring complete safety and operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Vision - Enhanced */}
      <section className="relative py-24 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <span className="text-rose-400 text-sm font-medium uppercase tracking-wider">Impact & Vision</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Beyond the <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">Classroom</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              RUMBLE represents more than academic achievement—it's a transformative vision for 
              sustainable urban infrastructure and environmental stewardship through autonomous innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Current Focus */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-emerald-400">Current Development Focus</h3>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Our prototype specifically targets lightweight debris collection in controlled outdoor environments, 
                establishing the foundation for scalable autonomous cleanup technology.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-300">Parks and recreational facilities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-300">Sidewalks and pedestrian walkways</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-300">Residential neighborhoods</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-300">University campus grounds</span>
                </div>
              </div>
            </div>

            {/* Future Vision */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8 hover:border-rose-500/30 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-rose-400">Future Vision & Impact</h3>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                The ultimate goal extends far beyond prototype development—envisioning fleets of autonomous 
                cleanup robots transforming urban environmental management worldwide.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-rose-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-300">Cleaner, safer communities worldwide</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-rose-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-300">Dramatic reduction in environmental pollution</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-rose-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-300">Scalable autonomous urban maintenance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-rose-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-300">Sustainable smart city infrastructure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="mt-16 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-center text-white mb-8">Projected Environmental Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-black text-emerald-400 mb-2">85%</div>
                <div className="text-slate-300 font-medium">Reduction in manual cleanup costs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-cyan-400 mb-2">24/7</div>
                <div className="text-slate-300 font-medium">Continuous environmental monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-rose-400 mb-2">100K+</div>
                <div className="text-slate-300 font-medium">Pieces of litter per robot annually</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team - Completely Redesigned */}
      <section id="team" className="relative py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">Engineering Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Meet the <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Innovators</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A diverse team of passionate engineers and developers combining expertise across 
              hardware design, machine learning, embedded systems, and software development to revolutionize environmental cleanup.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {/* Sudipta Haldar */}
            <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-6 text-center hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-4 border-slate-600 group-hover:border-emerald-400 transition-colors duration-300">
                  <img 
                    src="/team/Sudipta.jpg" 
                    alt="Sudipta Haldar - Simulation Developer"
                    className="w-full h-full object-cover object-center scale-110 group-hover:scale-125 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                  Sudipta Haldar
                </h3>
                <div className="space-y-2">
                  <p className="text-emerald-400 font-semibold text-sm">Simulation Developer</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">Computer Engineering</p>
                </div>
              </div>
            </div>

            {/* Mitchell Owen */}
            <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-4 border-slate-600 group-hover:border-cyan-400 transition-colors duration-300">
                  <img 
                    src="/team/Mitchell.jpg" 
                    alt="Mitchell Owen - Electrical Engineer"
                    className="w-full h-full object-cover object-top scale-110 group-hover:scale-125 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                  Mitchell Owen
                </h3>
                <div className="space-y-2">
                  <p className="text-cyan-400 font-semibold text-sm">Electrical Engineer</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">Electrical Engineering</p>
                </div>
              </div>
            </div>

            {/* Brodie Bates */}
            <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-6 text-center hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-4 border-slate-600 group-hover:border-blue-400 transition-colors duration-300">
                  <img 
                    src="/team/Brodie.png" 
                    alt="Brodie Bates - Embedded Engineer"
                    className="w-full h-full object-cover object-center scale-110 group-hover:scale-125 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  Brodie Bates
                </h3>
                <div className="space-y-2">
                  <p className="text-blue-400 font-semibold text-sm">Embedded Engineer</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">Computer Engineering</p>
                </div>
              </div>
            </div>

            {/* Om Shukla */}
            <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-4 border-slate-600 group-hover:border-purple-400 transition-colors duration-300">
                  <img 
                    src="/team/Om.jpg" 
                    alt="Om Shukla - Front-end Developer"
                    className="w-full h-full object-cover object-center scale-110 group-hover:scale-125 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                  Om Shukla
                </h3>
                <div className="space-y-2">
                  <p className="text-purple-400 font-semibold text-sm">Front-end Developer</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">Software Engineering</p>
                </div>
              </div>
            </div>

            {/* Daniel Vergara Pinilla */}
            <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-6 text-center hover:border-rose-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-4 border-slate-600 group-hover:border-rose-400 transition-colors duration-300">
                  <img 
                    src="/team/Daniel.jpg" 
                    alt="Daniel Vergara Pinilla - Machine Learning Engineer"
                    className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-300"
                    style={{ objectPosition: '50% 0%' }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors duration-300">
                  Daniel Vergara
                </h3>
                <div className="space-y-2">
                  <p className="text-rose-400 font-semibold text-sm">ML Engineer</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">Computer Engineering</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Summary */}
          <div className="mt-16">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Collaborative Innovation</h3>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                United by a shared vision of environmental sustainability and cutting-edge technology, 
                our multidisciplinary team combines diverse expertise to tackle one of society's most pressing challenges. 
                Together, we're not just building robots—we're engineering the future of autonomous environmental stewardship.
              </p>
              
              {/* Team Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">5</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Team Members</div>
                </div>
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">4</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Disciplines</div>
                </div>
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-400 mb-1">2</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Semesters</div>
                </div>
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-400 mb-1">1</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Vision</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer id="footer" className="relative bg-slate-950 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center animate-pulse-glow">
                  <span className="text-slate-900 font-black text-xl">R</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    RUMBLE
                  </h3>
                  <p className="text-slate-500 text-sm">Autonomous Environmental Solutions</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Revolutionizing environmental cleanup through autonomous robotics and intelligent systems.
              </p>
            </div>

            {/* Project Info */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg">Project Details</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>Iowa State University</p>
                <p>CPRE 4910 - Senior Design</p>
                <p>Team SDDEC25-16</p>
                <p>Spring 2025</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg">Quick Navigation</h4>
              <div className="space-y-2">
                <a href="#features" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Features</a>
                <a href="#technology" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Technology</a>
                <a href="#team" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Meet the Team</a>
                {isAuthenticated && (
                  <Link to="/dashboard" className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm">Dashboard</Link>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-800/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-slate-400 text-sm">
                  &copy; 2025 <span className="text-emerald-400 font-bold">RUMBLE</span> Project. 
                  Outdoor Roomba - Autonomous Litter Collection System.
                </p>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-xs text-slate-500">
                  Built with React & Tailwind CSS
                </div>
              </div>
            </div>
          </div>

          {/* Debug Section - Development Only */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 border-t border-slate-800/50 pt-8">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6">
                <h4 className="text-slate-300 font-bold mb-4 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>Development Debug Tools</span>
                </h4>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={handleClearAuth}
                      className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-400 px-4 py-2 rounded-xl text-red-300 hover:text-red-200 transition-all duration-200 text-sm font-medium"
                    >
                      Clear Auth State
                    </button>
                    <div className="text-sm text-slate-400">
                      Auth Status: 
                      <span className={`ml-2 px-2 py-1 rounded-lg text-xs font-medium ${
                        isAuthenticated 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
