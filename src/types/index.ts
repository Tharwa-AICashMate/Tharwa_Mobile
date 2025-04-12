export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: 'general' | 'account' | 'services';
  }
  
  export interface SupportChannel {
    id: string;
    name: string;
    icon: string;
    link: string;
  }