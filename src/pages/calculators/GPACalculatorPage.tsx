import React, { useState } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FAQSection } from '../../components/common/FAQSection';
import { WorkedExampleSection } from '../../components/common/WorkedExampleSection';
import { RelatedTools } from '../../components/common/RelatedTools';
import { CALCULATOR_CONTENT } from '../../data/calculatorContent';
import { calculateGPA, CalculationResult, GPAOutput } from '../../utils/calculations';
import { getWebApplicationSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/seo';
import { SubjectRow } from '../../types';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2, RotateCcw, Award } from 'lucide-react';

export const GPACalculatorPage: React.FC = () => {
  const content = CALCULATOR_CONTENT['gpa'];
  const [subjects, setSubjects] = useState<SubjectRow[]>([
    { id: '1', name: 'Mathematics', credits: 4, gradePoint: 4.0 },
    { id: '2', name: 'Physics Lab', credits: 3, gradePoint: 3.0 },
    { id: '3', name: 'Computer Science', credits: 3, gradePoint: 3.7 },
  ]);

  const getNumericSubjects = (rows: SubjectRow[]) => {
    return rows.map((r) => ({
      credits: typeof r.credits === 'number' ? r.credits : parseFloat(r.credits as string) || 0,
      gradePoint: typeof r.gradePoint === 'number' ? r.gradePoint : parseFloat(r.gradePoint as string) || 0,
    }));
  };

  const [result, setResult] = useState<CalculationResult<GPAOutput>>(() =>
    calculateGPA([
      { credits: 4, gradePoint: 4.0 },
      { credits: 3, gradePoint: 3.0 },
      { credits: 3, gradePoint: 3.7 },
    ])
  );

  const handleAddSubject = () => {
    const newRow: SubjectRow = {
      id: Date.now().toString(),
      name: `Subject #${subjects.length + 1}`,
      credits: 3,
      gradePoint: 3.0,
    };
    const updated = [...subjects, newRow];
    setSubjects(updated);
    setResult(calculateGPA(getNumericSubjects(updated)));
  };

  const handleRemoveSubject = (id: string) => {
    if (subjects.length <= 1) return;
    const updated = subjects.filter((s) => s.id !== id);
    setSubjects(updated);
    setResult(calculateGPA(getNumericSubjects(updated)));
  };

  const handleSubjectChange = (id: string, field: keyof SubjectRow, value: any) => {
    const updated = subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s));
    setSubjects(updated);
    setResult(calculateGPA(getNumericSubjects(updated)));
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setResult(calculateGPA(getNumericSubjects(subjects)));
  };

  const handleReset = () => {
    const defaultRows: SubjectRow[] = [
      { id: '1', name: 'Subject 1', credits: 3, gradePoint: 4.0 },
      { id: '2', name: 'Subject 2', credits: 3, gradePoint: 3.0 },
    ];
    setSubjects(defaultRows);
    setResult(calculateGPA(getNumericSubjects(defaultRows)));
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

        {/* GPA Calculator Widget */}
        <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-8 border border-[#E5E8E5] dark:border-[#2A3430] mb-12">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="space-y-3">
              <div className="hidden sm:grid grid-cols-12 gap-3 text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
                <div className="col-span-5">Subject Name</div>
                <div className="col-span-3">Credits</div>
                <div className="col-span-3">Grade Point (0-4 or 0-10)</div>
                <div className="col-span-1 text-center">Remove</div>
              </div>

              {subjects.map((sub, idx) => (
                <div
                  key={sub.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
                >
                  <div className="col-span-1 sm:col-span-5">
                    <Input
                      placeholder="Course Name"
                      value={sub.name}
                      onChange={(e) => handleSubjectChange(sub.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-3">
                    <Input
                      type="number"
                      step="0.5"
                      min="0.5"
                      placeholder="Credits"
                      value={sub.credits}
                      onChange={(e) =>
                        handleSubjectChange(
                          sub.id,
                          'credits',
                          e.target.value === '' ? '' : parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-3">
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      placeholder="Grade Point"
                      value={sub.gradePoint}
                      onChange={(e) =>
                        handleSubjectChange(
                          sub.id,
                          'gradePoint',
                          e.target.value === '' ? '' : parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="col-span-1 flex justify-end sm:justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(sub.id)}
                      disabled={subjects.length <= 1}
                      className="p-2 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/60 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Remove course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleAddSubject}
                icon={<Plus className="w-4 h-4" />}
              >
                Add Course
              </Button>

              <div className="flex items-center gap-3">
                <Button type="submit" size="md">
                  Calculate GPA
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={handleReset}
                  icon={<RotateCcw className="w-4 h-4" />}
                >
                  Reset
                </Button>
              </div>
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
                    Weighted GPA Result
                  </span>
                  <div className="text-4xl sm:text-5xl font-bold text-[#2563EB] dark:text-[#3B82F6] mt-1">
                    {result.data.formattedGPA}
                  </div>
                  <p className="text-sm text-[#626966] dark:text-[#A2ABA6] mt-1">
                    Calculated across {result.data.totalCredits} total credit hours.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-[#181E1C] border border-[#E5E8E5] dark:border-[#2A3430] text-center min-w-[140px]">
                  <Award className="w-6 h-6 text-[#2563EB] dark:text-[#3B82F6] mx-auto mb-1" />
                  <span className="text-xs font-medium text-[#626966] dark:text-[#A2ABA6] uppercase">
                    Academic Standing
                  </span>
                  <p className="text-sm font-semibold text-[#171A19] dark:text-[#EAEFEA] mt-0.5">
                    {result.data.gpa >= 3.7
                      ? "Dean's List"
                      : result.data.gpa >= 3.0
                      ? 'Good Standing'
                      : result.data.gpa >= 2.0
                      ? 'Satisfactory'
                      : 'Academic Notice'}
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
              GPA Calculation Formula
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
