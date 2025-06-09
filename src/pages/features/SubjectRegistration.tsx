
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { BookOpen } from 'lucide-react';

const SubjectRegistration = () => {
  return (
    <FeatureTemplate
      title="Subject Registration"
      description="Individual subject enrollment"
      icon={BookOpen}
      features={[
        "Subject enrollment",
        "Elective selection",
        "Capacity management",
        "Waitlist handling",
        "Drop/add periods",
        "Academic requirements"
      ]}
    />
  );
};

export default SubjectRegistration;
