
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, SearchIcon } from "lucide-react";
import { toast } from "sonner";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type Mentor = {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  expertise: string[];
  experience: number;
  availability: string;
  bio: string;
  avatar: string;
};

const mentorData: Mentor[] = [
  {
    id: "1",
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    industry: "Technology",
    expertise: ["Web Development", "React", "Node.js"],
    experience: 8,
    availability: "Evenings and weekends",
    bio: "Passionate about helping junior developers grow their skills in web development with a focus on React ecosystem.",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Sarah Williams",
    title: "Marketing Director",
    company: "Brand Solutions",
    industry: "Marketing",
    expertise: ["Digital Marketing", "Brand Strategy", "Social Media"],
    experience: 12,
    availability: "Tuesday afternoons, Friday mornings",
    bio: "Marketing professional helping newcomers understand the digital landscape and develop effective strategies.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "3",
    name: "Michael Chen",
    title: "Data Scientist",
    company: "Analytics Pro",
    industry: "Data Science",
    expertise: ["Machine Learning", "Python", "Data Visualization"],
    experience: 6,
    availability: "Weekday evenings",
    bio: "Data scientist with a passion for teaching others how to extract meaningful insights from complex datasets.",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "4",
    name: "Priya Patel",
    title: "UX/UI Designer",
    company: "Design Forward",
    industry: "Design",
    expertise: ["User Research", "Wireframing", "Figma", "UI Design"],
    experience: 7,
    availability: "Monday and Wednesday afternoons",
    bio: "Designer helping aspiring UX/UI professionals develop their portfolio and practical skills.",
    avatar: "https://i.pravatar.cc/150?img=10"
  },
  {
    id: "5",
    name: "James Wilson",
    title: "Project Manager",
    company: "Agile Solutions",
    industry: "Project Management",
    expertise: ["Agile Methodology", "Scrum", "Team Leadership"],
    experience: 10,
    availability: "Thursday afternoons",
    bio: "Experienced project manager helping professionals transition into leadership roles.",
    avatar: "https://i.pravatar.cc/150?img=11"
  }
];

const Mentors: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  
  // Filter mentors based on search term and selected industry
  const filteredMentors = mentorData.filter(mentor => {
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      mentor.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    return selectedIndustry === "all" || mentor.industry.toLowerCase() === selectedIndustry.toLowerCase()
      ? matchesSearch
      : false;
  });

  const handleRequestMentorship = (mentorId: string) => {
    toast.success(`Mentorship request sent to ${mentorData.find(m => m.id === mentorId)?.name}`);
  };

  const industries = ["all", ...Array.from(new Set(mentorData.map(mentor => mentor.industry.toLowerCase())))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container max-w-7xl mx-auto py-20 px-4 sm:px-6 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-waypoint-black">Find Your Career Mentor</h1>
          <p className="mt-4 text-lg text-waypoint-gray max-w-2xl mx-auto">
            Connect with experienced professionals who can guide you on your career journey, provide industry insights, and help you achieve your goals.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-waypoint-gray" />
            <Input
              className="pl-10"
              placeholder="Search by name, skill or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full md:w-64" onValueChange={setSelectedIndustry}>
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:flex">
              {industries.map((industry) => (
                <TabsTrigger key={industry} value={industry} className="capitalize">
                  {industry}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="hover-lift">
                <CardHeader className="flex flex-row items-center gap-4">
                  <img
                    src={mentor.avatar}
                    alt={`${mentor.name}'s profile picture`}
                    className="rounded-full w-16 h-16 object-cover"
                  />
                  <div>
                    <CardTitle>{mentor.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {mentor.title} at {mentor.company}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Industry</p>
                    <p className="text-waypoint-gray">{mentor.industry}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="bg-waypoint-light-blue/20 text-waypoint-blue px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Experience</p>
                    <p className="text-waypoint-gray">{mentor.experience} years</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Bio</p>
                    <p className="text-waypoint-gray text-sm">{mentor.bio}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Availability</p>
                    <p className="text-waypoint-gray text-sm">{mentor.availability}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full btn-primary" 
                    onClick={() => handleRequestMentorship(mentor.id)}
                  >
                    Request Mentorship
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-waypoint-gray">No mentors found matching your criteria. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mentors;
