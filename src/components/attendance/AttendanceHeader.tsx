
import { Button } from '@/components/ui-custom/Button';
import { Calendar, Download, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface AttendanceHeaderProps {
  title: string;
  description: string;
  onRefresh?: () => void;
  allowExport?: boolean;
  onExport?: () => void;
}

const AttendanceHeader = ({ 
  title, 
  description, 
  onRefresh, 
  allowExport = false,
  onExport
}: AttendanceHeaderProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    if (!onRefresh) return;
    
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="mt-4 sm:mt-0 flex space-x-2">
        {onRefresh && (
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
        
        {allowExport && onExport && (
          <Button variant="outline" onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}
        
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Today: {new Date().toLocaleDateString()}
        </Button>
      </div>
    </div>
  );
};

export default AttendanceHeader;
