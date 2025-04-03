
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Loader } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);
    
    // Simple validation
    if (!email.trim() || !password.trim()) {
      setFormError("Email and password are required");
      setIsSubmitting(false);
      return;
    }
    
    try {
      await login(email, password);
      toast.success("Successfully logged in");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      // Handle specific error cases
      if (error?.message?.includes("Email not confirmed")) {
        setFormError("Please check your email to confirm your account before logging in.");
      } else if (error?.message?.includes("Invalid login credentials")) {
        setFormError("Invalid email or password. Please try again.");
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use both local isSubmitting state and global authLoading state
  const buttonIsLoading = isSubmitting || authLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12"
          autoComplete="email"
          required
          disabled={buttonIsLoading}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link 
            to="/forgot-password" 
            className="text-sm text-waypoint-blue hover:underline"
            tabIndex={buttonIsLoading ? -1 : 0}
          >
            Forgot Password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 pr-10"
            autoComplete="current-password"
            required
            disabled={buttonIsLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-waypoint-gray hover:text-waypoint-blue"
            tabIndex={-1}
            disabled={buttonIsLoading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      
      {formError && (
        <div className="rounded-md bg-destructive/10 p-3 text-destructive text-sm animate-fade-in">
          {formError}
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full h-12 text-base btn-primary"
        disabled={buttonIsLoading}
      >
        {buttonIsLoading ? (
          <div className="flex items-center space-x-2">
            <Loader size={18} className="animate-spin" />
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </Button>
      
      <div className="text-center text-waypoint-gray">
        Don't have an account?{" "}
        <Link to="/register" className="text-waypoint-blue hover:underline">
          Create account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
