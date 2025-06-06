
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bell, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  User,
  AlertCircle,
  Info,
  CheckCircle,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Notices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [notices, setNotices] = useState([
    {
      id: '1',
      title: 'Mid-term Examination Schedule Released',
      content: 'The mid-term examination schedule for all classes has been released. Please check the notice board for detailed timings and subjects.',
      category: 'examination',
      priority: 'high',
      author: 'Admin Office',
      date: '2024-01-15',
      targetAudience: 'All Students',
      status: 'active'
    },
    {
      id: '2',
      title: 'Library Timings Extended',
      content: 'Due to upcoming exams, library timings have been extended till 8 PM from Monday to Saturday.',
      category: 'facility',
      priority: 'medium',
      author: 'Library Department',
      date: '2024-01-14',
      targetAudience: 'All Students',
      status: 'active'
    },
    {
      id: '3',
      title: 'Fee Payment Reminder',
      content: 'This is a reminder that the quarterly fees are due by January 31st, 2024. Late payment will incur additional charges.',
      category: 'fee',
      priority: 'high',
      author: 'Accounts Department',
      date: '2024-01-13',
      targetAudience: 'Parents & Students',
      status: 'active'
    },
    {
      id: '4',
      title: 'Sports Day Registration Open',
      content: 'Registration for annual sports day is now open. Students can register with their respective PE teachers.',
      category: 'event',
      priority: 'medium',
      author: 'Sports Department',
      date: '2024-01-12',
      targetAudience: 'All Students',
      status: 'active'
    },
    {
      id: '5',
      title: 'Parent-Teacher Meeting',
      content: 'Parent-teacher meeting for Class 10 and 12 is scheduled for January 20th, 2024 from 10 AM to 4 PM.',
      category: 'meeting',
      priority: 'high',
      author: 'Academic Department',
      date: '2024-01-11',
      targetAudience: 'Parents',
      status: 'active'
    }
  ]);

  const categories = ['examination', 'facility', 'fee', 'event', 'meeting', 'general'];
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Info className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'examination': return 'bg-purple-100 text-purple-800';
      case 'facility': return 'bg-blue-100 text-blue-800';
      case 'fee': return 'bg-red-100 text-red-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotices = notices.filter(notice => 
    (notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'all' || notice.category === selectedCategory)
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Notice Board</h1>
                <p className="text-muted-foreground">Manage school announcements and notices</p>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Notice
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Notice</DialogTitle>
                    <DialogDescription>
                      Add a new notice or announcement for the school community.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Notice Title</Label>
                      <Input id="title" placeholder="Enter notice title" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea 
                        id="content" 
                        placeholder="Enter notice content"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-students">All Students</SelectItem>
                          <SelectItem value="parents">Parents</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="parents-students">Parents & Students</SelectItem>
                          <SelectItem value="everyone">Everyone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsDialogOpen(false)}>
                      Create Notice
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notices..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Notices Grid */}
            <div className="grid gap-4">
              {filteredNotices.map((notice) => (
                <Card key={notice.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPriorityIcon(notice.priority)}
                          <CardTitle className="text-lg">{notice.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(notice.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {notice.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Bell className="h-3 w-3" />
                            {notice.targetAudience}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(notice.priority)}>
                            {notice.priority}
                          </Badge>
                          <Badge className={getCategoryColor(notice.category)}>
                            {notice.category}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{notice.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default Notices;
