
export interface NavItemData {
  label: string;
  href: string;
  dropdown?: NavItemData[];
}

export const navItems: NavItemData[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Academic',
    href: '#',
    dropdown: [
      { label: 'Students', href: '/students' },
      { label: 'Staff Management', href: '/staff' },
      { label: 'Courses', href: '/courses' },
      { label: 'Timetable', href: '/timetable' },
      { label: 'Examinations', href: '/facilities/exams' }
    ]
  },
  {
    label: 'Management',
    href: '#',
    dropdown: [
      { label: 'Attendance System', href: '/attendance/manage' },
      { label: 'Fee Management', href: '/payments' },
      { label: 'Notice Board', href: '/notices' },
      { label: 'Reports', href: '/reports' }
    ]
  },
  {
    label: 'Facilities',
    href: '#',
    dropdown: [
      { label: 'Library', href: '/facilities/library' },
      { label: 'Hostel', href: '/facilities/hostel' },
      { label: 'Transport', href: '/transport' },
      { label: 'All Facilities', href: '/facilities' }
    ]
  },
  { label: 'Dashboard', href: '/comprehensive-dashboard' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];
