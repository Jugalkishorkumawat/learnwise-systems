
import { NavItem, NavItemProps } from './NavItem';

interface DesktopNavProps {
  navItems: Omit<NavItemProps, 'activeDropdown' | 'toggleDropdown'>[];
  activeDropdown: string | null;
  toggleDropdown: (label: string) => void;
}

const DesktopNav = ({ navItems, activeDropdown, toggleDropdown }: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
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
