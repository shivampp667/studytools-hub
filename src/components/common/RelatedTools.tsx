import React from 'react';
import { CALCULATORS } from '../../config/calculators';
import { CalculatorCard } from './CalculatorCard';
import { Sparkles } from 'lucide-react';

interface RelatedToolsProps {
  relatedIds: string[];
  currentId: string;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ relatedIds, currentId }) => {
  const relatedCalculators = CALCULATORS.filter(
    (calc) => relatedIds.includes(calc.id) && calc.id !== currentId
  );

  if (relatedCalculators.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-[#E5E8E5] dark:border-[#2A3430]">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
        <h2 className="text-2xl font-bold text-[#171A19] dark:text-[#EAEFEA]">
          Related Calculators & Tools
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedCalculators.slice(0, 3).map((calc) => (
          <CalculatorCard key={calc.id} calculator={calc} />
        ))}
      </div>
    </div>
  );
};
