
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { Award } from 'lucide-react';

const CertificateScholarship = () => {
  return (
    <FeatureTemplate
      title="Certificate/Scholarship Request"
      description="Apply for certificates and scholarships"
      icon={Award}
      features={[
        "Certificate application",
        "Scholarship applications",
        "Document verification",
        "Application status tracking",
        "Merit-based awards",
        "Digital certificate issuance"
      ]}
    />
  );
};

export default CertificateScholarship;
