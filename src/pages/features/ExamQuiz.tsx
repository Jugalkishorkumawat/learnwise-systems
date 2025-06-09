
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { PenTool } from 'lucide-react';

const ExamQuiz = () => {
  return (
    <FeatureTemplate
      title="Exam/Quiz"
      description="Take online exams and quizzes"
      icon={PenTool}
      features={[
        "Online examinations",
        "Quiz competitions",
        "Time management",
        "Auto-submit functionality",
        "Result analysis",
        "Performance metrics"
      ]}
    />
  );
};

export default ExamQuiz;
