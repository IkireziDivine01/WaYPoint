
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as AuthUser } from "@supabase/supabase-js";
import { User, UserRole } from "@/types/app";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user session and set up auth state change listener
  useEffect(() => {
    // First check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          await fetchAndSetUserProfile(session.user.id);
        } else {
          setCurrentUser(null);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing auth:", err);
        setIsLoading(false);
      }
    };

    // Then set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change event:", event);
        if (session?.user) {
          await fetchAndSetUserProfile(session.user.id);
        } else {
          setCurrentUser(null);
        }
      }
    );

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Helper function to fetch user profile data
  const fetchAndSetUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for ID:", userId);
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.error("Profile fetch error:", profileError);
        throw profileError;
      }
      
      if (profile) {
        const { data: { user } } = await supabase.auth.getUser();
        
        const userData: User = {
          id: userId,
          username: profile.username || '',
          email: user?.email || '',
          role: profile.role as UserRole,
          firstName: profile.first_name || undefined,
          lastName: profile.last_name || undefined,
          avatar_url: profile.avatar_url || undefined
        };
        
        console.log("Setting user data:", userData);
        setCurrentUser(userData);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Profile data will be loaded by the auth state change handler
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setIsLoading(false);
      throw err;
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            role
          }
        }
      });
      
      if (error) throw error;
      
      // Profile will be created by the database trigger and loaded by the auth state change handler
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setIsLoading(false);
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setCurrentUser(null);
    } catch (err) {
      console.error("Error signing out:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (userData: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!currentUser) {
        throw new Error("No user is currently logged in");
      }
      
      // Prepare profile data
      const profileData: Record<string, any> = {};
      if (userData.username) profileData.username = userData.username;
      if (userData.firstName) profileData.first_name = userData.firstName;
      if (userData.lastName) profileData.last_name = userData.lastName;
      if (userData.role) profileData.role = userData.role;
      if (userData.avatar_url) profileData.avatar_url = userData.avatar_url;
      
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', currentUser.id);
      
      if (error) throw error;
      
      // Update local user state
      setCurrentUser(prev => {
        if (!prev) return null;
        return { ...prev, ...userData };
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isLoading, 
      error, 
      login, 
      register, 
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
