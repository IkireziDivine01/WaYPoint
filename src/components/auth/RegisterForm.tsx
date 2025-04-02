
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Eye, EyeOff, Loader } from "lucide-react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, isLoading: authLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);
    
    // Simple validation
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setFormError("All fields are required");
      setIsSubmitting(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      setIsSubmitting(false);
      return;
    }
    
    try {
      await register(username, email, password, role);
      toast.success("Account created successfully! Please check your email to confirm your account.");
      navigate("/dashboard");
    } catch (error: any) {
      // Handle specific errors
      if (error?.message?.includes("already registered")) {
        setFormError("This email is already registered. Please use a different email or try logging in.");
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonIsLoading = isSubmitting || authLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-12"
          required
          disabled={buttonIsLoading}
        />
      </div>
      
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
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 pr-10"
            autoComplete="new-password"
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
        <p className="text-xs text-waypoint-gray mt-1">
          Password must be at least 8 characters long
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="h-12"
          autoComplete="new-password"
          required
          disabled={buttonIsLoading}
        />
      </div>
      
      <div className="space-y-3">
        <Label>I am a:</Label>
        <RadioGroup 
          value={role} 
          onValueChange={(value) => setRole(value as UserRole)}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="student" disabled={buttonIsLoading} />
            <Label htmlFor="student" className="cursor-pointer">Student</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="educator" id="educator" disabled={buttonIsLoading} />
            <Label htmlFor="educator" className="cursor-pointer">Educator</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="administrator" id="administrator" disabled={buttonIsLoading} />
            <Label htmlFor="administrator" className="cursor-pointer">Administrator</Label>
          </div>
        </RadioGroup>
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
            <span>Creating account...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </Button>
      
      <div className="text-center text-waypoint-gray">
        Already have an account?{" "}
        <Link to="/login" className="text-waypoint-blue hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
