
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Calendar } from 'lucide-react';

const CollegeCalendar = () => {
  return (
    <FeatureTemplate
      title="College Calendar"
      description="Academic calendar with important dates and events"
      icon={Calendar}
      features={[
        "Academic year calendar",
        "Exam schedules",
        "Holiday listings",
        "Event notifications",
        "Assignment due dates",
        "Personal schedule integration"
      ]}
    />
  );
};

export default CollegeCalendar;
