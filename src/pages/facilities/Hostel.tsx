
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  ArrowLeft, 
  Home, 
  User, 
  BedDouble, 
  Filter,
  Download,
  Plus,
  UserCheck,
  UserX,
  Wrench
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock hostel data
const rooms = [
  { id: '1', roomNumber: '101', type: 'Single', block: 'A', floor: '1', capacity: 1, occupied: 1, status: 'occupied' },
  { id: '2', roomNumber: '102', type: 'Single', block: 'A', floor: '1', capacity: 1, occupied: 0, status: 'available' },
  { id: '3', roomNumber: '103', type: 'Single', block: 'A', floor: '1', capacity: 1, occupied: 1, status: 'occupied' },
  { id: '4', roomNumber: '201', type: 'Double', block: 'A', floor: '2', capacity: 2, occupied: 2, status: 'occupied' },
  { id: '5', roomNumber: '202', type: 'Double', block: 'A', floor: '2', capacity: 2, occupied: 1, status: 'partially occupied' },
  { id: '6', roomNumber: '203', type: 'Double', block: 'A', floor: '2', capacity: 2, occupied: 0, status: 'available' },
  { id: '7', roomNumber: '301', type: 'Triple', block: 'B', floor: '3', capacity: 3, occupied: 2, status: 'partially occupied' },
  { id: '8', roomNumber: '302', type: 'Triple', block: 'B', floor: '3', capacity: 3, occupied: 3, status: 'occupied' },
];

// Mock hostel students
const hostelStudents = [
  { id: '1', studentId: 'ST2023001', name: 'John Doe', roomId: '1', roomNumber: '101', block: 'A', checkInDate: '2023-08-15', attendance: 'present' },
  { id: '2', studentId: 'ST2023002', name: 'Sarah Johnson', roomId: '3', roomNumber: '103', block: 'A', checkInDate: '2023-08-10', attendance: 'absent' },
  { id: '3', studentId: 'ST2023003', name: 'Michael Brown', roomId: '4', roomNumber: '201', block: 'A', checkInDate: '2023-07-20', attendance: 'present' },
  { id: '4', studentId: 'ST2023004', name: 'Emily Davis', roomId: '4', roomNumber: '201', block: 'A', checkInDate: '2023-07-25', attendance: 'present' },
  { id: '5', studentId: 'ST2023006', name: 'Olivia Martin', roomId: '5', roomNumber: '202', block: 'A', checkInDate: '2023-08-05', attendance: 'present' },
  { id: '6', studentId: 'ST2023007', name: 'William Thompson', roomId: '7', roomNumber: '301', block: 'B', checkInDate: '2023-08-12', attendance: 'absent' },
  { id: '7', studentId: 'ST2023008', name: 'Sophia Garcia', roomId: '7', roomNumber: '301', block: 'B', checkInDate: '2023-08-01', attendance: 'present' },
  { id: '8', studentId: 'ST2023005', name: 'James Wilson', roomId: '8', roomNumber: '302', block: 'B', checkInDate: '2023-07-15', attendance: 'present' },
  { id: '9', studentId: 'ST2023009', name: 'Emma Rodriguez', roomId: '8', roomNumber: '302', block: 'B', checkInDate: '2023-07-18', attendance: 'present' },
  { id: '10', studentId: 'ST2023010', name: 'Benjamin Lee', roomId: '8', roomNumber: '302', block: 'B', checkInDate: '2023-07-22', attendance: 'absent' },
];

// Mock maintenance requests
const maintenanceRequests = [
  { id: '1', roomId: '4', roomNumber: '201', block: 'A', description: 'Leaking tap in bathroom', requestedBy: 'Emily Davis', requestDate: '2023-11-10', status: 'pending' },
  { id: '2', roomId: '8', roomNumber: '302', block: 'B', description: 'Light bulb needs replacement', requestedBy: 'James Wilson', requestDate: '2023-11-05', status: 'in-progress' },
  { id: '3', roomId: '5', roomNumber: '202', block: 'A', description: 'AC not cooling properly', requestedBy: 'Olivia Martin', requestDate: '2023-11-02', status: 'completed' },
  { id: '4', roomId: '7', roomNumber: '301', block: 'B', description: 'Window latch broken', requestedBy: 'Sophia Garcia', requestDate: '2023-11-08', status: 'pending' },
];

