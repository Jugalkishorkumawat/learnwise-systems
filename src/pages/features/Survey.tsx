
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { BarChart3 } from 'lucide-react';

const Survey = () => {
  return (
    <FeatureTemplate
      title="Survey"
      description="Participate in surveys and feedback"
      icon={BarChart3}
      features={[
        "Survey participation",
        "Feedback collection",
        "Anonymous responses",
        "Result analysis",
        "Trend tracking",
        "Quality improvement"
      ]}
    />
  );
};

export default Survey;
