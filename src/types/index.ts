export type CalculatorCategory = 'Student' | 'Finance' | 'Math' | 'Health' | 'Everyday';

export interface CalculatorInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: CalculatorCategory;
  iconName: string;
  route: string;
  isPopular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WorkedExampleStep {
  label: string;
  detail: string;
}

export interface WorkedExample {
  title: string;
  problem: string;
  steps: WorkedExampleStep[];
  result: string;
}

export interface CalculatorContent {
  id: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  keywords: string[];
  overview: string;
  formula: string;
  formulaDescription: string;
  workedExample: WorkedExample;
  faqs: FAQItem[];
  relatedCalculatorIds: string[];
}

export interface SubjectRow {
  id: string;
  name: string;
  credits: number | '';
  gradePoint: number | '';
}

export interface ResumeEducation {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface ResumeExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeProject {
  id: string;
  name: string;
  technologies: string;
  description: string;
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    portfolio: string;
    summary: string;
  };
  education: ResumeEducation[];
  skills: string[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  certifications: ResumeCertification[];
}
