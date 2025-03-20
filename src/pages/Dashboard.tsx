
import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui-custom/Button';
import { 
  Users, 
  CreditCard, 
  BookOpen,
  Calendar,
  MessageSquare,
  Bell,
  ChevronDown,
  Search,
  User
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data for charts
const attendanceData = [
  { name: 'Mon', value: 92 },
  { name: 'Tue', value: 88 },
  { name: 'Wed', value: 90 },
  { name: 'Thu', value: 85 },
  { name: 'Fri', value: 95 },
  { name: 'Sat', value: 78 },
  { name: 'Sun', value: 0 },
];

const feeData = [
  { name: 'Jan', paid: 45, due: 15 },
  { name: 'Feb', paid: 50, due: 10 },
  { name: 'Mar', paid: 55, due: 5 },
  { name: 'Apr', paid: 52, due: 8 },
  { name: 'May', paid: 48, due: 12 },
  { name: 'Jun', paid: 58, due: 2 },
];

const facilityUsageData = [
  { name: 'Library', value: 35 },
  { name: 'Labs', value: 25 },
  { name: 'Sports', value: 20 },
  { name: 'Cafeteria', value: 15 },
  { name: 'Study Rooms', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-64"
                  />
                </div>
                
                {/* Notifications */}
                <div className="relative">
                  <button
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-background border border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors relative"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="px-4 py-3 border-b border-border">
                        <h3 className="text-sm font-medium">Notifications</h3>
                      </div>
                      <div className="max-h-[280px] overflow-y-auto">
                        <div className="px-4 py-3 hover:bg-accent transition-colors">
                          <div className="flex items-start">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium">New student registered</p>
                              <p className="text-xs text-muted-foreground mt-1">John Smith has registered as a new student</p>
                              <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 hover:bg-accent transition-colors">
                          <div className="flex items-start">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <CreditCard className="h-4 w-4 text-primary" />
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium">Payment received</p>
                              <p className="text-xs text-muted-foreground mt-1">Sarah Johnson has paid the tuition fee</p>
                              <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 hover:bg-accent transition-colors">
                          <div className="flex items-start">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <BookOpen className="h-4 w-4 text-primary" />
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium">New book added</p>
                              <p className="text-xs text-muted-foreground mt-1">Library has added 5 new books to the collection</p>
                              <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-border">
                        <button className="text-xs text-primary hover:underline w-full text-center">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* User Menu */}
                <div className="relative">
                  <button className="flex items-center space-x-2 text-sm h-10 px-4 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline-block">Admin</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard 
                title="Total Students"
                value="1,258"
                description="Active students enrolled"
                icon={<Users size={20} />}
                trend="up"
                trendValue="12% from last month"
                loading={loading}
                delay={0}
              />
              
              <DashboardCard 
                title="Fee Collection"
                value="₹24,85,000"
                description="This month"
                icon={<CreditCard size={20} />}
                trend="up"
                trendValue="8% from last month"
                loading={loading}
                delay={1}
              />
              
              <DashboardCard 
                title="Average Attendance"
                value="87%"
                description="This week"
                icon={<Calendar size={20} />}
                trend="down"
                trendValue="3% from last week"
                loading={loading}
                delay={2}
              />
              
              <DashboardCard 
                title="AI Chatbot Queries"
                value="358"
                description="Last 7 days"
                icon={<MessageSquare size={20} />}
                trend="up"
                trendValue="24% from last week"
                loading={loading}
                delay={3}
              />
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Attendance Chart */}
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-base font-medium">Attendance Overview</CardTitle>
                    <p className="text-sm text-muted-foreground">Daily attendance percentage</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>This Week</span>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {loading ? (
                    <div className="h-[300px] w-full flex items-center justify-center bg-muted/30 animate-pulse rounded-md">
                      <p className="text-muted-foreground">Loading chart data...</p>
                    </div>
                  ) : (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={attendanceData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#888888" />
                          <YAxis tick={{ fontSize: 12 }} stroke="#888888" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #f0f0f0',
                              borderRadius: '0.5rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            formatter={(value) => [`${value}%`, 'Attendance']}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 2 }}
                            activeDot={{ r: 6, strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Fee Collection Chart */}
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-base font-medium">Fee Collection</CardTitle>
                    <p className="text-sm text-muted-foreground">Monthly fee collection status</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>This Semester</span>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {loading ? (
                    <div className="h-[300px] w-full flex items-center justify-center bg-muted/30 animate-pulse rounded-md">
                      <p className="text-muted-foreground">Loading chart data...</p>
                    </div>
                  ) : (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={feeData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#888888" />
                          <YAxis tick={{ fontSize: 12 }} stroke="#888888" />
                          <Tooltip
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #f0f0f0',
                              borderRadius: '0.5rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                          <Bar dataKey="paid" name="Paid" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="due" name="Due" fill="#f97316" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Additional Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Facility Usage */}
              <Card className="overflow-hidden lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-base font-medium">Facility Usage</CardTitle>
                    <p className="text-sm text-muted-foreground">Distribution of facility usage</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {loading ? (
                    <div className="h-[300px] w-full flex items-center justify-center bg-muted/30 animate-pulse rounded-md">
                      <p className="text-muted-foreground">Loading chart data...</p>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={facilityUsageData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {facilityUsageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #f0f0f0',
                              borderRadius: '0.5rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            formatter={(value) => [`${value}%`, 'Usage']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Recent Activities */}
              <Card className="overflow-hidden lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-base font-medium">Recent Activities</CardTitle>
                    <p className="text-sm text-muted-foreground">Latest actions across the platform</p>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </CardHeader>
                <CardContent className="pt-4">
                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
                          <div className="space-y-2 flex-1">
                            <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                            <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New Student Registration</p>
                          <p className="text-xs text-muted-foreground">John Smith (ID: ST2023045) has been registered</p>
                          <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CreditCard className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Fee Payment</p>
                          <p className="text-xs text-muted-foreground">Sarah Johnson (ID: ST2023012) has paid ₹45,000</p>
                          <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Library Update</p>
                          <p className="text-xs text-muted-foreground">5 new books added to Computer Science section</p>
                          <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Attendance Alert</p>
                          <p className="text-xs text-muted-foreground">15 students marked absent in Computer Science department</p>
                          <p className="text-xs text-muted-foreground mt-1">6 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">AI Chatbot</p>
                          <p className="text-xs text-muted-foreground">Chatbot has handled 85 queries in the last 24 hours</p>
                          <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                        </div>
                      </div>
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

export default Dashboard;
