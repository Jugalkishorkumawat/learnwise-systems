
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { BookOpen, Home, FileText, Library, GraduationCap, Users } from 'lucide-react';

const Facilities = () => {
  const navigate = useNavigate();
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">College Facilities</h1>
                <p className="text-muted-foreground">Manage all college facilities and services</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Library Management */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Library className="h-5 w-5 mr-2 text-primary" />
                    Library Management
                  </CardTitle>
                  <CardDescription>
                    Manage book borrowing, returns, and library resources
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Book borrowing and returns</li>
                    <li>Fine calculation for late returns</li>
                    <li>Library resource management</li>
                    <li>Book inventory tracking</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate('/facilities/library')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Manage Library
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Hostel Management */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-primary" />
                    Hostel Management
                  </CardTitle>
                  <CardDescription>
                    Handle room allocation and hostel services
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Room allotment and management</li>
                    <li>Hostel student attendance</li>
                    <li>Hostel maintenance requests</li>
                    <li>Hostel fee management</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate('/facilities/hostel')}>
                    <Users className="mr-2 h-4 w-4" />
                    Manage Hostel
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Exam/Results Management */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Exam & Results
                  </CardTitle>
                  <CardDescription>
                    Manage exams, marks, and student report cards
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Exam schedule management</li>
                    <li>Grade entry and management</li>
                    <li>Report card generation</li>
                    <li>Performance analytics</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate('/facilities/exams')}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Manage Exams & Results
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default Facilities;
