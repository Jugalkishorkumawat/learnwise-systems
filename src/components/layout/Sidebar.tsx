
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  User, 
  CreditCard, 
  Building2, 
  MessageSquare, 
  Camera, 
  Settings,
  LogOut,
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  Database,
  CreditCard as PaymentIcon,
  Library,
  School,
  FileText
} from 'lucide-react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  roles?: Array<'student' | 'staff' | 'admin'>;
}

interface SidebarItemGroup {
  title: string;
  items: SidebarItem[];
  roles?: Array<'student' | 'staff' | 'admin'>;
}

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { logout, userRole } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const sidebarGroups: SidebarItemGroup[] = [
    {
      title: "Dashboard",
      items: [
        { icon: <Home size={20} />, label: 'Dashboard', href: '/dashboard', roles: ['student', 'staff', 'admin'] },
      ]
    },
    {
      title: "Attendance",
      items: [
        { icon: <Calendar size={20} />, label: 'My Attendance', href: '/attendance/view', roles: ['student'] },
        { icon: <Camera size={20} />, label: 'Mark Attendance', href: '/attendance/mark', roles: ['student'] },
        { icon: <Camera size={20} />, label: 'Manage Attendance', href: '/attendance/manage', roles: ['staff', 'admin'] },
      ],
      roles: ['student', 'staff', 'admin']
    },
    {
      title: "Academics",
      items: [
        { icon: <BookOpen size={20} />, label: 'My Courses', href: '/courses', roles: ['student'] },
        { icon: <GraduationCap size={20} />, label: 'My Grades', href: '/grades', roles: ['student'] },
      ],
      roles: ['student']
    },
    {
      title: "Students",
      items: [
        { icon: <Users size={20} />, label: 'All Students', href: '/students', roles: ['staff', 'admin'] },
        { icon: <User size={20} />, label: 'Add Student', href: '/students/add', roles: ['staff', 'admin'] },
        { icon: <Database size={20} />, label: 'Student Data', href: '/student/data', roles: ['student', 'staff', 'admin'] },
      ],
      roles: ['staff', 'admin', 'student']
    },
    {
      title: "Payments",
      items: [
        { icon: <CreditCard size={20} />, label: 'My Payments', href: '/payments/student', roles: ['student'] },
        { icon: <PaymentIcon size={20} />, label: 'Payment Gateway', href: '/payments/gateway', roles: ['student', 'staff', 'admin'] },
        { icon: <CreditCard size={20} />, label: 'Manage Payments', href: '/payments', roles: ['admin'] },
      ],
      roles: ['student', 'admin', 'staff']
    },
    {
      title: "Facilities",
      items: [
        { icon: <Building2 size={20} />, label: 'All Facilities', href: '/facilities', roles: ['student', 'staff', 'admin'] },
        { icon: <Library size={20} />, label: 'Library', href: '/facilities/library', roles: ['student', 'staff', 'admin'] },
        { icon: <School size={20} />, label: 'Hostel', href: '/facilities/hostel', roles: ['student', 'staff', 'admin'] },
        { icon: <FileText size={20} />, label: 'Exam Results', href: '/facilities/exams', roles: ['student', 'staff', 'admin'] },
      ],
      roles: ['student', 'staff', 'admin']
    },
    {
      title: "Help",
      items: [
        { icon: <MessageSquare size={20} />, label: 'AI Chatbot', href: '/chatbot', roles: ['student', 'staff', 'admin'] },
      ],
      roles: ['student', 'staff', 'admin']
    },
  ];

  const secondaryItems: SidebarItem[] = [
    { icon: <Settings size={20} />, label: 'Settings', href: '/settings', roles: ['student', 'staff', 'admin'] },
  ];

  if (!mounted) return null;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64',
        'bg-sidebar shadow-sm border-r border-sidebar-border',
        'pt-16', // Space for navbar
        className
      )}
    >
      <div className="h-full flex flex-col justify-between py-4">
        <div className="overflow-y-auto">
          {/* Main Navigation */}
          {sidebarGroups.map((group, index) => {
            // Filter out groups that don't apply to the current user role
            if (group.roles && !group.roles.includes(userRole as any)) {
              return null;
            }

            // Filter items based on user role
            const filteredItems = group.items.filter(item => !item.roles || item.roles.includes(userRole as any));
            
            if (filteredItems.length === 0) {
              return null;
            }

            return (
              <div key={index} className="mb-4">
                {!collapsed && (
                  <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {group.title}
                  </h3>
                )}
                <nav className="space-y-1 px-2">
                  {filteredItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        'group flex items-center px-2 py-2.5 text-sm font-medium rounded-md',
                        location.pathname === item.href
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
                        'transition-all duration-200',
                        collapsed ? 'justify-center' : 'justify-start'
                      )}
                    >
                      <div className={cn(
                        'flex items-center',
                        collapsed ? 'justify-center w-full' : 'justify-start'
                      )}>
                        <span className={cn(
                          'flex-shrink-0',
                          location.pathname === item.href ? 'text-primary' : 'text-sidebar-foreground group-hover:text-primary',
                          'transition-colors duration-200'
                        )}>
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <span className="ml-3 whitespace-nowrap">{item.label}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            );
          })}
        </div>

        <div className="space-y-2 px-2">
          {/* Secondary Navigation */}
          <nav className="space-y-1">
            {secondaryItems
              .filter(item => !item.roles || item.roles.includes(userRole as any))
              .map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'group flex items-center px-2 py-2.5 text-sm font-medium rounded-md',
                    location.pathname === item.href
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
                    'transition-all duration-200',
                    collapsed ? 'justify-center' : 'justify-start'
                  )}
                >
                  <div className={cn(
                    'flex items-center',
                    collapsed ? 'justify-center w-full' : 'justify-start'
                  )}>
                    <span className={cn(
                      'flex-shrink-0',
                      location.pathname === item.href ? 'text-primary' : 'text-sidebar-foreground group-hover:text-primary',
                      'transition-colors duration-200'
                    )}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className="ml-3 whitespace-nowrap">{item.label}</span>
                    )}
                  </div>
                </Link>
              ))}

            {/* Logout Button */}
            <button
              className={cn(
                'group flex items-center px-2 py-2.5 text-sm font-medium rounded-md w-full',
                'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
                'transition-all duration-200',
                collapsed ? 'justify-center' : 'justify-start'
              )}
              onClick={logout}
            >
              <div className={cn(
                'flex items-center',
                collapsed ? 'justify-center w-full' : 'justify-start'
              )}>
                <span className="flex-shrink-0 text-sidebar-foreground group-hover:text-primary transition-colors duration-200">
                  <LogOut size={20} />
                </span>
                {!collapsed && (
                  <span className="ml-3 whitespace-nowrap">Logout</span>
                )}
              </div>
            </button>
          </nav>

          {/* Collapse Button */}
          <button
            className={cn(
              'w-full mt-2 flex items-center px-2 py-2.5 text-sm font-medium rounded-md',
              'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
              'transition-all duration-200',
              collapsed ? 'justify-center' : 'justify-start'
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className={cn(
              'flex items-center',
              collapsed ? 'justify-center w-full' : 'justify-start'
            )}>
              <span className="flex-shrink-0 text-sidebar-foreground">
                {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </span>
              {!collapsed && (
                <span className="ml-3 whitespace-nowrap">Collapse</span>
              )}
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
