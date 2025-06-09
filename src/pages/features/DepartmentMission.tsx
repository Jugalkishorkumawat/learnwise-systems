
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Target } from 'lucide-react';

const DepartmentMission = () => {
  return (
    <FeatureTemplate
      title="Department Mission"
      description="Department mission and goals"
      icon={Target}
      features={[
        "Mission statement",
        "Core values",
        "Educational philosophy",
        "Quality standards",
        "Student development",
        "Research focus"
      ]}
    />
  );
};

export default DepartmentMission;
