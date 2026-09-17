import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Calculator, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <>
      <SEOHead title="Page Not Found (404) — StudyTools Hub" />

      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="p-3 rounded-lg bg-[#EFF6FF] dark:bg-[#172554] text-[#2563EB] dark:text-[#3B82F6] w-fit mx-auto mb-6 border border-[#DBEAFE] dark:border-[#1E3A8A]">
          <Calculator className="w-10 h-10" />
        </div>

        <h1 className="text-5xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-2 tracking-tight">
          404
        </h1>
        <h2 className="text-xl font-semibold text-[#171A19] dark:text-[#EAEFEA] mb-3">
          Page or Calculator Not Found
        </h2>
        <p className="text-sm text-[#626966] dark:text-[#A2ABA6] leading-relaxed mb-8 max-w-md mx-auto">
          The page or route you are looking for might have been moved or does not exist. Explore our full calculator directory below.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <Button size="md" icon={<Home className="w-4 h-4" />}>
              Return to Homepage
            </Button>
          </Link>
          <Link to="/calculators">
            <Button variant="outline" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
              All Calculators Directory
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
