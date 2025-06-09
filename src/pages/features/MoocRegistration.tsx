
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Globe } from 'lucide-react';

const MoocRegistration = () => {
  return (
    <FeatureTemplate
      title="MOOC Registration"
      description="Massive Open Online Course enrollment"
      icon={Globe}
      features={[
        "Course enrollment",
        "Certificate programs",
        "Online learning",
        "Progress tracking",
        "Skill development",
        "Global access"
      ]}
    />
  );
};

export default MoocRegistration;
