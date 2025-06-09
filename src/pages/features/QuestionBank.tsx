
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { HelpCircle } from 'lucide-react';

const QuestionBank = () => {
  return (
    <FeatureTemplate
      title="Question Bank"
      description="Practice questions and test banks"
      icon={HelpCircle}
      features={[
        "Practice questions",
        "Subject-wise banks",
        "Difficulty levels",
        "Solution explanations",
        "Mock tests",
        "Performance analytics"
      ]}
    />
  );
};

export default QuestionBank;
