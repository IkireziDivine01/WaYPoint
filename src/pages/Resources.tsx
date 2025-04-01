
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";
import AssessmentQuestionForm from "@/components/educator/AssessmentQuestionForm";
import AssessmentTemplateForm from "@/components/educator/AssessmentTemplateForm";
import QuestionsList from "@/components/educator/QuestionsList";
import TemplatesList from "@/components/educator/TemplatesList";
import UserPrivileges from "@/components/user/UserPrivileges";

const Resources = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("questions");

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={48} className="animate-spin text-waypoint-blue" />
      </div>
    );
  }

  // Handle different user roles
  const renderRoleContent = () => {
    const role = currentUser?.role;

    if (role === "student") {
      return (
        <div className="max-w-4xl mx-auto space-y-8">
          <UserPrivileges />
          
          <Card>
            <CardHeader>
              <CardTitle>Student Resources</CardTitle>
              <CardDescription>
                Access educational resources and assessments assigned to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-waypoint-gray mb-4">
                Your educators have provided these resources to help with your career exploration.
              </p>
              <Button onClick={() => navigate("/assessment")}>
                Take an Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    } else if (role === "educator") {
      return (
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <UserPrivileges />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="questions">Assessment Questions</TabsTrigger>
              <TabsTrigger value="templates">Assessment Templates</TabsTrigger>
            </TabsList>
            <TabsContent value="questions" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create Question</CardTitle>
                      <CardDescription>
                        Add a new assessment question to your question bank.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AssessmentQuestionForm />
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Questions</CardTitle>
                      <CardDescription>
                        Manage your assessment questions.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <QuestionsList />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="templates" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create Template</CardTitle>
                      <CardDescription>
                        Create a new assessment template from your questions.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AssessmentTemplateForm />
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Templates</CardTitle>
                      <CardDescription>
                        Manage your assessment templates.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TemplatesList />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      );
    } else if (role === "administrator") {
      return (
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <UserPrivileges />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="questions">All Questions</TabsTrigger>
              <TabsTrigger value="templates">All Templates</TabsTrigger>
            </TabsList>
            <TabsContent value="questions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Questions</CardTitle>
                  <CardDescription>
                    Manage all assessment questions created by educators.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QuestionsList isAdmin={true} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="templates" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Templates</CardTitle>
                  <CardDescription>
                    Manage all assessment templates created by educators.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TemplatesList isAdmin={true} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
    } else {
      return (
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to access this area.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Please contact an administrator if you believe this is an error.</p>
            </CardContent>
          </Card>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto pt-10 pb-16">
          <h1 className="text-3xl font-medium text-waypoint-black mb-2">
            Resources
          </h1>
          <p className="text-waypoint-gray mb-10">
            Access and manage assessment resources based on your role.
          </p>
          
          {renderRoleContent()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
