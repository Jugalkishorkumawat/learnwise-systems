
/**
 * Data Service - Real-time data fetching for school/college management
 * 
 * This service manages communication with backend APIs for fetching real-time data
 * including student records, attendance, courses, and administrative data.
 */

import { toast } from "@/components/ui/use-toast";

// Define backend URL with configurable options
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Timeout for fetch requests in milliseconds
const FETCH_TIMEOUT = 10000;

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  semester: number;
  joinDate: string;
  status: 'active' | 'inactive';
  regNumber: string;
  address: string;
  dob: string;
  gender: string;
  parentName: string;
  parentPhone: string;
  bloodGroup: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  department: string;
  semester: number;
  credits: number;
  schedule: string;
  capacity: number;
  enrolled: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  markedBy: string;
  timestamp: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignment: string;
  score: number;
  maxScore: number;
  gradedDate: string;
  feedback?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  description: string;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  method?: string;
}

/**
 * Service to interact with the school/college management backend
 */
export const DataService = {
  /**
   * Generic fetch function with error handling
   */
  fetchData: async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      
      if ((error as Error).name === 'AbortError') {
        toast({
          title: "Request Timeout",
          description: "The request took too long to complete. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Data Fetch Error",
          description: "Failed to fetch data from server. Please check your connection.",
          variant: "destructive"
        });
      }
      
      throw error;
    }
  },

  /**
   * Student management functions
   */
  students: {
    getAll: (): Promise<Student[]> => DataService.fetchData<Student[]>('/students'),
    getById: (id: string): Promise<Student> => DataService.fetchData<Student>(`/students/${id}`),
    create: (student: Omit<Student, 'id'>): Promise<Student> => 
      DataService.fetchData<Student>('/students', {
        method: 'POST',
        body: JSON.stringify(student)
      }),
    update: (id: string, student: Partial<Student>): Promise<Student> =>
      DataService.fetchData<Student>(`/students/${id}`, {
        method: 'PUT',
        body: JSON.stringify(student)
      }),
    delete: (id: string): Promise<void> =>
      DataService.fetchData<void>(`/students/${id}`, { method: 'DELETE' })
  },

  /**
   * Course management functions
   */
  courses: {
    getAll: (): Promise<Course[]> => DataService.fetchData<Course[]>('/courses'),
    getById: (id: string): Promise<Course> => DataService.fetchData<Course>(`/courses/${id}`),
    getByDepartment: (department: string): Promise<Course[]> => 
      DataService.fetchData<Course[]>(`/courses?department=${department}`),
    create: (course: Omit<Course, 'id'>): Promise<Course> =>
      DataService.fetchData<Course>('/courses', {
        method: 'POST',
        body: JSON.stringify(course)
      }),
    update: (id: string, course: Partial<Course>): Promise<Course> =>
      DataService.fetchData<Course>(`/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(course)
      })
  },

  /**
   * Attendance management functions
   */
  attendance: {
    getByStudent: (studentId: string): Promise<AttendanceRecord[]> =>
      DataService.fetchData<AttendanceRecord[]>(`/attendance/student/${studentId}`),
    getByCourse: (courseId: string): Promise<AttendanceRecord[]> =>
      DataService.fetchData<AttendanceRecord[]>(`/attendance/course/${courseId}`),
    getByDate: (date: string): Promise<AttendanceRecord[]> =>
      DataService.fetchData<AttendanceRecord[]>(`/attendance/date/${date}`),
    mark: (attendance: Omit<AttendanceRecord, 'id' | 'timestamp'>): Promise<AttendanceRecord> =>
      DataService.fetchData<AttendanceRecord>('/attendance', {
        method: 'POST',
        body: JSON.stringify(attendance)
      }),
    update: (id: string, status: AttendanceRecord['status']): Promise<AttendanceRecord> =>
      DataService.fetchData<AttendanceRecord>(`/attendance/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      })
  },

  /**
   * Grades management functions
   */
  grades: {
    getByStudent: (studentId: string): Promise<Grade[]> =>
      DataService.fetchData<Grade[]>(`/grades/student/${studentId}`),
    getByCourse: (courseId: string): Promise<Grade[]> =>
      DataService.fetchData<Grade[]>(`/grades/course/${courseId}`),
    create: (grade: Omit<Grade, 'id'>): Promise<Grade> =>
      DataService.fetchData<Grade>('/grades', {
        method: 'POST',
        body: JSON.stringify(grade)
      }),
    update: (id: string, grade: Partial<Grade>): Promise<Grade> =>
      DataService.fetchData<Grade>(`/grades/${id}`, {
        method: 'PUT',
        body: JSON.stringify(grade)
      })
  },

  /**
   * Payment management functions
   */
  payments: {
    getByStudent: (studentId: string): Promise<Payment[]> =>
      DataService.fetchData<Payment[]>(`/payments/student/${studentId}`),
    getAll: (): Promise<Payment[]> => DataService.fetchData<Payment[]>('/payments'),
    create: (payment: Omit<Payment, 'id'>): Promise<Payment> =>
      DataService.fetchData<Payment>('/payments', {
        method: 'POST',
        body: JSON.stringify(payment)
      }),
    updateStatus: (id: string, status: Payment['status'], paidDate?: string): Promise<Payment> =>
      DataService.fetchData<Payment>(`/payments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status, paidDate })
      })
  },

  /**
   * Analytics and reports
   */
  analytics: {
    getDashboardStats: (): Promise<{
      totalStudents: number;
      totalCourses: number;
      attendanceRate: number;
      pendingPayments: number;
    }> => DataService.fetchData('/analytics/dashboard'),
    
    getAttendanceReport: (startDate: string, endDate: string): Promise<{
      courseWise: Array<{ courseId: string; courseName: string; attendanceRate: number }>;
      studentWise: Array<{ studentId: string; studentName: string; attendanceRate: number }>;
    }> => DataService.fetchData(`/analytics/attendance?start=${startDate}&end=${endDate}`),
    
    getGradeReport: (courseId: string): Promise<{
      average: number;
      distribution: Array<{ grade: string; count: number }>;
    }> => DataService.fetchData(`/analytics/grades/${courseId}`)
  },

  /**
   * Real-time updates using WebSocket (if available)
   */
  realTime: {
    connect: (onMessage: (data: any) => void) => {
      try {
        const ws = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:3001');
        
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          onMessage(data);
        };
        
        ws.onerror = () => {
          console.warn('WebSocket connection failed, falling back to polling');
        };
        
        return ws;
      } catch (error) {
        console.warn('WebSocket not available, using polling instead');
        return null;
      }
    }
  }
};

export default DataService;
