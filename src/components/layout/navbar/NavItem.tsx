
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

  if (dropdown) {
    return (
      <div className={isMobile ? "flex flex-col" : "relative group"}>
        <button
          className={
            isMobile 
              ? "flex items-center justify-between px-3 py-2 text-base font-medium text-foreground" 
              : "flex items-center space-x-1 text-foreground/80 hover:text-foreground py-2 transition-colors animated-underline"
          }
          onClick={() => toggleDropdown(label)}
          aria-expanded={activeDropdown === label}
        >
          <span>{label}</span>
          <ChevronDown 
            className={cn(
              isMobile ? "h-5 w-5" : "h-4 w-4",
              "transition-transform duration-200",
              isMobile && activeDropdown === label ? "rotate-180" : "",
              !isMobile && "group-hover:rotate-180"
            )} 
          />
        </button>

        {isMobile ? (
          <div
            className={cn(
              "overflow-hidden transition-all duration-200",
              activeDropdown === label ? "max-h-96" : "max-h-0"
            )}
          >
            {dropdown.map((dropdownItem) => (
              <Link
                key={dropdownItem.label}
                to={dropdownItem.href}
                className="block pl-8 pr-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground"
              >
                {dropdownItem.label}
              </Link>
            ))}
          </div>
        ) : (
          <div 
            className={cn(
              "absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800",
              "transition-all duration-200 transform opacity-0 scale-95 pointer-events-none",
              "group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
            )}
          >
            <div className="py-1">
              {dropdown.map((dropdownItem) => (
                <Link
                  key={dropdownItem.label}
                  to={dropdownItem.href}
                  className="block px-4 py-2 text-sm text-foreground hover:bg-gray-100 dark:hover:bg-gray-700"
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
          ? "block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground"
          : "text-foreground/80 hover:text-foreground py-2 transition-colors animated-underline",
        location.pathname === href && (isMobile ? "text-primary" : "text-primary after:w-full after:bg-primary")
      )}
    >
      {label}
    </Link>
  );
};

export default NavItem;
