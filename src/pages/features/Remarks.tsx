
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { MessageCircle } from 'lucide-react';

const Remarks = () => {
  return (
    <FeatureTemplate
      title="Remarks"
      description="Teacher remarks and feedback"
      icon={MessageCircle}
      features={[
        "Teacher feedback",
        "Performance remarks",
        "Behavioral notes",
        "Academic comments",
        "Progress tracking",
        "Parent communication"
      ]}
    />
  );
};

export default Remarks;
