
import { Button } from '@/components/ui-custom/Button';
import { Calendar } from 'lucide-react';

interface AttendanceHeaderProps {
  title: string;
  description: string;
}

const AttendanceHeader = ({ title, description }: AttendanceHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="mt-4 sm:mt-0">
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Today: {new Date().toLocaleDateString()}
        </Button>
      </div>
    </div>
  );
};

export default AttendanceHeader;