const Hostel = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('rooms');
  const [selectedBlock, setSelectedBlock] = useState('all');
  
  // Filter rooms based on search query and selected block
  const filteredRooms = rooms.filter(room => 
    (room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedBlock === 'all' || room.block === selectedBlock)
  );
  
  // Filter students based on search query and selected block
  const filteredStudents = hostelStudents.filter(student => 
    (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
     student.roomNumber.includes(searchQuery)) &&
    (selectedBlock === 'all' || student.block === selectedBlock)
  );
  
  // Filter maintenance requests based on search query and selected block
  const filteredRequests = maintenanceRequests.filter(request => 
    (request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     request.roomNumber.includes(searchQuery)) &&
    (selectedBlock === 'all' || request.block === selectedBlock)
  );
  
  const blocks = Array.from(new Set(rooms.map(room => room.block)));
  
  const handleRoomAction = (room: any) => {
    toast({
      title: "Room Updated",
      description: `Room ${room.roomNumber} has been updated.`,
    });
  };
  
  const handleAttendance = (studentId: string, status: 'present' | 'absent') => {
    toast({
      title: "Attendance Marked",
      description: `Student ${studentId} has been marked as ${status}.`,
    });
  };
  
  const handleMaintenanceAction = (requestId: string, action: string) => {
    toast({
      title: `Request ${action === 'complete' ? 'Completed' : 'Updated'}`,
      description: `Maintenance request has been ${action === 'complete' ? 'marked as completed' : 'updated'}.`,
    });
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center mb-8">
              <Button variant="ghost" size="sm" onClick={() => navigate('/facilities')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Facilities
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Hostel Management</h1>
                <p className="text-muted-foreground">Manage hostel rooms, students, and maintenance</p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {activeTab === 'rooms' ? 'Add New Room' : 
                   activeTab === 'students' ? 'Allocate Room' : 
                   'New Maintenance Request'}
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="rooms" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>
              
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={
                      activeTab === 'rooms' ? "Search by room number..." : 
                      activeTab === 'students' ? "Search by student name or ID..." : 
                      "Search maintenance requests..."
                    }
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={selectedBlock}
                    onChange={(e) => setSelectedBlock(e.target.value)}
                  >
                    <option value="all">All Blocks</option>
                    {blocks.map(block => (
                      <option key={block} value={block}>Block {block}</option>
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
              
              <TabsContent value="rooms">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle>Hostel Rooms</CardTitle>
                    <CardDescription>
                      View and manage all hostel rooms and their allocation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Room Number</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Block</TableHead>
                            <TableHead>Floor</TableHead>
                            <TableHead>Occupancy</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRooms.map((room) => (
                            <TableRow key={room.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  <BedDouble className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{room.roomNumber}</span>
                                </div>
                              </TableCell>
                              <TableCell>{room.type}</TableCell>
                              <TableCell>Block {room.block}</TableCell>
                              <TableCell>Floor {room.floor}</TableCell>
                              <TableCell>
                                {room.occupied} / {room.capacity}
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    room.status === 'available' ? 'bg-green-100 text-green-800' :
                                    room.status === 'partially occupied' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                  }
                                >
                                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleRoomAction(room)}
                                    className="h-8 px-3 text-xs"
                                  >
                                    View Details
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
              </TabsContent>
              
              <TabsContent value="students">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle>Hostel Students</CardTitle>
                    <CardDescription>
                      Manage hostel students and their attendance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Room</TableHead>
                            <TableHead>Check-in Date</TableHead>
                            <TableHead>Today's Attendance</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <Avatar>
                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${student.name.replace(/\s+/g, '+')}&background=random`} />
                                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{student.name}</div>
                                    <div className="text-xs text-muted-foreground">ID: {student.studentId}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Home className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <div>Room {student.roomNumber}</div>
                                    <div className="text-xs text-muted-foreground">Block {student.block}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{student.checkInDate}</TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    student.attendance === 'present' ? 'bg-green-100 text-green-800' :
                                    'bg-red-100 text-red-800'
                                  }
                                >
                                  {student.attendance.charAt(0).toUpperCase() + student.attendance.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    size="sm" 
                                    variant={student.attendance === 'present' ? 'default' : 'outline'}
                                    onClick={() => handleAttendance(student.studentId, 'present')}
                                    className="h-8 px-2 text-xs"
                                  >
                                    <UserCheck className="h-3 w-3 mr-1" />
                                    Present
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant={student.attendance === 'absent' ? 'default' : 'outline'}
                                    onClick={() => handleAttendance(student.studentId, 'absent')}
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
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="maintenance">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle>Maintenance Requests</CardTitle>
                    <CardDescription>
                      Track and manage hostel maintenance requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Room</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Requested By</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  <Home className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <div>Room {request.roomNumber}</div>
                                    <div className="text-xs text-muted-foreground">Block {request.block}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">
                                  {request.description}
                                </div>
                              </TableCell>
                              <TableCell>{request.requestedBy}</TableCell>
                              <TableCell>{request.requestDate}</TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                    'bg-green-100 text-green-800'
                                  }
                                >
                                  {request.status === 'pending' ? 'Pending' :
                                   request.status === 'in-progress' ? 'In Progress' :
                                   'Completed'}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  {request.status !== 'completed' && (
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleMaintenanceAction(request.id, 'complete')}
                                      className="h-8 px-3 text-xs"
                                    >
                                      <Wrench className="h-3 w-3 mr-1" />
                                      Mark as Complete
                                    </Button>
                                  )}
                                </div>
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

export default Hostel;
