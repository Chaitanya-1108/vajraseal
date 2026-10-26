export interface TreatmentItem {
  id: string;
  srNo?: string;
  isCategoryHeader?: boolean;
  treatmentName: string;
  productName?: string;
  description?: string;
  rate: string;
  unit?: string;
  quantity?: number;
  amount?: number;
}

export type QuotationStatus = 'draft' | 'issued' | 'approved' | 'rejected';

export interface Quotation {
  id: string;
  quotationNumber: string;
  quotationDate: string; // DD-MM-YYYY format
  clientName: string;
  clientCity: string;
  clientAddress?: string;
  clientPhone?: string;
  
  subject: string;
  greeting: string;
  introParagraph1: string;
  introParagraph2: string;
  servicesList: string[];
  showServicesList: boolean;
  
  tableSectionTitle: string;
  treatmentItems: TreatmentItem[];
  
  inclusions: string[];
  exclusions: string[];
  
  materialConditions: string;
  paymentTerms: string[];
  brandStatement: string;
  
  signatureName: string;
  signaturePhone: string;
  authorizedVendorText: string;
  
  status: QuotationStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CompanySettings {
  companyNameHindi: string; // e.g. "वज्र"
  companyNameEnglish: string; // e.g. "SEAL"
  businessType: string; // e.g. "WATERPROOFING SOLUTIONS"
  tagline: string; // e.g. "Stronger Walls | Drier Spaces | Longer Life"
  address: string; // e.g. "53, Laxmi Nagar, Yavatmal – 445001"
  phone: string; // e.g. "9423116548"
  alternatePhone?: string;
  email?: string;
  logoUrl?: string; // base64 or URL
  
  signatoryName: string; // e.g. "Rajendra Deshpande"
  signatoryPhone: string; // e.g. "9423116548"
  authorizedVendorFooter: string; // e.g. "Authorized Waterproofing Vendor of Ultratech Cement"
  
  quotationPrefix: string; // e.g. "VS"
  currentSequenceNumber: number; // e.g. 101
  
  // Default values for new quotations
  defaultSubject: string;
  defaultGreeting: string;
  defaultIntro1: string;
  defaultIntro2: string;
  defaultServicesList: string[];
  defaultTreatmentItems: TreatmentItem[];
  defaultInclusions: string[];
  defaultExclusions: string[];
  defaultMaterialCondition: string;
  defaultPaymentTerms: string[];
  defaultBrandStatement: string;
}

export interface BackupData {
  version: string;
  exportedAt: string;
  settings: CompanySettings;
  quotations: Quotation[];
}
