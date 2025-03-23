
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { NavItem, NavItemProps } from './NavItem';
import { NavItemData } from './NavData';

interface MobileNavProps {
  navItems: NavItemData[];
  activeDropdown: string | null;
  toggleDropdown: (label: string) => void;
  isMobileMenuOpen: boolean;
}

const MobileNav = ({ navItems, activeDropdown, toggleDropdown, isMobileMenuOpen }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
        isMobileMenuOpen ? "max-h-96" : "max-h-0"
      )}
      id="mobile-menu"
    >
      <div className="space-y-1 pb-3 pt-2">
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
      <div className="border-t border-gray-200 dark:border-gray-700 py-4 flex flex-col space-y-3 px-3">
        <Link
          to="/login"
          className="block text-center w-full px-3 py-2 rounded-md text-base font-medium text-foreground bg-secondary hover:bg-secondary/80"
        >
          Log in
        </Link>
        <Link
          to="/register"
          className="block text-center w-full px-3 py-2 rounded-md text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90 btn-hover-effect"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
