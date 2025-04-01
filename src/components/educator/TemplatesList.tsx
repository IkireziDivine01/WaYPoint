
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader, Edit, Trash2, Eye, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Template {
  id: string;
  title: string;
  description: string | null;
  question_ids: string[];
  published: boolean;
  created_at: string;
}

interface TemplatesListProps {
  isAdmin?: boolean;
}

const TemplatesList: React.FC<TemplatesListProps> = ({ isAdmin = false }) => {
  const { currentUser } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewTemplate, setViewTemplate] = useState<Template | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, [currentUser]);

  const fetchTemplates = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      // If admin, fetch all templates, otherwise fetch only the user's templates
      const query = isAdmin
        ? supabase.from("assessment_templates").select("*").order("created_at", { ascending: false })
        : supabase
            .from("assessment_templates")
            .select("*")
            .eq("creator_id", currentUser.id)
            .order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      
      setTemplates(data || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("Failed to load templates");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    
    try {
      const { error } = await supabase
        .from("assessment_templates")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setTemplates(templates.filter(t => t.id !== id));
      toast.success("Template deleted successfully");
    } catch (error) {
      console.error("Error deleting template:", error);
      toast.error("Failed to delete template");
    }
  };

  const handlePublishToggle = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from("assessment_templates")
        .update({ published: !currentState })
        .eq("id", id);

      if (error) throw error;
      
      setTemplates(templates.map(t => 
        t.id === id ? { ...t, published: !currentState } : t
      ));
      
      toast.success(`Template ${!currentState ? "published" : "unpublished"} successfully`);
    } catch (error) {
      console.error("Error updating template status:", error);
      toast.error("Failed to update template status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader size={40} className="animate-spin text-waypoint-blue" />
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-waypoint-gray mb-4">No templates found.</p>
        {!isAdmin && (
          <p>Create your first template using the form on the left.</p>
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
              <TableHead>Title</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium truncate max-w-[200px]">
                  {template.title}
                </TableCell>
                <TableCell>{template.question_ids?.length || 0} questions</TableCell>
                <TableCell>
                  {template.published ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Draft
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setViewTemplate(template)}>
                        <Eye size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Template Details</DialogTitle>
                        <DialogDescription>
                          View the template details.
                        </DialogDescription>
                      </DialogHeader>
                      {viewTemplate && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="font-medium">Title:</h4>
                            <p>{viewTemplate.title}</p>
                          </div>
                          {viewTemplate.description && (
                            <div>
                              <h4 className="font-medium">Description:</h4>
                              <p>{viewTemplate.description}</p>
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium">Questions:</h4>
                            <p>{viewTemplate.question_ids.length} questions included</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Status:</h4>
                            <p>{viewTemplate.published ? "Published" : "Draft"}</p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  {!isAdmin && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handlePublishToggle(template.id, template.published)}
                      >
                        {template.published ? <X size={16} /> : <Check size={16} />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TemplatesList;
