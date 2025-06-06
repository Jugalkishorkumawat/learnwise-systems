
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Download,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  MapPin,
  Edit,
  Eye
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

const Staff = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const staffMembers = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.com',
      phone: '+91 98765 43210',
      department: 'Mathematics',
      position: 'Head of Department',
      qualification: 'PhD in Mathematics',
      experience: '15 years',
      joinDate: '2010-08-15',
      status: 'active',
      subjects: ['Advanced Mathematics', 'Calculus', 'Statistics']
    },
    {
      id: '2',
      name: 'Prof. Michael Brown',
      email: 'michael.brown@school.com',
      phone: '+91 87654 32109',
      department: 'Physics',
      position: 'Senior Teacher',
      qualification: 'M.Sc Physics',
      experience: '12 years',
      joinDate: '2012-07-01',
      status: 'active',
      subjects: ['Physics', 'Applied Physics']
    },
    {
      id: '3',
      name: 'Ms. Emily Davis',
      email: 'emily.davis@school.com',
      phone: '+91 76543 21098',
      department: 'English',
      position: 'Teacher',
      qualification: 'M.A English Literature',
      experience: '8 years',
      joinDate: '2016-06-20',
      status: 'active',
      subjects: ['English Literature', 'Communication Skills']
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      email: 'james.wilson@school.com',
      phone: '+91 65432 10987',
      department: 'Chemistry',
      position: 'Lab Coordinator',
      qualification: 'PhD in Chemistry',
      experience: '10 years',
      joinDate: '2014-03-10',
      status: 'active',
      subjects: ['Organic Chemistry', 'Inorganic Chemistry']
    },
    {
      id: '5',
      name: 'Ms. Lisa Anderson',
      email: 'lisa.anderson@school.com',
      phone: '+91 54321 09876',
      department: 'Computer Science',
      position: 'IT Coordinator',
      qualification: 'M.Tech Computer Science',
      experience: '6 years',
      joinDate: '2018-01-15',
      status: 'active',
      subjects: ['Programming', 'Database Management']
    }
  ];

  const departments = Array.from(new Set(staffMembers.map(staff => staff.department)));

  const filteredStaff = staffMembers.filter(staff => 
    (staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedDepartment === 'all' || staff.department === selectedDepartment)
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
                <p className="text-muted-foreground">Manage teachers and staff members</p>
              </div>
              
              <Button onClick={() => navigate('/staff/add')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Staff
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Staff</p>
                      <p className="text-lg font-semibold">{staffMembers.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Departments</p>
                      <p className="text-lg font-semibold">{departments.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Present Today</p>
                      <p className="text-lg font-semibold">{staffMembers.filter(s => s.status === 'active').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">On Leave</p>
                      <p className="text-lg font-semibold">0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff members..."
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

            {/* Staff Table */}
            <Card>
              <CardHeader>
                <CardTitle>Staff Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff Member</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStaff.map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${staff.name.replace(/\s+/g, '+')}&background=random`} />
                                <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{staff.name}</div>
                                <div className="text-xs text-muted-foreground">{staff.qualification}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center text-xs">
                                <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                                <span>{staff.email}</span>
                              </div>
                              <div className="flex items-center text-xs">
                                <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                                <span>{staff.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="text-sm font-medium">{staff.department}</div>
                                <div className="text-xs text-muted-foreground">
                                  {staff.subjects.slice(0, 2).join(', ')}
                                  {staff.subjects.length > 2 && '...'}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{staff.position}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {staff.experience}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => navigate(`/staff/${staff.id}`)}
                                className="h-8 px-3 text-xs"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => navigate(`/staff/${staff.id}/edit`)}
                                className="h-8 px-3 text-xs"
                              >
                                <Edit className="h-3 w-3" />
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

export default Staff;
