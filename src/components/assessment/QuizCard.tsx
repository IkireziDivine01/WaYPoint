
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, ChevronRight, ArrowRight } from "lucide-react";

// Question type definition
export interface Question {
  id: number;
  question: string;
  options: string[];
}

// Props interface
interface QuizCardProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onNextQuestion: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
}) => {
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle next question with animation
  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onNextQuestion();
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className={`glass-card p-6 rounded-xl shadow-sm transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      {/* Progress indicator */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-waypoint-gray">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-waypoint-blue transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Question */}
      <h3 className="text-xl md:text-2xl font-medium text-waypoint-black mb-8">
        {question.question}
      </h3>
      
      {/* Options */}
      <RadioGroup 
        value={selectedAnswer || ""}
        onValueChange={onSelectAnswer}
        className="space-y-4"
      >
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`
              relative rounded-lg border border-gray-200 transition-all duration-200
              ${selectedAnswer === option 
                ? 'border-waypoint-blue bg-waypoint-light-blue/20' 
                : 'hover:border-gray-300 hover:bg-gray-50'}
            `}
          >
            <div className="flex p-4">
              <div className="mr-4 flex h-6 w-6 items-center justify-center">
                <RadioGroupItem 
                  value={option} 
                  id={`option-${question.id}-${index}`} 
                  className={selectedAnswer === option ? "text-waypoint-blue" : ""}
                />
              </div>
              <Label 
                htmlFor={`option-${question.id}-${index}`}
                className="flex-1 cursor-pointer py-1"
              >
                {option}
              </Label>
              {selectedAnswer === option && (
                <div className="flex h-6 w-6 items-center justify-center text-waypoint-blue animate-fade-in">
                  <Check size={16} />
                </div>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>
      
      {/* Next button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="btn-primary group"
        >
          {currentQuestionIndex === totalQuestions - 1 ? "See Results" : "Next Question"}
          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
