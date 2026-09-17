import React, { useState } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FAQSection } from '../../components/common/FAQSection';
import { WorkedExampleSection } from '../../components/common/WorkedExampleSection';
import { RelatedTools } from '../../components/common/RelatedTools';
import { CALCULATOR_CONTENT } from '../../data/calculatorContent';
import { convertUnit, CalculationResult } from '../../utils/calculations';
import { getWebApplicationSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { ArrowLeftRight, RotateCcw } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'time';

const CATEGORY_UNITS: Record<UnitCategory, { value: string; label: string }[]> = {
  length: [
    { value: 'mm', label: 'Millimeters (mm)' },
    { value: 'cm', label: 'Centimeters (cm)' },
    { value: 'm', label: 'Meters (m)' },
    { value: 'km', label: 'Kilometers (km)' },
    { value: 'inch', label: 'Inches (in)' },
    { value: 'feet', label: 'Feet (ft)' },
    { value: 'yard', label: 'Yards (yd)' },
    { value: 'mile', label: 'Miles (mi)' },
  ],
  weight: [
    { value: 'mg', label: 'Milligrams (mg)' },
    { value: 'g', label: 'Grams (g)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'ounce', label: 'Ounces (oz)' },
    { value: 'pound', label: 'Pounds (lbs)' },
  ],
  temperature: [
    { value: 'Celsius', label: 'Celsius (°C)' },
    { value: 'Fahrenheit', label: 'Fahrenheit (°F)' },
    { value: 'Kelvin', label: 'Kelvin (K)' },
  ],
  time: [
    { value: 'seconds', label: 'Seconds (s)' },
    { value: 'minutes', label: 'Minutes (min)' },
    { value: 'hours', label: 'Hours (hr)' },
    { value: 'days', label: 'Days (d)' },
  ],
};

export const UnitConverterPage: React.FC = () => {
  const content = CALCULATOR_CONTENT['unit-converter'];
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('km');
  const [toUnit, setToUnit] = useState<string>('mile');
  const [inputValue, setInputValue] = useState<string>('5');

  const [result, setResult] = useState<CalculationResult<number>>(() =>
    convertUnit(5, 'length', 'km', 'mile')
  );

  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const firstUnit = CATEGORY_UNITS[newCat][0].value;
    const secondUnit = CATEGORY_UNITS[newCat][1].value;
    setFromUnit(firstUnit);
    setToUnit(secondUnit);
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      setResult(convertUnit(val, newCat, firstUnit, secondUnit));
    }
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      setResult(convertUnit(val, category, toUnit, temp));
    }
  };

  const handleReset = () => {
    setInputValue('');
    setResult({ isValid: false });
  };

  const webAppSchema = getWebApplicationSchema(
    content.name,
    content.metaDescription,
    content.canonicalPath,
    'Math'
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

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6">
          {(['length', 'weight', 'temperature', 'time'] as UnitCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors shrink-0 ${
                category === cat
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white dark:bg-[#181E1C] text-[#626966] dark:text-[#A2ABA6] hover:bg-[#F7F8F6] dark:hover:bg-[#172554] border border-[#E5E8E5] dark:border-[#2A3430]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Converter Card */}
        <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430] mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-5 space-y-3">
              <Select
                label="From Unit"
                value={fromUnit}
                onChange={(e) => {
                  setFromUnit(e.target.value);
                  const val = parseFloat(inputValue);
                  if (!isNaN(val)) {
                    setResult(convertUnit(val, category, e.target.value, toUnit));
                  }
                }}
                options={CATEGORY_UNITS[category]}
              />
              <Input
                label="Enter Value"
                type="number"
                step="any"
                placeholder="Enter number..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) {
                    setResult(convertUnit(val, category, fromUnit, toUnit));
                  }
                }}
              />
            </div>

            <div className="sm:col-span-2 flex justify-center pt-4 sm:pt-0">
              <button
                onClick={handleSwap}
                className="p-2.5 rounded-lg bg-[#EFF6FF] dark:bg-[#172554] text-[#2563EB] dark:text-[#3B82F6] hover:bg-[#2563EB] hover:text-white transition-all border border-[#DBEAFE] dark:border-[#1E3A8A]"
                title="Swap Units"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            <div className="sm:col-span-5 space-y-3">
              <Select
                label="To Unit"
                value={toUnit}
                onChange={(e) => {
                  setToUnit(e.target.value);
                  const val = parseFloat(inputValue);
                  if (!isNaN(val)) {
                    setResult(convertUnit(val, category, fromUnit, e.target.value));
                  }
                }}
                options={CATEGORY_UNITS[category]}
              />
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#171A19] dark:text-[#EAEFEA]">
                  Converted Result
                </label>
                <div className="w-full rounded-lg border border-[#E5E8E5] dark:border-[#2A3430] bg-[#F7F8F6] dark:bg-[#111514] px-4 py-2.5 text-base font-bold text-[#2563EB] dark:text-[#3B82F6]">
                  {result.isValid && typeof result.data === 'number'
                    ? `${result.data.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${toUnit}`
                    : '---'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleReset}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 text-[#171A19] dark:text-[#EAEFEA]">
          <section className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430]">
            <h2 className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-3">
              Unit Conversion Logic
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
