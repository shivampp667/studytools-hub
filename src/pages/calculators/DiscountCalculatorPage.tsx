import React, { useState } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FAQSection } from '../../components/common/FAQSection';
import { WorkedExampleSection } from '../../components/common/WorkedExampleSection';
import { RelatedTools } from '../../components/common/RelatedTools';
import { CALCULATOR_CONTENT } from '../../data/calculatorContent';
import { calculateDiscount, CalculationResult, DiscountOutput } from '../../utils/calculations';
import { getWebApplicationSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { RotateCcw, Tag } from 'lucide-react';

export const DiscountCalculatorPage: React.FC = () => {
  const content = CALCULATOR_CONTENT['discount'];
  const [originalPrice, setOriginalPrice] = useState<string>('120');
  const [discountPct, setDiscountPct] = useState<string>('25');

  const [result, setResult] = useState<CalculationResult<DiscountOutput>>(() =>
    calculateDiscount(120, 25)
  );

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const p = parseFloat(originalPrice);
    const d = parseFloat(discountPct);
    setResult(calculateDiscount(p, d));
  };

  const handleReset = () => {
    setOriginalPrice('');
    setDiscountPct('');
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

        {/* Discount Form */}
        <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430] mb-12">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Original Price ($)"
                type="number"
                step="any"
                min="0"
                placeholder="e.g. 120.00"
                value={originalPrice}
                onChange={(e) => {
                  setOriginalPrice(e.target.value);
                  const p = parseFloat(e.target.value);
                  const d = parseFloat(discountPct);
                  if (!isNaN(p) && !isNaN(d)) {
                    setResult(calculateDiscount(p, d));
                  }
                }}
              />
              <Input
                label="Discount Percentage (%)"
                type="number"
                step="any"
                min="0"
                max="100"
                placeholder="e.g. 25"
                value={discountPct}
                onChange={(e) => {
                  setDiscountPct(e.target.value);
                  const p = parseFloat(originalPrice);
                  const d = parseFloat(e.target.value);
                  if (!isNaN(p) && !isNaN(d)) {
                    setResult(calculateDiscount(p, d));
                  }
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                Calculate Discount
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
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in">
              <div className="p-6 rounded-xl bg-[#F7F8F6] dark:bg-[#111514] border border-[#E5E8E5] dark:border-[#2A3430]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6]">
                  You Save (Discount Amount)
                </span>
                <div className="text-3xl sm:text-4xl font-bold text-[#2563EB] dark:text-[#3B82F6] mt-1">
                  {result.data.formattedDiscountAmount}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#F7F8F6] dark:bg-[#111514] border border-[#E5E8E5] dark:border-[#2A3430]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#171A19] dark:text-[#EAEFEA]">
                  Final Price To Pay
                </span>
                <div className="text-3xl sm:text-4xl font-bold text-[#171A19] dark:text-[#EAEFEA] mt-1">
                  {result.data.formattedFinalPrice}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="space-y-8 text-[#171A19] dark:text-[#EAEFEA]">
          <section className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430]">
            <h2 className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-3">
              Discount Formula
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
