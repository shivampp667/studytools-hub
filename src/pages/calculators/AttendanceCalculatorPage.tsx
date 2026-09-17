import React, { useState } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FAQSection } from '../../components/common/FAQSection';
import { WorkedExampleSection } from '../../components/common/WorkedExampleSection';
import { RelatedTools } from '../../components/common/RelatedTools';
import { CALCULATOR_CONTENT } from '../../data/calculatorContent';
import { calculateAttendance, CalculationResult, AttendanceOutput } from '../../utils/calculations';
import { getWebApplicationSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { RotateCcw, CalendarCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const AttendanceCalculatorPage: React.FC = () => {
  const content = CALCULATOR_CONTENT['attendance'];
  const [attended, setAttended] = useState<string>('45');
  const [total, setTotal] = useState<string>('50');
  const [targetPct, setTargetPct] = useState<string>('75');
  const [result, setResult] = useState<CalculationResult<AttendanceOutput>>(() =>
    calculateAttendance(45, 50, 75)
  );

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const att = parseFloat(attended);
    const tot = parseFloat(total);
    const tgt = parseFloat(targetPct);
    setResult(calculateAttendance(att, tot, tgt));
  };

  const handleReset = () => {
    setAttended('');
    setTotal('');
    setTargetPct('75');
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input
                label="Classes Attended"
                type="number"
                min="0"
                placeholder="e.g. 45"
                value={attended}
                onChange={(e) => {
                  setAttended(e.target.value);
                  const att = parseFloat(e.target.value);
                  const tot = parseFloat(total);
                  const tgt = parseFloat(targetPct);
                  if (!isNaN(att) && !isNaN(tot) && !isNaN(tgt)) {
                    setResult(calculateAttendance(att, tot, tgt));
                  }
                }}
              />
              <Input
                label="Total Classes Held"
                type="number"
                min="1"
                placeholder="e.g. 50"
                value={total}
                onChange={(e) => {
                  setTotal(e.target.value);
                  const att = parseFloat(attended);
                  const tot = parseFloat(e.target.value);
                  const tgt = parseFloat(targetPct);
                  if (!isNaN(att) && !isNaN(tot) && !isNaN(tgt)) {
                    setResult(calculateAttendance(att, tot, tgt));
                  }
                }}
              />
              <Input
                label="Target Attendance %"
                type="number"
                min="1"
                max="100"
                placeholder="e.g. 75"
                value={targetPct}
                onChange={(e) => {
                  setTargetPct(e.target.value);
                  const att = parseFloat(attended);
                  const tot = parseFloat(total);
                  const tgt = parseFloat(e.target.value);
                  if (!isNaN(att) && !isNaN(tot) && !isNaN(tgt)) {
                    setResult(calculateAttendance(att, tot, tgt));
                  }
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                Calculate Attendance
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
            <div className="mt-8 p-6 rounded-xl bg-[#F7F8F6] dark:bg-[#111514] border border-[#E5E8E5] dark:border-[#2A3430]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6]">
                    Current Attendance
                  </span>
                  <div className="text-4xl sm:text-5xl font-bold text-[#2563EB] dark:text-[#3B82F6] mt-1">
                    {result.data.formattedCurrentPercentage}
                  </div>
                  <p className="text-sm text-[#626966] dark:text-[#A2ABA6] mt-1">
                    Attended {result.data.attended} of {result.data.total} total classes.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-lg border flex items-start gap-3.5 ${
                    result.data.status === 'above' || result.data.status === 'exact'
                      ? 'bg-[#EFF6FF] dark:bg-[#172554] border-[#DBEAFE] dark:border-[#1E3A8A] text-[#2563EB] dark:text-[#3B82F6]'
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  }`}
                >
                  {result.data.status === 'above' || result.data.status === 'exact' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold text-sm mb-1">
                      {result.data.status === 'above'
                        ? 'Target Attendance Maintained!'
                        : result.data.status === 'exact'
                        ? 'Exactly at Target!'
                        : 'Attendance Below Target'}
                    </h4>
                    <p className="text-xs leading-relaxed">{result.data.message}</p>
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
              Attendance Calculation Formula
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
