import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ResumeData, ResumeEducation, ResumeExperience, ResumeProject, ResumeCertification } from '../types';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import {
  Printer,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  User,
  GraduationCap,
  Briefcase,
  Code,
  Award,
} from 'lucide-react';

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '+1 (555) 019-2834',
    location: 'New York, NY',
    linkedIn: 'linkedin.com/in/alexmorgan',
    portfolio: 'alexmorgan.dev',
    summary:
      'Motivated Computer Science graduate with strong foundational knowledge in web technologies, data structures, and client-side web software engineering.',
  },
  education: [
    {
      id: 'ed-1',
      degree: 'B.S. in Computer Science',
      institution: 'State University of Technology',
      startYear: '2020',
      endYear: '2024',
      description: 'Graduated with 3.8/4.0 GPA. Relevant coursework: Data Structures, Algorithms, Web Development.',
    },
  ],
  skills: ['TypeScript', 'React.js', 'Node.js', 'Tailwind CSS', 'Git & GitHub', 'SQL', 'REST APIs'],
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'Software Engineering Intern',
      company: 'TechCorp Solutions',
      startDate: 'Jun 2023',
      endDate: 'Aug 2023',
      description: 'Developed responsive frontend UI components using React and TypeScript. Improved page loading speeds by 25%.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'StudyTools Hub',
      technologies: 'React, TypeScript, Tailwind CSS, Vite',
      description: 'Built a responsive suite of client-side academic calculators and career tools with full privacy controls.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      date: '2024',
    },
  ],
};

