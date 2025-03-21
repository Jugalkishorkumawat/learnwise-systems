
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Building, 
  Clock, 
  CalendarDays,
  MapPin,
  Users,
  AlertTriangle,
  Calendar,
  ChevronRight,
  BookOpen,
  Laptop,
  MessagesSquare,
  Coffee,
  Utensils,
  Dumbbell
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock facilities data
const facilities = [
  { id: '1', name: 'Main Library', type: 'library', location: 'Academic Block A', capacity: 200, status: 'available', image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: '2', name: 'Computer Lab 101', type: 'lab', location: 'Academic Block B', capacity: 50, status: 'available', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXIlMjBsYWJ8ZW58MHx8MHx8fDA%3D' },
  { id: '3', name: 'Seminar Hall', type: 'hall', location: 'Admin Block', capacity: 150, status: 'available', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uZmVyZW5jZSUyMGhhbGx8ZW58MHx8MHx8fDA%3D' },
  { id: '4', name: 'Cafeteria', type: 'cafeteria', location: 'Student Center', capacity: 300, status: 'available', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXRlcmlhfGVufDB8fDB8fHww' },
  { id: '5', name: 'Sports Complex', type: 'sports', location: 'East Campus', capacity: 500, status: 'available', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fHww' },
  { id: '6', name: 'Chemistry Lab', type: 'lab', location: 'Science Block', capacity: 40, status: 'maintenance', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlbWlzdHJ5JTIwbGFifGVufDB8fDB8fHww' },
  { id: '7', name: 'Study Rooms', type: 'study', location: 'Academic Block C', capacity: 20, status: 'available', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8fDA%3D' },
  { id: '8', name: 'Auditorium', type: 'hall', location: 'Main Block', capacity: 500, status: 'booked', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXVkaXRvcml1bXxlbnwwfHwwfHx8MA%3D' },
];

// Mock bookings data
const bookings = [
  { id: '1', facilityId: '3', facilityName: 'Seminar Hall', eventName: 'Department Meeting', bookedBy: 'Prof. Smith', date: '2023-11-15', timeSlot: '10:00 AM - 12:00 PM', status: 'confirmed' },
  { id: '2', facilityId: '8', facilityName: 'Auditorium', eventName: 'Annual Day Function', bookedBy: 'Cultural Committee', date: '2023-11-20', timeSlot: '5:00 PM - 9:00 PM', status: 'confirmed' },
  { id: '3', facilityId: '2', facilityName: 'Computer Lab 101', eventName: 'Programming Contest', bookedBy: 'Computer Science Dept.', date: '2023-11-18', timeSlot: '2:00 PM - 5:00 PM', status: 'pending' },
  { id: '4', facilityId: '1', facilityName: 'Main Library', eventName: 'Book Exhibition', bookedBy: 'Library Committee', date: '2023-11-25', timeSlot: '9:00 AM - 4:00 PM', status: 'confirmed' },
  { id: '5', facilityId: '5', facilityName: 'Sports Complex', eventName: 'Inter-College Tournament', bookedBy: 'Sports Department', date: '2023-11-30', timeSlot: 'All Day', status: 'confirmed' },
];

const facilityIcons: Record<string, React.ReactNode> = {
  library: <BookOpen className="h-6 w-6" />,
  lab: <Laptop className="h-6 w-6" />,
  hall: <MessagesSquare className="h-6 w-6" />,
  cafeteria: <Coffee className="h-6 w-6" />,
  sports: <Dumbbell className="h-6 w-6" />,
  study: <Utensils className="h-6 w-6" />,
};

const Facilities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  // Filter facilities based on search query and selected type
  const filteredFacilities = facilities.filter(facility => 
    (facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    facility.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedType === 'all' || facility.type === selectedType)
  );
  
  const facilityTypes = Array.from(new Set(facilities.map(facility => facility.type)));
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Facilities Management</h1>
                <p className="text-muted-foreground">Manage campus facilities and bookings</p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Facility
                </Button>
              </div>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Facilities</CardDescription>
                  <CardTitle className="text-2xl">{facilities.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Building className="mr-1 h-4 w-4 text-primary" />
                    <span>Campus-wide</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Available Now</CardDescription>
                  <CardTitle className="text-2xl">{facilities.filter(f => f.status === 'available').length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4 text-green-500" />
                    <span>Ready for use</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Bookings Today</CardDescription>
                  <CardTitle className="text-2xl">{bookings.filter(b => b.date === '2023-11-15').length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-1 h-4 w-4 text-blue-500" />
                    <span>Current bookings</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Under Maintenance</CardDescription>
                  <CardTitle className="text-2xl">{facilities.filter(f => f.status === 'maintenance').length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <AlertTriangle className="mr-1 h-4 w-4 text-yellow-500" />
                    <span>Not available</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="directory">
              <TabsList className="mb-6">
                <TabsTrigger value="directory">Facility Directory</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="directory">
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search facilities..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      {facilityTypes.map(type => (
                        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFacilities.map((facility) => (
                    <Card key={facility.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={facility.image} 
                          alt={facility.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="outline" className="mb-2 capitalize">
                              {facility.type}
                            </Badge>
                            <CardTitle className="text-xl">{facility.name}</CardTitle>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {facilityIcons[facility.type] || <Building className="h-6 w-6" />}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{facility.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Capacity: {facility.capacity}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Status: 
                              <Badge 
                                className={`ml-2 ${
                                  facility.status === 'available' ? 'bg-green-100 text-green-800' :
                                  facility.status === 'booked' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
                              </Badge>
                            </span>
                          </div>
                          
                          <div className="pt-3 flex gap-2">
                            <Button className="flex-1" disabled={facility.status !== 'available'}>
                              Book Now
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="bookings">
                <Card>
                  <CardHeader className="pb-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle>Upcoming Bookings</CardTitle>
                        <CardDescription>
                          Manage facility reservations
                        </CardDescription>
                      </div>
                      <Button className="mt-4 sm:mt-0">
                        <Calendar className="mr-2 h-4 w-4" />
                        New Booking
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Facility</TableHead>
                            <TableHead>Event</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Booked By</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell className="font-medium">#{booking.id.padStart(4, '0')}</TableCell>
                              <TableCell>{booking.facilityName}</TableCell>
                              <TableCell>{booking.eventName}</TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="font-medium">{new Date(booking.date).toLocaleDateString()}</div>
                                  <div className="text-xs text-muted-foreground">{booking.timeSlot}</div>
                                </div>
                              </TableCell>
                              <TableCell>{booking.bookedBy}</TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }
                                >
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  <span className="sr-only">Details</span>
                                  <ChevronRight className="h-4 w-4" />
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

export default Facilities;
