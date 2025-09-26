import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, BookOpen } from 'lucide-react';

// A simple SVG for Google's icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.81C34.553 5.822 29.472 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691c2.242-4.133 6.517-7.097 11.45-7.097c2.98 0 5.705.99 7.961 2.659L29.1 4.79C25.594 1.838 21.012 0 16 0C9.402 0 3.803 4.162 1.144 10.133L6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 48c5.166 0 9.86-1.977 13.409-5.192l-5.464-4.409c-2.09 1.625-4.791 2.6-7.945 2.6c-5.485 0-10.12-3.512-11.666-8.375l-5.52 4.459C6.417 41.77 14.616 48 24 48z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.81C34.553 5.822 29.472 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);


export default function SignUpSection() {
  const [showPassword, setShowPassword] = useState(false);
  // Updated state to match backend ('name' -> 'fullName')
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Updated handleSubmit to be an async function for API calls
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // --- API Call Logic ---
    // This is where you'll send the data to your backend.
    try {
      // Replace '/api/v1/users/register' with your actual API endpoint
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The body includes fullName, email, and password as expected by your backend
        body: JSON.stringify({
          fullName,
          email,
          password,
          // role and avatar will be handled by the backend as per your controller
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration
        alert(`Account created for ${fullName}! Please check your email to verify.`);
        // Optionally, redirect the user to the login page or dashboard
        // window.location.href = '/login';
      } else {
        // Handle errors from the backend (e.g., email already exists)
        alert(`Registration failed: ${data.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      // Handle network errors
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };
  
  const handleGoogleSignUp = () => {
    // This would trigger the Google OAuth flow in a real application.
    window.open('https://accounts.google.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 flex items-center justify-center font-sans p-4">
      <div className="relative group w-full max-w-6xl transition-transform duration-300 hover:scale-[1.02]">
        {/* Gradient border that appears on hover */}
        <div 
          className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-6xl flex rounded-2xl overflow-hidden shadow-lg shadow-cyan-500/10 border border-zinc-800">
          
          <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-zinc-900 p-12 text-center relative overflow-hidden">
             <div className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-20 blur-2xl"></div>
             <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-20 blur-2xl"></div>
            <h1 className="text-4xl font-bold text-white mb-4">Start Your Journey</h1>
            <p className="text-gray-400 max-w-sm">
              Create an account to unlock a world of knowledge. Get access to expert-led courses and a vibrant learning community.
            </p>
             <div className="mt-8 text-cyan-400">
                <BookOpen size={64} className="mx-auto" />
             </div>
          </div>

          {/* Right Column: Sign-Up Form */}
          <div className="w-full lg:w-1/2 bg-black p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 mb-8">Let's get you started!</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  required
                />
              </div>

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
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-cyan-500 text-black font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105"
              >
                Create Account <ArrowRight size={20} />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <hr className="w-full border-zinc-700" />
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <hr className="w-full border-zinc-700" />
            </div>

            {/* Social Sign-Up */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full bg-zinc-900 border border-zinc-700 text-gray-300 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:border-cyan-500 transition-colors duration-300"
            >
              <GoogleIcon /> Sign Up with Google
            </button>

            {/* Log In Link */}
            <p className="text-center text-sm mt-8">
              Already have an account? <a href="/login" className="font-semibold text-cyan-400 hover:underline">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

