
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const MarkAttendance = () => {
  const { markAttendance, getCourses, getAttendance } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [status, setStatus] = useState<'present' | 'absent' | 'late'>('present');
  
  const courses = getCourses();
  const attendance = getAttendance();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Check which courses already have attendance for today
  const todaysAttendanceByCoursesIds = attendance
    .filter(record => record.date === today)
    .map(record => record.courseId);
  
  // Filter out courses that already have attendance today
  const availableCourses = courses.filter(
    course => !todaysAttendanceByCoursesIds.includes(course.id)
  );
  
  const handleMarkAttendance = () => {
    if (!selectedCourse) {
      toast({
        title: "Error",
        description: "Please select a course",
        variant: "destructive"
      });
      return;
    }
    
    markAttendance(selectedCourse, status);
    
    // Reset form
    setSelectedCourse('');
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">Mark Attendance</h1>
              <p className="text-muted-foreground">Record your attendance for today's classes</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mark Attendance Form */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Record Attendance</CardTitle>
                  <CardDescription>
                    Today: {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {availableCourses.length > 0 ? (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Select Course</label>
                        <Select
                          value={selectedCourse}
                          onValueChange={setSelectedCourse}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCourses.map(course => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.code} - {course.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Attendance Status</label>
                        <div className="grid grid-cols-3 gap-4">
                          <Button 
                            onClick={() => setStatus('present')}
                            variant={status === 'present' ? 'default' : 'outline'}
                            className="justify-start"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Present
                          </Button>
                          <Button 
                            onClick={() => setStatus('late')}
                            variant={status === 'late' ? 'default' : 'outline'}
                            className="justify-start"
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            Late
                          </Button>
                          <Button 
                            onClick={() => setStatus('absent')}
                            variant={status === 'absent' ? 'default' : 'outline'}
                            className="justify-start"
                          >
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Absent
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button onClick={handleMarkAttendance}>
                          Mark Attendance
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground mb-4">You have already marked attendance for all your classes today.</p>
                      <Button variant="outline" onClick={() => window.location.href = '/attendance/view'}>
                        View My Attendance
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Today's Attendance */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Attendance</CardTitle>
                  <CardDescription>
                    Classes you have already marked
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {todaysAttendanceByCoursesIds.length > 0 ? (
                    <div className="space-y-4">
                      {attendance
                        .filter(record => record.date === today)
                        .map(record => {
                          let statusIcon;
                          let statusClass;
                          
                          if (record.status === 'present') {
                            statusIcon = <CheckCircle className="h-5 w-5 text-green-500" />;
                            statusClass = "bg-green-50 border-green-200";
                          } else if (record.status === 'late') {
                            statusIcon = <Clock className="h-5 w-5 text-amber-500" />;
                            statusClass = "bg-amber-50 border-amber-200";
                          } else {
                            statusIcon = <AlertCircle className="h-5 w-5 text-red-500" />;
                            statusClass = "bg-red-50 border-red-200";
                          }
                          
                          return (
                            <div 
                              key={record.id} 
                              className={`p-4 rounded-md border ${statusClass}`}
                            >
                              <div className="flex items-center">
                                {statusIcon}
                                <div className="ml-3">
                                  <div className="font-medium">{record.courseName}</div>
                                  <div className="text-sm text-muted-foreground capitalize">
                                    {record.status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">No attendance recorded for today</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default MarkAttendance;
