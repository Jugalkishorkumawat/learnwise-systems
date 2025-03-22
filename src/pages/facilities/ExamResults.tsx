
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
  Calendar, 
  FileText, 
  GraduationCap, 
  Filter,
  Download,
  Plus,
  Pencil,
  FileSpreadsheet
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock exam data
const exams = [
  { id: '1', name: 'Mid-Term Examination', semester: 'Fall 2023', startDate: '2023-10-15', endDate: '2023-10-20', status: 'completed' },
  { id: '2', name: 'Final Examination', semester: 'Fall 2023', startDate: '2023-12-10', endDate: '2023-12-20', status: 'upcoming' },
  { id: '3', name: 'Quiz 1 - Computer Science', semester: 'Fall 2023', startDate: '2023-09-15', endDate: '2023-09-15', status: 'completed' },
  { id: '4', name: 'Quiz 2 - Computer Science', semester: 'Fall 2023', startDate: '2023-11-05', endDate: '2023-11-05', status: 'completed' },
  { id: '5', name: 'Lab Evaluation', semester: 'Fall 2023', startDate: '2023-11-15', endDate: '2023-11-18', status: 'ongoing' },
];

// Mock student results
const studentResults = [
  { 
    id: '1', 
    studentId: 'ST2023001', 
    name: 'John Doe', 
    department: 'Computer Science',
    semester: 3,
    results: [
      { examId: '1', subject: 'Introduction to Computer Science', marks: 85, totalMarks: 100, grade: 'A' },
      { examId: '3', subject: 'Introduction to Computer Science', marks: 90, totalMarks: 100, grade: 'A+' },
      { examId: '4', subject: 'Introduction to Computer Science', marks: 78, totalMarks: 100, grade: 'B+' },
    ]
  },
  { 
    id: '2', 
    studentId: 'ST2023002', 
    name: 'Sarah Johnson', 
    department: 'Computer Science',
    semester: 3,
    results: [
      { examId: '1', subject: 'Data Structures', marks: 92, totalMarks: 100, grade: 'A+' },
      { examId: '3', subject: 'Data Structures', marks: 88, totalMarks: 100, grade: 'A' },
      { examId: '4', subject: 'Data Structures', marks: 95, totalMarks: 100, grade: 'A+' },
    ]
  },
  { 
    id: '3', 
    studentId: 'ST2023003', 
    name: 'Michael Brown', 
    department: 'Computer Science',
    semester: 3,
    results: [
      { examId: '1', subject: 'Introduction to Computer Science', marks: 75, totalMarks: 100, grade: 'B' },
      { examId: '3', subject: 'Introduction to Computer Science', marks: 72, totalMarks: 100, grade: 'B' },
      { examId: '4', subject: 'Introduction to Computer Science', marks: 80, totalMarks: 100, grade: 'A-' },
    ]
  },
  { 
    id: '4', 
    studentId: 'ST2023004', 
    name: 'Emily Davis', 
    department: 'Mathematics',
    semester: 3,
    results: [
      { examId: '1', subject: 'Calculus I', marks: 88, totalMarks: 100, grade: 'A' },
      { examId: '3', subject: 'Calculus I', marks: 82, totalMarks: 100, grade: 'A-' },
      { examId: '4', subject: 'Calculus I', marks: 90, totalMarks: 100, grade: 'A+' },
    ]
  },
];

// Mock subjects
const subjects = [
  { id: '1', code: 'CS101', name: 'Introduction to Computer Science', department: 'Computer Science', semester: 3 },
  { id: '2', code: 'CS201', name: 'Data Structures', department: 'Computer Science', semester: 3 },
  { id: '3', code: 'MATH101', name: 'Calculus I', department: 'Mathematics', semester: 3 },
  { id: '4', code: 'ENG101', name: 'English Composition', department: 'English', semester: 3 },
];

