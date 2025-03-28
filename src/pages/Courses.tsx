
import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Check, Clock, Filter, GraduationCap, BookOpen, Search, BookUser, Library } from "lucide-react";

// Sample courses data
const COURSES = [
  {
    id: "c001",
    title: "Introduction to Web Development",
    provider: "Tech Academy",
    category: "Technology",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.7,
    enrolled: 5280,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=240",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript to build your own responsive websites.",
    recommended: true,
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"]
  },
  {
    id: "c002",
    title: "Data Science Fundamentals",
    provider: "DataLearn",
    category: "Data",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.8,
    enrolled: 3420,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=240",
    description: "Master the essentials of data analysis, visualization, and machine learning algorithms to start your data science career.",
    recommended: true,
    skills: ["Python", "Statistics", "Data Visualization", "Machine Learning"]
  },
  {
    id: "c003",
    title: "UX/UI Design Principles",
    provider: "Design School",
    category: "Design",
    level: "Beginner",
    duration: "4 weeks",
    rating: 4.6,
    enrolled: 2150,
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=240",
    description: "Learn user-centered design principles and create engaging digital experiences that delight users.",
    recommended: false,
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design"]
  },
  {
    id: "c004",
    title: "Project Management Professional",
    provider: "PM Institute",
    category: "Business",
    level: "Advanced",
    duration: "10 weeks",
    rating: 4.5,
    enrolled: 1980,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=240",
    description: "Prepare for the PMP certification and learn advanced project management methodologies, tools, and techniques.",
    recommended: false,
    skills: ["Project Planning", "Risk Management", "Stakeholder Management", "Agile"]
  },
  {
    id: "c005",
    title: "Digital Marketing Essentials",
    provider: "Marketing Pro",
    category: "Marketing",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.4,
    enrolled: 3750,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=240",
    description: "Learn digital marketing strategies including SEO, social media, email marketing, and analytics to grow your online presence.",
    recommended: true,
    skills: ["SEO", "Social Media", "Content Marketing", "Analytics"]
  },
  {
    id: "c006",
    title: "Cloud Computing Architecture",
    provider: "Cloud Academy",
    category: "Technology",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.9,
    enrolled: 2340,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=240",
    description: "Master cloud infrastructure design, deployment, and management across major cloud platforms.",
    recommended: false,
    skills: ["AWS", "Azure", "Cloud Security", "Serverless Architecture"]
  }
];

// Sample workshops data
const WORKSHOPS = [
  {
    id: "w001",
    title: "Agile Development Workshop",
    date: "June 15, 2023",
    location: "Online",
    duration: "3 hours",
    provider: "Agile Experts",
    description: "A hands-on workshop covering Scrum, Kanban, and implementing agile practices in your organization."
  },
  {
    id: "w002",
    title: "AI for Business Leaders",
    date: "July 8, 2023",
    location: "Online",
    duration: "4 hours",
    provider: "AI Academy",
    description: "Learn how to leverage AI technologies to drive business growth and operational efficiency."
  },
  {
    id: "w003",
    title: "Design Thinking Masterclass",
    date: "June 22, 2023",
    location: "New York",
    duration: "Full day",
    provider: "Innovation Lab",
    description: "A comprehensive workshop on applying design thinking methodology to solve complex business problems."
  }
];

const Courses = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  
  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Filter courses based on search query, category, and level
  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  // Categories for filter
  const categories = ["All", "Technology", "Data", "Design", "Business", "Marketing"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-waypoint-light-gray/20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-waypoint-black">
              Skill Development Resources
            </h1>
            <p className="text-waypoint-gray mt-2">
              Discover courses, workshops, and training programs to help you achieve your career goals
            </p>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="courses" className="w-full mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>Courses</span>
              </TabsTrigger>
              <TabsTrigger value="workshops" className="flex items-center gap-2">
                <GraduationCap size={16} />
                <span>Workshops</span>
              </TabsTrigger>
              <TabsTrigger value="enrolled" className="flex items-center gap-2">
                <BookUser size={16} />
                <span>My Enrollments</span>
              </TabsTrigger>
              <TabsTrigger value="recommended" className="flex items-center gap-2">
                <Library size={16} />
                <span>Recommended</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-waypoint-gray" />
                  <Input
                    placeholder="Search courses, skills or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select 
                    className="py-2 px-4 border border-gray-300 rounded-md text-waypoint-gray bg-white"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select 
                    className="py-2 px-4 border border-gray-300 rounded-md text-waypoint-gray bg-white"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <Button variant="outline" size="icon">
                    <Filter size={18} />
                  </Button>
                </div>
              </div>
              
              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="hover-lift overflow-hidden flex flex-col">
                    <div className="h-40 w-full overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        {course.recommended && (
                          <Badge variant="secondary" className="bg-waypoint-light-blue/30 text-waypoint-blue">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex justify-between items-center">
                        <span>{course.provider}</span>
                        <span className="text-yellow-500">★ {course.rating}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <p className="text-waypoint-gray text-sm mb-4">
                        {course.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {course.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-100 text-waypoint-gray">
                            {skill}
                          </Badge>
                        ))}
                        {course.skills.length > 3 && (
                          <Badge variant="outline" className="bg-gray-100 text-waypoint-gray">
                            +{course.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between items-center border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-waypoint-gray">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.level}</span>
                      </div>
                      <Link to={`/course/${course.id}`}>
                        <Button size="sm">Enroll Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-waypoint-gray">No courses found matching your criteria. Try adjusting your filters.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Workshops Tab */}
            <TabsContent value="workshops">
              <div className="space-y-6">
                {WORKSHOPS.map((workshop) => (
                  <Card key={workshop.id} className="hover-lift">
                    <CardHeader>
                      <CardTitle>{workshop.title}</CardTitle>
                      <CardDescription className="flex justify-between">
                        <span>{workshop.provider}</span>
                        <span>{workshop.date} • {workshop.location}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-waypoint-gray">{workshop.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center text-waypoint-gray">
                        <Clock size={16} className="mr-2" />
                        <span>{workshop.duration}</span>
                      </div>
                      <Button>Register</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* My Enrollments Tab */}
            <TabsContent value="enrolled">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 rounded-md overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=240" 
                          alt="Web Development" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-waypoint-black">Introduction to Web Development</h3>
                        <p className="text-waypoint-gray text-sm">Tech Academy</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">In Progress</Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-waypoint-gray mb-1">
                      <span>Progress</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-waypoint-blue h-2 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-waypoint-gray">Last accessed: 2 days ago</div>
                    <Button variant="outline">Continue Learning</Button>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 rounded-md overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=240" 
                          alt="Digital Marketing" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-waypoint-black">Digital Marketing Essentials</h3>
                        <p className="text-waypoint-gray text-sm">Marketing Pro</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-waypoint-gray mb-1">
                      <span>Progress</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-waypoint-gray">Completed on May 15, 2023</span>
                    </div>
                    <Button variant="outline">View Certificate</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Recommended Tab */}
            <TabsContent value="recommended">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COURSES.filter(course => course.recommended).map((course) => (
                  <Card key={course.id} className="hover-lift overflow-hidden flex flex-col">
                    <div className="h-40 w-full overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <Badge variant="secondary" className="bg-waypoint-light-blue/30 text-waypoint-blue">
                          Recommended
                        </Badge>
                      </div>
                      <CardDescription className="flex justify-between items-center">
                        <span>{course.provider}</span>
                        <span className="text-yellow-500">★ {course.rating}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <p className="text-waypoint-gray text-sm">
                        {course.description}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-waypoint-gray">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                      </div>
                      <Button size="sm">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
