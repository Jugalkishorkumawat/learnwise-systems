
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
  GraduationCap
} from 'lucide-react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
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

  const sidebarItems: SidebarItem[] = [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/dashboard', roles: ['student', 'staff', 'admin'] },
    { icon: <Calendar size={20} />, label: 'My Attendance', href: '/attendance/view', roles: ['student'] },
    { icon: <BookOpen size={20} />, label: 'My Courses', href: '/courses', roles: ['student'] },
    { icon: <GraduationCap size={20} />, label: 'My Grades', href: '/grades', roles: ['student'] },
    { icon: <CreditCard size={20} />, label: 'My Payments', href: '/payments/student', roles: ['student'] },
    { icon: <Camera size={20} />, label: 'Attendance', href: '/attendance/manage', roles: ['staff', 'admin'] },
    { icon: <User size={20} />, label: 'Students', href: '/students', roles: ['staff', 'admin'] },
    { icon: <CreditCard size={20} />, label: 'Payments', href: '/payments', roles: ['admin'] },
    { icon: <Building2 size={20} />, label: 'Facilities', href: '/facilities', roles: ['staff', 'admin'] },
    { icon: <MessageSquare size={20} />, label: 'Chatbot', href: '/chatbot', roles: ['student', 'staff', 'admin'] },
  ];

  const secondaryItems: SidebarItem[] = [
    { icon: <Settings size={20} />, label: 'Settings', href: '/settings', roles: ['student', 'staff', 'admin'] },
  ];

  // Filter items based on user role
  const filteredMainItems = sidebarItems.filter(item => !item.roles || item.roles.includes(userRole as any));
  const filteredSecondaryItems = secondaryItems.filter(item => !item.roles || item.roles.includes(userRole as any));

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
        <div>
          {/* Main Navigation */}
          <nav className="space-y-1 px-2">
            {filteredMainItems.map((item) => (
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

        <div className="space-y-2 px-2">
          {/* Secondary Navigation */}
          <nav className="space-y-1">
            {filteredSecondaryItems.map((item) => (
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
