
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Newspaper } from 'lucide-react';

const Circulars = () => {
  return (
    <FeatureTemplate
      title="Circulars"
      description="Official circulars and communications"
      icon={Newspaper}
      features={[
        "Official circular distribution",
        "Policy updates",
        "Administrative communications",
        "Department notifications",
        "Regulatory announcements",
        "Document management"
      ]}
    />
  );
};

export default Circulars;
