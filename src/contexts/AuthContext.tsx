
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'student' | 'staff' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (email: string, password: string, role: 'student' | 'staff') => Promise<void>;
  register: (name: string, email: string, password: string, role: 'student' | 'staff') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'staff') => {
    // In a real app, this would be an API call
    // Simulating authentication for now
    const mockUser: User = {
      id: '1',
      name: role === 'student' ? 'John Doe' : 'Prof. Smith',
      email,
      role: role
    };

    // Store in localStorage for session persistence
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'staff') => {
    // In a real app, this would be an API call
    // Simulating registration for now
    const mockUser: User = {
      id: '1',
      name,
      email,
      role
    };

    // Store in localStorage for session persistence
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        userRole: user?.role || null,
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
