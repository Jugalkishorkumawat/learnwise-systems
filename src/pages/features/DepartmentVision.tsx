
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Eye } from 'lucide-react';

const DepartmentVision = () => {
  return (
    <FeatureTemplate
      title="Department Vision"
      description="Department vision and objectives"
      icon={Eye}
      features={[
        "Vision statement",
        "Strategic objectives",
        "Future goals",
        "Innovation focus",
        "Excellence standards",
        "Community impact"
      ]}
    />
  );
};

export default DepartmentVision;
