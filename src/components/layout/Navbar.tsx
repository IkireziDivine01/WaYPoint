
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn, LogOut, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMobileScreen } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const { currentUser, signOut } = useAuth();
  const { isMobile } = useMobileScreen();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Assessment", path: "/assessment" },
    { name: "Courses", path: "/courses" },
    { name: "Learning", path: "/learning" }, // Add Learning link
    { name: "Blog", path: "/blog" }, // Add Blog link
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
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="text-waypoint-blue">WaY</span>Point
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {visibleLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <Link to={link.path} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      active={location.pathname === link.path}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Mobile Navigation Toggle */}
        {isMobile && (
          <button
            className="md:hidden"
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
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{currentUser.username}</p>
                <p className="text-xs text-gray-500 capitalize">
                  {currentUser.role}
                </p>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={currentUser.avatar_url || ""}
                  alt={currentUser.username}
                />
                <AvatarFallback className="bg-waypoint-light-blue text-waypoint-blue">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="text-gray-600"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register">
                  <User className="h-4 w-4 mr-2" />
                  Register
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-b shadow-lg md:hidden">
            <div className="flex flex-col p-4">
              <nav className="flex flex-col gap-2">
                {visibleLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2 rounded-md ${
                      location.pathname === link.path
                        ? "bg-waypoint-light-blue text-waypoint-blue"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t">
                {currentUser ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={currentUser.avatar_url || ""}
                          alt={currentUser.username}
                        />
                        <AvatarFallback className="bg-waypoint-light-blue text-waypoint-blue">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {currentUser.username}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {currentUser.role}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => {
                        signOut();
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
                      <Link to="/login">
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      className="justify-start"
                      asChild
                      onClick={closeMobileMenu}
                    >
                      <Link to="/register">
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
