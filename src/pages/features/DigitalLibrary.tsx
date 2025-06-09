
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Library } from 'lucide-react';

const DigitalLibrary = () => {
  return (
    <FeatureTemplate
      title="Digital Library"
      description="Access digital books and resources"
      icon={Library}
      features={[
        "Digital book collection",
        "Online journals",
        "Research databases",
        "E-book reader",
        "Search functionality",
        "Bookmark management"
      ]}
    />
  );
};

export default DigitalLibrary;
