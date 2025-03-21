
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

type UserRole = 'student' | 'staff' | 'admin' | null;

// Mock data types
export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  schedule: string;
  credits: number;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  courseId: string;
  courseName: string;
  status: 'present' | 'absent' | 'late';
}

export interface Grade {
  id: string;
  courseId: string;
  courseName: string;
  assignment: string;
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
  feedback?: string;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'overdue';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  semester?: number;
  joinedDate?: string;
  courses?: Course[];
  attendance?: AttendanceRecord[];
  grades?: Grade[];
  payments?: Payment[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (email: string, password: string, role: 'student' | 'staff') => Promise<void>;
  register: (name: string, email: string, password: string, role: 'student' | 'staff') => Promise<void>;
  logout: () => void;
  markAttendance: (courseId: string, status: 'present' | 'absent' | 'late') => void;
  getCourses: () => Course[];
  getAttendance: () => AttendanceRecord[];
  getGrades: () => Grade[];
  getPayments: () => Payment[];
}

// Mock data for demonstration
const mockCourses: Course[] = [
  { id: '1', code: 'CS101', name: 'Introduction to Computer Science', instructor: 'Prof. Smith', schedule: 'Mon, Wed 10:00 - 11:30', credits: 3 },
  { id: '2', code: 'CS201', name: 'Data Structures', instructor: 'Prof. Johnson', schedule: 'Tue, Thu 13:00 - 14:30', credits: 4 },
  { id: '3', code: 'MATH101', name: 'Calculus I', instructor: 'Prof. Williams', schedule: 'Mon, Wed, Fri 9:00 - 10:00', credits: 3 },
  { id: '4', code: 'ENG101', name: 'English Composition', instructor: 'Prof. Brown', schedule: 'Tue, Thu 10:00 - 11:30', credits: 3 },
];

const mockAttendance: AttendanceRecord[] = [
  { id: '1', date: '2023-11-01', courseId: '1', courseName: 'Introduction to Computer Science', status: 'present' },
  { id: '2', date: '2023-11-02', courseId: '2', courseName: 'Data Structures', status: 'present' },
  { id: '3', date: '2023-11-03', courseId: '3', courseName: 'Calculus I', status: 'late' },
  { id: '4', date: '2023-11-04', courseId: '4', courseName: 'English Composition', status: 'absent' },
  { id: '5', date: '2023-11-06', courseId: '1', courseName: 'Introduction to Computer Science', status: 'present' },
  { id: '6', date: '2023-11-07', courseId: '2', courseName: 'Data Structures', status: 'present' },
  { id: '7', date: '2023-11-08', courseId: '3', courseName: 'Calculus I', status: 'present' },
  { id: '8', date: '2023-11-09', courseId: '4', courseName: 'English Composition', status: 'present' },
];

const mockGrades: Grade[] = [
  { id: '1', courseId: '1', courseName: 'Introduction to Computer Science', assignment: 'Quiz 1', score: 85, maxScore: 100, percentage: 85, grade: 'B' },
  { id: '2', courseId: '1', courseName: 'Introduction to Computer Science', assignment: 'Mid-term', score: 78, maxScore: 100, percentage: 78, grade: 'C+' },
  { id: '3', courseId: '2', courseName: 'Data Structures', assignment: 'Assignment 1', score: 95, maxScore: 100, percentage: 95, grade: 'A' },
  { id: '4', courseId: '3', courseName: 'Calculus I', assignment: 'Quiz 1', score: 70, maxScore: 100, percentage: 70, grade: 'C' },
  { id: '5', courseId: '4', courseName: 'English Composition', assignment: 'Essay 1', score: 88, maxScore: 100, percentage: 88, grade: 'B+' },
];

const mockPayments: Payment[] = [
  { id: '1', date: '2023-09-01', amount: 45000, description: 'Tuition Fee - Fall Semester', status: 'paid' },
  { id: '2', date: '2023-09-15', amount: 5000, description: 'Library Fee', status: 'paid' },
  { id: '3', date: '2023-10-01', amount: 10000, description: 'Lab Fee', status: 'paid' },
  { id: '4', date: '2023-11-01', amount: 7500, description: 'Hostel Fee - November', status: 'pending' },
  { id: '5', date: '2024-01-01', amount: 45000, description: 'Tuition Fee - Spring Semester', status: 'overdue' },
];

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
    try {
      // In a real app, this would be an API call
      // Simulating authentication for now
      const mockUser: User = {
        id: '1',
        name: role === 'student' ? 'John Doe' : 'Prof. Smith',
        email,
        role: role,
        studentId: role === 'student' ? 'ST2023001' : undefined,
        department: role === 'student' ? 'Computer Science' : 'Faculty of Engineering',
        semester: role === 'student' ? 3 : undefined,
        joinedDate: '2022-09-01',
        courses: mockCourses,
        attendance: mockAttendance,
        grades: mockGrades,
        payments: mockPayments
      };

      // Store in localStorage for session persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'staff') => {
    try {
      // In a real app, this would be an API call
      // Simulating registration for now
      const mockUser: User = {
        id: '1',
        name,
        email,
        role,
        studentId: role === 'student' ? 'ST2023001' : undefined,
        department: role === 'student' ? 'Computer Science' : 'Faculty of Engineering',
        semester: role === 'student' ? 1 : undefined,
        joinedDate: new Date().toISOString().split('T')[0],
        courses: mockCourses,
        attendance: [],
        grades: [],
        payments: []
      };

      // Store in localStorage for session persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      
      toast({
        title: "Registration Successful",
        description: `Welcome, ${name}!`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/login');
  };

  const markAttendance = (courseId: string, status: 'present' | 'absent' | 'late') => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const course = user.courses?.find(c => c.id === courseId);
    
    if (!course) return;
    
    const newAttendanceRecord: AttendanceRecord = {
      id: Date.now().toString(),
      date: today,
      courseId,
      courseName: course.name,
      status
    };
    
    const updatedAttendance = [...(user.attendance || []), newAttendanceRecord];
    
    const updatedUser = {
      ...user,
      attendance: updatedAttendance
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    toast({
      title: "Attendance Recorded",
      description: `Your attendance for ${course.name} has been marked as ${status}.`,
    });
  };

  const getCourses = () => {
    return user?.courses || [];
  };

  const getAttendance = () => {
    return user?.attendance || [];
  };

  const getGrades = () => {
    return user?.grades || [];
  };

  const getPayments = () => {
    return user?.payments || [];
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        userRole: user?.role || null,
        login, 
        register, 
        logout,
        markAttendance,
        getCourses,
        getAttendance,
        getGrades,
        getPayments
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
