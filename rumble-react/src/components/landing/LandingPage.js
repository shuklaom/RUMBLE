import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './LandingPage.css';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur border-b border-white/20 shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide">RUMBLE</h1>
        <div className="space-x-6 text-sm font-semibold">
          <a href="#features" className="hover:text-green-400 transition">Features</a>
          <a href="#technology" className="hover:text-green-400 transition">Technology</a>
          <a href="#team" className="hover:text-green-400 transition">Meet the Team</a>
          {isAuthenticated ? (
            <Link to="/dashboard" className="hover:text-green-400 transition cursor-pointer bg-green-500/20 px-3 py-1 rounded-md shadow-sm hover:bg-green-500/30">Dashboard</Link>
          ) : (
            <Link to="/login" className="hover:text-green-400 transition cursor-pointer bg-green-500/20 px-3 py-1 rounded-md shadow-sm hover:bg-green-500/30">Login</Link>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="flex items-center justify-center text-center px-6 py-20">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-6 leading-tight">Clean Cities, Smarter Streets</h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Meet <span className="text-green-300 font-bold">RUMBLE</span> — the autonomous trash collection robot engineered for parks, campuses, and urban spaces. Powered by AI, computer vision, and intelligent routing.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#features" className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full font-semibold text-lg transition shadow-lg">Explore Features</a>
            {!isAuthenticated && (
              <button 
                onClick={() => navigate('/create-account')} 
                className="bg-white/10 hover:bg-white/20 backdrop-blur px-8 py-3 rounded-full font-semibold text-lg transition shadow-lg"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white/10 backdrop-blur py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-semibold text-center mb-12">What Makes <span className="text-green-300 font-bold">RUMBLE</span> Unique?</h3>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white/10 rounded-xl p-6 shadow hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-3 text-green-300">Autonomous Navigation</h4>
              <p className="text-gray-300">GPS, LIDAR, and obstacle detection enable hands-free operation across complex outdoor environments.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-3 text-green-300">Smart Trash Detection</h4>
              <p className="text-gray-300">AI-powered vision classifies and collects trash while avoiding natural obstacles like plants or animals.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-3 text-green-300">Eco-Conscious Design</h4>
              <p className="text-gray-300">Low-energy operation and a durable, rechargeable system built for year-round deployment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section id="technology" className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl font-semibold mb-8">The Tech Behind <span className="text-green-300 font-bold">RUMBLE</span></h3>
          <div className="grid sm:grid-cols-2 gap-8 text-left text-gray-300">
            <ul className="space-y-3 list-disc list-inside">
              <li><span className="text-green-400 font-semibold">Raspberry Pi 4</span> controller for real-time edge processing</li>
              <li><span className="text-green-400 font-semibold">Dual camera vision</span> system for optimal coverage</li>
            </ul>
            <ul className="space-y-3 list-disc list-inside">
              <li><span className="text-green-400 font-semibold">360° LIDAR</span> for navigation and collision avoidance</li>
              <li><span className="text-green-400 font-semibold">Metal frame</span> engineered for outdoor ruggedness and reliability</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-white/10 backdrop-blur py-6 text-center text-gray-300 border-t border-white/10">
        <p className="text-sm">&copy; 2025 <span className="text-green-300 font-bold">RUMBLE</span> Project. Team SDDEC25-16.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
