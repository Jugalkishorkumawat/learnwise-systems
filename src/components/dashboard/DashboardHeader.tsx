
import React from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui-custom/Button';
import { useToast } from '@/hooks/use-toast';

interface DashboardHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  userType: 'student' | 'staff' | 'admin';
  userName: string;
}

const DashboardHeader = ({ 
  isSidebarOpen, 
  toggleSidebar,
  userType,
  userName
}: DashboardHeaderProps) => {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications at this time.",
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button 
        variant="ghost" 
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      
      <div className="w-full flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">CampusWise</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleNotificationClick}
          >
            <Bell size={18} />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-medium">{userName}</span>
              <span className="text-xs text-muted-foreground capitalize">{userType}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
