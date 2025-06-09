
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { TestTube } from 'lucide-react';

const ModuleTest = () => {
  return (
    <FeatureTemplate
      title="Module Test"
      description="Module-wise testing and evaluation"
      icon={TestTube}
      features={[
        "Module assessments",
        "Progress evaluation",
        "Skill testing",
        "Competency mapping",
        "Performance tracking",
        "Feedback system"
      ]}
    />
  );
};

export default ModuleTest;
