
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { UserCheck } from 'lucide-react';

const Teacher = () => {
  return (
    <FeatureTemplate
      title="Teacher"
      description="Faculty profiles and information"
      icon={UserCheck}
      features={[
        "Faculty profiles",
        "Teaching schedules",
        "Contact information",
        "Subject expertise",
        "Office hours",
        "Research interests"
      ]}
    />
  );
};

export default Teacher;
