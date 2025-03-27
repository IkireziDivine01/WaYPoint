
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BarChart, Download, Share2 } from "lucide-react";

// Career match interface
export interface CareerMatch {
  title: string;
  match: number;
  description: string;
  skills: string[];
  education: string;
}

interface ResultsCardProps {
  careers: CareerMatch[];
  onRetakeQuiz: () => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ careers, onRetakeQuiz }) => {
  const navigate = useNavigate();
  
  // Sort careers by match percentage (highest first)
  const sortedCareers = [...careers].sort((a, b) => b.match - a.match);
  
  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <div className="glass-card p-8 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium text-waypoint-black">
              Your Career Matches
            </h2>
            <p className="text-waypoint-gray mt-2">
              Based on your assessment, here are careers that match your profile
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2 btn-outline">
              <Download size={16} />
              <span>Save</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 btn-outline">
              <Share2 size={16} />
              <span>Share</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          {sortedCareers.map((career, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg border border-gray-100 hover:border-waypoint-blue/30 transition-all hover:shadow-md hover-lift"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h3 className="text-xl font-medium text-waypoint-black">
                  {career.title}
                </h3>
                <div className="flex items-center bg-waypoint-light-blue/30 text-waypoint-blue rounded-full px-3 py-1 text-sm font-medium">
                  {career.match}% Match
                </div>
              </div>
              
              <div className="mb-4">
                <Progress value={career.match} className="h-2" />
              </div>
              
              <p className="text-waypoint-gray mb-4">
                {career.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
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
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
        <Button 
          variant="outline" 
          onClick={onRetakeQuiz}
          className="btn-outline w-full sm:w-auto"
        >
          Retake Assessment
        </Button>
        <Button 
          onClick={() => navigate("/dashboard")}
          className="btn-primary w-full sm:w-auto"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ResultsCard;
