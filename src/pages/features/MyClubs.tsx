
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Users } from 'lucide-react';

const MyClubs = () => {
  return (
    <FeatureTemplate
      title="My Clubs"
      description="Join and manage club memberships"
      icon={Users}
      features={[
        "Club membership management",
        "Activity participation",
        "Event organization",
        "Meeting schedules",
        "Club announcements",
        "Leadership opportunities"
      ]}
    />
  );
};

export default MyClubs;
