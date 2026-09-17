import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Briefcase, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const CareerTools: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Career Tools & Resume Builder | StudyTools Hub"
        description="Free online career tools for students and professionals. Build clean, ATS-ready resumes with instant browser print PDF export."
        canonicalPath="/career-tools"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Career Tools' }]} />

        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="p-3 rounded-xl bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] w-fit mx-auto mb-4 border border-[#DBEAFE] dark:border-[#263244]">
            <Briefcase className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-[#F8FAFC] tracking-tight mb-3">
            Career Tools & Resume Builder
          </h1>
          <p className="text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            Prepare for internship applications, job interviews, and professional career steps with client-side career utilities.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-[#F6F9FC] dark:bg-[#111827] rounded-2xl p-8 border border-[#E2E8F0] dark:border-[#263244] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] border border-[#E2E8F0] dark:border-[#263244] shadow-xs">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#111827] dark:text-[#F8FAFC] mb-1">
                  Interactive Resume Builder
                </h2>
                <p className="text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-3">
                  Build elegant, professional resumes with live side-by-side previews. Export directly to PDF using native browser print. 100% private.
                </p>
                <div className="flex items-center gap-2 text-xs font-medium text-[#2563EB] dark:text-[#60A5FA]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>No server uploads. Data stays locally on your computer.</span>
                </div>
              </div>
            </div>

            <Link to="/resume-builder" className="shrink-0">
              <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Build My Resume
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
