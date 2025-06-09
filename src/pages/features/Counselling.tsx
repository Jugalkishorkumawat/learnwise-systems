
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { MessageCircle } from 'lucide-react';

const Counselling = () => {
  return (
    <FeatureTemplate
      title="Counselling"
      description="Academic and career counselling services"
      icon={MessageCircle}
      features={[
        "Academic counselling",
        "Career guidance",
        "Personal counselling",
        "Appointment scheduling",
        "Counsellor profiles",
        "Progress tracking"
      ]}
    />
  );
};

export default Counselling;
