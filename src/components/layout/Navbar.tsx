
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn, LogOut, BookOpen, Home, Gauge, BookText, Sparkles, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Dashboard", path: "/dashboard", icon: <Gauge size={18} /> },
    { name: "Assessment", path: "/assessment", icon: <Sparkles size={18} /> },
    { name: "Courses", path: "/courses", icon: <BookText size={18} /> },
    { name: "Learning", path: "/learning", icon: <BookOpen size={18} /> }, 
    { name: "Blog", path: "/blog", icon: <FileText size={18} /> }, 
  ];

  // Filter dashboard link if user is not logged in
  const visibleLinks = currentUser
    ? navLinks
    : navLinks.filter((link) => link.name !== "Dashboard");

  // Get first letter of user's name for avatar fallback
  const getInitials = () => {
    if (currentUser?.username) {
      return currentUser.username.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="text-waypoint-blue">WaY</span>Point
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <NavigationMenu className="hidden md:flex mx-6">
            <NavigationMenuList className="gap-1">
              {visibleLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <Link 
                    to={link.path}
                    className={`${navigationMenuTriggerStyle()} ${
                      location.pathname === link.path 
                        ? "bg-waypoint-light-blue text-waypoint-blue" 
                        : "text-gray-700 hover:bg-gray-100"
                    } flex items-center gap-2 transition-colors`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Mobile Navigation Toggle */}
        {isMobile && (
          <button
            className="md:hidden text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        )}

        {/* User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-800">{currentUser.username}</p>
                <p className="text-xs text-gray-500 capitalize">
                  {currentUser.role}
                </p>
              </div>
              <Avatar className="h-8 w-8 ring-2 ring-waypoint-light-blue">
                <AvatarImage
                  src={currentUser.avatar_url || ""}
                  alt={currentUser.username}
                />
                <AvatarFallback className="bg-waypoint-light-blue text-waypoint-blue">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <Separator orientation="vertical" className="h-8" />
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button className="flex items-center gap-2 bg-waypoint-blue hover:bg-waypoint-blue/90" asChild>
                <Link to="/register">
                  <User className="h-4 w-4" />
                  Register
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-b shadow-lg md:hidden animate-slide-in-right">
            <div className="flex flex-col p-4">
              <nav className="flex flex-col gap-2">
                {visibleLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-3 rounded-md flex items-center gap-3 ${
                      location.pathname === link.path
                        ? "bg-waypoint-light-blue text-waypoint-blue"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t">
                {currentUser ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10 ring-2 ring-waypoint-light-blue">
                        <AvatarImage
                          src={currentUser.avatar_url || ""}
                          alt={currentUser.username}
                        />
                        <AvatarFallback className="bg-waypoint-light-blue text-waypoint-blue">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {currentUser.username}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {currentUser.role}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      className="justify-start"
                      asChild
                      onClick={closeMobileMenu}
                    >
                      <Link to="/login" className="flex items-center">
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      className="justify-start bg-waypoint-blue hover:bg-waypoint-blue/90"
                      asChild
                      onClick={closeMobileMenu}
                    >
                      <Link to="/register" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Register
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