const ExamResults = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('exams');
  const [selectedExam, setSelectedExam] = useState('all');
  
  // Filter exams based on search query
  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter students based on search query and selected exam
  const filteredStudents = studentResults.filter(student => 
    (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     student.studentId.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedExam === 'all' || student.results.some(result => result.examId === selectedExam))
  );
  
  // Get student's result for selected exam
  const getStudentExamResult = (student: any, examId: string) => {
    return selectedExam === 'all' 
      ? student.results.reduce((acc: any, result: any) => ({ ...acc, [result.examId]: result }), {})
      : student.results.find((result: any) => result.examId === examId);
  };
  
  const handleAddExam = () => {
    toast({
      title: "New Exam Created",
      description: "The exam has been successfully added to the schedule.",
    });
  };
  
  const handleAddResult = () => {
    toast({
      title: "Result Added",
      description: "The student result has been successfully recorded.",
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
                <h1 className="text-2xl font-bold tracking-tight">Exam & Results Management</h1>
                <p className="text-muted-foreground">Schedule exams and manage student grades</p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Button onClick={activeTab === 'exams' ? handleAddExam : handleAddResult}>
                  <Plus className="mr-2 h-4 w-4" />
                  {activeTab === 'exams' ? 'Schedule New Exam' : 'Add New Result'}
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="exams" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="exams">Exam Schedule</TabsTrigger>
                <TabsTrigger value="results">Student Results</TabsTrigger>
              </TabsList>
              
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={
                      activeTab === 'exams' 
                        ? "Search for exams..." 
                        : "Search for students..."
                    }
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  {activeTab === 'results' && (
                    <select
                      className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={selectedExam}
                      onChange={(e) => setSelectedExam(e.target.value)}
                    >
                      <option value="all">All Exams</option>
                      {exams.map(exam => (
                        <option key={exam.id} value={exam.id}>{exam.name}</option>
                      ))}
                    </select>
                  )}
                  
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
              
              <TabsContent value="exams">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle>Examination Schedule</CardTitle>
                    <CardDescription>
                      View and manage upcoming and past examinations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Exam Name</TableHead>
                            <TableHead>Semester</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredExams.map((exam, index) => (
                            <TableRow key={exam.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                <div className="font-medium">{exam.name}</div>
                              </TableCell>
                              <TableCell>{exam.semester}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <div>{exam.startDate}</div>
                                    {exam.startDate !== exam.endDate && (
                                      <div className="text-xs text-muted-foreground">to {exam.endDate}</div>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    exam.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                                    exam.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                    'bg-green-100 text-green-800'
                                  }
                                >
                                  {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="h-8 px-3 text-xs"
                                  >
                                    <Pencil className="h-3 w-3 mr-1" />
                                    Edit
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="h-8 px-3 text-xs"
                                    onClick={() => setActiveTab('results')}
                                  >
                                    <FileText className="h-3 w-3 mr-1" />
                                    View Results
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
              
              <TabsContent value="results">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle>Student Results</CardTitle>
                    <CardDescription>
                      View and manage academic performance of students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Department</TableHead>
                            {selectedExam === 'all' ? (
                              <TableHead>Performance Overview</TableHead>
                            ) : (
                              <>
                                <TableHead>Subject</TableHead>
                                <TableHead>Marks</TableHead>
                                <TableHead>Grade</TableHead>
                              </>
                            )}
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.map((student, index) => {
                            const resultData = getStudentExamResult(student, selectedExam);
                            
                            // Calculate average percentage for overall performance
                            const avgPercentage = selectedExam === 'all'
                              ? student.results.reduce((sum: number, result: any) => sum + (result.marks / result.totalMarks * 100), 0) / student.results.length
                              : 0;
                              
                            return (
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
                                      <div className="text-xs text-muted-foreground">ID: {student.studentId}</div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <div>
                                      <div>{student.department}</div>
                                      <div className="text-xs text-muted-foreground">Semester {student.semester}</div>
                                    </div>
                                  </div>
                                </TableCell>
                                
                                {selectedExam === 'all' ? (
                                  <TableCell>
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-xs">
                                        <span>Average: {avgPercentage.toFixed(1)}%</span>
                                        <span>{student.results.length} exams</span>
                                      </div>
                                      <Progress value={avgPercentage} className="h-2" />
                                    </div>
                                  </TableCell>
                                ) : resultData ? (
                                  <>
                                    <TableCell>{resultData.subject}</TableCell>
                                    <TableCell>
                                      {resultData.marks} / {resultData.totalMarks}
                                    </TableCell>
                                    <TableCell>
                                      <Badge className="bg-blue-100 text-blue-800">
                                        {resultData.grade}
                                      </Badge>
                                    </TableCell>
                                  </>
                                ) : (
                                  <>
                                    <TableCell colSpan={3} className="text-muted-foreground text-center">
                                      No result found for this exam
                                    </TableCell>
                                  </>
                                )}
                                
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="h-8 px-3 text-xs"
                                      onClick={() => window.location.href = `/students/${student.id}`}
                                    >
                                      <FileText className="h-3 w-3 mr-1" />
                                      Full Report
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="h-8 px-3 text-xs"
                                    >
                                      <FileSpreadsheet className="h-3 w-3 mr-1" />
                                      Export
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
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

export default ExamResults;
