
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { GraduationCap } from 'lucide-react';

const SemesterRegistration = () => {
  return (
    <FeatureTemplate
      title="Semester Registration"
      description="Course registration for semester"
      icon={GraduationCap}
      features={[
        "Course registration",
        "Credit management",
        "Prerequisites check",
        "Schedule conflicts",
        "Registration deadlines",
        "Academic planning"
      ]}
    />
  );
};

export default SemesterRegistration;
