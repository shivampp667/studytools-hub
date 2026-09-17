import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { CALCULATORS } from '../config/calculators';
import { GraduationCap } from 'lucide-react';

export const StudentTools: React.FC = () => {
  const studentCalculators = CALCULATORS.filter((calc) =>
    ['percentage', 'cgpa', 'gpa', 'attendance', 'age'].includes(calc.id)
  );

  return (
    <>
      <SEOHead
        title="Free Student Calculators & Academic Tools | StudyTools Hub"
        description="Calculate exam percentages, CGPA to percentage conversions, semester GPA, minimum attendance, and exact age with free student tools."
        canonicalPath="/student-tools"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Student Tools' }]} />

        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="p-3 rounded-xl bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] w-fit mx-auto mb-4 border border-[#DBEAFE] dark:border-[#263244]">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-[#F8FAFC] tracking-tight mb-3">
            Academic & Student Tools
          </h1>
          <p className="text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            Essential online calculators designed specifically for students, school applicants, and university academics to evaluate test scores, semester grades, and attendance goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentCalculators.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      </div>
    </>
  );
};
