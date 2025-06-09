
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { BarChart3 } from 'lucide-react';

const SeriesExam = () => {
  return (
    <FeatureTemplate
      title="Series Exam"
      description="Semester series examinations"
      icon={BarChart3}
      features={[
        "Series test management",
        "Multiple test series",
        "Performance comparison",
        "Rank analysis",
        "Subject-wise scoring",
        "Improvement tracking"
      ]}
    />
  );
};

export default SeriesExam;
