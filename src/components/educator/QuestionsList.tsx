
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader, Edit, Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Question {
  id: string;
  question_text: string;
  category: string;
  options: Array<{ text: string; isCorrect: boolean }>;
  created_at: string;
}

interface QuestionsListProps {
  isAdmin?: boolean;
}

const QuestionsList: React.FC<QuestionsListProps> = ({ isAdmin = false }) => {
  const { currentUser } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewQuestion, setViewQuestion] = useState<Question | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, [currentUser]);

  const fetchQuestions = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      // If admin, fetch all questions, otherwise fetch only the user's questions
      const query = isAdmin
        ? supabase.from("assessment_questions").select("*").order("created_at", { ascending: false })
        : supabase
            .from("assessment_questions")
            .select("*")
            .eq("creator_id", currentUser.id)
            .order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      
      // Transform the data to match our Question interface
      const transformedData = data ? data.map(item => ({
        id: item.id,
        question_text: item.question_text,
        category: item.category || "",
        options: Array.isArray(item.options) ? item.options : [],
        created_at: item.created_at
      })) : [];
      
      setQuestions(transformedData);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    
    try {
      const { error } = await supabase
        .from("assessment_questions")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setQuestions(questions.filter(q => q.id !== id));
      toast.success("Question deleted successfully");
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader size={40} className="animate-spin text-waypoint-blue" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-waypoint-gray mb-4">No questions found.</p>
        {!isAdmin && (
          <p>Create your first question using the form on the left.</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Options</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="font-medium truncate max-w-[200px]">
                  {question.question_text}
                </TableCell>
                <TableCell>{question.category}</TableCell>
                <TableCell>{question.options?.length || 0} options</TableCell>
                <TableCell className="text-right space-x-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setViewQuestion(question)}>
                        <Eye size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Question Details</DialogTitle>
                        <DialogDescription>
                          View the full question and its options.
                        </DialogDescription>
                      </DialogHeader>
                      {viewQuestion && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="font-medium">Question:</h4>
                            <p>{viewQuestion.question_text}</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Category:</h4>
                            <p>{viewQuestion.category}</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Options:</h4>
                            <ul className="mt-2 space-y-2">
                              {viewQuestion.options.map((option, idx) => (
                                <li
                                  key={idx}
                                  className={`pl-2 border-l-2 ${
                                    option.isCorrect
                                      ? "border-green-500 text-green-700"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {option.text}
                                  {option.isCorrect && " (Correct)"}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" disabled={isAdmin}>
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteQuestion(question.id)}
                    disabled={isAdmin}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QuestionsList;
