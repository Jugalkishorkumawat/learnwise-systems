
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Award } from 'lucide-react';

const Results = () => {
  return (
    <FeatureTemplate
      title="Results"
      description="View your exam results and academic performance"
      icon={Award}
      features={[
        "Semester-wise result display",
        "Subject-wise grade breakdown",
        "CGPA calculation and tracking",
        "Result comparison with previous semesters",
        "Download result certificates",
        "Performance analytics and insights"
      ]}
    />
  );
};

export default Results;
