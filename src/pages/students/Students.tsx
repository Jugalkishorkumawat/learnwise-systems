
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  Filter, 
  UserPlus,
  GraduationCap,
  Mail,
  Phone,
  FileText,
  ExternalLink
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock student data
const students = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '+91 98765 43210', department: 'Computer Science', semester: 3, joinDate: '2022-09-01', status: 'active' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '+91 87654 32109', department: 'Computer Science', semester: 3, joinDate: '2022-09-01', status: 'active' },
  { id: '3', name: 'Michael Brown', email: 'michael.b@example.com', phone: '+91 76543 21098', department: 'Computer Science', semester: 3, joinDate: '2022-09-01', status: 'active' },
  { id: '4', name: 'Emily Davis', email: 'emily.d@example.com', phone: '+91 65432 10987', department: 'Mathematics', semester: 3, joinDate: '2022-09-01', status: 'active' },
  { id: '5', name: 'James Wilson', email: 'james.w@example.com', phone: '+91 54321 09876', department: 'English', semester: 3, joinDate: '2022-09-01', status: 'inactive' },
  { id: '6', name: 'Olivia Martin', email: 'olivia.m@example.com', phone: '+91 43210 98765', department: 'Computer Science', semester: 3, joinDate: '2022-09-01', status: 'active' },
  { id: '7', name: 'William Thompson', email: 'william.t@example.com', phone: '+91 32109 87654', department: 'Mathematics', semester: 3, joinDate: '2022-09-01', status: 'active' },
  { id: '8', name: 'Sophia Garcia', email: 'sophia.g@example.com', phone: '+91 21098 76543', department: 'English', semester: 3, joinDate: '2022-09-01', status: 'active' },
];

const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const navigate = useNavigate();
  
  // Filter students based on search query and selected department
  const filteredStudents = students.filter(student => 
    (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedDepartment === 'all' || student.department === selectedDepartment)
  );
  
  const departments = Array.from(new Set(students.map(student => student.department)));
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Students</h1>
                <p className="text-muted-foreground">Manage student profiles and data</p>
              </div>
              
              <Button onClick={() => navigate('/students/add')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Student
              </Button>
            </div>
            
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
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
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
            
            <Card>
              <CardHeader className="pb-1">
                <CardTitle>Student Directory</CardTitle>
                <CardDescription>
                  View and manage student profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student, index) => (
                        <TableRow key={student.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${student.name.replace(/\s+/g, '+')}&background=random`} />
                                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-xs text-muted-foreground">Joined {new Date(student.joinDate).toLocaleDateString()}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center text-xs">
                                <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                                <span>{student.email}</span>
                              </div>
                              <div className="flex items-center text-xs">
                                <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                                <span>{student.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="text-sm">{student.department}</div>
                                <div className="text-xs text-muted-foreground">Semester {student.semester}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                student.status === 'active' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => navigate(`/students/${student.id}`)}
                                className="h-8 px-3 text-xs"
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                Profile
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => navigate(`/students/${student.id}/edit`)}
                                className="h-8 px-3 text-xs"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default Students;
