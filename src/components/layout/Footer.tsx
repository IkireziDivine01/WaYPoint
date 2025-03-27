
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-waypoint-light-gray pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block">
              <div className="text-2xl font-medium text-waypoint-black mb-4">
                <span className="text-waypoint-blue">WaY</span>
                <span>Point</span>
              </div>
            </Link>
            <p className="text-waypoint-gray max-w-md mb-6">
              Guiding you through your educational journey to discover career paths that match your strengths, interests, and aspirations.
            </p>
          </div>

          <div>
            <h3 className="text-waypoint-black font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-waypoint-gray hover:text-waypoint-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-waypoint-gray hover:text-waypoint-blue transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-waypoint-gray hover:text-waypoint-blue transition-colors">
                  Assessment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-waypoint-black font-medium mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-waypoint-gray hover:text-waypoint-blue transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-waypoint-gray hover:text-waypoint-blue transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-waypoint-gray hover:text-waypoint-blue transition-colors">
                  Your Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-waypoint-gray text-sm">
              &copy; {currentYear} WayPoint. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-waypoint-gray hover:text-waypoint-blue text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-waypoint-gray hover:text-waypoint-blue text-sm transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
