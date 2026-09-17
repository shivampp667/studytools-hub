import React, { useState } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FAQSection } from '../../components/common/FAQSection';
import { WorkedExampleSection } from '../../components/common/WorkedExampleSection';
import { RelatedTools } from '../../components/common/RelatedTools';
import { CALCULATOR_CONTENT } from '../../data/calculatorContent';
import { calculateAge, CalculationResult, AgeOutput } from '../../utils/calculations';
import { getWebApplicationSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { RotateCcw, Clock, Cake, Calendar } from 'lucide-react';

export const AgeCalculatorPage: React.FC = () => {
  const content = CALCULATOR_CONTENT['age'];
  const todayStr = new Date().toISOString().split('T')[0];
  const [dob, setDob] = useState<string>('2000-03-15');
  const [asOfDate, setAsOfDate] = useState<string>(todayStr);
  const [result, setResult] = useState<CalculationResult<AgeOutput>>(() =>
    calculateAge('2000-03-15', todayStr)
  );

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setResult(calculateAge(dob, asOfDate));
  };

  const handleReset = () => {
    setDob('');
    setAsOfDate(todayStr);
    setResult({ isValid: false });
  };

  const webAppSchema = getWebApplicationSchema(
    content.name,
    content.metaDescription,
    content.canonicalPath,
    'Everyday'
  );
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Calculators', item: '/calculators' },
    { name: content.name, item: content.canonicalPath },
  ]);
  const faqSchema = getFAQSchema(content.faqs);

  return (
    <>
      <SEOHead
        title={content.metaTitle}
        description={content.metaDescription}
        canonicalPath={content.canonicalPath}
        keywords={content.keywords}
        jsonLd={[webAppSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Calculators', path: '/calculators' },
            { label: content.name },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171A19] dark:text-[#EAEFEA] tracking-tight mb-3">
            {content.name}
          </h1>
          <p className="text-base text-[#626966] dark:text-[#A2ABA6] leading-relaxed">
            {content.overview}
          </p>
        </div>

        {/* Age Calculator Form */}
        <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430] mb-12">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Date of Birth"
                type="date"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  if (e.target.value && asOfDate) {
                    setResult(calculateAge(e.target.value, asOfDate));
                  }
                }}
              />
              <Input
                label="Calculate Age As Of Date"
                type="date"
                value={asOfDate}
                onChange={(e) => {
                  setAsOfDate(e.target.value);
                  if (dob && e.target.value) {
                    setResult(calculateAge(dob, e.target.value));
                  }
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                Calculate Age
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleReset}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Reset
              </Button>
            </div>
          </form>

          {/* Results */}
          {result.error && (
            <div className="mt-6 p-4 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-sm font-semibold">
              {result.error}
            </div>
          )}

          {result.isValid && result.data && (
            <div className="mt-8 space-y-6 animate-in fade-in">
              <div className="p-6 rounded-xl bg-[#F7F8F6] dark:bg-[#111514] border border-[#E5E8E5] dark:border-[#2A3430]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6]">
                  Your Exact Age
                </span>
                <div className="text-3xl sm:text-4xl font-bold text-[#2563EB] dark:text-[#3B82F6] mt-1">
                  {result.data.years} Years, {result.data.months} Months, {result.data.days} Days
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-lg bg-white dark:bg-[#111514] border border-[#E5E8E5] dark:border-[#2A3430] flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-[#EFF6FF] dark:bg-[#172554] text-[#2563EB] dark:text-[#3B82F6]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#626966] dark:text-[#A2ABA6] uppercase">Total Lifetime Days</span>
                    <p className="text-lg font-bold text-[#171A19] dark:text-[#EAEFEA]">
                      {result.data.totalDays.toLocaleString()} Days
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-white dark:bg-[#111514] border border-[#E5E8E5] dark:border-[#2A3430] flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-[#EFF6FF] dark:bg-[#172554] text-[#2563EB] dark:text-[#3B82F6]">
                    <Cake className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#626966] dark:text-[#A2ABA6] uppercase">Next Birthday Countdown</span>
                    <p className="text-lg font-bold text-[#171A19] dark:text-[#EAEFEA]">
                      {result.data.nextBirthdayDays} Days ({result.data.nextBirthdayMonths} months)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-8 text-[#171A19] dark:text-[#EAEFEA]">
          <section className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430]">
            <h2 className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-3">
              How Age is Calculated
            </h2>
            <div className="p-3.5 rounded-lg bg-[#F7F8F6] dark:bg-[#111514] font-mono text-sm text-[#2563EB] dark:text-[#3B82F6] border border-[#E5E8E5] dark:border-[#2A3430] mb-3">
              {content.formula}
            </div>
            <p className="text-sm text-[#626966] dark:text-[#A2ABA6] leading-relaxed">
              {content.formulaDescription}
            </p>
          </section>

          <WorkedExampleSection example={content.workedExample} />
          <FAQSection faqs={content.faqs} />
          <RelatedTools relatedIds={content.relatedCalculatorIds} currentId={content.id} />
        </div>
      </div>
    </>
  );
};
