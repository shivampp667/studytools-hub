import React, { useState } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FAQSection } from '../../components/common/FAQSection';
import { WorkedExampleSection } from '../../components/common/WorkedExampleSection';
import { RelatedTools } from '../../components/common/RelatedTools';
import { CALCULATOR_CONTENT } from '../../data/calculatorContent';
import { calculateBMI, CalculationResult, BMIOutput } from '../../utils/calculations';
import { getWebApplicationSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { RotateCcw, AlertTriangle, Activity } from 'lucide-react';

export const BMICalculatorPage: React.FC = () => {
  const content = CALCULATOR_CONTENT['bmi'];
  const [height, setHeight] = useState<string>('175');
  const [weight, setWeight] = useState<string>('70');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'm'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');

  const [result, setResult] = useState<CalculationResult<BMIOutput>>(() =>
    calculateBMI(175, 70, 'cm', 'kg')
  );

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    setResult(calculateBMI(h, w, heightUnit, weightUnit));
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setResult({ isValid: false });
  };

  const webAppSchema = getWebApplicationSchema(
    content.name,
    content.metaDescription,
    content.canonicalPath,
    'Health'
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

        {/* Clear Medical Disclaimer Notice */}
        <div className="mb-8 p-4 rounded-lg bg-[#F7F8F6] dark:bg-[#181E1C] border border-[#E5E8E5] dark:border-[#2A3430] text-[#626966] dark:text-[#A2ABA6] text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#171A19] dark:text-[#EAEFEA]">Medical Disclaimer:</span> Body Mass Index (BMI) is a general population screening measure and is NOT a medical diagnosis or clinical assessment tool. It does not measure body fat percentage directly nor account for muscle density or age. Consult a qualified medical practitioner for health evaluations.
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430] mb-12">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Input
                    label="Height"
                    type="number"
                    step="any"
                    min="1"
                    placeholder="e.g. 175"
                    value={height}
                    onChange={(e) => {
                      setHeight(e.target.value);
                      const h = parseFloat(e.target.value);
                      const w = parseFloat(weight);
                      if (!isNaN(h) && !isNaN(w)) {
                        setResult(calculateBMI(h, w, heightUnit, weightUnit));
                      }
                    }}
                  />
                </div>
                <Select
                  value={heightUnit}
                  onChange={(e) => {
                    const u = e.target.value as 'cm' | 'm';
                    setHeightUnit(u);
                    const h = parseFloat(height);
                    const w = parseFloat(weight);
                    if (!isNaN(h) && !isNaN(w)) {
                      setResult(calculateBMI(h, w, u, weightUnit));
                    }
                  }}
                  options={[
                    { label: 'cm', value: 'cm' },
                    { label: 'meters', value: 'm' },
                  ]}
                  className="w-24"
                />
              </div>

              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Input
                    label="Weight"
                    type="number"
                    step="any"
                    min="1"
                    placeholder="e.g. 70"
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                      const h = parseFloat(height);
                      const w = parseFloat(e.target.value);
                      if (!isNaN(h) && !isNaN(w)) {
                        setResult(calculateBMI(h, w, heightUnit, weightUnit));
                      }
                    }}
                  />
                </div>
                <Select
                  value={weightUnit}
                  onChange={(e) => {
                    const u = e.target.value as 'kg' | 'lbs';
                    setWeightUnit(u);
                    const h = parseFloat(height);
                    const w = parseFloat(weight);
                    if (!isNaN(h) && !isNaN(w)) {
                      setResult(calculateBMI(h, w, heightUnit, u));
                    }
                  }}
                  options={[
                    { label: 'kg', value: 'kg' },
                    { label: 'lbs', value: 'lbs' },
                  ]}
                  className="w-24"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                Calculate BMI
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
            <div className="mt-8 p-6 rounded-xl bg-[#F7F8F6] dark:bg-[#111514] border border-[#E5E8E5] dark:border-[#2A3430] animate-in fade-in">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6]">
                    Your BMI Index
                  </span>
                  <div className="text-4xl sm:text-5xl font-bold text-[#2563EB] dark:text-[#3B82F6] mt-1">
                    {result.data.formattedBMI}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-[#181E1C] border border-[#E5E8E5] dark:border-[#2A3430] text-center min-w-[160px]">
                  <Activity className="w-6 h-6 text-[#2563EB] dark:text-[#3B82F6] mx-auto mb-1" />
                  <span className="text-xs font-medium text-[#626966] dark:text-[#A2ABA6] uppercase">
                    Classification
                  </span>
                  <p className={`text-sm font-semibold mt-0.5 ${result.data.categoryColor}`}>
                    {result.data.category}
                  </p>
                </div>
              </div>

              {/* BMI Spectrum Bar */}
              <div className="mt-6">
                <div className="flex text-xs text-[#626966] dark:text-[#A2ABA6] justify-between mb-1 font-medium">
                  <span>Underweight (&lt;18.5)</span>
                  <span>Normal (18.5-24.9)</span>
                  <span>Overweight (25-29.9)</span>
                  <span>Obese (≥30)</span>
                </div>
                <div className="w-full bg-[#E5E8E5] dark:bg-[#2A3430] rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-amber-400 h-full w-[25%]" />
                  <div className="bg-[#2563EB] dark:bg-[#3B82F6] h-full w-[35%]" />
                  <div className="bg-amber-500 h-full w-[20%]" />
                  <div className="bg-rose-500 h-full w-[20%]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-8 text-[#171A19] dark:text-[#EAEFEA]">
          <section className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430]">
            <h2 className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-3">
              BMI Standard Category Ranges
            </h2>
            <div className="p-3.5 rounded-lg bg-[#F7F8F6] dark:bg-[#111514] font-mono text-sm text-[#2563EB] dark:text-[#3B82F6] border border-[#E5E8E5] dark:border-[#2A3430] mb-3">
              {content.formula}
            </div>
            <p className="text-sm text-[#626966] dark:text-[#A2ABA6] leading-relaxed mb-4">
              {content.formulaDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm text-center">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <span className="font-bold text-amber-700 dark:text-amber-300">Underweight</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">&lt; 18.5</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">Normal</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">18.5 – 24.9</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <span className="font-bold text-amber-700 dark:text-amber-300">Overweight</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">25.0 – 29.9</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="font-bold text-rose-700 dark:text-rose-300">Obese</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">≥ 30.0</p>
              </div>
            </div>
          </section>

          <WorkedExampleSection example={content.workedExample} />
          <FAQSection faqs={content.faqs} />
          <RelatedTools relatedIds={content.relatedCalculatorIds} currentId={content.id} />
        </div>
      </div>
    </>
  );
};
