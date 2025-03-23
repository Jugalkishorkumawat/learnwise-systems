
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui-custom/Button';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface AttendanceFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCourse: string;
  onCourseChange: (course: string) => void;
  courses: string[];
  onDateChange?: (date: Date | undefined) => void;
  onExport?: () => void;
}

const AttendanceFilters = ({
  searchQuery,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  courses,
  onDateChange,
  onExport
}: AttendanceFiltersProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <select
          className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={selectedCourse}
          onChange={(e) => onCourseChange(e.target.value)}
        >
          <option value="all">All Courses</option>
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
        
        {onDateChange && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
        
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        
        {onExport && (
          <Button variant="outline" onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}
      </div>
    </div>
  );
};

export default AttendanceFilters;