export const ResumeBuilderPage: React.FC = () => {
  const [resume, setResume] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('studytools-resume');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultResumeData;
      }
    }
    return defaultResumeData;
  });

  const [newSkill, setNewSkill] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  useEffect(() => {
    localStorage.setItem('studytools-resume', JSON.stringify(resume));
  }, [resume]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setResume(defaultResumeData);
    localStorage.removeItem('studytools-resume');
  };

  // Helper updaters
  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  // Education handlers
  const addEducation = () => {
    const newEd: ResumeEducation = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
      description: '',
    };
    setResume((prev) => ({ ...prev, education: [...prev.education, newEd] }));
  };

  const updateEducation = (id: string, field: keyof ResumeEducation, value: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const removeEducation = (id: string) => {
    setResume((prev) => ({ ...prev, education: prev.education.filter((item) => item.id !== id) }));
  };

  // Skill handlers
  const addSkill = () => {
    if (!newSkill.trim()) return;
    setResume((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill('');
  };

  const removeSkill = (index: number) => {
    setResume((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: ResumeExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setResume((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id: string, field: keyof ResumeExperience, value: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const removeExperience = (id: string) => {
    setResume((prev) => ({ ...prev, experience: prev.experience.filter((item) => item.id !== id) }));
  };

  // Project handlers
  const addProject = () => {
    const newProj: ResumeProject = {
      id: Date.now().toString(),
      name: '',
      technologies: '',
      description: '',
    };
    setResume((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const updateProject = (id: string, field: keyof ResumeProject, value: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const removeProject = (id: string) => {
    setResume((prev) => ({ ...prev, projects: prev.projects.filter((item) => item.id !== id) }));
  };

  // Certification handlers
  const addCertification = () => {
    const newCert: ResumeCertification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
    };
    setResume((prev) => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const updateCertification = (id: string, field: keyof ResumeCertification, value: string) => {
    setResume((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const removeCertification = (id: string) => {
    setResume((prev) => ({ ...prev, certifications: prev.certifications.filter((item) => item.id !== id) }));
  };

  return (
    <>
      <SEOHead
        title="Free Resume Builder — Print to PDF | StudyTools Hub"
        description="Build an ATS-friendly resume online for free. Live preview, customizable sections, instant browser print PDF export, and 100% client-side privacy."
        canonicalPath="/resume-builder"
      />

      {/* Screen View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:hidden">
        <Breadcrumbs
          items={[
            { label: 'Career Tools', path: '/career-tools' },
            { label: 'Resume Builder' },
          ]}
        />

        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive Resume Builder
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 inline" />
              <span>100% Private. Resume data is stored locally in your browser only.</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={handleReset}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Reset Sample Data
            </Button>
            <Button
              size="md"
              onClick={handlePrint}
              icon={<Printer className="w-4 h-4" />}
            >
              Print / Save as PDF
            </Button>
          </div>
        </div>

        {/* Mobile Tab Toggle */}
        <div className="flex lg:hidden mb-6 bg-[#F7F8F6] dark:bg-[#181E1C] p-1 rounded-lg border border-[#E5E8E5] dark:border-[#2A3430]">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'form' ? 'bg-white dark:bg-[#111514] text-[#2563EB] dark:text-[#3B82F6] shadow-sm' : 'text-[#626966] dark:text-[#A2ABA6]'
            }`}
          >
            Edit Resume Form
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'preview' ? 'bg-white dark:bg-[#111514] text-[#2563EB] dark:text-[#3B82F6] shadow-sm' : 'text-[#626966] dark:text-[#A2ABA6]'
            }`}
          >
            Live Document Preview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Editor */}
          <div className={`lg:col-span-6 space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            {/* 1. Personal Information */}
            <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 border border-[#E5E8E5] dark:border-[#2A3430]">
              <div className="flex items-center gap-2 mb-4 text-[#171A19] dark:text-[#EAEFEA] font-bold text-base">
                <User className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Personal Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={resume.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={resume.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                />
                <Input
                  label="Phone Number"
                  value={resume.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                />
                <Input
                  label="Location (City, State)"
                  value={resume.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                />
                <Input
                  label="LinkedIn Profile URL"
                  value={resume.personalInfo.linkedIn}
                  onChange={(e) => updatePersonalInfo('linkedIn', e.target.value)}
                />
                <Input
                  label="Portfolio / Website URL"
                  value={resume.personalInfo.portfolio}
                  onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-[#171A19] dark:text-[#EAEFEA] mb-1.5">
                  Professional Summary
                </label>
                <textarea
                  rows={3}
                  value={resume.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                  className="w-full rounded-lg border border-[#E5E8E5] dark:border-[#2A3430] bg-white dark:bg-[#181E1C] p-3 text-sm text-[#171A19] dark:text-[#EAEFEA] placeholder-[#8C9490] focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:focus:ring-[#3B82F6] focus:border-[#2563EB] dark:focus:border-[#3B82F6] transition-colors"
                  placeholder="Briefly state your qualifications and career goals..."
                />
              </div>
            </div>

            {/* 2. Education */}
            <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 border border-[#E5E8E5] dark:border-[#2A3430]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#171A19] dark:text-[#EAEFEA] font-bold text-base">
                  <GraduationCap className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                  <span>Education</span>
                </div>
                <Button size="sm" variant="outline" onClick={addEducation} icon={<Plus className="w-4 h-4" />}>
                  Add Degree
                </Button>
              </div>

              <div className="space-y-4">
                {resume.education.map((ed) => (
                  <div key={ed.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 relative">
                    <button
                      onClick={() => removeEducation(ed.id)}
                      className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                      <Input
                        label="Degree / Major"
                        value={ed.degree}
                        onChange={(e) => updateEducation(ed.id, 'degree', e.target.value)}
                      />
                      <Input
                        label="Institution"
                        value={ed.institution}
                        onChange={(e) => updateEducation(ed.id, 'institution', e.target.value)}
                      />
                      <Input
                        label="Start Year"
                        value={ed.startYear}
                        onChange={(e) => updateEducation(ed.id, 'startYear', e.target.value)}
                      />
                      <Input
                        label="End Year / Expected"
                        value={ed.endYear}
                        onChange={(e) => updateEducation(ed.id, 'endYear', e.target.value)}
                      />
                    </div>
                    <div>
                      <Input
                        label="Details / Achievements"
                        value={ed.description}
                        onChange={(e) => updateEducation(ed.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Skills */}
            <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 border border-[#E5E8E5] dark:border-[#2A3430]">
              <div className="flex items-center gap-2 mb-4 text-[#171A19] dark:text-[#EAEFEA] font-bold text-base">
                <Code className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Skills & Competencies</span>
              </div>

              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Add skill (e.g. Python, Financial Modeling)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button onClick={addSkill} icon={<Plus className="w-4 h-4" />}>
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#EFF6FF] dark:bg-[#172554] text-[#2563EB] dark:text-[#3B82F6] border border-[#DBEAFE] dark:border-[#1E3A8A]"
                  >
                    {skill}
                    <button onClick={() => removeSkill(index)} className="hover:text-rose-500">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Experience */}
            <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 border border-[#E5E8E5] dark:border-[#2A3430]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#171A19] dark:text-[#EAEFEA] font-bold text-base">
                  <Briefcase className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                  <span>Work Experience</span>
                </div>
                <Button size="sm" variant="outline" onClick={addExperience} icon={<Plus className="w-4 h-4" />}>
                  Add Experience
                </Button>
              </div>

              <div className="space-y-4">
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-lg border border-[#E5E8E5] dark:border-[#2A3430] space-y-3 relative">
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                      <Input
                        label="Job Title"
                        value={exp.jobTitle}
                        onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                      />
                      <Input
                        label="Company / Organization"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      />
                      <Input
                        label="Start Date"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      />
                      <Input
                        label="End Date"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Input
                        label="Responsibilities / Achievements"
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Projects */}
            <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 border border-[#E5E8E5] dark:border-[#2A3430]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#171A19] dark:text-[#EAEFEA] font-bold text-base">
                  <Sparkles className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                  <span>Key Projects</span>
                </div>
                <Button size="sm" variant="outline" onClick={addProject} icon={<Plus className="w-4 h-4" />}>
                  Add Project
                </Button>
              </div>

              <div className="space-y-4">
                {resume.projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-lg border border-[#E5E8E5] dark:border-[#2A3430] space-y-3 relative">
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                      <Input
                        label="Project Name"
                        value={proj.name}
                        onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      />
                      <Input
                        label="Technologies Used"
                        value={proj.technologies}
                        onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                      />
                    </div>
                    <div>
                      <Input
                        label="Description"
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Certifications */}
            <div className="bg-white dark:bg-[#181E1C] rounded-xl p-6 border border-[#E5E8E5] dark:border-[#2A3430]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#171A19] dark:text-[#EAEFEA] font-bold text-base">
                  <Award className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                  <span>Certifications</span>
                </div>
                <Button size="sm" variant="outline" onClick={addCertification} icon={<Plus className="w-4 h-4" />}>
                  Add Certification
                </Button>
              </div>

              <div className="space-y-4">
                {resume.certifications.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-lg border border-[#E5E8E5] dark:border-[#2A3430] space-y-3 relative">
                    <button
                      onClick={() => removeCertification(cert.id)}
                      className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-8">
                      <Input
                        label="Certification Name"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                      />
                      <Input
                        label="Issuer"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                      />
                      <Input
                        label="Year / Date"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live PDF Document Preview */}
          <div className={`lg:col-span-6 ${activeTab === 'form' ? 'hidden lg:block' : 'block'}`}>
            <div className="sticky top-20 bg-slate-200 dark:bg-slate-800 p-4 sm:p-6 rounded-3xl border border-slate-300 dark:border-slate-700 shadow-inner">
              <div className="flex items-center justify-between mb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Live Document Preview</span>
                <span className="text-emerald-600 dark:text-emerald-400">Ready to Print</span>
              </div>

              {/* White Resume Page Paper */}
              <div className="bg-white text-slate-900 p-8 rounded-lg shadow-2xl min-h-[750px] font-sans text-xs leading-relaxed max-w-full overflow-hidden border border-slate-200">
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-4 mb-4 text-center">
                  <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-900 mb-1">
                    {resume.personalInfo.fullName || 'Your Full Name'}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-600">
                    {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
                    {resume.personalInfo.phone && <span>• {resume.personalInfo.phone}</span>}
                    {resume.personalInfo.location && <span>• {resume.personalInfo.location}</span>}
                    {resume.personalInfo.linkedIn && <span>• {resume.personalInfo.linkedIn}</span>}
                    {resume.personalInfo.portfolio && <span>• {resume.personalInfo.portfolio}</span>}
                  </div>
                </div>

                {/* Summary */}
                {resume.personalInfo.summary && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                      Professional Summary
                    </h2>
                    <p className="text-slate-700">{resume.personalInfo.summary}</p>
                  </div>
                )}

                {/* Education */}
                {resume.education.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                      Education
                    </h2>
                    <div className="space-y-2">
                      {resume.education.map((ed) => (
                        <div key={ed.id}>
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span>{ed.degree} — {ed.institution}</span>
                            <span className="text-[10px] text-slate-500 font-normal">
                              {ed.startYear} – {ed.endYear}
                            </span>
                          </div>
                          {ed.description && <p className="text-slate-600 mt-0.5">{ed.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {resume.skills.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                      Technical & Core Skills
                    </h2>
                    <p className="text-slate-800 font-medium">
                      {resume.skills.join(' • ')}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {resume.experience.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                      Work Experience
                    </h2>
                    <div className="space-y-3">
                      {resume.experience.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span>{exp.jobTitle} | {exp.company}</span>
                            <span className="text-[10px] text-slate-500 font-normal">
                              {exp.startDate} – {exp.endDate}
                            </span>
                          </div>
                          {exp.description && <p className="text-slate-700 mt-1 leading-normal">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {resume.projects.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                      Key Projects
                    </h2>
                    <div className="space-y-2">
                      {resume.projects.map((proj) => (
                        <div key={proj.id}>
                          <div className="font-bold text-slate-900">
                            {proj.name} {proj.technologies && <span className="font-normal text-slate-600">({proj.technologies})</span>}
                          </div>
                          {proj.description && <p className="text-slate-700">{proj.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {resume.certifications.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                      Certifications
                    </h2>
                    <div className="space-y-1">
                      {resume.certifications.map((cert) => (
                        <div key={cert.id} className="flex justify-between text-slate-800">
                          <span><strong>{cert.name}</strong> — {cert.issuer}</span>
                          <span className="text-slate-500 text-[10px]">{cert.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Sheet View (Visible Only During Browser Print) */}
      <div className="hidden print:block font-sans text-slate-900 p-6 leading-relaxed">
        <div className="border-b-2 border-slate-900 pb-3 mb-4 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">
            {resume.personalInfo.fullName}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-3 text-xs text-slate-700">
            {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo.phone && <span>• {resume.personalInfo.phone}</span>}
            {resume.personalInfo.location && <span>• {resume.personalInfo.location}</span>}
            {resume.personalInfo.linkedIn && <span>• {resume.personalInfo.linkedIn}</span>}
            {resume.personalInfo.portfolio && <span>• {resume.personalInfo.portfolio}</span>}
          </div>
        </div>

        {resume.personalInfo.summary && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1">
              Summary
            </h2>
            <p className="text-xs text-slate-800">{resume.personalInfo.summary}</p>
          </div>
        )}

        {resume.education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {resume.education.map((ed) => (
                <div key={ed.id}>
                  <div className="flex justify-between font-bold">
                    <span>{ed.degree} — {ed.institution}</span>
                    <span>{ed.startYear} – {ed.endYear}</span>
                  </div>
                  {ed.description && <p className="text-slate-700">{ed.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1">
              Skills
            </h2>
            <p className="text-xs text-slate-800">{resume.skills.join(' • ')}</p>
          </div>
        )}

        {resume.experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2">
              Experience
            </h2>
            <div className="space-y-2 text-xs">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold">
                    <span>{exp.jobTitle} | {exp.company}</span>
                    <span>{exp.startDate} – {exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-slate-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.projects.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2">
              Projects
            </h2>
            <div className="space-y-2 text-xs">
              {resume.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="font-bold">
                    {proj.name} {proj.technologies && <span className="font-normal text-slate-600">({proj.technologies})</span>}
                  </div>
                  {proj.description && <p className="text-slate-700">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.certifications.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1">
              Certifications
            </h2>
            <div className="space-y-1 text-xs">
              {resume.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <span><strong>{cert.name}</strong> — {cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
