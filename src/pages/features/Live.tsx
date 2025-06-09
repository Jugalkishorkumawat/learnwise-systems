
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Video } from 'lucide-react';

const Live = () => {
  return (
    <FeatureTemplate
      title="Live"
      description="Live streaming classes and events"
      icon={Video}
      features={[
        "Live streaming",
        "Interactive sessions",
        "Real-time chat",
        "Screen sharing",
        "Recording capability",
        "Attendance tracking"
      ]}
    />
  );
};

export default Live;
