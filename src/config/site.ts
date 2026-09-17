export const SITE_CONFIG = {
  name: 'StudyTools Hub',
  tagline: 'Free Tools for Students & Careers',
  description: 'Fast, simple, and free online calculators and career tools for students, job seekers, and everyday math. Built for performance and privacy.',
  url: import.meta.env.VITE_SITE_URL || 'https://studytoolshub.com',
  author: 'StudyTools Hub Team',
  twitterHandle: '@studytoolshub',
  navLinks: [
    { name: 'Home', href: '/' },
    { name: 'Calculators', href: '/calculators' },
    { name: 'Student Tools', href: '/student-tools' },
    { name: 'Career Tools', href: '/career-tools' },
    { name: 'About', href: '/about' },
  ],
  footerLinks: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms' },
  ],
};
