
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { Clock, Book, Users, Calendar, Search } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Courses = () => {
  const { getCourses } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  const courses = getCourses();
  
  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleJoinClass = (courseId: string) => {
    toast({
      title: "Joined Virtual Class",
      description: "You have joined the virtual classroom session.",
    });
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
                <p className="text-muted-foreground">View your enrolled courses and class details</p>
              </div>
              
              <div className="mt-4 sm:mt-0 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-9 w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? (
                filteredCourses.map(course => (
                  <Card key={course.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {course.code}
                          </Badge>
                          <CardTitle className="text-lg">{course.name}</CardTitle>
                          <CardDescription>
                            {course.instructor}
                          </CardDescription>
                        </div>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                          {course.credits} Credits
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{course.schedule}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => window.location.href = '/attendance/view'}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Attendance
                          </Button>
                          <Button 
                            className="w-full"
                            onClick={() => handleJoinClass(course.id)}
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Join Class
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <Book className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No courses found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `No courses matching "${searchQuery}"`
                      : "You don't have any courses yet"
                    }
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default Courses;
