
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Monitor } from 'lucide-react';

const OnlineVideoClass = () => {
  return (
    <FeatureTemplate
      title="Online Video Class"
      description="Recorded and live video lectures"
      icon={Monitor}
      features={[
        "Video conferencing",
        "Recorded lectures",
        "Interactive whiteboards",
        "Breakout rooms",
        "Attendance monitoring",
        "Class recordings"
      ]}
    />
  );
};

export default OnlineVideoClass;
