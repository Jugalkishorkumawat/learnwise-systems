
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Calendar,
  Edit,
  Download,
  Book,
  Clock,
  CreditCard,
  MessageSquare
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock student data for the profile
const studentData = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  address: '123 College Street, Mumbai, Maharashtra, India',
  department: 'Computer Science',
  semester: 3,
  joinDate: '2022-09-01',
  status: 'active',
  regNumber: 'ST2023001',
  dob: '2000-05-15',
  gender: 'Male',
  parentName: 'Robert Doe',
  parentPhone: '+91 87654 32109',
  bloodGroup: 'O+',
  courses: [
    { id: '1', code: 'CS101', name: 'Introduction to Computer Science', instructor: 'Prof. Smith', grade: 'B+', attendance: 92 },
    { id: '2', code: 'CS201', name: 'Data Structures', instructor: 'Prof. Johnson', grade: 'A', attendance: 88 },
    { id: '3', code: 'MATH101', name: 'Calculus I', instructor: 'Prof. Williams', grade: 'C+', attendance: 78 },
    { id: '4', code: 'ENG101', name: 'English Composition', instructor: 'Prof. Brown', grade: 'B', attendance: 85 },
  ],
  attendance: [
    { id: '1', date: '2023-11-01', course: 'Introduction to Computer Science', status: 'present' },
    { id: '2', date: '2023-11-02', course: 'Data Structures', status: 'present' },
    { id: '3', date: '2023-11-03', course: 'Calculus I', status: 'late' },
    { id: '4', date: '2023-11-04', course: 'English Composition', status: 'absent' },
    { id: '5', date: '2023-11-06', course: 'Introduction to Computer Science', status: 'present' },
  ],
  payments: [
    { id: '1', date: '2023-09-01', amount: 45000, description: 'Tuition Fee - Fall Semester', status: 'paid' },
    { id: '2', date: '2023-09-15', amount: 5000, description: 'Library Fee', status: 'paid' },
    { id: '3', date: '2023-10-01', amount: 10000, description: 'Lab Fee', status: 'paid' },
    { id: '4', date: '2023-11-01', amount: 7500, description: 'Hostel Fee - November', status: 'pending' },
  ],
};

const StudentProfile = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, we would fetch student data based on the ID
  // For demo purposes, we'll use mock data
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Student Profile</h1>
                <p className="text-muted-foreground">Details for student {studentData.regNumber}</p>
              </div>
              
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-1">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${studentData.name.replace(/\s+/g, '+')}&background=random&size=128`} />
                      <AvatarFallback className="text-2xl">{studentData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>{studentData.name}</CardTitle>
                  <CardDescription>
                    <Badge className="mt-1">{studentData.regNumber}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">{studentData.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">{studentData.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">{studentData.address}</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">{studentData.department}, Semester {studentData.semester}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">DOB: {new Date(studentData.dob).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-3">Parent Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-3 text-muted-foreground" />
                          <span className="text-sm">{studentData.parentName}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                          <span className="text-sm">{studentData.parentPhone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">
                          <CreditCard className="h-3 w-3 mr-1" />
                          Payments
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <Tabs defaultValue="courses">
                  <CardHeader className="pb-0">
                    <TabsList className="w-full">
                      <TabsTrigger value="courses" className="flex-1">
                        <Book className="h-4 w-4 mr-2" />
                        Courses
                      </TabsTrigger>
                      <TabsTrigger value="attendance" className="flex-1">
                        <Clock className="h-4 w-4 mr-2" />
                        Attendance
                      </TabsTrigger>
                      <TabsTrigger value="payments" className="flex-1">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Payments
                      </TabsTrigger>
                    </TabsList>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <TabsContent value="courses">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Code</TableHead>
                              <TableHead>Course</TableHead>
                              <TableHead>Instructor</TableHead>
                              <TableHead>Grade</TableHead>
                              <TableHead>Attendance</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {studentData.courses.map((course) => (
                              <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.code}</TableCell>
                                <TableCell>{course.name}</TableCell>
                                <TableCell>{course.instructor}</TableCell>
                                <TableCell>
                                  <Badge>{course.grade}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge 
                                    className={
                                      course.attendance >= 90 ? 'bg-green-100 text-green-800' :
                                      course.attendance >= 75 ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }
                                  >
                                    {course.attendance}%
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="attendance">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Course</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {studentData.attendance.map((record) => (
                              <TableRow key={record.id}>
                                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                <TableCell>{record.course}</TableCell>
                                <TableCell>
                                  <Badge 
                                    className={
                                      record.status === 'present' ? 'bg-green-100 text-green-800' :
                                      record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }
                                  >
                                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="payments">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {studentData.payments.map((payment) => (
                              <TableRow key={payment.id}>
                                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                                <TableCell>{payment.description}</TableCell>
                                <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                                <TableCell>
                                  <Badge 
                                    className={
                                      payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }
                                  >
                                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default StudentProfile;
