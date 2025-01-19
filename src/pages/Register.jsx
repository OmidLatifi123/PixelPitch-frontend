import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, User, UserPlus, AlertCircle, Rocket, PiggyBank, Lock } from 'lucide-react';

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    companyName: "", 
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5003/register", formData);
      alert(response.data.message);
      if (formData.role === "investor") {
        navigate("/login");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32" style={{ 
      backgroundImage: 'url("/Assets/background-general.svg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="pixelify-sans-heading text-4xl text-[#FF5F02]" style={{
            WebkitTextStroke: '1px white',
            textShadow: '3px 3px 0px rgba(255, 255, 255, 0.5)'
          }}>
            Join Pixel Pitch
          </h2>
          <p className="mt-2 text-white font-semibold" style={{
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
          }}>
            Start your investment journey today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/30 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  required
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#FF5F02] bg-white/70 backdrop-blur-sm"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  required
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#FF5F02] bg-white/70 backdrop-blur-sm"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#FF5F02] bg-white/70 backdrop-blur-sm"
                placeholder="Choose a username"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#FF5F02] bg-white/70 backdrop-blur-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
  <label className="block text-gray-700 text-sm font-medium mb-2">
    Company Name
  </label>
  <input
    type="text"
    name="companyName"
    value={formData.companyName || ""}
    onChange={handleChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
    placeholder="Enter your company name (optional)"
  />
</div>


            {/* Password Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#FF5F02] bg-white/70 backdrop-blur-sm"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#FF5F02] bg-white/70 backdrop-blur-sm"
                placeholder="Confirm your password"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-4">
  <button
    type="button"
    onClick={() => setFormData({ ...formData, role: "user" })}
    className={`p-4 border rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm transition-all duration-300 ${
      formData.role === "user" 
        ? "border-[#FF5F02] bg-[#FF5F02] text-white" 
        : "border-white/30 bg-white/30 text-white hover:bg-white/40"
    }`}
  >
    <Rocket className="h-6 w-6" />
    <span>Entrepreneur</span>
  </button>
  <button
    type="button"
    onClick={() => setFormData({ ...formData, role: "investor" })}
    className={`p-4 border rounded-lg flex flex-col items-center gap-2 backdrop-blur-sm transition-all duration-300 ${
      formData.role === "investor" 
        ? "border-[#FF5F02] bg-[#FF5F02] text-white" 
        : "border-white/30 bg-white/30 text-white hover:bg-white/40"
    }`}
  >
    <PiggyBank className="h-6 w-6" />
    <span>Investor</span>
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
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#FF5F02] to-[#FF8B3D] hover:from-[#FF8B3D] hover:to-[#FF5F02] text-white shadow-lg transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <UserPlus className="h-5 w-5" />
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-white">
              Already have an account?{" "}
              <a 
                href="/login" 
                className="text-[#FF5F02] hover:text-[#FF8B3D] font-semibold"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
              >
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;