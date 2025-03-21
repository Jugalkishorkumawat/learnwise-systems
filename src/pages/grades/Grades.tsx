
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const GradeCell = ({ grade }: { grade: string }) => {
  const gradeColors = {
    'A+': 'text-green-600',
    'A': 'text-green-600',
    'A-': 'text-green-600',
    'B+': 'text-green-500',
    'B': 'text-green-500',
    'B-': 'text-yellow-600',
    'C+': 'text-yellow-600',
    'C': 'text-yellow-600',
    'C-': 'text-yellow-600',
    'D+': 'text-orange-600',
    'D': 'text-orange-600',
    'F': 'text-red-600',
  };
  
  const color = gradeColors[grade as keyof typeof gradeColors] || 'text-foreground';
  
  return <span className={`font-medium ${color}`}>{grade}</span>;
};

const Grades = () => {
  const { getGrades, getCourses } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  
  const courses = getCourses();
  const allGrades = getGrades();
  
  // Filter grades by course if selected
  const filteredGrades = selectedCourse === 'all' 
    ? allGrades 
    : allGrades.filter(grade => grade.courseId === selectedCourse);
  
  // Calculate overall GPA and total grade average
  const getGradePoints = (grade: string) => {
    const gradePoints: Record<string, number> = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    return gradePoints[grade] || 0;
  };
  
  // Calculate average by course
  const averageByCourseTmp = allGrades.reduce((acc, grade) => {
    if (!acc[grade.courseId]) {
      acc[grade.courseId] = {
        total: 0,
        count: 0,
        name: grade.courseName
      };
    }
    
    acc[grade.courseId].total += grade.percentage;
    acc[grade.courseId].count += 1;
    
    return acc;
  }, {} as Record<string, { total: number, count: number, name: string }>);
  
  const averageByCourse = Object.keys(averageByCourseTmp).map(courseId => ({
    courseId,
    name: averageByCourseTmp[courseId].name,
    average: Math.round(averageByCourseTmp[courseId].total / averageByCourseTmp[courseId].count)
  }));
  
  // Calculate GPA
  const gpaSum = allGrades.reduce((sum, grade) => sum + getGradePoints(grade.grade), 0);
  const gpa = allGrades.length > 0 ? (gpaSum / allGrades.length).toFixed(2) : '-';
  
  // Calculate average score
  const scoreSum = allGrades.reduce((sum, grade) => sum + grade.percentage, 0);
  const averageScore = allGrades.length > 0 ? Math.round(scoreSum / allGrades.length) : 0;
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">My Grades</h1>
                <p className="text-muted-foreground">View your academic performance and grades</p>
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
            
            {/* Grade Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Current GPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{gpa}</div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{averageScore}%</div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{allGrades.length}</div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{courses.length}</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Grades Chart & Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Chart */}
              <Card className="overflow-hidden lg:col-span-1">
                <CardHeader>
                  <CardTitle>Course Average</CardTitle>
                  <CardDescription>Average score per course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    {averageByCourse.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={averageByCourse}
                          layout="vertical"
                          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Bar dataKey="average" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">No grade data available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Table */}
              <Card className="overflow-hidden lg:col-span-2">
                <CardHeader>
                  <CardTitle>Grade Details</CardTitle>
                  <CardDescription>
                    {selectedCourse === 'all' 
                      ? 'All assignments across courses' 
                      : `Assignments for ${filteredGrades[0]?.courseName || ''}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredGrades.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Assignment</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGrades.map((grade) => (
                          <TableRow key={grade.id}>
                            <TableCell className="font-medium">
                              {grade.courseName}
                            </TableCell>
                            <TableCell>{grade.assignment}</TableCell>
                            <TableCell>{grade.score}/{grade.maxScore} ({grade.percentage}%)</TableCell>
                            <TableCell>
                              <GradeCell grade={grade.grade} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-muted-foreground">No grade records found</p>
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

export default Grades;
