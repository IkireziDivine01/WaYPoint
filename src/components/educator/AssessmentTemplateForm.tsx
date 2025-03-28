
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Question = {
  id: string;
  question_text: string;
  category: string;
};

const AssessmentTemplateForm = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, [currentUser]);

  const fetchQuestions = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("assessment_questions")
        .select("id, question_text, category")
        .eq("creator_id", currentUser.id);

      if (error) throw error;
      
      setAvailableQuestions(data || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectQuestion = (question: Question) => {
    if (selectedQuestionIds.includes(question.id)) {
      // Remove question if already selected
      setSelectedQuestionIds(selectedQuestionIds.filter(id => id !== question.id));
      setSelectedQuestions(selectedQuestions.filter(q => q.id !== question.id));
    } else {
      // Add question
      setSelectedQuestionIds([...selectedQuestionIds, question.id]);
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleRemoveQuestion = (id: string) => {
    setSelectedQuestionIds(selectedQuestionIds.filter(qId => qId !== id));
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
  };

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return false;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return false;
    }

    if (selectedQuestionIds.length === 0) {
      toast.error("Please select at least one question");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!currentUser) {
      toast.error("You must be logged in to create templates");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save template to database
      const { data, error } = await supabase
        .from("assessment_templates")
        .insert({
          creator_id: currentUser.id,
          title,
          description,
          question_ids: selectedQuestionIds,
          published
        })
        .select();

      if (error) throw error;

      toast.success("Template created successfully");
      
      // Reset form
      setTitle("");
      setDescription("");
      setPublished(false);
      setSelectedQuestionIds([]);
      setSelectedQuestions([]);
    } catch (error) {
      console.error("Error creating template:", error);
      toast.error("Failed to create template");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredQuestions = availableQuestions.filter(question => 
    question.question_text.toLowerCase().includes(search.toLowerCase()) ||
    question.category.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Loader size={24} className="animate-spin text-waypoint-blue" />
      </div>
    );
  }

  if (availableQuestions.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-waypoint-gray mb-2">No questions available.</p>
        <p>Create questions first before creating a template.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Template Title</Label>
        <Input
          id="title"
          placeholder="Enter template title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter template description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Questions</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className="w-full justify-start text-left font-normal"
            >
              {selectedQuestionIds.length > 0
                ? `${selectedQuestionIds.length} question(s) selected`
                : "Select questions"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Search questions..." 
                value={search}
                onValueChange={setSearch}
              />
              <CommandList>
                <CommandEmpty>No questions found.</CommandEmpty>
                <CommandGroup>
                  {filteredQuestions.map((question) => (
                    <CommandItem
                      key={question.id}
                      value={question.id}
                      onSelect={() => handleSelectQuestion(question)}
                    >
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          checked={selectedQuestionIds.includes(question.id)}
                          onChange={() => {}}
                          className="mr-2 mt-1"
                        />
                        <div>
                          <p className="truncate max-w-[300px]">{question.question_text}</p>
                          <p className="text-xs text-muted-foreground">{question.category}</p>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedQuestions.length > 0 && (
        <div className="border rounded-md p-3">
          <p className="text-sm font-medium mb-2">Selected Questions:</p>
          <ul className="space-y-2">
            {selectedQuestions.map(question => (
              <li key={question.id} className="flex justify-between items-center text-sm">
                <span className="truncate max-w-[250px]">{question.question_text}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveQuestion(question.id)}
                >
                  &times;
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          checked={published}
          onCheckedChange={setPublished}
        />
        <Label htmlFor="published">Publish template (visible to students)</Label>
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
          "Create Template"
        )}
      </Button>
    </form>
  );
};

export default AssessmentTemplateForm;
