
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Briefcase } from 'lucide-react';

const Placements = () => {
  return (
    <FeatureTemplate
      title="Placements"
      description="Job placement and career opportunities"
      icon={Briefcase}
      features={[
        "Job opportunities",
        "Company profiles",
        "Application tracking",
        "Interview scheduling",
        "Placement statistics",
        "Career guidance"
      ]}
    />
  );
};

export default Placements;
