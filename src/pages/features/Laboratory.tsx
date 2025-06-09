
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { TestTube } from 'lucide-react';

const Laboratory = () => {
  return (
    <FeatureTemplate
      title="Laboratory"
      description="Lab schedules and practical work"
      icon={TestTube}
      features={[
        "Lab scheduling",
        "Equipment booking",
        "Practical assignments",
        "Safety protocols",
        "Experiment tracking",
        "Result documentation"
      ]}
    />
  );
};

export default Laboratory;
