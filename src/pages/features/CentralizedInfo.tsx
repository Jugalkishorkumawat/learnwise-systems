
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Monitor } from 'lucide-react';

const CentralizedInfo = () => {
  return (
    <FeatureTemplate
      title="Centralized Info"
      description="Important announcements and notices"
      icon={Monitor}
      features={[
        "Important announcements",
        "Campus news updates",
        "Event notifications",
        "Emergency alerts",
        "Academic notices",
        "Administrative updates"
      ]}
    />
  );
};

export default CentralizedInfo;
