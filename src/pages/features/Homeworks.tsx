
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { BookOpen } from 'lucide-react';

const Homeworks = () => {
  return (
    <FeatureTemplate
      title="Homeworks"
      description="Daily homework assignments and submissions"
      icon={BookOpen}
      features={[
        "Daily homework listings",
        "Subject-wise homework organization",
        "Homework submission portal",
        "Due date reminders",
        "Completion status tracking",
        "Teacher feedback viewing"
      ]}
    />
  );
};

export default Homeworks;
