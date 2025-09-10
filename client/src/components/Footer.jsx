import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative w-full bg-black text-gray-300 pt-20 pb-12 px-6 overflow-hidden">
      {/* Glow from previous section */}

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + tagline */}
        <div>
          <h2 className="text-xl font-bold text-white">Neuronest</h2>
          <p className="mt-3 text-sm text-gray-400">
            Learn. Build. Shine brighter every day.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
            <li><Link to="/community" className="hover:text-white">Community</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter for the latest courses and updates.
          </p>
          <form className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-md bg-gray-900 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-400 text-black rounded-md text-sm font-medium hover:bg-cyan-300 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500 relative z-10">
        © {new Date().getFullYear()} <span className="">NeuroNest</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
