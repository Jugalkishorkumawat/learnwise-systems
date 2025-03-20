
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
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
  LogOut
} from 'lucide-react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const adminItems: SidebarItem[] = [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <Camera size={20} />, label: 'Attendance', href: '/attendance' },
    { icon: <User size={20} />, label: 'Students', href: '/students' },
    { icon: <CreditCard size={20} />, label: 'Payments', href: '/payments' },
    { icon: <Building2 size={20} />, label: 'Facilities', href: '/facilities' },
    { icon: <MessageSquare size={20} />, label: 'Chatbot', href: '/chatbot' },
  ];

  const secondaryItems: SidebarItem[] = [
    { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
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
        <div>
          {/* Main Navigation */}
          <nav className="space-y-1 px-2">
            {adminItems.map((item) => (
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
            {secondaryItems.map((item) => (
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
              onClick={() => console.log('Logout clicked')}
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
