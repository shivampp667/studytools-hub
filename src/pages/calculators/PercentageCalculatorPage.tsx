import React, { useState } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FAQSection } from '../../components/common/FAQSection';
import { WorkedExampleSection } from '../../components/common/WorkedExampleSection';
import { RelatedTools } from '../../components/common/RelatedTools';
import { CALCULATOR_CONTENT } from '../../data/calculatorContent';
import { calculatePercentage, CalculationResult, PercentageOutput } from '../../utils/calculations';
import { getWebApplicationSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { RotateCcw, Award, CheckCircle2 } from 'lucide-react';

export const PercentageCalculatorPage: React.FC = () => {
  const content = CALCULATOR_CONTENT['percentage'];
  const [obtainedMarks, setObtainedMarks] = useState<string>('425');
  const [totalMarks, setTotalMarks] = useState<string>('500');
  const [result, setResult] = useState<CalculationResult<PercentageOutput>>(() =>
    calculatePercentage(425, 500)
  );

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const obtained = parseFloat(obtainedMarks);
    const total = parseFloat(totalMarks);
    setResult(calculatePercentage(obtained, total));
  };

  const handleReset = () => {
    setObtainedMarks('');
    setTotalMarks('');
    setResult({ isValid: false });
  };

  const webAppSchema = getWebApplicationSchema(
    content.name,
    content.metaDescription,
    content.canonicalPath,
    'Student'
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

        {/* Page Title & Intro */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171A19] dark:text-[#EAEFEA] tracking-tight mb-3">
            {content.name}
          </h1>
          <p className="text-base text-[#626966] dark:text-[#A2ABA6] leading-relaxed">
            {content.overview}
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430] mb-12">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Marks Obtained"
                type="number"
                step="any"
                placeholder="e.g. 425"
                value={obtainedMarks}
                onChange={(e) => {
                  setObtainedMarks(e.target.value);
                  const obtained = parseFloat(e.target.value);
                  const total = parseFloat(totalMarks);
                  if (!isNaN(obtained) && !isNaN(total)) {
                    setResult(calculatePercentage(obtained, total));
                  }
                }}
              />
              <Input
                label="Total Marks"
                type="number"
                step="any"
                placeholder="e.g. 500"
                value={totalMarks}
                onChange={(e) => {
                  setTotalMarks(e.target.value);
                  const obtained = parseFloat(obtainedMarks);
                  const total = parseFloat(e.target.value);
                  if (!isNaN(obtained) && !isNaN(total)) {
                    setResult(calculatePercentage(obtained, total));
                  }
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                Calculate Percentage
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

          {/* Result Card */}
          {result.error && (
            <div className="mt-6 p-4 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-sm font-semibold">
              {result.error}
            </div>
          )}

          {result.isValid && result.data && (
            <div className="mt-8 p-6 rounded-xl bg-[#F7F8F6] dark:bg-[#111514] border border-[#E5E8E5] dark:border-[#2A3430]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6]">
                    Your Percentage Result
                  </span>
                  <div className="text-4xl sm:text-5xl font-bold text-[#2563EB] dark:text-[#3B82F6] mt-1">
                    {result.data.formattedPercentage}
                  </div>
                  <p className="text-sm text-[#626966] dark:text-[#A2ABA6] mt-1">
                    Scored {obtainedMarks} out of {totalMarks} total marks.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-[#181E1C] border border-[#E5E8E5] dark:border-[#2A3430] text-center min-w-[140px]">
                  <Award className="w-6 h-6 text-[#2563EB] dark:text-[#3B82F6] mx-auto mb-1" />
                  <span className="text-xs font-medium text-[#626966] dark:text-[#A2ABA6] uppercase">
                    Grade Status
                  </span>
                  <p className="text-sm font-semibold text-[#171A19] dark:text-[#EAEFEA] mt-0.5">
                    {result.data.percentage >= 75
                      ? 'Distinction'
                      : result.data.percentage >= 60
                      ? 'First Class'
                      : result.data.percentage >= 40
                      ? 'Pass'
                      : 'Needs Improvement'}
                  </p>
                </div>
              </div>

              {/* Visual Score Bar */}
              <div className="mt-6">
                <div className="w-full bg-[#E5E8E5] dark:bg-[#2A3430] rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#2563EB] dark:bg-[#3B82F6] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(0, result.data.percentage))}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Educational Article Section */}
        <div className="space-y-8 text-[#171A19] dark:text-[#EAEFEA]">
          <section className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430]">
            <h2 className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-3">
              What is Percentage?
            </h2>
            <p className="text-sm text-[#626966] dark:text-[#A2ABA6] leading-relaxed mb-4">
              Percentage is a mathematical ratio used to express numbers as fractions out of 100. The word percentage stems from the Latin phrase <em>per centum</em>, meaning "by the hundred." It provides a universal baseline for comparing test scores across different point totals.
            </p>

            <h3 className="text-base font-bold text-[#171A19] dark:text-[#EAEFEA] mt-6 mb-2">
              Percentage Formula
            </h3>
            <div className="p-3.5 rounded-lg bg-[#F7F8F6] dark:bg-[#111514] font-mono text-sm text-[#2563EB] dark:text-[#3B82F6] border border-[#E5E8E5] dark:border-[#2A3430] mb-3">
              {content.formula}
            </div>
            <p className="text-sm text-[#626966] dark:text-[#A2ABA6] leading-relaxed">
              {content.formulaDescription}
            </p>
          </section>

          {/* Worked Example */}
          <WorkedExampleSection example={content.workedExample} />

          {/* FAQs */}
          <FAQSection faqs={content.faqs} />

          {/* Related Tools */}
          <RelatedTools relatedIds={content.relatedCalculatorIds} currentId={content.id} />
        </div>
      </div>
    </>
  );
};
