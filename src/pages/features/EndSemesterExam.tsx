
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { GraduationCap } from 'lucide-react';

const EndSemesterExam = () => {
  return (
    <FeatureTemplate
      title="End Semester Examination"
      description="Final semester examinations"
      icon={GraduationCap}
      features={[
        "Final examinations",
        "Grade calculation",
        "Result processing",
        "Transcript generation",
        "Academic standing",
        "Graduation eligibility"
      ]}
    />
  );
};

export default EndSemesterExam;
