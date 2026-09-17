import React, { useState } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FAQSection } from '../../components/common/FAQSection';
import { WorkedExampleSection } from '../../components/common/WorkedExampleSection';
import { RelatedTools } from '../../components/common/RelatedTools';
import { CALCULATOR_CONTENT } from '../../data/calculatorContent';
import { calculateCGPA, CalculationResult, CGPAOutput } from '../../utils/calculations';
import { getWebApplicationSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { RotateCcw, AlertTriangle, GraduationCap } from 'lucide-react';

export const CGPACalculatorPage: React.FC = () => {
  const content = CALCULATOR_CONTENT['cgpa'];
  const [cgpa, setCgpa] = useState<string>('8.4');
  const [presetMultiplier, setPresetMultiplier] = useState<string>('9.5');
  const [customMultiplier, setCustomMultiplier] = useState<string>('9.5');
  const [result, setResult] = useState<CalculationResult<CGPAOutput>>(() =>
    calculateCGPA(8.4, 9.5)
  );

  const activeMultiplier =
    presetMultiplier === 'custom' ? parseFloat(customMultiplier) : parseFloat(presetMultiplier);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = parseFloat(cgpa);
    setResult(calculateCGPA(val, activeMultiplier));
  };

  const handleReset = () => {
    setCgpa('');
    setPresetMultiplier('9.5');
    setCustomMultiplier('9.5');
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

        {/* Important Warning Notice */}
        <div className="mb-8 p-4 rounded-lg bg-[#F7F8F6] dark:bg-[#181E1C] border border-[#E5E8E5] dark:border-[#2A3430] text-[#626966] dark:text-[#A2ABA6] text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#171A19] dark:text-[#EAEFEA]">Important University Disclaimer:</span> There is no single universal formula for converting CGPA to percentage. Academic boards and universities use different conversion multipliers (e.g. CBSE uses 9.5, others use 10.0 or custom formula bands). Always consult your official transcript guidelines.
          </div>
        </div>

        {/* Calculator Widget */}
        <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430] mb-12">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Enter CGPA Score (0.0 – 10.0)"
                type="number"
                step="any"
                min="0"
                max="10"
                placeholder="e.g. 8.4"
                value={cgpa}
                onChange={(e) => {
                  setCgpa(e.target.value);
                  const cgpaNum = parseFloat(e.target.value);
                  if (!isNaN(cgpaNum)) {
                    setResult(calculateCGPA(cgpaNum, activeMultiplier));
                  }
                }}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#171A19] dark:text-[#EAEFEA]">
                  Conversion Scale Preset
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '9.5 (CBSE)', val: '9.5' },
                    { label: '10.0 (Standard)', val: '10' },
                    { label: 'Custom', val: 'custom' },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => {
                        setPresetMultiplier(preset.val);
                        const mult = preset.val === 'custom' ? parseFloat(customMultiplier) : parseFloat(preset.val);
                        const cgpaNum = parseFloat(cgpa);
                        if (!isNaN(cgpaNum) && !isNaN(mult)) {
                          setResult(calculateCGPA(cgpaNum, mult));
                        }
                      }}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                        presetMultiplier === preset.val
                          ? 'border-[#2563EB] dark:border-[#3B82F6] bg-[#EFF6FF] dark:bg-[#172554] text-[#2563EB] dark:text-[#3B82F6]'
                          : 'border-[#E5E8E5] dark:border-[#2A3430] bg-white dark:bg-[#181E1C] text-[#626966] dark:text-[#A2ABA6] hover:bg-[#F7F8F6]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {presetMultiplier === 'custom' && (
              <div className="max-w-xs animate-in fade-in">
                <Input
                  label="Custom Multiplier"
                  type="number"
                  step="any"
                  placeholder="e.g. 9.0"
                  value={customMultiplier}
                  onChange={(e) => {
                    setCustomMultiplier(e.target.value);
                    const cgpaNum = parseFloat(cgpa);
                    const multNum = parseFloat(e.target.value);
                    if (!isNaN(cgpaNum) && !isNaN(multNum)) {
                      setResult(calculateCGPA(cgpaNum, multNum));
                    }
                  }}
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                Convert to Percentage
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
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6]">
                    Equivalent Percentage
                  </span>
                  <div className="text-4xl sm:text-5xl font-bold text-[#2563EB] dark:text-[#3B82F6] mt-1">
                    {result.data.formattedPercentage}
                  </div>
                  <p className="text-sm text-[#626966] dark:text-[#A2ABA6] mt-1">
                    CGPA of {result.data.cgpa} × Multiplier {result.data.multiplier}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-[#181E1C] border border-[#E5E8E5] dark:border-[#2A3430] text-center min-w-[140px]">
                  <GraduationCap className="w-6 h-6 text-[#2563EB] dark:text-[#3B82F6] mx-auto mb-1" />
                  <span className="text-xs font-medium text-[#626966] dark:text-[#A2ABA6] uppercase">
                    Grade Performance
                  </span>
                  <p className="text-sm font-semibold text-[#171A19] dark:text-[#EAEFEA] mt-0.5">
                    {result.data.cgpa >= 8.5
                      ? 'Outstanding'
                      : result.data.cgpa >= 7.5
                      ? 'Very Good'
                      : result.data.cgpa >= 6.0
                      ? 'Good'
                      : 'Satisfactory'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-8 text-[#171A19] dark:text-[#EAEFEA]">
          <section className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430]">
            <h2 className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-3">
              How CGPA Conversion Works
            </h2>
            <p className="text-sm text-[#626966] dark:text-[#A2ABA6] leading-relaxed mb-4">
              CGPA represents overall grade average across semester terms. When converting CGPA to a percentage score for job recruitment or higher studies, institutions apply an approved scaling factor.
            </p>

            <h3 className="text-base font-bold text-[#171A19] dark:text-[#EAEFEA] mt-6 mb-2">
              Standard CGPA Formula
            </h3>
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
