import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#1E293B] bg-[#0F172A] text-[#94A3B8] transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1: Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center group-hover:bg-[#1D4ED8] transition-colors">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                StudyTools<span className="text-[#38BDF8]"> Hub</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[#94A3B8]">
              Free online tools for students, job seekers, and everyday calculations. Simple, fast, and 100% private.
            </p>
          </div>

          {/* Col 2: Calculators */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3.5">
              Calculators
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/calculators/percentage-calculator" className="hover:text-white transition-colors">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/cgpa-calculator" className="hover:text-white transition-colors">
                  CGPA Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/attendance-calculator" className="hover:text-white transition-colors">
                  Attendance Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/gpa-calculator" className="hover:text-white transition-colors">
                  GPA Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="text-[#38BDF8] hover:text-[#60A5FA] font-medium transition-colors">
                  All Calculators →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Career Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3.5">
              Career Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/resume-builder" className="text-[#38BDF8] hover:text-[#60A5FA] font-medium transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/career-tools" className="hover:text-white transition-colors">
                  Career Portal
                </Link>
              </li>
              <li>
                <Link to="/student-tools" className="hover:text-white transition-colors">
                  Student Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3.5">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3.5">
              Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1E293B] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-3 text-[#94A3B8]/70">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>Local client-side computation. No sensitive data stored.</p>
        </div>
      </div>
    </footer>
  );
};
