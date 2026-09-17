import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Calculator, FileText, Briefcase } from 'lucide-react';
import { CALCULATORS } from '../../config/calculators';
import { Badge } from '../ui/Badge';

interface SearchItem {
  id: string;
  name: string;
  description: string;
  category: string;
  route: string;
  iconType: 'calculator' | 'resume' | 'career';
}

const ALL_SEARCH_ITEMS: SearchItem[] = [
  ...CALCULATORS.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description,
    category: c.category,
    route: c.route,
    iconType: 'calculator' as const,
  })),
  {
    id: 'resume-builder',
    name: 'Interactive Resume Builder',
    description: 'Build ATS-friendly resumes, add education, skills, experience, and export as PDF.',
    category: 'Career',
    route: '/resume-builder',
    iconType: 'resume',
  },
  {
    id: 'career-tools',
    name: 'Career Tools Portal',
    description: 'Explore tools for interview prep, resume design, and job application readiness.',
    category: 'Career',
    route: '/career-tools',
    iconType: 'career',
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredItems = ALL_SEARCH_ITEMS.filter((item) => {
    const q = query.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q)
    );
  });

  const handleSelect = (route: string) => {
    onClose();
    navigate(route);
  };

  const renderIcon = (type: SearchItem['iconType']) => {
    if (type === 'resume') return <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    if (type === 'career') return <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    return <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-[#E2E8F0] dark:border-[#263244] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#E2E8F0] dark:border-[#263244]">
          <Search className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators and tools (e.g. CGPA, Resume, Attendance, EMI)..."
            className="w-full bg-transparent text-[#111827] dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none text-sm sm:text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-[#111827] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs font-semibold text-slate-500 bg-[#F6F9FC] dark:bg-[#182234] rounded-lg hover:bg-slate-200 dark:hover:bg-[#202736] border border-[#E2E8F0] dark:border-[#263244]"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 sm:p-4 overflow-y-auto flex-1">
          {filteredItems.length > 0 ? (
            <div className="space-y-1.5">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.route)}
                  className="w-full text-left p-3 rounded-xl hover:bg-[#EFF6FF]/70 dark:hover:bg-[#182234] border border-transparent hover:border-[#DBEAFE] dark:hover:border-[#263244] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#EFF6FF] dark:bg-[#0B1120] text-[#2563EB] dark:text-[#60A5FA] mt-0.5 border border-[#DBEAFE]/70 dark:border-[#263244]">
                      {renderIcon(item.iconType)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#111827] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                          {item.name}
                        </span>
                        <Badge variant="blue">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Calculator className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-base font-bold text-[#111827] dark:text-slate-300">
                No calculators or tools found
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Try searching for "resume", "percentage", "cgpa", "attendance", or "gpa".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
