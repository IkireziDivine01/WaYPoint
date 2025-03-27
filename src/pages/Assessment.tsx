
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuizCard, { Question } from "@/components/assessment/QuizCard";
import ResultsCard, { CareerMatch } from "@/components/assessment/ResultsCard";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Sample questions for the assessment
const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "How do you prefer to solve problems?",
    options: [
      "By analyzing data and facts",
      "By thinking creatively and outside the box",
      "By discussing with others to find solutions",
      "By following established procedures and methods"
    ]
  },
  {
    id: 2,
    question: "Which of these work environments appeals to you most?",
    options: [
      "A structured environment with clear rules and expectations",
      "A flexible environment that allows for creativity and innovation",
      "A collaborative environment with team-based projects",
      "An independent environment where I can work at my own pace"
    ]
  },
  {
    id: 3,
    question: "When working on projects, what aspect do you enjoy most?",
    options: [
      "Planning and organizing the details",
      "Coming up with new ideas and concepts",
      "Collaborating with others and sharing thoughts",
      "Implementing and executing the plan"
    ]
  },
  {
    id: 4,
    question: "Which of these skills would you most like to develop further?",
    options: [
      "Technical or specialized skills",
      "Creative thinking and design skills",
      "Communication and interpersonal skills",
      "Leadership and management skills"
    ]
  },
  {
    id: 5,
    question: "How do you prefer to learn new information?",
    options: [
      "Through hands-on experience and practice",
      "Through reading and researching independently",
      "Through discussion and collaborative learning",
      "Through structured courses and guided instruction"
    ]
  },
  {
    id: 6,
    question: "Which type of task gives you the most satisfaction?",
    options: [
      "Solving complex problems",
      "Creating something new and innovative",
      "Helping others achieve their goals",
      "Improving systems and processes"
    ]
  },
  {
    id: 7,
    question: "What type of recognition motivates you most?",
    options: [
      "Recognition for technical expertise",
      "Recognition for creative contributions",
      "Recognition for teamwork and collaboration",
      "Recognition for efficiency and reliability"
    ]
  },
  {
    id: 8,
    question: "Which of these subjects interests you the most?",
    options: [
      "Science and mathematics",
      "Arts and humanities",
      "Social sciences and communication",
      "Business and economics"
    ]
  },
];

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

const Assessment = () => {
  const { currentUser } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(QUIZ_QUESTIONS.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const handleSelectAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Show results when all questions are answered
      setShowResults(true);
      toast.success("Assessment completed! Here are your career matches.");
    }
  };

  const handleRetakeQuiz = () => {
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 bg-waypoint-light-gray/20">
        <div className="max-w-7xl mx-auto">
          {!showResults ? (
            // Show quiz questions
            <div className="max-w-3xl mx-auto pt-8">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-medium text-waypoint-black mb-4">
                  Career Assessment Quiz
                </h1>
                <p className="text-waypoint-gray max-w-md mx-auto">
                  Answer the following questions to discover career paths that align with your interests and strengths.
                </p>
              </div>
              
              <QuizCard
                question={QUIZ_QUESTIONS[currentQuestionIndex]}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={QUIZ_QUESTIONS.length}
                selectedAnswer={answers[currentQuestionIndex]}
                onSelectAnswer={handleSelectAnswer}
                onNextQuestion={handleNextQuestion}
              />
            </div>
          ) : (
            // Show results
            <div className="pt-8">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-medium text-waypoint-black mb-4">
                  Your Career Assessment Results
                </h1>
                <p className="text-waypoint-gray max-w-md mx-auto">
                  Based on your responses, we've identified these career paths that match your profile.
                </p>
              </div>
              
              <ResultsCard
                careers={SAMPLE_CAREERS}
                onRetakeQuiz={handleRetakeQuiz}
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Assessment;
