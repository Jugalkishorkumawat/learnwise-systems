
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Wallet as WalletIcon } from 'lucide-react';

const Wallet = () => {
  return (
    <FeatureTemplate
      title="Wallet"
      description="Digital wallet for campus transactions"
      icon={WalletIcon}
      features={[
        "Digital payment processing",
        "Campus card integration",
        "Transaction history",
        "Balance management",
        "Quick recharge options",
        "Spending analytics"
      ]}
    />
  );
};

export default Wallet;
