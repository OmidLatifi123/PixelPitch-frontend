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

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5003/register", formData);
      alert("Please Login to begin your journey");
  
        navigate("/login")
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Join Pitchimal
          </h2>
          <p className="mt-2 text-gray-600">
            Start your investment journey today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  required
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  required
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Choose a username"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm your password"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "user" })}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${
                    formData.role === "user" ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-200"
                  }`}
                >
                  <Rocket className="h-6 w-6" />
                  <span>Entrepreneur</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "investor" })}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${
                    formData.role === "investor" ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-200"
                  }`}
                >
                  <PiggyBank className="h-6 w-6" />
                  <span>Investor</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <UserPlus className="h-5 w-5" />
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-purple-600 hover:text-purple-700">
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
