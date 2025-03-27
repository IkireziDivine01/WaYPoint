
import React from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { Check } from "lucide-react";

const Register = () => {
  const { currentUser } = useAuth();
  
  // Redirect if already logged in
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <div className="glass-card p-8 rounded-xl shadow-sm w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-medium text-waypoint-black mb-2">
                    Create Your WayPoint Account
                  </h1>
                  <p className="text-waypoint-gray">
                    Join WayPoint to discover your ideal career path
                  </p>
                </div>
                
                <RegisterForm />
                
                <div className="mt-8 text-center lg:hidden">
                  <p className="text-waypoint-gray">
                    Already have an account?{" "}
                    <Link to="/login" className="text-waypoint-blue hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex flex-col justify-center">
              <div className="glass-panel p-8 rounded-xl shadow-glass animate-float h-full flex flex-col justify-center">
                <div className="mb-8">
                  <h2 className="text-3xl font-medium text-waypoint-black mb-4">
                    Why Join <span className="text-waypoint-blue">WayPoint</span>?
                  </h2>
                  <p className="text-waypoint-gray">
                    Create your account today and get access to all these features:
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 h-5 w-5 bg-waypoint-blue/10 text-waypoint-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} />
                    </div>
                    <p className="text-waypoint-black">
                      <span className="font-medium">Personalized Career Assessments</span> - Discover careers that match your unique profile
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 h-5 w-5 bg-waypoint-blue/10 text-waypoint-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} />
                    </div>
                    <p className="text-waypoint-black">
                      <span className="font-medium">Save Your Results</span> - Track your progress and revisit your career matches
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 h-5 w-5 bg-waypoint-blue/10 text-waypoint-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} />
                    </div>
                    <p className="text-waypoint-black">
                      <span className="font-medium">Detailed Career Information</span> - Learn about requirements, skills, and growth opportunities
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 h-5 w-5 bg-waypoint-blue/10 text-waypoint-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} />
                    </div>
                    <p className="text-waypoint-black">
                      <span className="font-medium">Role-Based Access</span> - Features tailored to students, educators, and administrators
                    </p>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-lg border border-waypoint-blue/20 mt-auto">
                  <p className="text-waypoint-black mb-3">
                    "WayPoint helped me discover careers that align with my strengths and interests. The personalized recommendations were spot on!"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-waypoint-blue">
                      Sarah T., Student
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-waypoint-blue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-waypoint-gray">
                    Already have an account?{" "}
                    <Link to="/login" className="text-waypoint-blue hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
