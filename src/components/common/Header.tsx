import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Search, Menu, X, FileText, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { ThemeToggle } from './ThemeToggle';
import { SearchModal } from './SearchModal';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md shadow-sm border-[#E2E8F0] dark:border-[#263244] py-1.5'
            : 'bg-white dark:bg-[#0B1120] border-[#E2E8F0] dark:border-[#263244] py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* LEFT: Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shadow-sm group-hover:bg-[#1D4ED8] transition-colors">
              <Calculator className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-[#111827] dark:text-[#F8FAFC] tracking-tight">
              StudyTools<span className="text-[#2563EB] dark:text-[#60A5FA]"> Hub</span>
            </span>
          </Link>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {SITE_CONFIG.navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm transition-colors py-1 ${
                    active
                      ? 'text-[#2563EB] dark:text-[#60A5FA] font-semibold'
                      : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#111827] dark:hover:text-[#F8FAFC] font-medium'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Action Items */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger with Ctrl K */}
            <button
              onClick={() => setSearchModalOpen(true)}
              type="button"
              className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#64748B] dark:text-[#94A3B8] bg-[#F6F9FC] dark:bg-[#111827] hover:bg-slate-200/70 dark:hover:bg-[#182234] rounded-lg transition-colors border border-[#E2E8F0] dark:border-[#263244] group"
              aria-label="Search Calculators and Tools"
            >
              <Search className="w-3.5 h-3.5 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-[#0B1120] rounded border border-slate-200 dark:border-slate-700 shadow-2xs">
                Ctrl K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Primary Header CTA: Build Resume */}
            <Link to="/resume-builder" className="hidden sm:block">
              <Button size="sm" variant="primary" icon={<FileText className="w-3.5 h-3.5" />}>
                Build Resume
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-1.5 rounded-lg text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F6F9FC] dark:hover:bg-[#111827] transition-colors border border-transparent hover:border-[#E2E8F0] dark:hover:border-[#263244]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#111827] dark:text-[#F8FAFC]" /> : <Menu className="w-5 h-5 text-[#111827] dark:text-[#F8FAFC]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E2E8F0] dark:border-[#263244] bg-white dark:bg-[#0B1120] px-4 pt-3 pb-5 space-y-1.5 animate-in slide-in-from-top-1 mt-1.5">
            {SITE_CONFIG.navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-[#2563EB] dark:text-[#60A5FA] bg-[#EFF6FF] dark:bg-[#111827] font-semibold'
                    : 'text-[#111827] dark:text-[#F8FAFC] hover:bg-[#F6F9FC] dark:hover:bg-[#111827]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link to="/resume-builder" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full" size="md" variant="primary" icon={<FileText className="w-4 h-4" />}>
                  Build Resume
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
