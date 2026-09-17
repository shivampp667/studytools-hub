import React, { useState } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FAQSection } from '../../components/common/FAQSection';
import { WorkedExampleSection } from '../../components/common/WorkedExampleSection';
import { RelatedTools } from '../../components/common/RelatedTools';
import { CALCULATOR_CONTENT } from '../../data/calculatorContent';
import { calculateProfitLoss, CalculationResult, ProfitLossOutput } from '../../utils/calculations';
import { getWebApplicationSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { RotateCcw, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const ProfitLossCalculatorPage: React.FC = () => {
  const content = CALCULATOR_CONTENT['profit-loss'];
  const [costPrice, setCostPrice] = useState<string>('80');
  const [sellingPrice, setSellingPrice] = useState<string>('100');

  const [result, setResult] = useState<CalculationResult<ProfitLossOutput>>(() =>
    calculateProfitLoss(80, 100)
  );

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);
    setResult(calculateProfitLoss(cp, sp));
  };

  const handleReset = () => {
    setCostPrice('');
    setSellingPrice('');
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

        {/* Form */}
        <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430] mb-12">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Cost Price ($)"
                type="number"
                step="any"
                min="0.01"
                placeholder="e.g. 80.00"
                value={costPrice}
                onChange={(e) => {
                  setCostPrice(e.target.value);
                  const cp = parseFloat(e.target.value);
                  const sp = parseFloat(sellingPrice);
                  if (!isNaN(cp) && !isNaN(sp)) {
                    setResult(calculateProfitLoss(cp, sp));
                  }
                }}
              />
              <Input
                label="Selling Price ($)"
                type="number"
                step="any"
                min="0"
                placeholder="e.g. 100.00"
                value={sellingPrice}
                onChange={(e) => {
                  setSellingPrice(e.target.value);
                  const cp = parseFloat(costPrice);
                  const sp = parseFloat(e.target.value);
                  if (!isNaN(cp) && !isNaN(sp)) {
                    setResult(calculateProfitLoss(cp, sp));
                  }
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                Calculate Profit / Loss
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
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#626966] dark:text-[#A2ABA6]">
                    {result.data.isNeutral ? 'Break-Even Status' : result.data.isProfit ? 'Net Profit' : 'Net Loss'}
                  </span>
                  <div
                    className={`text-3xl sm:text-4xl font-bold mt-1 ${
                      result.data.isNeutral
                        ? 'text-[#171A19] dark:text-[#EAEFEA]'
                        : result.data.isProfit
                        ? 'text-[#2563EB] dark:text-[#3B82F6]'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {result.data.formattedAmount} ({result.data.formattedPercentage})
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-[#181E1C] border border-[#E5E8E5] dark:border-[#2A3430] text-center min-w-[140px]">
                  {result.data.isNeutral ? (
                    <Minus className="w-6 h-6 text-[#8C9490] mx-auto mb-1" />
                  ) : result.data.isProfit ? (
                    <TrendingUp className="w-6 h-6 text-[#2563EB] dark:text-[#3B82F6] mx-auto mb-1" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-rose-500 mx-auto mb-1" />
                  )}
                  <span className="text-xs font-medium text-[#626966] dark:text-[#A2ABA6] uppercase">
                    Result Type
                  </span>
                  <p
                    className={`text-sm font-semibold mt-0.5 ${
                      result.data.isNeutral
                        ? 'text-[#171A19] dark:text-[#EAEFEA]'
                        : result.data.isProfit
                        ? 'text-[#2563EB] dark:text-[#3B82F6]'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {result.data.isNeutral ? 'Break Even' : result.data.isProfit ? 'Profit' : 'Loss'}
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
              Profit & Loss Formulas
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
