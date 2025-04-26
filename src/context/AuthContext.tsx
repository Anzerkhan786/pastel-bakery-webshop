
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would be stored in your database
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
    const storedUser = localStorage.getItem("bakeryUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password && u.role === "user"
    );
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem("bakeryUser", JSON.stringify(userWithoutPassword));
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error("Invalid email or password");
    }
    
    setLoading(false);
  };

  const adminLogin = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password && u.role === "admin"
    );
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem("bakeryUser", JSON.stringify(userWithoutPassword));
      toast.success("Admin login successful!");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid admin credentials");
    }
    
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error("Email already in use");
      setLoading(false);
      return;
    }
    
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role: "user" as const
    };
    
    setUser(newUser);
    localStorage.setItem("bakeryUser", JSON.stringify(newUser));
    toast.success("Registration successful!");
    navigate("/");
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bakeryUser");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const forgotPassword = async (email: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userExists = MOCK_USERS.some(u => u.email === email);
    
    if (userExists) {
      toast.success("Password reset link sent to your email");
    } else {
      toast.error("Email not found");
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
