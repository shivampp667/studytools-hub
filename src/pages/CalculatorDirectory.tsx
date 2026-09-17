import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { CALCULATORS } from '../config/calculators';
import { Search, Calculator } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const CalculatorDirectory: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Student', 'Finance', 'Math', 'Health', 'Everyday'];

  const filteredCalculators = CALCULATORS.filter((calc) => {
    const q = query.toLowerCase().trim();
    const matchesSearch =
      calc.name.toLowerCase().includes(q) ||
      calc.description.toLowerCase().includes(q) ||
      calc.slug.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'All' || calc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead
        title="All Calculators Directory — Free Online Calculator Tools"
        description="Browse our complete directory of free online calculators for students, finance, health, unit conversions, and math."
        canonicalPath="/calculators"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Calculators' }]} />

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-[#F8FAFC] tracking-tight mb-3">
            Calculator Directory
          </h1>
          <p className="text-base text-[#64748B] dark:text-[#94A3B8] max-w-2xl">
            Explore our full suite of client-side online calculators. Designed for precision, privacy, and speed.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-[#64748B] dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculator name or category..."
              className="w-full rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-white dark:bg-[#111827] pl-10 pr-4 py-2.5 text-sm text-[#111827] dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] dark:focus:border-[#60A5FA] transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white dark:bg-[#111827] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F6F9FC] dark:hover:bg-[#182234] border border-[#E2E8F0] dark:border-[#263244]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calc) => (
              <CalculatorCard key={calc.id} calculator={calc} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-[#111827] rounded-xl border border-[#E2E8F0] dark:border-[#263244]">
            <Calculator className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#111827] dark:text-[#F8FAFC]">
              No Calculators Found
            </h3>
            <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
              Try modifying your search keywords or switching category filters.
            </p>
            <Button
              className="mt-4"
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery('');
                setSelectedCategory('All');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
