
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const ShareTestimonial = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = React.useState({
    title: "",
    story: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.story) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to share your testimonial.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send data to an API
    toast({
      title: "Testimonial submitted!",
      description: "Thank you for sharing your career journey with us.",
    });
    
    // Reset form
    setFormData({
      title: "",
      story: ""
    });
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-waypoint-light-blue/30 pb-4">
        <CardTitle>Share Your Journey</CardTitle>
        <CardDescription>
          Inspire others with your career transformation story
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title of your journey
              </label>
              <Input
                id="title"
                placeholder="E.g., How I discovered my passion for design"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="story" className="text-sm font-medium">
                Your story
              </label>
              <Textarea
                id="story"
                placeholder="Share how WayPoint helped you find your career path..."
                rows={5}
                value={formData.story}
                onChange={(e) => setFormData({...formData, story: e.target.value})}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Your Story
            </Button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="mb-4 text-gray-600">
              Sign in to share your own career journey testimonial
            </p>
            <Button asChild className="w-full">
              <a href="/login">Sign In</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShareTestimonial;
