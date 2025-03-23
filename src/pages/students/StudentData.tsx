
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import {
  Search,
  Download,
  Upload,
  FileText,
  User,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  GraduationCap,
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

// Types for the student data
interface StudentDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  status: 'verified' | 'pending' | 'rejected';
}

interface StudentAcademicRecord {
  id: string;
  semester: number;
  year: string;
  gpa: number;
  rank: number;
  status: 'completed' | 'ongoing' | 'upcoming';
}

const StudentData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for documents
  const [documents, setDocuments] = useState<StudentDocument[]>([
    { id: '1', name: 'Birth Certificate', type: 'PDF', uploadDate: '2023-01-15', size: '1.2 MB', status: 'verified' },
    { id: '2', name: 'High School Marksheet', type: 'PDF', uploadDate: '2023-01-16', size: '0.8 MB', status: 'verified' },
    { id: '3', name: 'Transfer Certificate', type: 'PDF', uploadDate: '2023-01-17', size: '0.6 MB', status: 'verified' },
    { id: '4', name: 'Address Proof', type: 'PDF', uploadDate: '2023-01-18', size: '1.5 MB', status: 'pending' },
    { id: '5', name: 'ID Card', type: 'JPG', uploadDate: '2023-01-19', size: '0.3 MB', status: 'verified' },
  ]);

  // Mock data for academic records
  const [academicRecords, setAcademicRecords] = useState<StudentAcademicRecord[]>([
    { id: '1', semester: 1, year: '2022-23', gpa: 3.8, rank: 15, status: 'completed' },
    { id: '2', semester: 2, year: '2022-23', gpa: 3.9, rank: 10, status: 'completed' },
    { id: '3', semester: 3, year: '2023-24', gpa: 3.7, rank: 18, status: 'ongoing' },
    { id: '4', semester: 4, year: '2023-24', gpa: 0, rank: 0, status: 'upcoming' },
    { id: '5', semester: 5, year: '2024-25', gpa: 0, rank: 0, status: 'upcoming' },
    { id: '6', semester: 6, year: '2024-25', gpa: 0, rank: 0, status: 'upcoming' },
  ]);

  const handleFileUpload = () => {
    toast({
      title: "Document Upload",
      description: "Your document has been uploaded and is pending verification.",
    });
  };

  const handleDownload = (documentName: string) => {
    toast({
      title: "Document Download",
      description: `Downloading ${documentName}...`,
    });
  };

  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Student Data</h1>
                <p className="text-muted-foreground">View and manage your academic records and documents</p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex gap-2">
                <Button variant="outline" onClick={handleFileUpload}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Request Document
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">{user?.name || 'John Doe'}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">{user?.email || 'john.doe@example.com'}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">123 College Street, Mumbai, Maharashtra, India</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">DOB: 15 May, 2000</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">Department: Computer Science</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">Current Semester: 3</span>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-3">Registration Details</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Student ID</p>
                          <p className="text-sm">{user?.studentId || 'ST2023001'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Joined Date</p>
                          <p className="text-sm">{user?.joinedDate || '01 Sep, 2022'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <Tabs defaultValue="documents">
                  <CardHeader className="pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <CardTitle>Academic Records & Documents</CardTitle>
                      <TabsList className="mt-2 sm:mt-0">
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                        <TabsTrigger value="academic">Academic Records</TabsTrigger>
                      </TabsList>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <TabsContent value="documents">
                      <div className="mb-4 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search documents..."
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Document Name</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Upload Date</TableHead>
                              <TableHead>Size</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredDocuments.map((doc) => (
                              <TableRow key={doc.id}>
                                <TableCell className="font-medium">{doc.name}</TableCell>
                                <TableCell>{doc.type}</TableCell>
                                <TableCell>{doc.uploadDate}</TableCell>
                                <TableCell>{doc.size}</TableCell>
                                <TableCell>
                                  <Badge 
                                    className={
                                      doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                                      doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }
                                  >
                                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleDownload(doc.name)}
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="academic">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Semester</TableHead>
                              <TableHead>Year</TableHead>
                              <TableHead>GPA</TableHead>
                              <TableHead>Rank</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {academicRecords.map((record) => (
                              <TableRow key={record.id}>
                                <TableCell className="font-medium">{record.semester}</TableCell>
                                <TableCell>{record.year}</TableCell>
                                <TableCell>{record.status === 'upcoming' ? '-' : record.gpa.toFixed(1)}</TableCell>
                                <TableCell>{record.status === 'upcoming' ? '-' : record.rank}</TableCell>
                                <TableCell>
                                  <Badge 
                                    className={
                                      record.status === 'completed' ? 'bg-green-100 text-green-800' :
                                      record.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                      'bg-gray-100 text-gray-800'
                                    }
                                  >
                                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download Transcript
                        </Button>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default StudentData;
