
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItemData } from './NavData';

export interface NavItemProps {
  label: string;
  href: string;
  dropdown?: NavItemProps[] | NavItemData[];
  activeDropdown: string | null;
  toggleDropdown: (label: string) => void;
  isMobile?: boolean;
}

export const NavItem = ({ 
  label, 
  href, 
  dropdown, 
  activeDropdown,
  toggleDropdown,
  isMobile = false 
}: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  if (dropdown) {
    return (
      <div className={isMobile ? "flex flex-col w-full" : "relative group"}>
        <button
          className={cn(
            isMobile 
              ? "flex items-center justify-between w-full px-4 py-3 text-base font-medium text-foreground hover:bg-secondary/50 transition-colors" 
              : "flex items-center space-x-1.5 text-foreground/80 hover:text-foreground py-2 px-1.5 rounded-md transition-colors animated-underline",
            isMobile && activeDropdown === label ? "bg-secondary/30" : ""
          )}
          onClick={() => toggleDropdown(label)}
          aria-expanded={activeDropdown === label}
        >
          <span>{label}</span>
          <ChevronDown 
            className={cn(
              isMobile ? "h-5 w-5" : "h-4 w-4 ml-1",
              "transition-transform duration-200",
              isMobile && activeDropdown === label ? "rotate-180" : "",
              !isMobile && "group-hover:rotate-180"
            )} 
          />
        </button>

        {isMobile ? (
          <div
            className={cn(
              "overflow-hidden transition-all duration-200 bg-secondary/20",
              activeDropdown === label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            {dropdown.map((dropdownItem) => (
              <Link
                key={dropdownItem.label}
                to={dropdownItem.href}
                className="block pl-8 pr-4 py-2.5 text-base font-medium text-foreground/90 hover:text-foreground hover:bg-secondary/40 transition-colors"
              >
                {dropdownItem.label}
              </Link>
            ))}
          </div>
        ) : (
          <div 
            className={cn(
              "absolute left-0 mt-2 w-52 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 z-50",
              "transition-all duration-200 transform opacity-0 scale-95 pointer-events-none",
              "group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
            )}
          >
            <div className="py-1 rounded-md overflow-hidden bg-background backdrop-blur-sm border border-border">
              {dropdown.map((dropdownItem) => (
                <Link
                  key={dropdownItem.label}
                  to={dropdownItem.href}
                  className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  {dropdownItem.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={href}
      className={cn(
        isMobile
          ? "block w-full px-4 py-3 text-base font-medium text-foreground/90 hover:text-foreground hover:bg-secondary/50 transition-colors"
          : "text-foreground/80 hover:text-foreground py-2 px-3 rounded-md transition-colors animated-underline",
        isActive && (isMobile ? "text-primary bg-primary/5" : "text-primary after:w-full after:bg-primary")
      )}
    >
      {label}
    </Link>
  );
};

export default NavItem;
