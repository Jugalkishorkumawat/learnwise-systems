
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui-custom/Card';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Search, 
  UserCheck, 
  UserX, 
  Clock, 
  Filter,
  Download,
  UserCog,
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Import our new components
import CameraFeed from '@/components/attendance/CameraFeed';
import FaceRecognitionConfig from '@/components/attendance/FaceRecognitionConfig';

// Mock student data for attendance management
const students = [
  { id: '1', name: 'John Doe', studentId: 'ST2023001', course: 'Introduction to Computer Science', attendance: 92 },
  { id: '2', name: 'Sarah Johnson', studentId: 'ST2023002', course: 'Data Structures', attendance: 85 },
  { id: '3', name: 'Michael Brown', studentId: 'ST2023003', course: 'Introduction to Computer Science', attendance: 78 },
  { id: '4', name: 'Emily Davis', studentId: 'ST2023004', course: 'Calculus I', attendance: 90 },
  { id: '5', name: 'James Wilson', studentId: 'ST2023005', course: 'English Composition', attendance: 88 },
  { id: '6', name: 'Olivia Martin', studentId: 'ST2023006', course: 'Data Structures', attendance: 95 },
  { id: '7', name: 'William Thompson', studentId: 'ST2023007', course: 'Calculus I', attendance: 82 },
  { id: '8', name: 'Sophia Garcia', studentId: 'ST2023008', course: 'English Composition', attendance: 91 },
];

// Daily attendance records
const dailyAttendance = [
  { id: '1', date: '2023-11-15', courseId: '1', courseName: 'Introduction to Computer Science', students: [
    { id: '1', name: 'John Doe', studentId: 'ST2023001', status: 'present', verificationMethod: 'face' },
    { id: '3', name: 'Michael Brown', studentId: 'ST2023003', status: 'absent', verificationMethod: 'manual' },
  ]},
  { id: '2', date: '2023-11-15', courseId: '2', courseName: 'Data Structures', students: [
    { id: '2', name: 'Sarah Johnson', studentId: 'ST2023002', status: 'present', verificationMethod: 'face' },
    { id: '6', name: 'Olivia Martin', studentId: 'ST2023006', status: 'present', verificationMethod: 'manual' },
  ]},
  { id: '3', date: '2023-11-15', courseId: '3', courseName: 'Calculus I', students: [
    { id: '4', name: 'Emily Davis', studentId: 'ST2023004', status: 'late', verificationMethod: 'face' },
    { id: '7', name: 'William Thompson', studentId: 'ST2023007', status: 'present', verificationMethod: 'manual' },
  ]},
  { id: '4', date: '2023-11-15', courseId: '4', courseName: 'English Composition', students: [
    { id: '5', name: 'James Wilson', studentId: 'ST2023005', status: 'absent', verificationMethod: 'manual' },
    { id: '8', name: 'Sophia Garcia', studentId: 'ST2023008', status: 'present', verificationMethod: 'face' },
  ]},
];

const ManageAttendance = () => {
  const navigate = useNavigate();
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
  
  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    toast({
      title: "Attendance Marked",
      description: `Student ${studentId} has been marked as ${status}.`,
    });
  };
  
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Manage Attendance</h1>
                <p className="text-muted-foreground">Track and manage student attendance</p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Today: {new Date().toLocaleDateString()}
                </Button>
              </div>
            </div>
            
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
            
            <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
                <TabsTrigger value="report">Attendance Reports</TabsTrigger>
              </TabsList>
              
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="all">All Courses</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                  
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                  
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
              
              <TabsContent value="daily">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle>Today's Attendance</CardTitle>
                    <CardDescription>
                      Mark and manage attendance for today's classes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {dailyAttendance.map((course) => (
                      <div key={course.id} className="mb-8 last:mb-0">
                        <h3 className="font-medium text-lg mb-2 flex items-center">
                          <span>{course.courseName}</span>
                          <Badge variant="outline" className="ml-2">{course.students.length} students</Badge>
                        </h3>
                        
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Verification</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {course.students.map((student, index) => (
                                <TableRow key={student.id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                    <div className="font-medium">{student.studentId}</div>
                                  </TableCell>
                                  <TableCell>{student.name}</TableCell>
                                  <TableCell>
                                    <Badge 
                                      className={
                                        student.status === 'present' ? 'bg-green-100 text-green-800' :
                                        student.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }
                                    >
                                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge 
                                      variant="outline"
                                      className={
                                        student.verificationMethod === 'face' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                        'bg-gray-50 text-gray-800 border-gray-200'
                                      }
                                    >
                                      {student.verificationMethod === 'face' ? 'Face Recognition' : 'Manual Entry'}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button 
                                        size="sm" 
                                        variant={student.status === 'present' ? 'default' : 'outline'}
                                        onClick={() => handleMarkAttendance(student.studentId, 'present')}
                                        className="h-8 px-2 text-xs"
                                      >
                                        <UserCheck className="h-3 w-3 mr-1" />
                                        Present
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant={student.status === 'late' ? 'default' : 'outline'}
                                        onClick={() => handleMarkAttendance(student.studentId, 'late')}
                                        className="h-8 px-2 text-xs bg-yellow-600 hover:bg-yellow-700"
                                      >
                                        <Clock className="h-3 w-3 mr-1" />
                                        Late
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant={student.status === 'absent' ? 'default' : 'outline'}
                                        onClick={() => handleMarkAttendance(student.studentId, 'absent')}
                                        className="h-8 px-2 text-xs bg-red-600 hover:bg-red-700"
                                      >
                                        <UserX className="h-3 w-3 mr-1" />
                                        Absent
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="report">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle>Attendance Reports</CardTitle>
                    <CardDescription>
                      View and analyze attendance data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Attendance %</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.map((student, index) => (
                            <TableRow key={student.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                <div className="font-medium">{student.studentId}</div>
                              </TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.course}</TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    student.attendance >= 90 ? 'bg-green-100 text-green-800' :
                                    student.attendance >= 75 ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }
                                >
                                  {student.attendance}%
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => navigate(`/students/${student.id}`)}
                                  className="h-8 px-3 text-xs"
                                >
                                  <UserCog className="h-3 w-3 mr-1" />
                                  Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default ManageAttendance;
