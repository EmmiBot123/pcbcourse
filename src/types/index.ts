export interface CurriculumDay {
  day: number;
  date: string;
  time: string;
  title: string;
  shortDesc: string;
  badge: string;
  topics: string[];
  handsOnDeliverable: string;
  aiPromptExample: string;
  kicadModule: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Schedule' | 'Prerequisites' | 'Tools & Software' | 'Certification' | 'Career';
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  category: 'Design' | 'KiCad Layout' | 'Fabrication';
  aiRole: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  experienceLevel: 'Student' | 'Fresher' | 'Professional' | 'Hobbyist';
  paymentMethod: 'razorpay';
}

export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  companyName: string;
  productName: string;
}

