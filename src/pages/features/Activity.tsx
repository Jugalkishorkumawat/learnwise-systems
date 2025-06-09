
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Activity as ActivityIcon } from 'lucide-react';

const Activity = () => {
  return (
    <FeatureTemplate
      title="Activity"
      description="Track your academic and extracurricular activities"
      icon={ActivityIcon}
      features={[
        "Daily activity log",
        "Assignment submission tracking",
        "Attendance monitoring",
        "Club participation records",
        "Event participation history",
        "Achievement timeline"
      ]}
    />
  );
};

export default Activity;
