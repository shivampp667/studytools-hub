import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Send, Info, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Contact Us — StudyTools Hub"
        description="Get in touch with the StudyTools Hub team for suggestions, tool feedback, or bug reports."
        canonicalPath="/contact"
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-[#F8FAFC] tracking-tight mb-3">
            Contact Us
          </h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm leading-relaxed">
            Have a question, feedback, or suggestion for a new calculator tool? Send us a message below.
          </p>
        </div>

        {/* Backend Status Disclaimer */}
        <div className="mb-8 p-4 rounded-xl bg-[#F6F9FC] dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#263244] text-[#64748B] dark:text-[#94A3B8] text-xs sm:text-sm flex items-start gap-3 shadow-xs">
          <Info className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#111827] dark:text-[#F8FAFC]">Backend Status Note:</span> This interface displays the production contact UI. Because StudyTools Hub runs purely client-side without an external mail server, form submissions operate in demo mode until an active email backend (e.g. Formspree or EmailJS) is configured in production deployment.
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-xl p-6 sm:p-8 border border-[#E2E8F0] dark:border-[#263244] shadow-xs">
          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <div className="p-3 rounded-full bg-[#EFF6FF] dark:bg-[#182234] text-[#2563EB] dark:text-[#60A5FA] w-fit mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                Message Preview Recorded
              </h2>
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8] max-w-md mx-auto">
                Thank you for testing the contact form! In a live production environment, your note will be dispatched to site administration.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Your Name"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  placeholder="e.g. sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Input
                label="Subject"
                required
                placeholder="e.g. Calculator Feature Request"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#171A19] dark:text-[#EAEFEA]">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your message or inquiry here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E8E5] dark:border-[#2A3430] bg-white dark:bg-[#181E1C] p-3.5 text-sm text-[#171A19] dark:text-[#EAEFEA] placeholder-[#8C9490] focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:focus:ring-[#3B82F6] focus:border-[#2563EB] dark:focus:border-[#3B82F6] transition-colors"
                />
              </div>

              <Button type="submit" size="lg" icon={<Send className="w-4 h-4" />}>
                Submit Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
