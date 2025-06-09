
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Target } from 'lucide-react';

const ProgramOutcomes = () => {
  return (
    <FeatureTemplate
      title="Program Outcomes"
      description="Academic program learning outcomes"
      icon={Target}
      features={[
        "Learning outcomes",
        "Program objectives",
        "Skill mapping",
        "Competency framework",
        "Assessment criteria",
        "Industry alignment"
      ]}
    />
  );
};

export default ProgramOutcomes;
