import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

import { Home } from './pages/Home';
import { CalculatorDirectory } from './pages/CalculatorDirectory';
import { StudentTools } from './pages/StudentTools';
import { CareerTools } from './pages/CareerTools';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfUse } from './pages/TermsOfUse';
import { NotFound } from './pages/NotFound';

import { PercentageCalculatorPage } from './pages/calculators/PercentageCalculatorPage';
import { CGPACalculatorPage } from './pages/calculators/CGPACalculatorPage';
import { AttendanceCalculatorPage } from './pages/calculators/AttendanceCalculatorPage';
import { GPACalculatorPage } from './pages/calculators/GPACalculatorPage';
import { AgeCalculatorPage } from './pages/calculators/AgeCalculatorPage';
import { EMICalculatorPage } from './pages/calculators/EMICalculatorPage';
import { DiscountCalculatorPage } from './pages/calculators/DiscountCalculatorPage';
import { BMICalculatorPage } from './pages/calculators/BMICalculatorPage';
import { UnitConverterPage } from './pages/calculators/UnitConverterPage';
import { ProfitLossCalculatorPage } from './pages/calculators/ProfitLossCalculatorPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="calculators" element={<CalculatorDirectory />} />
        <Route path="calculators/percentage-calculator" element={<PercentageCalculatorPage />} />
        <Route path="calculators/cgpa-calculator" element={<CGPACalculatorPage />} />
        <Route path="calculators/attendance-calculator" element={<AttendanceCalculatorPage />} />
        <Route path="calculators/gpa-calculator" element={<GPACalculatorPage />} />
        <Route path="calculators/age-calculator" element={<AgeCalculatorPage />} />
        <Route path="calculators/emi-calculator" element={<EMICalculatorPage />} />
        <Route path="calculators/discount-calculator" element={<DiscountCalculatorPage />} />
        <Route path="calculators/bmi-calculator" element={<BMICalculatorPage />} />
        <Route path="calculators/unit-converter" element={<UnitConverterPage />} />
        <Route path="calculators/profit-loss-calculator" element={<ProfitLossCalculatorPage />} />
        
        <Route path="student-tools" element={<StudentTools />} />
        <Route path="career-tools" element={<CareerTools />} />
        <Route path="resume-builder" element={<ResumeBuilderPage />} />
        
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsOfUse />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
