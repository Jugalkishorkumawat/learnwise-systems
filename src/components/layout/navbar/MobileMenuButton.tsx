
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuButton = ({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileMenuButtonProps) => {
  return (
    <button
      type="button"
      className="md:hidden rounded-md p-2 text-foreground"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-controls="mobile-menu"
      aria-expanded={isMobileMenuOpen}
    >
      <span className="sr-only">Open main menu</span>
      {isMobileMenuOpen ? (
        <X className="h-6 w-6" aria-hidden="true" />
      ) : (
        <Menu className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};

export default MobileMenuButton;
