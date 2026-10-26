import type { CompanySettings, Quotation, TreatmentItem } from '../types/quotation';

export const DEFAULT_TREATMENT_ITEMS: TreatmentItem[] = [
  {
    id: 'item-1',
    srNo: '1',
    isCategoryHeader: false,
    treatmentName: 'Grouting per hole',
    rate: '₹ 200/-',
    unit: 'hole',
  },
  {
    id: 'item-cat-1',
    isCategoryHeader: true,
    treatmentName: 'Waterproofing Treatment for Floor & Wall',
    rate: '',
  },
  {
    id: 'item-2',
    srNo: '2',
    isCategoryHeader: false,
    treatmentName: 'Fosroc Hydroproof Xtra',
    rate: '₹ 70/- Sq. Ft',
    unit: 'Sq. Ft',
  },
  {
    id: 'item-3',
    srNo: '',
    isCategoryHeader: false,
    treatmentName: 'Fosroc CM 210 (for Potable Water tank)',
    rate: '₹ 80/- Sq. Ft',
    unit: 'Sq. Ft',
  },
];

export const DEFAULT_SERVICES_LIST: string[] = [
  'Terrace Waterproofing',
  'Bathroom Waterproofing',
  'Water Tank Waterproofing',
  'Crack Filling & Leakage Solutions',
];

export const DEFAULT_INCLUSIONS: string[] = [
  'Surface preparation.',
  'Proper floor slope.',
  'Corner fillet (Galtha) making.',
  'Pipe hole sealing.',
  'Application of primer and fixing mesh with two coats of chemical.',
  'Mesh treatment at internal wall, floor and floor-wall junctions.',
];

export const DEFAULT_EXCLUSIONS: string[] = [
  'Core cutting or making any hole for spouts / pipes.',
  'Water curing of the completed work.',
];

export const DEFAULT_MATERIAL_CONDITION =
  'Cement, Sand to be provided by the client, or charged at actual cost.';

export const DEFAULT_PAYMENT_TERMS: string[] = [
  '50% advance payment per floor before starting the work.',
  '40% payment during execution (within 2 days).',
  'Remaining 10% payment after completion of the work.',
];

export const DEFAULT_BRAND_STATEMENT =
  'We use UltraTech/ Fosroc/ Konkem/ Solcon products.';

export const DEFAULT_COMPANY_SETTINGS: CompanySettings = {
  companyNameHindi: 'वज्र',
  companyNameEnglish: 'SEAL',
  businessType: 'WATERPROOFING SOLUTIONS',
  tagline: 'Stronger Walls | Drier Spaces | Longer Life',
  address: '53, Laxmi Nagar, Yavatmal – 445001',
  phone: '9423116548',
  alternatePhone: '',
  email: '',
  logoUrl: '',
  signatoryName: 'Rajendra Deshpande',
  signatoryPhone: '9423116548',
  authorizedVendorFooter: 'Authorized Waterproofing Vendor of Ultratech Cement',
  quotationPrefix: 'VS',
  currentSequenceNumber: 101,

  defaultSubject: 'Proposal for Waterproofing Work',
  defaultGreeting: 'Dear Sir/Madam,',
  defaultIntro1:
    'We would like to offer our waterproofing services for your building to effectively resolve leakage and dampness issues.',
  defaultIntro2:
    'We have good experience in the waterproofing field and provide the following services:',
  defaultServicesList: DEFAULT_SERVICES_LIST,
  defaultTreatmentItems: DEFAULT_TREATMENT_ITEMS,
  defaultInclusions: DEFAULT_INCLUSIONS,
  defaultExclusions: DEFAULT_EXCLUSIONS,
  defaultMaterialCondition: DEFAULT_MATERIAL_CONDITION,
  defaultPaymentTerms: DEFAULT_PAYMENT_TERMS,
  defaultBrandStatement: DEFAULT_BRAND_STATEMENT,
};

// Seed sample quotation that exactly matches the reference document
export const SAMPLE_QUOTATION: Quotation = {
  id: 'sample-vs-2026-101',
  quotationNumber: 'VS-2026-101',
  quotationDate: '25-10-2026',
  clientName: 'Shri. Manish Bogawat Sir',
  clientCity: 'Yavatmal',
  clientAddress: '',
  clientPhone: '',
  subject: 'Proposal for Waterproofing Work',
  greeting: 'Dear Sir/Madam,',
  introParagraph1:
    'We would like to offer our waterproofing services for your building to effectively resolve leakage and dampness issues.',
  introParagraph2:
    'We have good experience in the waterproofing field and provide the following services:',
  servicesList: DEFAULT_SERVICES_LIST,
  showServicesList: true,
  tableSectionTitle: 'WATERPROOFING QUOTATION',
  treatmentItems: DEFAULT_TREATMENT_ITEMS,
  inclusions: DEFAULT_INCLUSIONS,
  exclusions: DEFAULT_EXCLUSIONS,
  materialConditions: DEFAULT_MATERIAL_CONDITION,
  paymentTerms: DEFAULT_PAYMENT_TERMS,
  brandStatement: DEFAULT_BRAND_STATEMENT,
  signatureName: 'Rajendra Deshpande',
  signaturePhone: '9423116548',
  authorizedVendorText: 'Authorized Waterproofing Vendor of Ultratech Cement',
  status: 'issued',
  createdAt: '2026-10-25T10:00:00.000Z',
  updatedAt: '2026-10-25T10:00:00.000Z',
};
