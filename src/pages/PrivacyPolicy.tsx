import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy — StudyTools Hub"
        description="Read the StudyTools Hub Privacy Policy. All calculator calculations and resume builder data remain strictly inside your browser."
        canonicalPath="/privacy-policy"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-[#2563EB] text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#171A19] dark:text-[#EAEFEA] tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-sm text-[#626966] dark:text-[#A2ABA6]">
            Last Updated: September 16, 2026
          </p>
        </div>

        <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 sm:p-10 border border-[#E5E8E5] dark:border-[#2A3430] space-y-8 text-[#626966] dark:text-[#A2ABA6] text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-3">
              1. Our Client-Side Privacy Commitment
            </h2>
            <p>
              At <strong>{SITE_CONFIG.name}</strong>, user privacy is our highest technical priority. All calculations across all tools (Percentage, CGPA, Attendance, GPA, EMI, Age, BMI, Unit Converter, and Profit & Loss) perform 100% locally inside your web browser execution environment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-3">
              2. Interactive Resume Builder Privacy
            </h2>
            <p>
              Information entered into the Interactive Resume Builder (such as your full name, contact information, educational history, skills, and work history) remains strictly saved inside your web browser’s local storage (<em>localStorage</em>).
            </p>
            <p className="mt-2">
              We do not upload, send, record, transmit, or share your resume information to any external server or third-party databases. You retain total ownership of your personal data at all times.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-3">
              3. Analytics & Monetization
            </h2>
            <p>
              In order to keep our calculators free for all users worldwide, {SITE_CONFIG.name} may later utilize privacy-compliant web analytics tools (such as Google Analytics) and legitimate advertising networks (such as Google AdSense). These services may set standard browser cookies to monitor aggregated page view statistics and deliver non-intrusive advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#171A19] dark:text-[#EAEFEA] mb-3">
              4. Security Measures
            </h2>
            <p>
              We enforce HTTPS encryption for all page deliveries and ensure that no sensitive data is passed through URL parameters or unencrypted channels.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
