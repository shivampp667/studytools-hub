import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { WorkedExample } from '../../types';

interface WorkedExampleSectionProps {
  example: WorkedExample;
}

export const WorkedExampleSection: React.FC<WorkedExampleSectionProps> = ({ example }) => {
  return (
    <div className="mt-8 bg-[#F6F9FC] dark:bg-[#111827] rounded-xl p-6 sm:p-8 border border-[#E2E8F0] dark:border-[#263244]">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-lg bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA]">
          <BookOpen className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
          Worked Example: {example.title}
        </h2>
      </div>

      <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-6 bg-white dark:bg-[#0B1120] p-4 rounded-lg border border-[#E2E8F0] dark:border-[#263244]">
        <span className="font-semibold text-[#2563EB] dark:text-[#60A5FA]">Problem: </span>
        {example.problem}
      </p>

      <div className="space-y-4 mb-6">
        {example.steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3 text-sm">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2563EB] text-white font-medium text-xs shrink-0 mt-0.5">
              {idx + 1}
            </span>
            <div>
              <p className="font-medium text-[#111827] dark:text-[#F8FAFC]">{step.label}</p>
              <p className="text-[#64748B] dark:text-[#94A3B8] font-mono text-xs bg-white dark:bg-[#0B1120] px-3 py-1.5 rounded-md border border-[#E2E8F0] dark:border-[#263244] mt-1 inline-block">
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 p-4 rounded-lg bg-[#EFF6FF] dark:bg-[#0B1120] text-[#2563EB] dark:text-[#60A5FA] border border-[#DBEAFE] dark:border-[#263244] text-sm font-semibold">
        <CheckCircle2 className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA] shrink-0" />
        <span>Final Answer: {example.result}</span>
      </div>
    </div>
  );
};
