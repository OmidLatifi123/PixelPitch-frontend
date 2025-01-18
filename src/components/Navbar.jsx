import React from "react";
import { Link } from "react-router-dom";
import { Rocket, UserPlus, LogIn, LogOut } from "lucide-react";

const Navbar = () => {

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <Rocket className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              PixelPitch
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
                {/* Register Button */}

                <Link
                  to="/pitchsummary"
                  className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-opacity"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Pitch Summary
                </Link>

                <Link
                  to="/pitch"
                  className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-opacity"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Pitch
                </Link>

                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-opacity"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Link>

                {/* Login Button */}
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
