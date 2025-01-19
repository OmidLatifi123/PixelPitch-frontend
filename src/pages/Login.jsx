import React, { useState } from "react";
import axios from "axios";
import { Mail, LogIn, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from "../hooks/authProvider";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuth();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      auth.loginAction(formData);
      return;
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen pt-32" style={{ 
      backgroundImage: 'url("/Assets/background-general.svg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="pixelify-sans-heading text-4xl text-[#FF5F02]" style={{
            WebkitTextStroke: '1px white',
            textShadow: '3px 3px 0px rgba(255, 255, 255, 0.5)'
          }}>
            Welcome Back!
          </h2>
          <p className="mt-2 text-white font-semibold" style={{
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
          }}>
            Log in to continue your investment journey
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/30 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/70" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#FF5F02] bg-white/70 backdrop-blur-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/70" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  required
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#FF5F02] bg-white/70 backdrop-blur-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white"
                >
                  {showPassword ? 
                    <EyeOff className="h-5 w-5" /> :
                    <Eye className="h-5 w-5" />
                  }
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-white text-sm bg-red-500/30 backdrop-blur-sm p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
                bg-gradient-to-r from-[#FF5F02] to-[#FF8B3D] hover:from-[#FF8B3D] hover:to-[#FF5F02] 
                text-white shadow-lg transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <LogIn className="h-5 w-5" />
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            {/* Additional Links */}
            <div className="text-center text-sm text-white">
              <a 
                href="/forgot-password" 
                className="text-[#FF5F02] hover:text-[#FF8B3D] font-semibold"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
              >
                Forgot your password?
              </a>
              <div className="mt-2">
                Don't have an account?{' '}
                <a 
                  href="/register" 
                  className="text-[#FF5F02] hover:text-[#FF8B3D] font-semibold"
                  style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;