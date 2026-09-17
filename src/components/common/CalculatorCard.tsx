import React from 'react';
import { Link } from 'react-router-dom';
import {
  Percent,
  GraduationCap,
  CalendarCheck,
  Award,
  Clock,
  Calculator,
  Tag,
  Activity,
  ArrowLeftRight,
  TrendingUp,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { CalculatorInfo } from '../../types';
import { Badge } from '../ui/Badge';

const iconMap: Record<string, React.ReactNode> = {
  Percent: <Percent className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  CalendarCheck: <CalendarCheck className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Calculator: <Calculator className="w-5 h-5" />,
  Tag: <Tag className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  ArrowLeftRight: <ArrowLeftRight className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
};

interface CalculatorCardProps {
  calculator: CalculatorInfo;
  isFeatured?: boolean;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator, isFeatured = false }) => {
  const icon = iconMap[calculator.iconName] || <Calculator className="w-4 h-4" />;

  return (
    <div
      className={`group relative bg-white dark:bg-[#111827] rounded-xl p-5 border transition-all duration-200 flex flex-col justify-between hover:-translate-y-[3px] hover:shadow-md ${
        isFeatured
          ? 'border-[#2563EB]/40 dark:border-[#60A5FA]/40 shadow-xs'
          : 'border-[#E2E8F0] dark:border-[#263244] hover:border-[#2563EB]/60 dark:hover:border-[#60A5FA]/60'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] dark:bg-[#1e293b] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center border border-[#DBEAFE] dark:border-[#263244] group-hover:scale-105 transition-transform">
            {icon}
          </div>
          <Badge variant="slate">
            {calculator.category}
          </Badge>
        </div>

        <h3 className="text-[15px] font-semibold text-[#111827] dark:text-[#F8FAFC] mb-1.5 group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
          {calculator.name}
        </h3>

        <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-4">
          {calculator.description}
        </p>
      </div>

      <Link
        to={calculator.route}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] pt-3 border-t border-[#E2E8F0] dark:border-[#263244] transition-colors"
      >
        <span>Use calculator</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};
