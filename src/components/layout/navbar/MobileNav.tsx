
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { NavItem } from './NavItem';
import { NavItemData } from './NavData';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileNavProps {
  navItems: NavItemData[];
  activeDropdown: string | null;
  toggleDropdown: (label: string) => void;
  isMobileMenuOpen: boolean;
}

const MobileNav = ({ navItems, activeDropdown, toggleDropdown, isMobileMenuOpen }: MobileNavProps) => {
  const isMobile = useIsMobile();
  
  if (!isMobile && !isMobileMenuOpen) return null;
  
  return (
    <div
      className={cn(
        "fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-lg md:hidden overflow-hidden transition-all duration-300 ease-in-out",
        isMobileMenuOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"
      )}
      id="mobile-menu"
    >
      <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
        <div className="space-y-1 py-4">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              href={item.href}
              dropdown={item.dropdown}
              activeDropdown={activeDropdown}
              toggleDropdown={toggleDropdown}
              isMobile={true}
            />
          ))}
        </div>
        
        {/* Mobile Auth Buttons */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-4 flex flex-col space-y-3 px-4">
          <Link
            to="/login"
            className="block text-center w-full px-4 py-2.5 rounded-md text-base font-medium text-foreground bg-secondary hover:bg-secondary/80 transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="block text-center w-full px-4 py-2.5 rounded-md text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90 btn-hover-effect transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
