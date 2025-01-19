import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  UserPlus, 
  LogIn, 
  LogOut, 
  Presentation, 
  FileText,
  Rocket,
  Search,
  UserCircle,
  Play,
  Home
} from "lucide-react";
import { useAuth } from "../hooks/authProvider";

const pixelatedFontStyle = `
  .pixelify-sans-logo {
    font-family: "Pixelify Sans", serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
  }
`;

const Navbar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();

  console.log(user);

  const renderNavLinks = () => {
    if (!user) return null;

    if (user.role === 'user') {
      return (
        <>
          <Link
            to="/entrepreneur"
            className="flex items-center px-4 py-2 rounded-lg bg-[#FF5F02] text-white hover:opacity-90 transition-opacity font-['Pixelify_Sans']"
          >
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/pitch"
            className="flex items-center px-4 py-2 rounded-lg border border-[#FF5F02] text-[#FF5F02] bg-white/50 hover:bg-white/70 transition-colors font-['Pixelify_Sans']"
          >
            <Presentation className="h-4 w-4 mr-2" />
            Pitch
          </Link>
          <Link
            to="/pitchsummary"
            className="flex items-center px-4 py-2 rounded-lg border border-[#FF5F02] text-[#FF5F02] bg-white/50 hover:bg-white/70 transition-colors font-['Pixelify_Sans']"
          >
            <FileText className="h-4 w-4 mr-2" />
            Summary
          </Link>
          <Link
            to="/mockinterview"
            className="flex items-center px-4 py-2 rounded-lg border border-[#FF5F02] text-[#FF5F02] bg-white/50 hover:bg-white/70 transition-colors font-['Pixelify_Sans']"
          >
            <Play className="h-4 w-4 mr-2" />
            Practice
          </Link>
        </>
      );
    } else if (user.role === 'investor') {
      return (
        <>
          <Link
            to="/investordashboard"
            className="flex items-center px-4 py-2 rounded-lg bg-[#FF5F02] text-white hover:opacity-90 transition-opacity font-['Pixelify_Sans']"
          >
            <UserCircle className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/matches"
            className="flex items-center px-4 py-2 rounded-lg border border-[#FF5F02] text-[#FF5F02] bg-white/50 hover:bg-white/70 transition-colors font-['Pixelify_Sans']"
          >
            <Rocket className="h-4 w-4 mr-2" />
            Matches
          </Link>
        </>
      );
    }
  };

  return (
    <>
      <style>{pixelatedFontStyle}</style>
      <div className="absolute top-0 left-0 right-0 z-10 w-full">
        <nav className="w-[90%] mx-auto bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl border border-white/40 mt-4">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo/Brand */}
              <Link to="/" className="flex items-center">
                <span className="pixelify-sans-logo text-3xl text-[#FF5F02]">
                  Pixel Pitch
                </span>
              </Link>

              {/* Main Navigation Buttons */}
              <div className="flex items-center space-x-4">
                {renderNavLinks()}
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {!user ? (
                  <>
                    <Link
                      to="/register"
                      className="flex items-center px-4 py-2 rounded-lg bg-[#FF5F02] text-white hover:opacity-90 transition-opacity font-['Pixelify_Sans']"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center px-4 py-2 rounded-lg border border-[#FF5F02] text-[#FF5F02] hover:bg-white/50 transition-colors font-['Pixelify_Sans']"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="text-sm text-gray-700 font-['Pixelify_Sans']">
                      Welcome, <span className="text-[#FF5F02]">{user.firstName} {user.lastName}</span>
                    </span>
                    <button
                      onClick={logOut}
                      className="flex items-center px-4 py-2 rounded-lg bg-[#FF5F02] text-white hover:opacity-90 transition-opacity font-['Pixelify_Sans']"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;