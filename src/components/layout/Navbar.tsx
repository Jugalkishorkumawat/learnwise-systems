
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  dropdown?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Features',
    href: '#',
    dropdown: [
      { label: 'Attendance System', href: '/features/attendance' },
      { label: 'Fee Management', href: '/features/fees' },
      { label: 'Facilities', href: '/features/facilities' },
      { label: 'AI Chatbot', href: '/features/chatbot' }
    ]
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            aria-label="Homepage"
          >
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Campus<span className="text-primary">Wise</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.dropdown ? (
                  <button
                    className="flex items-center space-x-1 text-foreground/80 hover:text-foreground py-2 transition-colors animated-underline"
                    onClick={() => toggleDropdown(item.label)}
                    aria-expanded={activeDropdown === item.label}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "text-foreground/80 hover:text-foreground py-2 transition-colors animated-underline",
                      location.pathname === item.href && "text-primary after:w-full after:bg-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div 
                    className={cn(
                      "absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800",
                      "transition-all duration-200 transform opacity-0 scale-95 pointer-events-none",
                      "group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
                    )}
                  >
                    <div className="py-1">
                      {item.dropdown.map((dropdownItem) => (
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
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors btn-hover-effect"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
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
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          )}
          id="mobile-menu"
        >
          <div className="space-y-1 pb-3 pt-2">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                {item.dropdown ? (
                  <>
                    <button
                      className="flex items-center justify-between px-3 py-2 text-base font-medium text-foreground"
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={activeDropdown === item.label}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          activeDropdown === item.label && "rotate-180"
                        )} 
                      />
                    </button>
                    
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200",
                        activeDropdown === item.label ? "max-h-96" : "max-h-0"
                      )}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block pl-8 pr-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground",
                      location.pathname === item.href && "text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
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
      </div>
    </header>
  );
};

export default Navbar;
