
import { NavItem } from './NavItem';
import { NavItemData } from './NavData';
import { useIsMobile } from '@/hooks/use-mobile';

interface DesktopNavProps {
  navItems: NavItemData[];
  activeDropdown: string | null;
  toggleDropdown: (label: string) => void;
}

const DesktopNav = ({ navItems, activeDropdown, toggleDropdown }: DesktopNavProps) => {
  const isMobile = useIsMobile();
  
  if (isMobile) return null;
  
  return (
    <nav className="hidden md:flex items-center space-x-2 lg:space-x-6">
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          href={item.href}
          dropdown={item.dropdown}
          activeDropdown={activeDropdown}
          toggleDropdown={toggleDropdown}
        />
      ))}
    </nav>
  );
};

export default DesktopNav;
