
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import CameraFeed from '@/components/attendance/CameraFeed';
import FaceRecognitionConfig from '@/components/attendance/FaceRecognitionConfig';
import AttendanceHeader from '@/components/attendance/AttendanceHeader';
import AttendanceTabs from '@/components/attendance/AttendanceTabs';
import { toast } from "@/components/ui/use-toast";

// Define types for TypeScript
interface StudentAttendanceRecord {
  id: string;
  name: string;
  studentId: string;
  status: 'present' | 'absent' | 'late';
  verificationMethod: 'face' | 'manual';
}

interface CourseAttendance {
  id: string;
  date: string;
  courseId: string;
  courseName: string;
  students: StudentAttendanceRecord[];
}

interface StudentReport {
  id: string;
  name: string;
  studentId: string;
  course: string;
  attendance: number;
}

// Mock student data for attendance management
const students: StudentReport[] = [
  { id: '1', name: 'John Doe', studentId: 'ST2023001', course: 'Introduction to Computer Science', attendance: 92 },
  { id: '2', name: 'Sarah Johnson', studentId: 'ST2023002', course: 'Data Structures', attendance: 85 },
  { id: '3', name: 'Michael Brown', studentId: 'ST2023003', course: 'Introduction to Computer Science', attendance: 78 },
  { id: '4', name: 'Emily Davis', studentId: 'ST2023004', course: 'Calculus I', attendance: 90 },
  { id: '5', name: 'James Wilson', studentId: 'ST2023005', course: 'English Composition', attendance: 88 },
  { id: '6', name: 'Olivia Martin', studentId: 'ST2023006', course: 'Data Structures', attendance: 95 },
  { id: '7', name: 'William Thompson', studentId: 'ST2023007', course: 'Calculus I', attendance: 82 },
  { id: '8', name: 'Sophia Garcia', studentId: 'ST2023008', course: 'English Composition', attendance: 91 },
];

// Daily attendance records with explicit type annotations to ensure type safety
const dailyAttendance: CourseAttendance[] = [
  { 
    id: '1', 
    date: '2023-11-15', 
    courseId: '1', 
    courseName: 'Introduction to Computer Science', 
    students: [
      { id: '1', name: 'John Doe', studentId: 'ST2023001', status: 'present', verificationMethod: 'face' },
      { id: '3', name: 'Michael Brown', studentId: 'ST2023003', status: 'absent', verificationMethod: 'manual' },
    ]
  },
  { 
    id: '2', 
    date: '2023-11-15', 
    courseId: '2', 
    courseName: 'Data Structures', 
    students: [
      { id: '2', name: 'Sarah Johnson', studentId: 'ST2023002', status: 'present', verificationMethod: 'face' },
      { id: '6', name: 'Olivia Martin', studentId: 'ST2023006', status: 'present', verificationMethod: 'manual' },
    ]
  },
  { 
    id: '3', 
    date: '2023-11-15', 
    courseId: '3', 
    courseName: 'Calculus I', 
    students: [
      { id: '4', name: 'Emily Davis', studentId: 'ST2023004', status: 'late', verificationMethod: 'face' },
      { id: '7', name: 'William Thompson', studentId: 'ST2023007', status: 'present', verificationMethod: 'manual' },
    ]
  },
  { 
    id: '4', 
    date: '2023-11-15', 
    courseId: '4', 
    courseName: 'English Composition', 
    students: [
      { id: '5', name: 'James Wilson', studentId: 'ST2023005', status: 'absent', verificationMethod: 'manual' },
      { id: '8', name: 'Sophia Garcia', studentId: 'ST2023008', status: 'present', verificationMethod: 'face' },
    ]
  },
];

const ManageAttendance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [autoAttendance, setAutoAttendance] = useState(true);
  const [systemStatus, setSystemStatus] = useState<'idle' | 'scanning' | 'error'>('idle');
  
  // Filter students based on search query and selected course
  const filteredStudents = students.filter(student => 
    (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCourse === 'all' || student.course === selectedCourse)
  );
  
  const toggleAutoAttendance = (newStatus: boolean) => {
    setAutoAttendance(newStatus);
    
    if (newStatus) {
      setSystemStatus('scanning');
      toast({
        title: "Automated Attendance System Activated",
        description: "The system is now monitoring for student attendance.",
      });
    } else {
      setSystemStatus('idle');
      toast({
        title: "Automated Attendance System Deactivated",
        description: "Switched to manual attendance marking.",
      });
    }
  };
  
  const courses = Array.from(new Set(students.map(student => student.course)));
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <AttendanceHeader 
              title="Manage Attendance" 
              description="Track and manage student attendance" 
            />
            
            {/* Automated Attendance System Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <CameraFeed 
                  isActive={autoAttendance}
                  onStatusChange={setSystemStatus}
                />
              </div>
              <div>
                <FaceRecognitionConfig
                  isEnabled={autoAttendance}
                  onToggle={toggleAutoAttendance}
                />
              </div>
            </div>
            
            <AttendanceTabs
              dailyAttendance={dailyAttendance}
              filteredStudents={filteredStudents}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
              courses={courses}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default ManageAttendance;
