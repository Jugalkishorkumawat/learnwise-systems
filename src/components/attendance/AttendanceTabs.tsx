
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { DailyAttendanceTable, AttendanceReportsTable } from './AttendanceTable';
import AttendanceFilters from './AttendanceFilters';

interface StudentReport {
  id: string;
  name: string;
  studentId: string;
  course: string;
  attendance: number;
}

interface CourseAttendance {
  id: string;
  date: string;
  courseId: string;
  courseName: string;
  students: {
    id: string;
    name: string;
    studentId: string;
    status: 'present' | 'absent' | 'late';
    verificationMethod: 'face' | 'manual';
  }[];
}

interface AttendanceTabsProps {
  dailyAttendance: CourseAttendance[];
  filteredStudents: StudentReport[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCourse: string;
  onCourseChange: (course: string) => void;
  courses: string[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const AttendanceTabs = ({
  dailyAttendance,
  filteredStudents,
  searchQuery,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  courses,
  activeTab,
  onTabChange
}: AttendanceTabsProps) => {
  return (
    <Tabs defaultValue="daily" value={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-6">
        <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
        <TabsTrigger value="report">Attendance Reports</TabsTrigger>
      </TabsList>
      
      <AttendanceFilters
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        selectedCourse={selectedCourse}
        onCourseChange={onCourseChange}
        courses={courses}
      />
      
      <TabsContent value="daily">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>
              Mark and manage attendance for today's classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DailyAttendanceTable courseAttendance={dailyAttendance} />
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
            <AttendanceReportsTable students={filteredStudents} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AttendanceTabs;
