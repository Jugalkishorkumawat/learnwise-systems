
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const StatusBadge = ({ status }: { status: 'present' | 'absent' | 'late' }) => {
  const colors = {
    present: "bg-green-100 text-green-800 hover:bg-green-100",
    absent: "bg-red-100 text-red-800 hover:bg-red-100",
    late: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
  };

  return (
    <Badge className={colors[status]} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const ViewAttendance = () => {
  const { getAttendance, getCourses } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  
  const courses = getCourses();
  const allAttendance = getAttendance();
  
  // Filter attendance by course if selected
  const filteredAttendance = selectedCourse === 'all' 
    ? allAttendance 
    : allAttendance.filter(record => record.courseId === selectedCourse);
  
  // Calculate attendance statistics
  const totalRecords = filteredAttendance.length;
  const presentCount = filteredAttendance.filter(record => record.status === 'present').length;
  const absentCount = filteredAttendance.filter(record => record.status === 'absent').length;
  const lateCount = filteredAttendance.filter(record => record.status === 'late').length;
  
  const attendancePercentage = totalRecords > 0 
    ? Math.round((presentCount / totalRecords) * 100) 
    : 0;
  
  const chartData = [
    { name: 'Present', value: presentCount, color: '#10b981' },
    { name: 'Absent', value: absentCount, color: '#ef4444' },
    { name: 'Late', value: lateCount, color: '#f59e0b' },
  ].filter(item => item.value > 0);

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">My Attendance</h1>
                <p className="text-muted-foreground">View and monitor your attendance records</p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Select
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                >
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.code} - {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Attendance Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRecords}</div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{attendancePercentage}%</div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Present</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{presentCount}</div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Absent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{absentCount}</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Attendance Chart & Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Chart */}
              <Card className="overflow-hidden lg:col-span-1">
                <CardHeader>
                  <CardTitle>Attendance Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    {chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">No attendance data available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Table */}
              <Card className="overflow-hidden lg:col-span-2">
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredAttendance.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAttendance.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{record.courseName}</TableCell>
                            <TableCell>
                              <StatusBadge status={record.status} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-muted-foreground">No attendance records found</p>
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

export default ViewAttendance;
