
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { BookOpen } from 'lucide-react';

const StudyMaterials = () => {
  return (
    <FeatureTemplate
      title="Study Materials"
      description="Course materials and study resources"
      icon={BookOpen}
      features={[
        "Course notes",
        "Study guides",
        "Reference materials",
        "Practice papers",
        "Subject resources",
        "Download management"
      ]}
    />
  );
};

export default StudyMaterials;
