import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Zap, Heart, Award, Calculator, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const About: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About StudyTools Hub — Free Student & Online Calculators"
        description="Learn about StudyTools Hub. Our mission is to build fast, simple, free, and 100% private client-side calculators for students and everyday math."
        canonicalPath="/about"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-[#2563EB] text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-[#F8FAFC] tracking-tight">
              About StudyTools Hub
            </h1>
          </div>
          <p className="text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            {SITE_CONFIG.name} is a modern, free online calculator platform dedicated to helping students, academics, and professionals perform instant, accurate calculations without paywalls or backend tracking.
          </p>
        </div>

        <div className="space-y-8 text-[#111827] dark:text-[#F8FAFC]">
          <section className="bg-white dark:bg-[#111827] rounded-xl p-6 sm:p-8 border border-[#E2E8F0] dark:border-[#263244] shadow-xs">
            <h2 className="text-xl font-bold text-[#111827] dark:text-[#F8FAFC] mb-6">
              Our Core Principles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-lg bg-[#F6F9FC] dark:bg-[#0B1120] border border-[#E2E8F0] dark:border-[#263244]">
                <ShieldCheck className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA] mb-2" />
                <h3 className="font-semibold text-[#111827] dark:text-[#F8FAFC] text-sm mb-1">100% Client-Side Privacy</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  Every calculation and resume input is computed locally inside your browser. We never transmit your grades, loan amounts, or resume data to remote servers.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#F6F9FC] dark:bg-[#0B1120] border border-[#E2E8F0] dark:border-[#263244]">
                <Zap className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA] mb-2" />
                <h3 className="font-semibold text-[#111827] dark:text-[#F8FAFC] text-sm mb-1">Zero Latency Performance</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  Because no API network roundtrips are required, calculation outputs adjust instantaneously as you type or modify form values.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#F6F9FC] dark:bg-[#0B1120] border border-[#E2E8F0] dark:border-[#263244]">
                <Award className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA] mb-2" />
                <h3 className="font-semibold text-[#111827] dark:text-[#F8FAFC] text-sm mb-1">Academic Quality & Transparency</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  Every tool includes explicit math formulas, step-by-step worked examples, and clear caveats regarding institutional variation (such as CGPA conversion rules).
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#F6F9FC] dark:bg-[#0B1120] border border-[#E2E8F0] dark:border-[#263244]">
                <Heart className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA] mb-2" />
                <h3 className="font-semibold text-[#111827] dark:text-[#F8FAFC] text-sm mb-1">Always Free & Openly Accessible</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  We believe essential educational resources should not be gated behind credit card prompts or mandatory registrations.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
