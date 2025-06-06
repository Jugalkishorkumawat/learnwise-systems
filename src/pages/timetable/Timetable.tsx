
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  BookOpen,
  Users,
  MapPin
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedDay, setSelectedDay] = useState('Monday');
  
  const timeSlots = [
    '9:00 - 9:45',
    '9:45 - 10:30',
    '10:30 - 11:00', // Break
    '11:00 - 11:45',
    '11:45 - 12:30',
    '12:30 - 1:15',
    '1:15 - 2:00', // Lunch
    '2:00 - 2:45',
    '2:45 - 3:30'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const timetableData = {
    'Monday': [
      { subject: 'Mathematics', teacher: 'Prof. Smith', room: 'Room 101' },
      { subject: 'Physics', teacher: 'Prof. Johnson', room: 'Lab 1' },
      { subject: 'Break', teacher: '', room: '' },
      { subject: 'Chemistry', teacher: 'Prof. Brown', room: 'Lab 2' },
      { subject: 'English', teacher: 'Prof. Davis', room: 'Room 102' },
      { subject: 'History', teacher: 'Prof. Wilson', room: 'Room 103' },
      { subject: 'Lunch Break', teacher: '', room: '' },
      { subject: 'Computer Science', teacher: 'Prof. Taylor', room: 'Computer Lab' },
      { subject: 'Physical Education', teacher: 'Coach Miller', room: 'Playground' }
    ],
    'Tuesday': [
      { subject: 'English', teacher: 'Prof. Davis', room: 'Room 102' },
      { subject: 'Mathematics', teacher: 'Prof. Smith', room: 'Room 101' },
      { subject: 'Break', teacher: '', room: '' },
      { subject: 'Biology', teacher: 'Prof. Anderson', room: 'Lab 3' },
      { subject: 'Physics', teacher: 'Prof. Johnson', room: 'Lab 1' },
      { subject: 'Geography', teacher: 'Prof. Garcia', room: 'Room 104' },
      { subject: 'Lunch Break', teacher: '', room: '' },
      { subject: 'Art', teacher: 'Prof. Martinez', room: 'Art Room' },
      { subject: 'Music', teacher: 'Prof. Robinson', room: 'Music Room' }
    ]
  };

  const currentSchedule = timetableData[selectedDay] || timetableData['Monday'];

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Timetable Management</h1>
                <p className="text-muted-foreground">Manage class schedules and timetables</p>
              </div>
              
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Timetable
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10-A">Class 10-A</SelectItem>
                    <SelectItem value="10-B">Class 10-B</SelectItem>
                    <SelectItem value="11-A">Class 11-A</SelectItem>
                    <SelectItem value="11-B">Class 11-B</SelectItem>
                    <SelectItem value="12-A">Class 12-A</SelectItem>
                    <SelectItem value="12-B">Class 12-B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Select Day</label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Weekly Timetable
                </Button>
              </div>
            </div>

            {/* Timetable Display */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Timetable for {selectedClass} - {selectedDay}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">Time</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.map((time, index) => {
                        const period = currentSchedule[index];
                        const isBreak = period?.subject.includes('Break');
                        
                        return (
                          <TableRow key={index} className={isBreak ? 'bg-secondary/50' : ''}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                {time}
                              </div>
                            </TableCell>
                            <TableCell>
                              {period?.subject && (
                                <div className="flex items-center">
                                  {!isBreak && <BookOpen className="mr-2 h-4 w-4 text-primary" />}
                                  <span className={isBreak ? 'text-muted-foreground italic' : 'font-medium'}>
                                    {period.subject}
                                  </span>
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {period?.teacher && !isBreak && (
                                <div className="flex items-center">
                                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {period.teacher}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {period?.room && !isBreak && (
                                <div className="flex items-center">
                                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <Badge variant="outline">{period.room}</Badge>
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {!isBreak && (
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Periods</p>
                      <p className="text-lg font-semibold">7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Teachers</p>
                      <p className="text-lg font-semibold">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Rooms Used</p>
                      <p className="text-lg font-semibold">6</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Hours</p>
                      <p className="text-lg font-semibold">6.75</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default Timetable;
