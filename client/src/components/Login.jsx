import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// A simple SVG for Google's icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.81C34.553 5.822 29.472 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691c2.242-4.133 6.517-7.097 11.45-7.097c2.98 0 5.705.99 7.961 2.659L29.1 4.79C25.594 1.838 21.012 0 16 0C9.402 0 3.803 4.162 1.144 10.133L6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 48c5.166 0 9.86-1.977 13.409-5.192l-5.464-4.409c-2.09 1.625-4.791 2.6-7.945 2.6c-5.485 0-10.12-3.512-11.666-8.375l-5.52 4.459C6.417 41.77 14.616 48 24 48z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.81C34.553 5.822 29.472 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);


export default function LoginSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // --- Login Logic ---
    // Here, you would typically validate the inputs and send them to your
    // backend API for authentication.
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    console.log("Logging in with:", { email, password });
    alert(`Welcome back! (Simulated login for ${email})`);
  };


  const handleGoogleLogin = () => {
    // In a real application, you would use a library like Firebase Auth
    // or Google Identity Services to handle the OAuth flow.
    // This is a simple simulation that opens the Google login page.
    window.open('https://accounts.google.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 flex items-center justify-center font-sans p-4 translate-y-[4vh]">
      <div className="relative group w-full max-w-6xl  transition-transform duration-300">
        {/* Gradient border that appears on hover */}
        <div 
          className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-6xl flex rounded-2xl overflow-hidden shadow-lg shadow-cyan-500/10 border border-zinc-800">
          
          {/* Left Column: Branding & Welcome Message */}
          <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-zinc-900 p-12 text-center relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-20 blur-2xl"></div>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
            <p className="text-gray-400 max-w-sm">
              Continue your learning journey with us. Log in to access your courses, track your progress, and connect with our community.
            </p>
            <div className="mt-8 text-cyan-400">
                <BookOpen size={64} className="mx-auto" />
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="w-full lg:w-1/2 bg-black p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-white mb-2">Log In</h2>
            <p className="text-gray-400 mb-8">Enter your credentials to continue.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <div className="flex justify-end">
                <a href="#" className="text-sm text-cyan-400 hover:underline">Forgot Password?</a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-cyan-500 text-black font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105"
              >
                Log In <ArrowRight size={20} />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <hr className="w-full border-zinc-700" />
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <hr className="w-full border-zinc-700" />
            </div>

            {/* Social Logins */}
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-zinc-900 border border-zinc-700 text-gray-300 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:border-cyan-500 transition-colors duration-300"
            >
              <GoogleIcon /> Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm mt-8">
              Don't have an account? <Link to="/signup" className="font-semibold text-cyan-400 hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

