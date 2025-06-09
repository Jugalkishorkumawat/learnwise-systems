
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Calendar } from 'lucide-react';

const DutyLeave = () => {
  return (
    <FeatureTemplate
      title="Duty Leave"
      description="Apply for leave and manage requests"
      icon={Calendar}
      features={[
        "Leave application",
        "Approval workflow",
        "Leave balance tracking",
        "Holiday calendar",
        "Emergency leave",
        "Status notifications"
      ]}
    />
  );
};

export default DutyLeave;
