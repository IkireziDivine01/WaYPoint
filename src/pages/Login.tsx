
import React from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
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
            <div className="hidden lg:flex flex-col justify-center">
              <div className="glass-panel p-8 rounded-xl shadow-glass animate-float h-full flex flex-col justify-center">
                <div className="mb-8">
                  <h2 className="text-3xl font-medium text-waypoint-black mb-4">
                    Welcome Back to <span className="text-waypoint-blue">WayPoint</span>
                  </h2>
                  <p className="text-waypoint-gray">
                    Sign in to continue your career exploration journey and access your saved assessments and recommendations.
                  </p>
                </div>
                
                <div className="space-y-6 flex-grow flex flex-col justify-center">
                  <div className="glass-card p-6 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 bg-waypoint-light-blue/50 text-waypoint-blue rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-waypoint-black mb-1">
                          Take Career Assessments
                        </h3>
                        <p className="text-sm text-waypoint-gray">
                          Discover your strengths and interests through our interactive quizzes.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 bg-waypoint-light-blue/50 text-waypoint-blue rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-waypoint-black mb-1">
                          Get Personalized Recommendations
                        </h3>
                        <p className="text-sm text-waypoint-gray">
                          Receive career suggestions tailored to your unique profile.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 bg-waypoint-light-blue/50 text-waypoint-blue rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-waypoint-black mb-1">
                          Track Your Progress
                        </h3>
                        <p className="text-sm text-waypoint-gray">
                          Save your results and monitor your career development journey.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-waypoint-gray">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-waypoint-blue hover:underline">
                      Create one now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="glass-card p-8 rounded-xl shadow-sm w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-medium text-waypoint-black mb-2">
                    Sign In to WayPoint
                  </h1>
                  <p className="text-waypoint-gray">
                    Enter your credentials to access your account
                  </p>
                </div>
                
                <LoginForm />
                
                <div className="mt-8 text-center lg:hidden">
                  <p className="text-waypoint-gray">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-waypoint-blue hover:underline">
                      Create one now
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

export default Login;
