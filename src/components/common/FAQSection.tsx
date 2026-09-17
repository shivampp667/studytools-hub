import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../../types';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-12 bg-white dark:bg-[#111827] rounded-xl p-6 sm:p-8 border border-[#E2E8F0] dark:border-[#263244] shadow-xs">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="p-2 rounded-lg bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA]">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
          Frequently Asked Questions (FAQs)
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-[#E2E8F0] dark:border-[#263244] rounded-lg overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between font-semibold text-sm text-[#111827] dark:text-[#F8FAFC] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                    isOpen ? 'rotate-180 text-[#2563EB] dark:text-[#60A5FA]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed border-t border-[#E2E8F0] dark:border-[#263244] pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
