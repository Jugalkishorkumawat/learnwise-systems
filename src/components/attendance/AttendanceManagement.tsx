
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Filter,
  Download,
  Calendar
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import DataService, { Student, Course } from '@/services/dataService';

interface AttendanceManagementProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const AttendanceManagement = ({ selectedDate, onDateChange }: AttendanceManagementProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState<Record<string, 'present' | 'absent' | 'late'>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [studentsData, coursesData] = await Promise.all([
        DataService.students.getAll(),
        DataService.courses.getAll()
      ]);
      
      setStudents(studentsData);
      setCourses(coursesData);
      
      // Fetch existing attendance for the selected date
      const existingAttendance = await DataService.attendance.getByDate(selectedDate);
      const statusMap: Record<string, 'present' | 'absent' | 'late'> = {};
      
      existingAttendance.forEach(record => {
        statusMap[`${record.studentId}-${record.courseId}`] = record.status;
      });
      
      setAttendanceStatus(statusMap);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load attendance data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.regNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.department === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const handleAttendanceChange = async (studentId: string, courseId: string, status: 'present' | 'absent' | 'late') => {
    const key = `${studentId}-${courseId}`;
    
    try {
      await DataService.attendance.mark({
        studentId,
        courseId,
        date: selectedDate,
        status,
        markedBy: 'current-user' // Should come from auth context
      });
      
      setAttendanceStatus(prev => ({
        ...prev,
        [key]: status
      }));
      
      toast({
        title: "Attendance Updated",
        description: `Student marked as ${status}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update attendance. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getAttendanceStats = () => {
    const totalStudents = filteredStudents.length;
    const present = Object.values(attendanceStatus).filter(status => status === 'present').length;
    const absent = Object.values(attendanceStatus).filter(status => status === 'absent').length;
    const late = Object.values(attendanceStatus).filter(status => status === 'late').length;
    
    return { totalStudents, present, absent, late };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Management</CardTitle>
          <CardDescription>Mark attendance for students on {new Date(selectedDate).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Date</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
              />
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Course</label>
              <select
                className="h-10 w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.department}>{course.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Student List */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const currentCourseId = courses.find(c => c.department === student.department)?.id || '';
                  const statusKey = `${student.id}-${currentCourseId}`;
                  const currentStatus = attendanceStatus[statusKey];
                  
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.regNumber}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>
                        {currentStatus ? (
                          <Badge 
                            className={
                              currentStatus === 'present' ? 'bg-green-100 text-green-800' :
                              currentStatus === 'late' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                          </Badge>
                        ) : (
                          <Badge variant="outline">Not Marked</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant={currentStatus === 'present' ? 'default' : 'outline'}
                            onClick={() => handleAttendanceChange(student.id, currentCourseId, 'present')}
                            className="h-8 px-2 text-xs"
                          >
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={currentStatus === 'late' ? 'default' : 'outline'}
                            onClick={() => handleAttendanceChange(student.id, currentCourseId, 'late')}
                            className="h-8 px-2 text-xs"
                          >
                            Late
                          </Button>
                          <Button
                            size="sm"
                            variant={currentStatus === 'absent' ? 'default' : 'outline'}
                            onClick={() => handleAttendanceChange(student.id, currentCourseId, 'absent')}
                            className="h-8 px-2 text-xs"
                          >
                            Absent
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManagement;
