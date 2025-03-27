
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  ChevronDown 
} from "lucide-react";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-medium text-waypoint-black flex items-center"
            >
              <span className="text-waypoint-blue">WaY</span>
              <span>Point</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === "/" 
                  ? "text-waypoint-blue" 
                  : "text-waypoint-black hover:text-waypoint-blue"
              }`}
            >
              Home
            </Link>
            
            {currentUser && (
              <Link 
                to="/dashboard" 
                className={`font-medium transition-colors ${
                  location.pathname === "/dashboard" 
                    ? "text-waypoint-blue" 
                    : "text-waypoint-black hover:text-waypoint-blue"
                }`}
              >
                Dashboard
              </Link>
            )}
            
            {currentUser && (
              <Link 
                to="/assessment" 
                className={`font-medium transition-colors ${
                  location.pathname === "/assessment" 
                    ? "text-waypoint-blue" 
                    : "text-waypoint-black hover:text-waypoint-blue"
                }`}
              >
                Assessment
              </Link>
            )}

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-waypoint-black hover:text-waypoint-blue transition-colors focus:outline-none"
                >
                  <span className="font-medium">{currentUser.username}</span>
                  <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-md shadow-lg py-1 z-10 border border-gray-100 animate-fade-in">
                    <div className="px-4 py-2 text-sm text-waypoint-gray border-b border-gray-100">
                      Signed in as <span className="font-medium text-waypoint-black">{currentUser.email}</span>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-waypoint-black hover:bg-waypoint-light-blue/50 flex items-center"
                    >
                      <User size={16} className="mr-2" />
                      Your Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-waypoint-black hover:bg-waypoint-light-blue/50 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="btn-outline">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="btn-primary">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-waypoint-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="animate-fade-in" />
              ) : (
                <Menu size={24} className="animate-fade-in" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md font-medium ${
                location.pathname === "/"
                  ? "text-waypoint-blue bg-waypoint-light-blue/30"
                  : "text-waypoint-black hover:bg-waypoint-light-blue/20"
              }`}
            >
              Home
            </Link>
            
            {currentUser && (
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md font-medium ${
                  location.pathname === "/dashboard"
                    ? "text-waypoint-blue bg-waypoint-light-blue/30"
                    : "text-waypoint-black hover:bg-waypoint-light-blue/20"
                }`}
              >
                Dashboard
              </Link>
            )}
            
            {currentUser && (
              <Link
                to="/assessment"
                className={`block px-3 py-2 rounded-md font-medium ${
                  location.pathname === "/assessment"
                    ? "text-waypoint-blue bg-waypoint-light-blue/30"
                    : "text-waypoint-black hover:bg-waypoint-light-blue/20"
                }`}
              >
                Assessment
              </Link>
            )}
            
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-waypoint-black hover:bg-waypoint-light-blue/20 font-medium"
                >
                  Your Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 rounded-md text-waypoint-black hover:bg-waypoint-light-blue/20 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-4 flex flex-col space-y-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full btn-outline">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full btn-primary">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
