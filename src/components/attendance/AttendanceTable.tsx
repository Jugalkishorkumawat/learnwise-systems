
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui-custom/Button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserCheck, UserX, Clock, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

// Types
interface StudentAttendance {
  id: string;
  studentId: string;
  name: string;
  status: 'present' | 'absent' | 'late';
  verificationMethod?: 'face' | 'manual';
}

interface CourseAttendance {
  id: string;
  date: string;
  courseId: string;
  courseName: string;
  students: StudentAttendance[];
}

interface StudentReport {
  id: string;
  name: string;
  studentId: string;
  course: string;
  attendance: number;
}

interface DailyAttendanceTableProps {
  courseAttendance: CourseAttendance[];
}

interface AttendanceReportsTableProps {
  students: StudentReport[];
}

export const DailyAttendanceTable = ({ courseAttendance }: DailyAttendanceTableProps) => {
  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    toast({
      title: "Attendance Marked",
      description: `Student ${studentId} has been marked as ${status}.`,
    });
  };

  return (
    <>
      {courseAttendance.map((course) => (
        <div key={course.id} className="mb-8 last:mb-0">
          <h3 className="font-medium text-lg mb-2 flex items-center">
            <span>{course.courseName}</span>
            <Badge variant="outline" className="ml-2">{course.students.length} students</Badge>
          </h3>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.students.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium">{student.studentId}</div>
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          student.status === 'present' ? 'bg-green-100 text-green-800' :
                          student.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          student.verificationMethod === 'face' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          'bg-gray-50 text-gray-800 border-gray-200'
                        }
                      >
                        {student.verificationMethod === 'face' ? 'Face Recognition' : 'Manual Entry'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant={student.status === 'present' ? 'default' : 'outline'}
                          onClick={() => handleMarkAttendance(student.studentId, 'present')}
                          className="h-8 px-2 text-xs"
                        >
                          <UserCheck className="h-3 w-3 mr-1" />
                          Present
                        </Button>
                        <Button 
                          size="sm" 
                          variant={student.status === 'late' ? 'default' : 'outline'}
                          onClick={() => handleMarkAttendance(student.studentId, 'late')}
                          className="h-8 px-2 text-xs bg-yellow-600 hover:bg-yellow-700"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Late
                        </Button>
                        <Button 
                          size="sm" 
                          variant={student.status === 'absent' ? 'default' : 'outline'}
                          onClick={() => handleMarkAttendance(student.studentId, 'absent')}
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
        </div>
      ))}
    </>
  );
};

export const AttendanceReportsTable = ({ students }: AttendanceReportsTableProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Attendance %</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <div className="font-medium">{student.studentId}</div>
              </TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>
                <Badge 
                  className={
                    student.attendance >= 90 ? 'bg-green-100 text-green-800' :
                    student.attendance >= 75 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }
                >
                  {student.attendance}%
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate(`/students/${student.id}`)}
                  className="h-8 px-3 text-xs"
                >
                  <UserCog className="h-3 w-3 mr-1" />
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
