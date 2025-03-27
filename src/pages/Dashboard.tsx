
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Award, BarChart3, Book, CheckCircle2, Clock, Compass, ListChecks, UserRound } from "lucide-react";

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-waypoint-light-gray/20">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-waypoint-black">
              Welcome, {currentUser.firstName || currentUser.username}
            </h1>
            <p className="text-waypoint-gray mt-2">
              {currentUser.role === "student" 
                ? "Track your career exploration journey and access your assessments." 
                : currentUser.role === "educator"
                ? "Monitor student progress and access career guidance resources."
                : "Manage user accounts and access system analytics."}
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover-lift">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Take Assessment</CardTitle>
                <CardDescription>Discover your ideal career path</CardDescription>
              </CardHeader>
              <CardContent className="text-waypoint-gray">
                Complete a short quiz to get personalized career recommendations.
              </CardContent>
              <CardFooter>
                <Link to="/assessment" className="w-full">
                  <Button className="w-full btn-primary group">
                    Start Assessment
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">View Results</CardTitle>
                <CardDescription>Review your career matches</CardDescription>
              </CardHeader>
              <CardContent className="text-waypoint-gray">
                Access your saved assessment results and recommendations.
              </CardContent>
              <CardFooter>
                <Link to="/results" className="w-full">
                  <Button className="w-full btn-outline group">
                    View Results
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Explore Careers</CardTitle>
                <CardDescription>Browse career options</CardDescription>
              </CardHeader>
              <CardContent className="text-waypoint-gray">
                Learn about different career paths, requirements, and opportunities.
              </CardContent>
              <CardFooter>
                <Link to="/careers" className="w-full">
                  <Button className="w-full btn-outline group">
                    Explore Careers
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Status Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Assessment Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 size={18} className="text-green-500" />
                        <span className="text-waypoint-black">Career Interests Quiz</span>
                      </div>
                      <span className="text-waypoint-blue bg-waypoint-light-blue/30 text-sm rounded-full px-3 py-1">
                        Completed
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock size={18} className="text-yellow-500" />
                        <span className="text-waypoint-black">Skills Assessment</span>
                      </div>
                      <span className="text-yellow-600 bg-yellow-100 text-sm rounded-full px-3 py-1">
                        In Progress
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ListChecks size={18} className="text-waypoint-gray" />
                        <span className="text-waypoint-black">Work Values Inventory</span>
                      </div>
                      <span className="text-waypoint-gray bg-gray-100 text-sm rounded-full px-3 py-1">
                        Not Started
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/assessments" className="w-full">
                    <Button variant="outline" className="w-full">
                      View All Assessments
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Career Matches */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Top Career Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-100 rounded-lg hover:border-waypoint-blue/30 transition-all hover:shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-waypoint-black">Software Developer</h3>
                        <div className="flex items-center bg-waypoint-light-blue/30 text-waypoint-blue rounded-full px-3 py-1 text-sm font-medium">
                          92% Match
                        </div>
                      </div>
                      <p className="text-sm text-waypoint-gray mb-3">
                        Design, develop, and maintain software applications using programming languages and tools.
                      </p>
                      <Link to="/career/software-developer" className="text-sm text-waypoint-blue hover:underline">
                        View Details
                      </Link>
                    </div>
                    
                    <div className="p-4 border border-gray-100 rounded-lg hover:border-waypoint-blue/30 transition-all hover:shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-waypoint-black">Data Analyst</h3>
                        <div className="flex items-center bg-waypoint-light-blue/30 text-waypoint-blue rounded-full px-3 py-1 text-sm font-medium">
                          87% Match
                        </div>
                      </div>
                      <p className="text-sm text-waypoint-gray mb-3">
                        Analyze data to identify trends and insights that inform business decisions.
                      </p>
                      <Link to="/career/data-analyst" className="text-sm text-waypoint-blue hover:underline">
                        View Details
                      </Link>
                    </div>
                    
                    <div className="p-4 border border-gray-100 rounded-lg hover:border-waypoint-blue/30 transition-all hover:shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-waypoint-black">UX Designer</h3>
                        <div className="flex items-center bg-waypoint-light-blue/30 text-waypoint-blue rounded-full px-3 py-1 text-sm font-medium">
                          84% Match
                        </div>
                      </div>
                      <p className="text-sm text-waypoint-gray mb-3">
                        Create user-centered designs for digital products and services.
                      </p>
                      <Link to="/career/ux-designer" className="text-sm text-waypoint-blue hover:underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/results" className="w-full">
                    <Button variant="outline" className="w-full">
                      View All Matches
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-waypoint-light-blue/30 flex items-center justify-center mb-4">
                      <UserRound size={32} className="text-waypoint-blue" />
                    </div>
                    <h3 className="text-lg font-medium text-waypoint-black mb-1">
                      {currentUser.firstName ? `${currentUser.firstName} ${currentUser.lastName}` : currentUser.username}
                    </h3>
                    <p className="text-waypoint-gray mb-1">{currentUser.email}</p>
                    <div className="text-sm bg-waypoint-blue/10 text-waypoint-blue rounded-full px-3 py-1 capitalize">
                      {currentUser.role}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Compass size={18} className="text-waypoint-blue" />
                        <div>
                          <p className="text-sm text-waypoint-gray">Assessments Completed</p>
                          <p className="font-medium text-waypoint-black">1 of 3</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Award size={18} className="text-waypoint-blue" />
                        <div>
                          <p className="text-sm text-waypoint-gray">Profile Completion</p>
                          <p className="font-medium text-waypoint-black">65%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/profile" className="w-full">
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Resources Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Book size={18} className="mt-0.5 text-waypoint-blue" />
                      <div>
                        <p className="font-medium text-waypoint-black mb-1">Resume Writing Guide</p>
                        <p className="text-sm text-waypoint-gray">Learn how to create a compelling resume</p>
                        <Link to="/resources/resume-guide" className="text-sm text-waypoint-blue hover:underline block mt-1">
                          Read Guide
                        </Link>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <BarChart3 size={18} className="mt-0.5 text-waypoint-blue" />
                      <div>
                        <p className="font-medium text-waypoint-black mb-1">Industry Trends Report</p>
                        <p className="text-sm text-waypoint-gray">Stay updated with the latest industry trends</p>
                        <Link to="/resources/industry-trends" className="text-sm text-waypoint-blue hover:underline block mt-1">
                          View Report
                        </Link>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Award size={18} className="mt-0.5 text-waypoint-blue" />
                      <div>
                        <p className="font-medium text-waypoint-black mb-1">Interview Preparation</p>
                        <p className="text-sm text-waypoint-gray">Tips and techniques for successful interviews</p>
                        <Link to="/resources/interview-prep" className="text-sm text-waypoint-blue hover:underline block mt-1">
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/resources" className="w-full">
                    <Button variant="outline" className="w-full">
                      Browse All Resources
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
