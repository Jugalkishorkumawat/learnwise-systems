
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Clock } from 'lucide-react';

const ExamSchedule = () => {
  return (
    <FeatureTemplate
      title="Exam Schedule"
      description="View examination timetable"
      icon={Clock}
      features={[
        "Exam timetable",
        "Subject-wise schedule",
        "Room allocation",
        "Admit card generation",
        "Important instructions",
        "Calendar integration"
      ]}
    />
  );
};

export default ExamSchedule;
