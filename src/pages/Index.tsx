
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  ArrowRight, 
  Award, 
  BookOpen, 
  Compass, 
  LineChart, 
  Users 
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-waypoint-light-gray/30 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <div className="inline-block mb-4 px-3 py-1 bg-waypoint-light-blue/30 text-waypoint-blue rounded-full text-sm font-medium animate-pulse-gentle">
                Navigate Your Future Career Path
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-waypoint-black mb-6 leading-tight">
                Discover the career <span className="text-waypoint-blue">path</span> that's right for you
              </h1>
              <p className="text-lg text-waypoint-gray mb-8 leading-relaxed">
                WayPoint helps students explore career options based on their strengths, interests, and aspirations through engaging assessments and personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button className="w-full sm:w-auto text-base btn-primary group">
                    Get Started
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full sm:w-auto text-base btn-outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full max-w-lg">
              <div className="glass-panel p-6 rounded-xl shadow-glass animate-float">
                <div className="aspect-[4/3] bg-waypoint-light-blue/30 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded-full w-2/3"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-5/6"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-heading mb-4">
              Personalized Career Guidance
            </h2>
            <p className="section-subheading">
              WayPoint combines smart assessments with personalized recommendations to help you make informed career decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl shadow-sm flex flex-col hover-lift">
              <div className="h-12 w-12 bg-waypoint-light-blue/40 text-waypoint-blue rounded-lg flex items-center justify-center mb-4">
                <Compass size={24} />
              </div>
              <h3 className="text-xl font-medium text-waypoint-black mb-2">
                Discover Your Path
              </h3>
              <p className="text-waypoint-gray flex-grow">
                Take our comprehensive career assessment to uncover your interests, strengths, and values.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl shadow-sm flex flex-col hover-lift">
              <div className="h-12 w-12 bg-waypoint-light-blue/40 text-waypoint-blue rounded-lg flex items-center justify-center mb-4">
                <LineChart size={24} />
              </div>
              <h3 className="text-xl font-medium text-waypoint-black mb-2">
                Personalized Recommendations
              </h3>
              <p className="text-waypoint-gray flex-grow">
                Receive tailored career suggestions based on your unique profile and assessment results.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl shadow-sm flex flex-col hover-lift">
              <div className="h-12 w-12 bg-waypoint-light-blue/40 text-waypoint-blue rounded-lg flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-medium text-waypoint-black mb-2">
                Educational Guidance
              </h3>
              <p className="text-waypoint-gray flex-grow">
                Learn about educational requirements and pathways to reach your career goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-waypoint-light-gray/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-heading mb-4">
              How WayPoint Works
            </h2>
            <p className="section-subheading">
              Our simple process guides you through discovering your ideal career path in just a few steps.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-waypoint-blue/20 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-waypoint-blue text-white flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-xl font-medium">1</span>
                </div>
                <h3 className="text-lg font-medium text-waypoint-black mb-2">
                  Create an Account
                </h3>
                <p className="text-waypoint-gray">
                  Sign up to access all WayPoint features and save your progress.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-waypoint-blue text-white flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-xl font-medium">2</span>
                </div>
                <h3 className="text-lg font-medium text-waypoint-black mb-2">
                  Take the Assessment
                </h3>
                <p className="text-waypoint-gray">
                  Complete our interactive quiz designed to understand your preferences.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-waypoint-blue text-white flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-xl font-medium">3</span>
                </div>
                <h3 className="text-lg font-medium text-waypoint-black mb-2">
                  Get Recommendations
                </h3>
                <p className="text-waypoint-gray">
                  Review personalized career matches based on your unique profile.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-waypoint-blue text-white flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-xl font-medium">4</span>
                </div>
                <h3 className="text-lg font-medium text-waypoint-black mb-2">
                  Explore Career Paths
                </h3>
                <p className="text-waypoint-gray">
                  Dive deeper into each recommended career with detailed information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* User Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-heading mb-4">
              For Students, Educators, and Administrators
            </h2>
            <p className="section-subheading">
              WayPoint provides tailored experiences for different user roles with specific features and insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl shadow-sm hover-lift">
              <div className="h-12 w-12 bg-waypoint-light-blue/40 text-waypoint-blue rounded-lg flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-medium text-waypoint-black mb-3">
                For Students
              </h3>
              <ul className="space-y-2 text-waypoint-gray mb-8">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-waypoint-blue">•</span>
                  <span>Discover careers that match your interests</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-waypoint-blue">•</span>
                  <span>Learn about educational requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-waypoint-blue">•</span>
                  <span>Save and track your assessment results</span>
                </li>
              </ul>
              <Link to="/register">
                <Button variant="outline" className="w-full btn-outline">
                  Get Started
                </Button>
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl shadow-sm hover-lift">
              <div className="h-12 w-12 bg-waypoint-light-blue/40 text-waypoint-blue rounded-lg flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-medium text-waypoint-black mb-3">
                For Educators
              </h3>
              <ul className="space-y-2 text-waypoint-gray mb-8">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-waypoint-blue">•</span>
                  <span>Monitor student progress and insights</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-waypoint-blue">•</span>
                  <span>Access career guidance resources</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-waypoint-blue">•</span>
                  <span>Support students in their career exploration</span>
                </li>
              </ul>
              <Link to="/register">
                <Button variant="outline" className="w-full btn-outline">
                  Join as Educator
                </Button>
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-xl shadow-sm hover-lift">
              <div className="h-12 w-12 bg-waypoint-light-blue/40 text-waypoint-blue rounded-lg flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-medium text-waypoint-black mb-3">
                For Administrators
              </h3>
              <ul className="space-y-2 text-waypoint-gray mb-8">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-waypoint-blue">•</span>
                  <span>Manage user accounts and permissions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-waypoint-blue">•</span>
                  <span>Access comprehensive analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-waypoint-blue">•</span>
                  <span>Customize assessment parameters</span>
                </li>
              </ul>
              <Link to="/register">
                <Button variant="outline" className="w-full btn-outline">
                  Join as Administrator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-waypoint-light-blue/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-waypoint-black mb-6">
            Ready to discover your ideal career path?
          </h2>
          <p className="text-lg text-waypoint-gray mb-8 max-w-2xl mx-auto">
            Join WayPoint today and take the first step towards a fulfilling career that aligns with your unique strengths and interests.
          </p>
          <Link to="/register">
            <Button className="btn-primary text-base px-8 py-6">
              Start Your Career Journey
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
