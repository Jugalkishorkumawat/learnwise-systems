
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { PlayCircle } from 'lucide-react';

const Tutorials = () => {
  return (
    <FeatureTemplate
      title="Tutorials"
      description="Video tutorials and learning content"
      icon={PlayCircle}
      features={[
        "Video tutorials",
        "Interactive content",
        "Step-by-step guides",
        "Skill development",
        "Progress tracking",
        "Learning paths"
      ]}
    />
  );
};

export default Tutorials;
