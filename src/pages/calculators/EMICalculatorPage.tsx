import React, { useState } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FAQSection } from '../../components/common/FAQSection';
import { WorkedExampleSection } from '../../components/common/WorkedExampleSection';
import { RelatedTools } from '../../components/common/RelatedTools';
import { CALCULATOR_CONTENT } from '../../data/calculatorContent';
import { calculateEMI, CalculationResult, EMIOutput } from '../../utils/calculations';
import { getWebApplicationSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { RotateCcw, Calculator, Info } from 'lucide-react';

export const EMICalculatorPage: React.FC = () => {
  const content = CALCULATOR_CONTENT['emi'];
  const [principal, setPrincipal] = useState<string>('10000');
  const [rate, setRate] = useState<string>('8');
  const [tenure, setTenure] = useState<string>('2');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

  const [result, setResult] = useState<CalculationResult<EMIOutput>>(() =>
    calculateEMI(10000, 8, 2, 'years')
  );

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(tenure);
    setResult(calculateEMI(p, r, t, tenureType));
  };

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTenure('');
    setTenureType('years');
    setResult({ isValid: false });
  };

  const webAppSchema = getWebApplicationSchema(
    content.name,
    content.metaDescription,
    content.canonicalPath,
    'Finance'
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

        {/* Disclaimer Notice */}
        <div className="mb-6 p-4 rounded-lg bg-[#F7F8F6] dark:bg-[#181E1C] border border-[#E5E8E5] dark:border-[#2A3430] text-[#626966] dark:text-[#A2ABA6] text-xs sm:text-sm flex items-start gap-3">
          <Info className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#171A19] dark:text-[#EAEFEA]">Informational Estimate Notice:</span> Calculated EMI amounts and interest totals are estimates. Actual loan repayment figures may vary slightly depending on bank processing schedules and tax fees.
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430] mb-12">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input
                label="Loan Amount ($)"
                type="number"
                min="1"
                placeholder="e.g. 10000"
                value={principal}
                onChange={(e) => {
                  setPrincipal(e.target.value);
                  const p = parseFloat(e.target.value);
                  const r = parseFloat(rate);
                  const t = parseFloat(tenure);
                  if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
                    setResult(calculateEMI(p, r, t, tenureType));
                  }
                }}
              />

              <Input
                label="Annual Interest Rate (%)"
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g. 8.0"
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                  const p = parseFloat(principal);
                  const r = parseFloat(e.target.value);
                  const t = parseFloat(tenure);
                  if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
                    setResult(calculateEMI(p, r, t, tenureType));
                  }
                }}
              />

              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Input
                    label="Loan Tenure"
                    type="number"
                    min="1"
                    placeholder="e.g. 2"
                    value={tenure}
                    onChange={(e) => {
                      setTenure(e.target.value);
                      const p = parseFloat(principal);
                      const r = parseFloat(rate);
                      const t = parseFloat(e.target.value);
                      if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
                        setResult(calculateEMI(p, r, t, tenureType));
                      }
                    }}
                  />
                </div>
                <Select
                  value={tenureType}
                  onChange={(e) => {
                    const newType = e.target.value as 'years' | 'months';
                    setTenureType(newType);
                    const p = parseFloat(principal);
                    const r = parseFloat(rate);
                    const t = parseFloat(tenure);
                    if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
                      setResult(calculateEMI(p, r, t, newType));
                    }
                  }}
                  options={[
                    { label: 'Years', value: 'years' },
                    { label: 'Months', value: 'months' },
                  ]}
                  className="w-28"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                Calculate EMI
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
                  Estimated Monthly EMI
                </span>
                <div className="text-3xl sm:text-4xl font-bold text-[#2563EB] dark:text-[#3B82F6] mt-1">
                  {result.data.formattedEMI}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-lg bg-white dark:bg-[#111514] border border-[#E5E8E5] dark:border-[#2A3430]">
                  <span className="text-xs font-medium text-[#626966] dark:text-[#A2ABA6] uppercase">Total Interest Payable</span>
                  <p className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mt-1">
                    {result.data.formattedTotalInterest}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white dark:bg-[#111514] border border-[#E5E8E5] dark:border-[#2A3430]">
                  <span className="text-xs font-medium text-[#626966] dark:text-[#A2ABA6] uppercase">Total Payment (Principal + Interest)</span>
                  <p className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mt-1">
                    {result.data.formattedTotalPayment}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-8 text-[#171A19] dark:text-[#EAEFEA]">
          <section className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430]">
            <h2 className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-3">
              EMI Calculation Formula
            </h2>
            <div className="p-3.5 rounded-lg bg-[#F7F8F6] dark:bg-[#111514] font-mono text-sm text-[#2563EB] dark:text-[#3B82F6] border border-[#E5E8E5] dark:border-[#2A3430] mb-3 whitespace-pre-line">
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
