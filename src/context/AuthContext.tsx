import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes (will be replaced by Supabase auth)
const MOCK_USERS = [
  {
    id: "1",
    email: "user@example.com",
    name: "John Doe",
    role: "user",
    password: "password123"
  },
  {
    id: "2",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    password: "admin123"
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const getInitialSession = async () => {
      setLoading(true);

      try {
        // Check for an active session with Supabase
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          // Get user details either from session or from a profiles table if you have one
          const userData = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.name || "User",
            role: session.user.user_metadata?.role || "user"
          };
          
          setUser(userData);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        toast.error("Authentication error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          // User signed in
          const userData = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.name || "User",
            role: session.user.user_metadata?.role || "user"
          };
          
          setUser(userData);
        } else {
          // User signed out
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // For demo purposes, keep the mock login option
      if (email === "user@example.com" && password === "password123") {
        const mockUser = MOCK_USERS[0];
        setUser(mockUser);
        localStorage.setItem("bakeryUser", JSON.stringify(mockUser));
        toast.success("Login successful (mock user)!");
        navigate("/");
        return;
      }
      
      // Attempt Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email || "",
          name: data.user.user_metadata?.name || "User",
          role: data.user.user_metadata?.role || "user"
        };
        
        setUser(userData);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // For demo purposes, keep the mock admin login option
      if (email === "admin@example.com" && password === "admin123") {
        const mockAdmin = MOCK_USERS[1];
        setUser(mockAdmin);
        localStorage.setItem("bakeryUser", JSON.stringify(mockAdmin));
        toast.success("Admin login successful (mock admin)!");
        navigate("/admin/dashboard");
        return;
      }

      // Attempt Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Check if user has admin role (you should implement this check based on your user data structure)
        const isAdmin = data.user.user_metadata?.role === "admin";
        
        if (!isAdmin) {
          throw new Error("You do not have admin privileges");
        }

        const userData = {
          id: data.user.id,
          email: data.user.email || "",
          name: data.user.user_metadata?.name || "Admin",
          role: "admin"
        };
        
        setUser(userData);
        toast.success("Admin login successful!");
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      console.error("Admin login error:", error.message);
      toast.error(error.message || "Admin login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    try {
      // Attempt to register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: "user"
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        toast.success("Registration successful! Check your email to confirm your account.");
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Registration error:", error.message);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear local storage
      localStorage.removeItem("bakeryUser");
      
      // Update state
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      console.error("Logout error:", error.message);
      toast.error("Logout failed. Please try again.");
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });

      if (error) {
        throw error;
      }

      toast.success("Password reset link sent to your email");
    } catch (error: any) {
      console.error("Password reset error:", error.message);
      toast.error(error.message || "Failed to send reset email. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: user?.role === "admin",
        login,
        adminLogin,
        register,
        logout,
        forgotPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
