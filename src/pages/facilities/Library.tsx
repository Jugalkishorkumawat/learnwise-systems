
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
  BookOpen, 
  Clock, 
  CalendarClock,
  Filter,
  Download,
  Plus,
  BookMarked,
  Undo2
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock library data
const books = [
  { id: '1', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0262033848', copies: 5, available: 3, category: 'Computer Science' },
  { id: '2', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', copies: 3, available: 0, category: 'Computer Science' },
  { id: '3', title: 'Design Patterns', author: 'Erich Gamma', isbn: '978-0201633610', copies: 2, available: 1, category: 'Computer Science' },
  { id: '4', title: 'Calculus: Early Transcendentals', author: 'James Stewart', isbn: '978-1285741550', copies: 4, available: 2, category: 'Mathematics' },
  { id: '5', title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0141439518', copies: 3, available: 3, category: 'Literature' },
];

// Mock borrowed books
const borrowedBooks = [
  { id: '1', bookId: '2', bookTitle: 'Clean Code', studentId: 'ST2023001', studentName: 'John Doe', borrowDate: '2023-11-01', dueDate: '2023-11-15', status: 'borrowed' },
  { id: '2', bookId: '2', bookTitle: 'Clean Code', studentId: 'ST2023002', studentName: 'Sarah Johnson', borrowDate: '2023-10-28', dueDate: '2023-11-11', status: 'borrowed' },
  { id: '3', bookId: '3', bookTitle: 'Design Patterns', studentId: 'ST2023003', studentName: 'Michael Brown', borrowDate: '2023-10-20', dueDate: '2023-11-03', status: 'overdue' },
  { id: '4', bookId: '2', bookTitle: 'Clean Code', studentId: 'ST2023006', studentName: 'Olivia Martin', borrowDate: '2023-10-15', dueDate: '2023-10-29', status: 'overdue' },
  { id: '5', bookId: '4', bookTitle: 'Calculus: Early Transcendentals', studentId: 'ST2023004', studentName: 'Emily Davis', borrowDate: '2023-10-25', dueDate: '2023-11-08', status: 'borrowed' },
  { id: '6', bookId: '4', bookTitle: 'Calculus: Early Transcendentals', studentId: 'ST2023007', studentName: 'William Thompson', borrowDate: '2023-10-30', dueDate: '2023-11-13', status: 'borrowed' },
];

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('books');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter books based on search query and selected category
  const filteredBooks = books.filter(book => 
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
     book.isbn.includes(searchQuery)) &&
    (selectedCategory === 'all' || book.category === selectedCategory)
  );
  
  // Filter borrowed books based on search query
  const filteredBorrowedBooks = borrowedBooks.filter(borrowed => 
    borrowed.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    borrowed.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    borrowed.studentId.includes(searchQuery)
  );
  
  const categories = Array.from(new Set(books.map(book => book.category)));
  
  const handleBorrowReturn = (action: 'borrow' | 'return', bookId: string, studentId?: string) => {
    toast({
      title: action === 'borrow' ? "Book Borrowed" : "Book Returned",
      description: action === 'borrow' 
        ? `Book has been borrowed by student ${studentId}.` 
        : `Book has been returned.`,
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
                <h1 className="text-2xl font-bold tracking-tight">Library Management</h1>
                <p className="text-muted-foreground">Manage book inventory, borrowing, and returns</p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Book
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="books" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="books">Book Inventory</TabsTrigger>
                <TabsTrigger value="borrowed">Borrowed Books</TabsTrigger>
              </TabsList>
              
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={activeTab === 'books' ? "Search books by title, author, or ISBN..." : "Search by book title or student..."}
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  {activeTab === 'books' && (
                    <select
                      className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
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
              
              <TabsContent value="books">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle>Book Inventory</CardTitle>
                    <CardDescription>
                      View and manage the library book collection
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Book Details</TableHead>
                            <TableHead>ISBN</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Availability</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBooks.map((book, index) => (
                            <TableRow key={book.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <Avatar>
                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${book.title.replace(/\s+/g, '+')}&background=random`} />
                                    <AvatarFallback><BookOpen className="h-4 w-4" /></AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{book.title}</div>
                                    <div className="text-xs text-muted-foreground">by {book.author}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <code className="px-2 py-1 bg-secondary rounded">{book.isbn}</code>
                              </TableCell>
                              <TableCell>{book.category}</TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <Badge 
                                    className={
                                      book.available > 0 ? 'bg-green-100 text-green-800' :
                                      'bg-red-100 text-red-800'
                                    }
                                  >
                                    {book.available > 0 ? 'Available' : 'Not Available'}
                                  </Badge>
                                  <span className="text-xs mt-1">
                                    {book.available} of {book.copies} copies available
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    size="sm" 
                                    disabled={book.available <= 0}
                                    onClick={() => handleBorrowReturn('borrow', book.id, 'ST2023001')}
                                    className="h-8 px-3 text-xs"
                                  >
                                    <BookMarked className="h-3 w-3 mr-1" />
                                    Issue Book
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
              
              <TabsContent value="borrowed">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle>Borrowed Books</CardTitle>
                    <CardDescription>
                      Track book borrowing and manage returns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Book</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Borrow Date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBorrowedBooks.map((borrowed, index) => {
                            const isOverdue = borrowed.status === 'overdue';
                            const dueDate = new Date(borrowed.dueDate);
                            const currentDate = new Date();
                            const daysLate = isOverdue ? Math.ceil((currentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
                            const fine = daysLate * 10; // ₹10 per day
                            
                            return (
                              <TableRow key={borrowed.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                  <div className="font-medium">{borrowed.bookTitle}</div>
                                  <div className="text-xs text-muted-foreground">ID: {borrowed.bookId}</div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">{borrowed.studentName}</div>
                                  <div className="text-xs text-muted-foreground">ID: {borrowed.studentId}</div>
                                </TableCell>
                                <TableCell>{borrowed.borrowDate}</TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <CalendarClock className="h-3 w-3 mr-1 text-muted-foreground" />
                                    {borrowed.dueDate}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge 
                                    className={
                                      borrowed.status === 'borrowed' ? 'bg-blue-100 text-blue-800' :
                                      'bg-red-100 text-red-800'
                                    }
                                  >
                                    {borrowed.status === 'borrowed' ? 'Borrowed' : 'Overdue'}
                                    {isOverdue && ` (₹${fine} fine)`}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleBorrowReturn('return', borrowed.bookId)}
                                      className="h-8 px-3 text-xs"
                                    >
                                      <Undo2 className="h-3 w-3 mr-1" />
                                      Return
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

export default Library;
