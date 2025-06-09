
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { CreditCard } from 'lucide-react';

const Accounts = () => {
  return (
    <FeatureTemplate
      title="Accounts"
      description="Manage fee payments and financial transactions"
      icon={CreditCard}
      features={[
        "Fee payment processing",
        "Payment history tracking",
        "Receipt generation",
        "Outstanding dues overview",
        "Scholarship management",
        "Financial reporting"
      ]}
    />
  );
};

export default Accounts;
