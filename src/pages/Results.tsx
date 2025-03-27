
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CareerMatch } from "@/components/assessment/ResultsCard";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, BarChart3, Calendar, Download, PieChart, Share2 } from "lucide-react";

// Sample career matches based on assessment
const SAMPLE_CAREERS: CareerMatch[] = [
  {
    title: "Software Developer",
    match: 92,
    description: "Design, develop, and maintain software applications using programming languages and development tools. Software developers create everything from mobile apps to enterprise systems.",
    skills: ["Programming", "Problem-solving", "Analytical thinking", "Attention to detail"],
    education: "Bachelor's degree in Computer Science, Software Engineering, or related field; many developers also gain skills through bootcamps or self-teaching."
  },
  {
    title: "Data Analyst",
    match: 87,
    description: "Analyze data to identify trends, create visualizations, and generate insights that inform business decisions. Data analysts work across industries to help organizations leverage their data.",
    skills: ["Statistical analysis", "Data visualization", "SQL", "Excel", "Critical thinking"],
    education: "Bachelor's degree in Statistics, Mathematics, Computer Science, Economics, or a related field; specialized certifications can also be valuable."
  },
  {
    title: "UX Designer",
    match: 84,
    description: "Create user-centered designs for digital products and services. UX designers conduct research, create wireframes and prototypes, and collaborate with developers to implement designs.",
    skills: ["User research", "Wireframing", "Prototyping", "Visual design", "Empathy"],
    education: "Bachelor's degree in Design, Human-Computer Interaction, or related field; many designers also have specialized UX certificates or bootcamp training."
  },
  {
    title: "Digital Marketing Specialist",
    match: 79,
    description: "Develop and implement digital marketing campaigns across various channels. Digital marketers manage social media, email marketing, content creation, and analyze campaign performance.",
    skills: ["Content creation", "Social media management", "Analytics", "SEO/SEM", "Communication"],
    education: "Bachelor's degree in Marketing, Communications, or Business; specialized digital marketing certifications are highly valued."
  },
  {
    title: "Project Manager",
    match: 73,
    description: "Plan, execute, and close projects while ensuring they're delivered on time, within scope, and on budget. Project managers work across industries coordinating teams and resources.",
    skills: ["Leadership", "Organization", "Communication", "Problem-solving", "Risk management"],
    education: "Bachelor's degree in Business, Management, or field related to the industry; PMP or other project management certifications are often required."
  }
];

// Sample assessment history
const ASSESSMENT_HISTORY = [
  {
    id: "career-interests-1",
    name: "Career Interests Assessment",
    date: "May 15, 2023",
    type: "Interest"
  },
  {
    id: "skills-assessment-1",
    name: "Skills Assessment",
    date: "June 3, 2023",
    type: "Skills"
  },
  {
    id: "values-inventory-1",
    name: "Work Values Inventory",
    date: "June 20, 2023",
    type: "Values"
  }
];

const Results = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-waypoint-light-gray/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-medium text-waypoint-black">Your Assessment Results</h1>
              <p className="text-waypoint-gray mt-2">
                Review your career assessment results and saved career matches
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={() => navigate("/assessment")} 
                className="btn-primary"
              >
                Take New Assessment
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="results" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="results" className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-waypoint-black">Your Career Matches</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Download size={16} />
                    <span>Export</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Share2 size={16} />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {SAMPLE_CAREERS.map((career, index) => (
                  <div 
                    key={index}
                    className="glass-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover-lift"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                      <h3 className="text-xl font-medium text-waypoint-black">
                        {career.title}
                      </h3>
                      <Badge variant="secondary" className="bg-waypoint-light-blue/30 text-waypoint-blue hover:bg-waypoint-light-blue/50">
                        {career.match}% Match
                      </Badge>
                    </div>
                    
                    <p className="text-waypoint-gray mb-6">
                      {career.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <h4 className="text-waypoint-black font-medium mb-2">Skills Required</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="bg-gray-100 text-waypoint-gray rounded-full px-3 py-1 text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-waypoint-black font-medium mb-2">Education Path</h4>
                        <p className="text-waypoint-gray text-sm">{career.education}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                      <Button variant="outline" className="btn-outline">
                        View Detailed Information
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <div className="glass-card p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-medium text-waypoint-black mb-6">Assessment History</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-waypoint-gray uppercase tracking-wider">
                          Assessment Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-waypoint-gray uppercase tracking-wider">
                          Date Taken
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-waypoint-gray uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-waypoint-gray uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {ASSESSMENT_HISTORY.map((assessment) => (
                        <tr key={assessment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-waypoint-black">
                            {assessment.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-waypoint-gray">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-2 text-waypoint-blue" />
                              {assessment.date}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-waypoint-gray">
                            {assessment.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-waypoint-blue hover:text-waypoint-blue hover:bg-waypoint-light-blue/20">
                              View Results
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="animate-fade-in">
              <div className="glass-card p-6 rounded-xl shadow-sm mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium text-waypoint-black">Career Interest Categories</h2>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <PieChart size={16} />
                    <span>View Full Report</span>
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-waypoint-black">Technology</span>
                      <span className="text-waypoint-blue">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-waypoint-blue h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-waypoint-black">Design</span>
                      <span className="text-waypoint-blue">72%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-waypoint-blue h-2 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-waypoint-black">Business</span>
                      <span className="text-waypoint-blue">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-waypoint-blue h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-waypoint-black">Education</span>
                      <span className="text-waypoint-blue">58%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-waypoint-blue h-2 rounded-full" style={{ width: "58%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-waypoint-black">Healthcare</span>
                      <span className="text-waypoint-blue">42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-waypoint-blue h-2 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium text-waypoint-black">Skills Analysis</h2>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <BarChart3 size={16} />
                    <span>View Full Report</span>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-waypoint-black mb-4">Strongest Skills</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between">
                        <span className="text-waypoint-black">Problem Solving</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">High</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-waypoint-black">Critical Thinking</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">High</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-waypoint-black">Technical Aptitude</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">High</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-waypoint-black">Creativity</span>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Medium</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-waypoint-black">Adaptability</span>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Medium</Badge>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-waypoint-black mb-4">Areas for Growth</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between">
                        <span className="text-waypoint-black">Public Speaking</span>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Low</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-waypoint-black">Leadership</span>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Medium</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-waypoint-black">Project Management</span>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Medium</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-waypoint-black">Data Analysis</span>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Medium</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-waypoint-black">Negotiation</span>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Low</Badge>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
