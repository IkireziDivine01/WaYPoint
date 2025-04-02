
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BadgeCheck, BookOpen, GraduationCap, Briefcase, Code, LineChart, Users, Heart, Globe, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Learning = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  // Filter careers based on selected interests
  const filteredCareers = selectedInterests.length > 0
    ? careerOptions.filter(career => 
        career.interests.some(interest => selectedInterests.includes(interest))
      )
    : careerOptions;

  return (
    <Layout>
      <Helmet>
        <title>Learning Center | WayPoint</title>
        <meta
          name="description"
          content="Explore career options based on your interests and learn about different fields."
        />
      </Helmet>
      
      <section className="bg-gradient-to-r from-waypoint-blue to-blue-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Career Learning Center
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover potential career paths that align with your interests and skills.
            Explore detailed information about various fields to find your perfect match.
          </p>
        </div>
      </section>
      
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="explore" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="explore" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Explore Careers
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learning Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-waypoint-blue mb-6">Select Your Interests</h2>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <Button
                    key={interest.name}
                    variant={selectedInterests.includes(interest.name) ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => toggleInterest(interest.name)}
                  >
                    <interest.icon className="h-4 w-4" />
                    {interest.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-waypoint-blue mb-6">
              {selectedInterests.length > 0 
                ? "Matching Career Paths" 
                : "Popular Career Paths"
              }
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareers.map((career) => (
                <Card key={career.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-waypoint-light-blue/30">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-waypoint-blue">{career.title}</CardTitle>
                      <career.icon className="h-6 w-6 text-waypoint-blue" />
                    </div>
                    <CardDescription>{career.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Related Interests</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.interests.map((interest, index) => (
                            <Badge 
                              key={index} 
                              variant={selectedInterests.includes(interest) ? "default" : "secondary"}
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{career.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Growth Outlook:</span> {career.growthOutlook}
                    </p>
                    <Button variant="ghost" className="text-waypoint-blue">Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-waypoint-blue" />
                    Educational Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {educationalResources.map((resource, index) => (
                      <li key={index} className="border-b pb-4 border-gray-100 last:border-0 last:pb-0">
                        <h4 className="font-medium text-waypoint-blue">{resource.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                        <a 
                          href="#" 
                          className="text-sm font-medium text-waypoint-blue hover:underline"
                        >
                          Learn More
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-waypoint-blue" />
                    Career Development Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {careerTips.map((tip, index) => (
                      <li key={index} className="flex gap-3">
                        <BadgeCheck className="h-5 w-5 text-waypoint-blue flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-waypoint-black">{tip.title}</h4>
                          <p className="text-sm text-gray-600">{tip.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Interest categories with icons
const interests = [
  { name: "Technology", icon: Code },
  { name: "Business", icon: Briefcase },
  { name: "Data", icon: LineChart },
  { name: "Healthcare", icon: Heart },
  { name: "People", icon: Users },
  { name: "Global Issues", icon: Globe },
  { name: "Creativity", icon: Palette }
];

// Career options data
const careerOptions = [
  {
    title: "Software Developer",
    shortDescription: "Build and maintain applications and systems",
    description: "Software developers create applications and systems that run on computers and other devices. They apply principles of computer science and mathematics to design, develop, and test software solutions.",
    skills: ["Coding", "Problem-solving", "Collaboration", "Testing"],
    interests: ["Technology", "Data"],
    growthOutlook: "Very Strong",
    icon: Code
  },
  {
    title: "Data Scientist",
    shortDescription: "Analyze data to extract meaningful insights",
    description: "Data scientists collect, analyze, and interpret large datasets to help organizations make better decisions. They use statistical methods, machine learning, and programming to extract insights from data.",
    skills: ["Statistics", "Programming", "Machine Learning", "Data Visualization"],
    interests: ["Data", "Technology", "Business"],
    growthOutlook: "Strong",
    icon: LineChart
  },
  {
    title: "UX Designer",
    shortDescription: "Design user-friendly digital experiences",
    description: "UX designers focus on creating intuitive, accessible, and enjoyable user experiences for websites and applications. They conduct user research, create wireframes, and collaborate with developers to implement their designs.",
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    interests: ["Creativity", "Technology", "People"],
    growthOutlook: "Strong",
    icon: Palette
  },
  {
    title: "Healthcare Administrator",
    shortDescription: "Manage healthcare facilities and services",
    description: "Healthcare administrators oversee the business operations of medical facilities, ensuring they run efficiently while providing quality patient care. They manage budgets, staff, and compliance with regulations.",
    skills: ["Leadership", "Communication", "Finance", "Healthcare Knowledge"],
    interests: ["Healthcare", "Business", "People"],
    growthOutlook: "Moderate",
    icon: Briefcase
  },
  {
    title: "Environmental Scientist",
    shortDescription: "Study environmental issues and develop solutions",
    description: "Environmental scientists study the environment and how human activities affect it. They conduct research, analyze data, and develop solutions to environmental problems such as pollution and climate change.",
    skills: ["Research", "Data Analysis", "Field Work", "Communication"],
    interests: ["Global Issues", "Data", "Healthcare"],
    growthOutlook: "Moderate",
    icon: Globe
  },
  {
    title: "Human Resources Specialist",
    shortDescription: "Manage employee relations and organizational culture",
    description: "Human resources specialists recruit, screen, and interview job applicants, and handle employee relations, compensation and benefits, and training. They work to create positive workplace cultures and ensure compliance with labor laws.",
    skills: ["Communication", "Interpersonal", "Organization", "Problem-solving"],
    interests: ["People", "Business"],
    growthOutlook: "Stable",
    icon: Users
  }
];

// Educational resources data
const educationalResources = [
  {
    title: "Online Learning Platforms",
    description: "Discover courses from providers like Coursera, edX, and Udemy that can help you gain skills in your area of interest."
  },
  {
    title: "Professional Certifications",
    description: "Learn about industry-recognized certifications that can boost your career prospects in various fields."
  },
  {
    title: "Free Educational Resources",
    description: "Explore free resources like Khan Academy, MIT OpenCourseWare, and YouTube educational channels."
  },
  {
    title: "Academic Programs",
    description: "Find information about degree programs, bootcamps, and other formal education options for different career paths."
  }
];

// Career development tips
const careerTips = [
  {
    title: "Build a Professional Network",
    description: "Connect with professionals in your field of interest through LinkedIn, industry events, and informational interviews."
  },
  {
    title: "Develop Transferable Skills",
    description: "Focus on skills that are valuable across multiple industries, such as communication, problem-solving, and adaptability."
  },
  {
    title: "Create a Learning Plan",
    description: "Set specific goals for skill development and create a structured plan to achieve them through courses, practice, and projects."
  },
  {
    title: "Gain Practical Experience",
    description: "Seek internships, volunteer opportunities, or personal projects to apply your knowledge and build your portfolio."
  },
  {
    title: "Reflect on Your Progress",
    description: "Regularly assess your skill development, adjust your learning plan as needed, and celebrate your achievements."
  }
];

export default Learning;
