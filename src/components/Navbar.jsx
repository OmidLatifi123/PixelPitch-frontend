import React from "react";
import { Link } from "react-router-dom";
import { UserPlus, LogIn, LogOut, Presentation, FileText } from "lucide-react";
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

  return (
    <>
      <style>{pixelatedFontStyle}</style>
      <div className="absolute top-0 left-0 right-0 z-10 w-full">
        <nav className="w-[90%] mx-auto backdrop-blur-md shadow-lg rounded-2xl border border-white/90 mt-4">
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
                <Link
                  to="/pitch"
                  className="flex items-center px-6 py-2 rounded-lg bg-[#FF5F02] text-white hover:opacity-90 transition-opacity"
                >
                  <Presentation className="h-4 w-4 mr-2" />
                  Pitch
                </Link>
                <Link
                  to="/summary"
                  className="flex items-center px-6 py-2 rounded-lg border border-[#FF5F02] text-[#FF5F02] bg-white/50 hover:bg-white/70 transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Pitch Summary
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {!user ? (
                  <>
                    <Link
                      to="/register"
                      className="flex items-center px-4 py-2 rounded-lg bg-[#FF5F02] text-white hover:opacity-90 transition-opacity"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center px-4 py-2 rounded-lg text-[#FF5F02] hover:text-[#FF5F02]/80 transition-colors"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="text-sm text-gray-700 font-medium">
                      Welcome, <span className="text-[#FF5F02]">{user.firstName} {user.lastName}</span>
                    </span>
                    <button
                      onClick={logOut}
                      className="flex items-center px-4 py-2 rounded-lg bg-[#FF5F02] text-white hover:opacity-90 transition-opacity"
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