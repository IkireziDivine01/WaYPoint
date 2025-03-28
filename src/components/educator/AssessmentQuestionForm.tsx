
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Loader } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
};

const AssessmentQuestionForm = () => {
  const { currentUser } = useAuth();
  const [questionText, setQuestionText] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState<Option[]>([
    { id: crypto.randomUUID(), text: "", isCorrect: false },
    { id: crypto.randomUUID(), text: "", isCorrect: false },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, { id: crypto.randomUUID(), text: "", isCorrect: false }]);
    } else {
      toast.error("Maximum 5 options allowed per question");
    }
  };

  const handleRemoveOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== id));
    } else {
      toast.error("Minimum 2 options required");
    }
  };

  const handleOptionChange = (id: string, text: string) => {
    setOptions(
      options.map(option =>
        option.id === id ? { ...option, text } : option
      )
    );
  };

  const handleCorrectOptionChange = (id: string) => {
    setOptions(
      options.map(option =>
        option.id === id
          ? { ...option, isCorrect: true }
          : { ...option, isCorrect: false }
      )
    );
  };

  const validateForm = () => {
    if (!questionText.trim()) {
      toast.error("Question text is required");
      return false;
    }

    if (!category.trim()) {
      toast.error("Category is required");
      return false;
    }

    const emptyOptions = options.some(option => !option.text.trim());
    if (emptyOptions) {
      toast.error("All options must have text");
      return false;
    }

    const hasCorrectOption = options.some(option => option.isCorrect);
    if (!hasCorrectOption) {
      toast.error("Please select a correct answer");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!currentUser) {
      toast.error("You must be logged in to create questions");
      return;
    }

    setIsSubmitting(true);

    try {
      // Format options for database
      const formattedOptions = options.map(option => ({
        text: option.text,
        isCorrect: option.isCorrect
      }));

      // Save question to database
      const { data, error } = await supabase
        .from("assessment_questions")
        .insert({
          creator_id: currentUser.id,
          question_text: questionText,
          category,
          options: formattedOptions
        })
        .select();

      if (error) throw error;

      toast.success("Question created successfully");
      
      // Reset form
      setQuestionText("");
      setCategory("");
      setOptions([
        { id: crypto.randomUUID(), text: "", isCorrect: false },
        { id: crypto.randomUUID(), text: "", isCorrect: false },
      ]);
    } catch (error) {
      console.error("Error creating question:", error);
      toast.error("Failed to create question");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="question-text">Question</Label>
        <Textarea
          id="question-text"
          placeholder="Enter your question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          placeholder="e.g., Technical, Soft Skills, Personality"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-3">
        <Label>Options</Label>
        {options.map((option, index) => (
          <div key={option.id} className="flex items-start space-x-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="correct-option"
                  checked={option.isCorrect}
                  onChange={() => handleCorrectOptionChange(option.id)}
                  className="mt-1"
                />
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option.text}
                  onChange={(e) => handleOptionChange(option.id, e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveOption(option.id)}
              disabled={options.length <= 2 || isSubmitting}
              className="mt-1"
            >
              <X size={16} />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddOption}
          disabled={options.length >= 5 || isSubmitting}
          className="w-full mt-2"
        >
          <Plus size={16} className="mr-1" /> Add Option
        </Button>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader size={16} className="mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          "Create Question"
        )}
      </Button>
    </form>
  );
};

export default AssessmentQuestionForm;
