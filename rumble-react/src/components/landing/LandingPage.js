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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-slate-800/90 backdrop-blur border-b border-slate-600/50 shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide">RUMBLE</h1>
        <div className="space-x-6 text-sm font-semibold">
          <a href="#features" className="hover:text-blue-400 transition">Features</a>
          <a href="#technology" className="hover:text-blue-400 transition">Technology</a>
          <a href="#team" className="hover:text-blue-400 transition">Meet the Team</a>
          {isAuthenticated ? (
            <Link to="/dashboard" className="hover:text-blue-400 transition cursor-pointer bg-blue-600/20 px-3 py-1 rounded-md shadow-sm hover:bg-blue-600/30">Dashboard</Link>
          ) : (
            <Link to="/login" className="hover:text-blue-400 transition cursor-pointer bg-blue-600/20 px-3 py-1 rounded-md shadow-sm hover:bg-blue-600/30">Login</Link>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="flex items-center justify-center text-center px-6 py-20">
        <div className="max-w-4xl">
          <h2 className="text-5xl font-bold mb-6 leading-tight">Autonomous Outdoor Cleanup</h2>
          <p className="text-xl text-gray-300 mb-4 leading-relaxed">
            Meet <span className="text-blue-300 font-bold">RUMBLE</span> — the Outdoor Roomba that's tackling America's litter crisis one piece at a time.
          </p>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            With over <span className="text-red-300 font-semibold">50 billion pieces of litter</span> polluting U.S. waterways and roads, 
            manual cleanup isn't enough. Rumble autonomously navigates parks, sidewalks, and residential areas to detect and collect trash using advanced machine learning.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#features" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold text-lg transition shadow-lg">See How It Works</a>
            {!isAuthenticated && (
              <button 
                onClick={() => navigate('/create-account')} 
                className="bg-slate-700/60 hover:bg-slate-600/80 backdrop-blur px-8 py-3 rounded-full font-semibold text-lg transition shadow-lg border border-slate-500/50"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-800/60 backdrop-blur py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-semibold text-center mb-4">Why <span className="text-blue-300 font-bold">RUMBLE</span>?</h3>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Traditional manual cleanup is inefficient and can't scale to address the massive litter problem. 
            Rumble represents the future of sustainable urban maintenance through autonomous technology.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-slate-700/50 rounded-xl p-6 shadow hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-3 text-blue-300">Smart Litter Detection</h4>
              <p className="text-gray-300">Machine learning models precisely identify cans, bottles, and other lightweight debris while avoiding natural obstacles.</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 shadow hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-3 text-blue-300">Safe Navigation</h4>
              <p className="text-gray-300">Advanced sensors detect pedestrians, vehicles, and structures, ensuring safe operation in busy public spaces.</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 shadow hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-3 text-blue-300">Fully Autonomous</h4>
              <p className="text-gray-300">GPS navigation, automatic charging dock return, and remote server communication—no human intervention required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section id="technology" className="bg-gradient-to-br from-slate-900/80 to-gray-800/60 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl font-semibold mb-8 text-center">Cutting-Edge Technology Stack</h3>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Rumble integrates hardware engineering, embedded systems, machine learning, and systems integration 
            to create a robust outdoor cleanup solution.
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-semibold text-blue-300 mb-6">Hardware & Sensors</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span><strong>Advanced Camera Systems</strong> for real-time litter detection and classification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span><strong>Radar & Proximity Sensors</strong> for obstacle detection and safe navigation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span><strong>GPS Navigation System</strong> for autonomous route planning and positioning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span><strong>Onboard Storage System</strong> for collected trash transportation</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-blue-300 mb-6">Software & AI</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span><strong>Machine Learning Models</strong> for precise litter identification and classification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span><strong>Embedded Control Systems</strong> for real-time decision making and navigation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span><strong>Remote Communication</strong> for data logging and system updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span><strong>Autonomous Charging</strong> with automatic dock return functionality</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-800/60 backdrop-blur py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-semibold text-center mb-12">How Rumble Works</h3>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* System Overview */}
            <div className="space-y-8">
              <div className="bg-slate-700/50 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 text-blue-300">🎯 Detection & Navigation</h4>
                <p className="text-gray-300 mb-4">
                  Rumble uses advanced sensors including cameras, radar, and GPS to safely navigate outdoor environments while detecting obstacles like cars, houses, and people.
                </p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Multi-sensor fusion for reliable object detection</li>
                  <li>• Real-time obstacle avoidance and path planning</li>
                  <li>• Safe operation around pedestrians and vehicles</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 text-blue-300">🗑️ Trash Detection & Collection</h4>
                <p className="text-gray-300 mb-4">
                  Machine learning models identify and classify litter (cans, bottles) for autonomous collection and proper disposal.
                </p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Computer vision for trash classification</li>
                  <li>• Automated pickup and storage mechanisms</li>
                  <li>• Efficient collection path optimization</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 text-blue-300">🔋 Smart Power Management</h4>
                <p className="text-gray-300 mb-4">
                  Autonomous navigation to charging dock when battery runs low, ensuring continuous operation with minimal human intervention.
                </p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Automated return to charging station</li>
                  <li>• Remote server monitoring and control</li>
                  <li>• Extended operational uptime</li>
                </ul>
              </div>
            </div>

            {/* System Diagram */}
            <div className="bg-slate-700/40 rounded-xl p-6 border border-blue-400/30">
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-blue-300">Rumble System Architecture</h4>
                <p className="text-gray-300 text-sm">
                  Integrated sensor array with cameras, radar, and GPS enables autonomous navigation and litter detection
                </p>
              </div>
              
              {/* Actual System Diagram */}
              <div className="bg-white rounded-lg p-4 mb-6">
                <img 
                  src="/rumble-system-diagram.png" 
                  alt="Rumble System Architecture Diagram showing robot with sensors, obstacle detection, trash collection, autonomous navigation, charging dock, and server connectivity"
                  className="w-full h-auto max-w-2xl mx-auto"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              This integrated approach allows Rumble to operate autonomously in complex outdoor environments, 
              making intelligent decisions about navigation, litter collection, and power management.
            </p>
          </div>
        </div>
      </section>

      {/* Impact & Vision */}
      <section className="bg-gradient-to-br from-slate-900/80 to-gray-800/60 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-semibold mb-8">Beyond the Classroom</h3>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Rumble isn't just a class project—it's a vision for the future of urban maintenance and environmental sustainability.
          </p>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="bg-slate-700/50 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4 text-blue-300">Current Focus</h4>
              <p className="text-gray-300 mb-4">
                Our prototype targets lightweight debris like cans and plastic bottles in controlled outdoor environments including:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Parks and recreational areas</li>
                <li>• Sidewalks and pedestrian zones</li>
                <li>• Residential neighborhoods</li>
                <li>• Campus grounds</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4 text-blue-300">Future Vision</h4>
              <p className="text-gray-300 mb-4">
                The long-term goal is to scale Rumble into a fleet of eco-friendly robots that contribute to:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Cleaner, safer communities</li>
                <li>• Reduced environmental impact</li>
                <li>• Sustainable urban cleanup automation</li>
                <li>• Scalable litter management solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section id="team" className="bg-slate-800/60 backdrop-blur py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-semibold text-center mb-4">Meet the Team</h3>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Our diverse team of engineers and developers brings together expertise in hardware design, 
            machine learning, embedded systems, and software development to make Rumble a reality.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {/* Sudipta Haldar */}
            <div className="bg-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-600/60 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
              <div className="mb-4">
                <img 
                  src="/team/Sudipta.jpg" 
                  alt="Sudipta Haldar"
                  className="w-24 h-24 rounded-full mx-auto object-cover object-center scale-110 border-2 border-blue-400/50"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-blue-300 mb-2">Sudipta Haldar</h4>
                  <p className="text-sm text-slate-300 font-semibold mb-1 min-h-[2.5rem] flex items-center justify-center">Simulation Developer</p>
                </div>
                <p className="text-xs text-gray-400">Computer Engineering</p>
              </div>
            </div>

            {/* Mitchell Owen */}
            <div className="bg-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-600/60 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
              <div className="mb-4">
                <img 
                  src="/team/Mitchell.jpg" 
                  alt="Mitchell Owen"
                  className="w-24 h-24 rounded-full mx-auto object-cover object-top scale-110 border-2 border-blue-400/50"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-blue-300 mb-2">Mitchell Owen</h4>
                  <p className="text-sm text-slate-300 font-semibold mb-1 min-h-[2.5rem] flex items-center justify-center">Electrical Engineer, Tester</p>
                </div>
                <p className="text-xs text-gray-400">Electrical Engineering</p>
              </div>
            </div>

            {/* Brodie Bates */}
            <div className="bg-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-600/60 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
              <div className="mb-4">
                <img 
                  src="/team/Brodie.png" 
                  alt="Brodie Bates"
                  className="w-24 h-24 rounded-full mx-auto object-cover object-center scale-110 border-2 border-blue-400/50"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-blue-300 mb-2">Brodie Bates</h4>
                  <p className="text-sm text-slate-300 font-semibold mb-1 min-h-[2.5rem] flex items-center justify-center">Embedded Engineer, Designer</p>
                </div>
                <p className="text-xs text-gray-400">Computer Engineering</p>
              </div>
            </div>

            {/* Om Shukla */}
            <div className="bg-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-600/60 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
              <div className="mb-4">
                <img 
                  src="/team/Om.jpg" 
                  alt="Om Shukla"
                  className="w-24 h-24 rounded-full mx-auto object-cover object-center scale-110 border-2 border-blue-400/50"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-blue-300 mb-2">Om Shukla</h4>
                  <p className="text-sm text-slate-300 font-semibold mb-1 min-h-[2.5rem] flex items-center justify-center">Front-end Developer</p>
                </div>
                <p className="text-xs text-gray-400">Software Engineering</p>
              </div>
            </div>

            {/* Daniel Vergara Pinilla */}
            <div className="bg-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-600/60 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
              <div className="mb-4">
                <img 
                  src="/team/Daniel.jpg" 
                  alt="Daniel Vergara Pinilla"
                  className="w-24 h-24 rounded-full mx-auto object-cover scale-110 border-2 border-blue-400/50"
                  style={{ objectPosition: '50% 0%' }}
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-blue-300 mb-2">Daniel Vergara Pinilla</h4>
                  <p className="text-sm text-slate-300 font-semibold mb-1 min-h-[2.5rem] flex items-center justify-center">Machine Learning Engineer</p>
                </div>
                <p className="text-xs text-gray-400">Computer Engineering</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Together, we're building the future of autonomous environmental cleanup technology, 
              one innovation at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-slate-800/60 backdrop-blur py-6 text-center text-gray-300 border-t border-slate-600/30">
        <p className="text-sm mb-2">
          &copy; 2025 <span className="text-blue-300 font-bold">RUMBLE</span> Project | Iowa State University CPRE 4910
        </p>
        <p className="text-xs text-gray-400">
          Outdoor Roomba - Autonomous Litter Collection System | Team SDDEC25-16
        </p>
        {/* Debug section - remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 border-t border-slate-600/30 pt-4">
            <p className="text-xs text-gray-400 mb-2">Debug Tools:</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleClearAuth}
                className="text-xs bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded text-red-300"
              >
                Clear Auth State
              </button>
              <span className="text-xs">Auth Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default LandingPage;
