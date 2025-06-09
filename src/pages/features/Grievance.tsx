
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Shield } from 'lucide-react';

const Grievance = () => {
  return (
    <FeatureTemplate
      title="Grievance"
      description="Submit and track grievances"
      icon={Shield}
      features={[
        "Grievance submission",
        "Status tracking",
        "Anonymous reporting",
        "Resolution timeline",
        "Feedback system",
        "Administrative review"
      ]}
    />
  );
};

export default Grievance;
