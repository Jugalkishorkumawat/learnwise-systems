
export interface NavItemData {
  label: string;
  href: string;
  dropdown?: NavItemData[];
}

export const navItems: NavItemData[] = [
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
