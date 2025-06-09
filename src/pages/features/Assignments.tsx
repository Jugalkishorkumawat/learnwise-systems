
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { FileText } from 'lucide-react';

const Assignments = () => {
  return (
    <FeatureTemplate
      title="Assignments"
      description="Manage and submit your course assignments"
      icon={FileText}
      features={[
        "View all pending assignments",
        "Upload assignment submissions",
        "Track submission deadlines",
        "View assignment feedback",
        "Grade tracking",
        "Assignment history"
      ]}
    />
  );
};

export default Assignments;
