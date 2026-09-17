import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { CALCULATORS } from '../config/calculators';
import { getWebSiteSchema } from '../utils/seo';
import {
  Search,
  FileText,
  ArrowRight,
  Zap,
  Lock,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Percent,
  GraduationCap,
  CalendarCheck,
  Award,
  ArrowLeftRight,
  Smartphone,
  Briefcase,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const categories = ['All', 'Student', 'Finance', 'Math', 'Health', 'Everyday'];

  const filteredCalculators = CALCULATORS.filter((calc) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      calc.name.toLowerCase().includes(q) ||
      calc.description.toLowerCase().includes(q) ||
      calc.slug.toLowerCase().includes(q);

    const matchesCategory = selectedCategory === 'All' || calc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleChipClick = (term: string, route?: string) => {
    if (route) {
      navigate(route);
    } else {
      setSearchQuery(term);
    }
  };

  // Parallax interaction for Hero Visual on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroVisualRef.current) return;
    const rect = heroVisualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.035;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.035;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const homepageFaqs = [
    {
      question: 'Are the calculators free?',
      answer:
        'Yes, 100% free. All calculators and the Resume Builder are available without paywalls, subscriptions, or hidden charges.',
    },
    {
      question: 'Do I need an account?',
      answer:
        'No account is required. You can calculate marks, check attendance, or build your resume right away in your web browser.',
    },
    {
      question: 'How does Resume Builder work?',
      answer:
        'Simply fill out your personal information, education, experience, and skills in the live editor. The preview updates instantly, allowing you to format and reorder sections easily.',
    },
    {
      question: 'Can I save my resume as PDF?',
      answer:
        'Yes. Click "Print / Save as PDF" in the resume builder, and use your browser\'s native print dialogue to save a clean, ATS-ready PDF.',
    },
    {
      question: 'Does the website work on mobile?',
      answer:
        'Yes. StudyTools Hub is fully responsive and optimized for phones, tablets, laptops, and desktop screens.',
    },
  ];

  return (
    <>
      <SEOHead jsonLd={getWebSiteSchema()} />

      {/* ========================================================================= */}
      {/* 2. HERO SECTION WITH INTERACTIVE VISUAL & PATTERN BACKGROUND */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-white dark:bg-[#0B1120] border-b border-[#E2E8F0] dark:border-[#263244] transition-colors">
        {/* Subtle Blue Dot Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 hero-glow rounded-full pointer-events-none blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              {/* Hero Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] dark:bg-[#111827] border border-[#DBEAFE] dark:border-[#263244] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
                <span className="text-[11px] font-bold tracking-wider text-[#2563EB] dark:text-[#60A5FA] uppercase">
                  FREE TOOLS FOR STUDENTS & CAREERS
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] dark:text-[#F8FAFC] tracking-tight leading-[1.15]">
                Everything You Need to{' '}
                <span className="text-[#2563EB] dark:text-[#60A5FA]">
                  Calculate, Create & Get Ahead.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed max-w-xl">
                Free online tools for students, job seekers and everyday tasks — simple, fast and easy to use.
              </p>

              {/* Large Search Box */}
              <div className="max-w-xl">
                <div className="relative flex items-center rounded-xl border border-[#E2E8F0] dark:border-[#263244] bg-white dark:bg-[#111827] px-4 py-3 shadow-sm hover:border-[#2563EB]/40 dark:hover:border-[#60A5FA]/40 focus-within:border-[#2563EB] dark:focus-within:border-[#60A5FA] focus-within:ring-2 focus-within:ring-[#2563EB]/10 transition-all">
                  <Search className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] mr-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search a calculator or tool..."
                    className="w-full bg-transparent text-sm text-[#111827] dark:text-[#F8FAFC] placeholder-[#64748B]/60 dark:placeholder-[#94A3B8]/60 focus:outline-none"
                  />
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-[#64748B] hover:text-[#111827] dark:hover:text-[#F8FAFC] px-2 py-0.5"
                    >
                      Clear
                    </button>
                  ) : (
                    <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#0B1120] rounded border border-slate-200 dark:border-slate-800">
                      Ctrl K
                    </kbd>
                  )}
                </div>
              </div>

              {/* Quick Tools Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#64748B] dark:text-[#94A3B8]">
                <span className="font-medium text-slate-400 dark:text-slate-500 mr-1">Quick tools:</span>
                <button
                  onClick={() => handleChipClick('Percentage', '/calculators/percentage-calculator')}
                  className="px-2.5 py-1 rounded-md bg-[#F6F9FC] dark:bg-[#111827] hover:bg-[#EFF6FF] dark:hover:bg-[#182234] text-[#111827] dark:text-[#F8FAFC] hover:text-[#2563EB] dark:hover:text-[#60A5FA] border border-[#E2E8F0] dark:border-[#263244] hover:border-[#2563EB]/30 transition-all font-medium"
                >
                  Percentage
                </button>
                <button
                  onClick={() => handleChipClick('CGPA', '/calculators/cgpa-calculator')}
                  className="px-2.5 py-1 rounded-md bg-[#F6F9FC] dark:bg-[#111827] hover:bg-[#EFF6FF] dark:hover:bg-[#182234] text-[#111827] dark:text-[#F8FAFC] hover:text-[#2563EB] dark:hover:text-[#60A5FA] border border-[#E2E8F0] dark:border-[#263244] hover:border-[#2563EB]/30 transition-all font-medium"
                >
                  CGPA
                </button>
                <button
                  onClick={() => handleChipClick('Attendance', '/calculators/attendance-calculator')}
                  className="px-2.5 py-1 rounded-md bg-[#F6F9FC] dark:bg-[#111827] hover:bg-[#EFF6FF] dark:hover:bg-[#182234] text-[#111827] dark:text-[#F8FAFC] hover:text-[#2563EB] dark:hover:text-[#60A5FA] border border-[#E2E8F0] dark:border-[#263244] hover:border-[#2563EB]/30 transition-all font-medium"
                >
                  Attendance
                </button>
                <button
                  onClick={() => handleChipClick('GPA', '/calculators/gpa-calculator')}
                  className="px-2.5 py-1 rounded-md bg-[#F6F9FC] dark:bg-[#111827] hover:bg-[#EFF6FF] dark:hover:bg-[#182234] text-[#111827] dark:text-[#F8FAFC] hover:text-[#2563EB] dark:hover:text-[#60A5FA] border border-[#E2E8F0] dark:border-[#263244] hover:border-[#2563EB]/30 transition-all font-medium"
                >
                  GPA
                </button>
                <button
                  onClick={() => handleChipClick('Resume Builder', '/resume-builder')}
                  className="px-2.5 py-1 rounded-md bg-[#EFF6FF] dark:bg-[#111827] hover:bg-[#DBEAFE] dark:hover:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] border border-[#DBEAFE] dark:border-[#263244] transition-all font-semibold flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  Resume Builder
                </button>
              </div>
            </div>

            {/* Right Column: Hero Interactive Visual (Smart Tools Panel with Parallax) */}
            <div
              ref={heroVisualRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="lg:col-span-5 flex justify-center items-center relative select-none py-6"
            >
              {/* Subtle Circular Decoration Behind Panel */}
              <div className="absolute w-72 h-72 rounded-full border border-[#2563EB]/10 dark:border-[#60A5FA]/10 pointer-events-none" />
              <div className="absolute w-96 h-96 rounded-full border border-dashed border-[#2563EB]/5 dark:border-[#60A5FA]/5 pointer-events-none" />

              {/* Smart Tools Interactive Container */}
              <div
                style={{
                  transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0px)`,
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="w-full max-w-sm bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md rounded-2xl border border-[#E2E8F0] dark:border-[#263244] p-5 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-4"
              >
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#263244] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                    <span className="text-xs font-bold text-[#111827] dark:text-[#F8FAFC]">
                      Smart Tools Panel
                    </span>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#EFF6FF] dark:bg-[#0B1120] text-[#2563EB] dark:text-[#60A5FA] border border-[#DBEAFE] dark:border-[#263244]">
                    Live UI Preview
                  </span>
                </div>

                {/* 4 Demo Visual Cards with Subtle Float Animations */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Card 1: Percentage */}
                  <Link
                    to="/calculators/percentage-calculator"
                    className="animate-float-1 block p-3 rounded-xl bg-white dark:bg-[#0B1120] border border-[#E2E8F0] dark:border-[#263244] shadow-xs hover:border-[#2563EB]/60 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-md bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center">
                        <Percent className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-[#2563EB] transition-colors">→</span>
                    </div>
                    <p className="text-[11px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Percentage
                    </p>
                    <p className="text-lg font-extrabold text-[#111827] dark:text-[#F8FAFC] tracking-tight">
                      75%
                    </p>
                  </Link>

                  {/* Card 2: CGPA */}
                  <Link
                    to="/calculators/cgpa-calculator"
                    className="animate-float-2 block p-3 rounded-xl bg-white dark:bg-[#0B1120] border border-[#E2E8F0] dark:border-[#263244] shadow-xs hover:border-[#2563EB]/60 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-md bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-[#2563EB] transition-colors">→</span>
                    </div>
                    <p className="text-[11px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                      CGPA
                    </p>
                    <p className="text-lg font-extrabold text-[#111827] dark:text-[#F8FAFC] tracking-tight">
                      8.2
                    </p>
                  </Link>

                  {/* Card 3: Attendance */}
                  <Link
                    to="/calculators/attendance-calculator"
                    className="animate-float-3 block p-3 rounded-xl bg-white dark:bg-[#0B1120] border border-[#E2E8F0] dark:border-[#263244] shadow-xs hover:border-[#2563EB]/60 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-md bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center">
                        <CalendarCheck className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-[#2563EB] transition-colors">→</span>
                    </div>
                    <p className="text-[11px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Attendance
                    </p>
                    <p className="text-lg font-extrabold text-[#111827] dark:text-[#F8FAFC] tracking-tight">
                      82%
                    </p>
                  </Link>

                  {/* Card 4: Resume */}
                  <Link
                    to="/resume-builder"
                    className="animate-float-4 block p-3 rounded-xl bg-white dark:bg-[#0B1120] border border-[#E2E8F0] dark:border-[#263244] shadow-xs hover:border-[#2563EB]/60 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-md bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-[#2563EB] transition-colors">→</span>
                    </div>
                    <p className="text-[11px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                      Resume
                    </p>
                    <p className="text-lg font-extrabold text-[#2563EB] dark:text-[#60A5FA] tracking-tight flex items-center gap-1">
                      Ready
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 inline" />
                    </p>
                  </Link>
                </div>

                {/* Footer Note clarifying demo preview */}
                <div className="pt-2 border-t border-[#E2E8F0]/70 dark:border-[#263244]/70 flex items-center justify-between text-[10px] text-[#64748B] dark:text-[#94A3B8]">
                  <span>Fast, browser-based utilities</span>
                  <span className="text-[#2563EB] dark:text-[#60A5FA] font-medium">100% Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE TOOL EXPLORER */}
      {/* ========================================================================= */}
      <section className="py-10 bg-[#F6F9FC] dark:bg-[#0B1120] border-b border-[#E2E8F0] dark:border-[#263244] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-[#F8FAFC] tracking-tight">
              What do you want to do?
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-0.5">
              Jump directly to your task with quick one-click shortcuts.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Option 1: Calculate Marks */}
            <Link
              to="/calculators/percentage-calculator"
              className="group p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#263244] hover:border-[#2563EB]/60 dark:hover:border-[#60A5FA]/60 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Percent className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#111827] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                  Calculate Marks
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 leading-relaxed">
                  Percentage, ratios & exam score breakdown
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#E2E8F0]/70 dark:border-[#263244]/70 flex items-center gap-1 text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                <span>Open tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Option 2: Check Attendance */}
            <Link
              to="/calculators/attendance-calculator"
              className="group p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#263244] hover:border-[#2563EB]/60 dark:hover:border-[#60A5FA]/60 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#111827] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                  Check Attendance
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 leading-relaxed">
                  Target attendance % & bunkable lecture count
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#E2E8F0]/70 dark:border-[#263244]/70 flex items-center gap-1 text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                <span>Open tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Option 3: Build Resume */}
            <Link
              to="/resume-builder"
              className="group p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#263244] hover:border-[#2563EB]/60 dark:hover:border-[#60A5FA]/60 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#111827] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                  Build Resume
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 leading-relaxed">
                  ATS-friendly PDF resume created in browser
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#E2E8F0]/70 dark:border-[#263244]/70 flex items-center gap-1 text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                <span>Open builder</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Option 4: Convert Units */}
            <Link
              to="/calculators/unit-converter"
              className="group p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#263244] hover:border-[#2563EB]/60 dark:hover:border-[#60A5FA]/60 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#111827] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                  Convert Units
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 leading-relaxed">
                  Metric & imperial length, weight, and temp
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#E2E8F0]/70 dark:border-[#263244]/70 flex items-center gap-1 text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                <span>Open converter</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. RESUME BUILDER — MAJOR FEATURE SECTION */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white dark:bg-[#0B1120] border-b border-[#E2E8F0] dark:border-[#263244] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F6F9FC] dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#263244] p-6 sm:p-10 transition-colors shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Side: Copy, Badges & CTAs */}
              <div className="lg:col-span-7 space-y-5">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="blue">Free</Badge>
                  <Badge variant="slate">No Signup</Badge>
                  <Badge variant="slate">Browser Based</Badge>
                  <Badge variant="slate">Print / PDF</Badge>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] dark:text-[#F8FAFC] tracking-tight leading-snug">
                  Build a Professional Resume in Minutes
                </h2>

                <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed max-w-xl">
                  Create your resume with education, skills, projects and experience, then print or save it as PDF directly from your browser.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link to="/resume-builder">
                    <Button size="lg" variant="primary" icon={<FileText className="w-4 h-4" />}>
                      Create My Resume
                    </Button>
                  </Link>
                  <Link to="/career-tools">
                    <Button size="lg" variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                      Explore Career Tools
                    </Button>
                  </Link>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
                    100% Private (No server storage)
                  </span>
                  <span>•</span>
                  <span>ATS-Optimized Formatting</span>
                  <span>•</span>
                  <span>Instant Browser Preview</span>
                </div>
              </div>

              {/* Right Side: Realistic Professional Resume Preview Mockup */}
              <div className="lg:col-span-5 flex justify-center relative">
                {/* Subtle Blue Glow Behind Paper */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-sky-500/10 rounded-2xl blur-xl pointer-events-none" />

                <div className="relative w-full max-w-md bg-white text-slate-800 rounded-xl border border-[#E2E8F0] p-6 shadow-xl text-[11px] space-y-3.5 font-sans select-none dark:border-slate-700">
                  {/* Mockup Top Header */}
                  <div className="border-b border-[#2563EB]/25 pb-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                        Alex Morgan
                      </h3>
                      <span className="text-[10px] text-[#2563EB] font-bold">
                        Software Engineer
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      alex.morgan@email.com • +1 (555) 019-2834 • New York, NY
                    </p>
                  </div>

                  {/* Mockup Section: Education */}
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-wider text-[#2563EB] mb-1">
                      Education
                    </h4>
                    <div className="flex justify-between font-semibold text-slate-800 text-[10.5px]">
                      <span>B.S. in Computer Science</span>
                      <span className="text-[10px] text-slate-500 font-normal">2020 – 2024</span>
                    </div>
                    <p className="text-[10px] text-slate-600">
                      State University • GPA: 3.8 / 4.0
                    </p>
                  </div>

                  {/* Mockup Section: Experience */}
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-wider text-[#2563EB] mb-1">
                      Experience
                    </h4>
                    <div className="flex justify-between font-semibold text-slate-800 text-[10.5px]">
                      <span>Frontend Engineering Intern</span>
                      <span className="text-[10px] text-slate-500 font-normal">Summer 2023</span>
                    </div>
                    <p className="text-[10px] text-slate-600">
                      TechCorp Solutions • Built responsive UI components with React & TypeScript.
                    </p>
                  </div>

                  {/* Mockup Section: Skills */}
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-wider text-[#2563EB] mb-1">
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'TypeScript', 'Tailwind CSS', 'Git', 'REST APIs'].map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9.5px] font-medium text-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. POPULAR TOOLS */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white dark:bg-[#0B1120] border-b border-[#E2E8F0] dark:border-[#263244] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-[#F8FAFC] tracking-tight">
              Popular Tools
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-0.5">
              Quick access to the tools students use most.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <CalculatorCard calculator={CALCULATORS.find((c) => c.id === 'percentage')!} isFeatured={true} />
            <CalculatorCard calculator={CALCULATORS.find((c) => c.id === 'cgpa')!} isFeatured={true} />
            <CalculatorCard calculator={CALCULATORS.find((c) => c.id === 'attendance')!} isFeatured={true} />
            <CalculatorCard calculator={CALCULATORS.find((c) => c.id === 'gpa')!} isFeatured={true} />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ALL CALCULATORS WITH CATEGORY FILTERS */}
      {/* ========================================================================= */}
      <section className="py-14 bg-[#F6F9FC] dark:bg-[#0B1120] border-b border-[#E2E8F0] dark:border-[#263244] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-[#F8FAFC] tracking-tight">
                Explore All Calculators
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Simple tools for study, finance, health, math and everyday calculations.
              </p>
            </div>

            {/* Interactive Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-white dark:bg-[#111827] text-[#64748B] dark:text-[#94A3B8] hover:text-[#111827] dark:hover:text-white border border-[#E2E8F0] dark:border-[#263244]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Directory Grid */}
          {filteredCalculators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCalculators.map((calc) => (
                <CalculatorCard key={calc.id} calculator={calc} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white dark:bg-[#111827] rounded-xl border border-[#E2E8F0] dark:border-[#263244]">
              <Search className="w-8 h-8 text-[#64748B] mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-[#111827] dark:text-white">
                No calculators found
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 max-w-xs mx-auto">
                No tool matched "${searchQuery}". Try a different search term or category.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CAREER TOOLS */}
      {/* ========================================================================= */}
      <section className="py-10 bg-white dark:bg-[#0B1120] border-b border-[#E2E8F0] dark:border-[#263244] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F6F9FC] dark:bg-[#111827] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] dark:border-[#263244] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] dark:text-[#60A5FA] mb-1">
                <Briefcase className="w-4 h-4" />
                <span>CAREER PORTAL & RESUME UTILITIES</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                Career Tools
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                Looking to apply for jobs or internships? Build a clean, ATS-ready resume and prepare with private, browser-first tools.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link to="/resume-builder">
                <Button size="md" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  Build a Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. WHY USE STUDYTOOLS HUB */}
      {/* ========================================================================= */}
      <section className="py-14 bg-[#F6F9FC] dark:bg-[#0B1120] border-b border-[#E2E8F0] dark:border-[#263244] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-[#F8FAFC] tracking-tight">
              Why Use StudyTools Hub?
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-0.5">
              Built to make academic and career tasks simple, fast, and accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Block 1: Fast & Simple */}
            <div className="bg-white dark:bg-[#111827] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#263244] shadow-xs hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#111827] dark:text-[#F8FAFC] mb-1">
                Fast & Simple
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                Get results without complicated steps.
              </p>
            </div>

            {/* Block 2: Privacy-Friendly */}
            <div className="bg-white dark:bg-[#111827] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#263244] shadow-xs hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center mb-3">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#111827] dark:text-[#F8FAFC] mb-1">
                Privacy-Friendly
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                Calculator inputs are processed locally in your browser where applicable.
              </p>
            </div>

            {/* Block 3: Free Core Tools */}
            <div className="bg-white dark:bg-[#111827] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#263244] shadow-xs hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#111827] dark:text-[#F8FAFC] mb-1">
                Free Core Tools
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                Use the core calculators without creating an account.
              </p>
            </div>

            {/* Block 4: Works Everywhere */}
            <div className="bg-white dark:bg-[#111827] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#263244] shadow-xs hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center mb-3">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#111827] dark:text-[#F8FAFC] mb-1">
                Works Everywhere
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                Designed for desktop, tablet and mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FAQ ACCORDION SECTION */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white dark:bg-[#0B1120] transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F6F9FC] dark:bg-[#111827] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] dark:border-[#263244] shadow-xs">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {homepageFaqs.map((faq, index) => {
                const isOpen = faqOpen === index;
                return (
                  <div
                    key={index}
                    className="border border-[#E2E8F0] dark:border-[#263244] bg-white dark:bg-[#0B1120] rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setFaqOpen(isOpen ? null : index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#111827] dark:text-[#F8FAFC] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#64748B] transition-transform duration-200 shrink-0 ml-3 ${
                          isOpen ? 'rotate-180 text-[#2563EB] dark:text-[#60A5FA]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed border-t border-[#E2E8F0]/80 dark:border-[#263244]/80 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
