
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  Filter, 
  PlusCircle,
  CreditCard,
  DollarSign,
  CalendarDays,
  AlertTriangle,
  BarChart,
  PieChart,
  User
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart as ReBarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock payment data
const payments = [
  { id: '1', studentId: 'ST2023001', studentName: 'John Doe', date: '2023-09-01', amount: 45000, description: 'Tuition Fee - Fall Semester', status: 'paid', paymentMethod: 'Online Banking' },
  { id: '2', studentId: 'ST2023002', studentName: 'Sarah Johnson', date: '2023-09-05', amount: 45000, description: 'Tuition Fee - Fall Semester', status: 'paid', paymentMethod: 'Credit Card' },
  { id: '3', studentId: 'ST2023003', studentName: 'Michael Brown', date: '2023-09-10', amount: 45000, description: 'Tuition Fee - Fall Semester', status: 'paid', paymentMethod: 'UPI' },
  { id: '4', studentId: 'ST2023004', studentName: 'Emily Davis', date: '2023-09-15', amount: 45000, description: 'Tuition Fee - Fall Semester', status: 'pending', paymentMethod: 'Pending' },
  { id: '5', studentId: 'ST2023005', studentName: 'James Wilson', date: '2023-09-20', amount: 45000, description: 'Tuition Fee - Fall Semester', status: 'overdue', paymentMethod: 'Overdue' },
  { id: '6', studentId: 'ST2023001', studentName: 'John Doe', date: '2023-09-25', amount: 5000, description: 'Library Fee', status: 'paid', paymentMethod: 'UPI' },
  { id: '7', studentId: 'ST2023002', studentName: 'Sarah Johnson', date: '2023-10-01', amount: 5000, description: 'Library Fee', status: 'paid', paymentMethod: 'Cash' },
  { id: '8', studentId: 'ST2023003', studentName: 'Michael Brown', date: '2023-10-05', amount: 5000, description: 'Library Fee', status: 'pending', paymentMethod: 'Pending' },
];

// Chart data
const monthlyRevenueData = [
  { name: 'Jan', amount: 125000 },
  { name: 'Feb', amount: 95000 },
  { name: 'Mar', amount: 85000 },
  { name: 'Apr', amount: 115000 },
  { name: 'May', amount: 125000 },
  { name: 'Jun', amount: 145000 },
  { name: 'Jul', amount: 165000 },
  { name: 'Aug', amount: 185000 },
  { name: 'Sep', amount: 250000 },
  { name: 'Oct', amount: 125000 },
  { name: 'Nov', amount: 0 },
  { name: 'Dec', amount: 0 },
];

const paymentMethodData = [
  { name: 'Online Banking', value: 45 },
  { name: 'Credit Card', value: 25 },
  { name: 'UPI', value: 20 },
  { name: 'Cash', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Filter payments based on search query and selected status
  const filteredPayments = payments.filter(payment => 
    (payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedStatus === 'all' || payment.status === selectedStatus)
  );
  
  // Calculate totals
  const totalPaid = payments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const totalPending = payments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const totalOverdue = payments
    .filter(payment => payment.status === 'overdue')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Payment Management</h1>
                <p className="text-muted-foreground">Track and manage student payments</p>
              </div>
              
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Record New Payment
              </Button>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Collected</CardDescription>
                  <CardTitle className="text-2xl">₹{totalPaid.toLocaleString()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="mr-1 h-4 w-4 text-green-500" />
                    <span>Paid payments</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Pending Collection</CardDescription>
                  <CardTitle className="text-2xl">₹{totalPending.toLocaleString()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-1 h-4 w-4 text-yellow-500" />
                    <span>Awaiting payment</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Overdue Payments</CardDescription>
                  <CardTitle className="text-2xl">₹{totalOverdue.toLocaleString()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <AlertTriangle className="mr-1 h-4 w-4 text-red-500" />
                    <span>Requires follow-up</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Students</CardDescription>
                  <CardTitle className="text-2xl">{new Set(payments.map(p => p.studentId)).size}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="mr-1 h-4 w-4 text-blue-500" />
                    <span>With payment records</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="transactions">
              <TabsList className="mb-6">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="analytics">Payment Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions">
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search payments..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                    </select>
                    
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
                
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle>Payment Transactions</CardTitle>
                    <CardDescription>
                      View and manage payment records
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Receipt ID</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredPayments.map((payment) => (
                            <TableRow key={payment.id}>
                              <TableCell className="font-medium">#{payment.id.padStart(6, '0')}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{payment.studentName}</div>
                                  <div className="text-xs text-muted-foreground">{payment.studentId}</div>
                                </div>
                              </TableCell>
                              <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                              <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                              <TableCell>{payment.description}</TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }
                                >
                                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>{payment.paymentMethod}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle className="text-base font-medium">Monthly Revenue</CardTitle>
                        <CardDescription>Payment collection by month</CardDescription>
                      </div>
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ReBarChart
                            data={monthlyRevenueData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#888888" />
                            <YAxis tick={{ fontSize: 12 }} stroke="#888888" />
                            <Tooltip
                              formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']}
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #f0f0f0',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                            <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          </ReBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle className="text-base font-medium">Payment Methods</CardTitle>
                        <CardDescription>Distribution by payment method</CardDescription>
                      </div>
                      <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                            <Pie
                              data={paymentMethodData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {paymentMethodData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [`${value}%`, 'Percentage']}
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #f0f0f0',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                          </RePieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default Payments;
