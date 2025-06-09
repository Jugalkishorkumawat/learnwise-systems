
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { BookOpen } from 'lucide-react';

const Subject = () => {
  return (
    <FeatureTemplate
      title="Subject"
      description="Subject details and curriculum"
      icon={BookOpen}
      features={[
        "Subject information",
        "Curriculum details",
        "Learning objectives",
        "Course content",
        "Assessment methods",
        "Faculty information"
      ]}
    />
  );
};

export default Subject;
