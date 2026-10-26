import type { BackupData, CompanySettings, Quotation } from '../types/quotation';
import { DEFAULT_COMPANY_SETTINGS, SAMPLE_QUOTATION } from '../constants/defaults';
import { formatQuotationNumber, getNextSequenceNumber } from './numbering';
import { getCurrentDateFormatted } from './formatters';

const STORAGE_KEYS = {
  QUOTATIONS: 'vajraseal_quotations_v1',
  SETTINGS: 'vajraseal_settings_v1',
};

/**
 * Safely parse JSON with fallback
 */
function safeJsonParse<T>(jsonStr: string | null, fallback: T): T {
  if (!jsonStr) return fallback;
  try {
    return JSON.parse(jsonStr) as T;
  } catch (err) {
    console.error('Error parsing localStorage item:', err);
    return fallback;
  }
}

/**
 * Load all stored quotations.
 * If empty on first load, seed with the reference quotation.
 */
export function getQuotations(): Quotation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUOTATIONS);
    if (!raw) {
      // Initialize with sample quotation
      saveQuotations([SAMPLE_QUOTATION]);
      return [SAMPLE_QUOTATION];
    }
    const list = safeJsonParse<Quotation[]>(raw, []);
    return Array.isArray(list) ? list : [SAMPLE_QUOTATION];
  } catch (err) {
    console.warn('localStorage not available or error reading:', err);
    return [SAMPLE_QUOTATION];
  }
}

/**
 * Save array of quotations to localStorage
 */
export function saveQuotations(quotations: Quotation[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEYS.QUOTATIONS, JSON.stringify(quotations));
    return true;
  } catch (err) {
    console.error('Failed to save quotations to localStorage:', err);
    return false;
  }
}

/**
 * Get single quotation by ID
 */
export function getQuotationById(id: string): Quotation | null {
  const quotations = getQuotations();
  return quotations.find((q) => q.id === id) || null;
}

/**
 * Save or update a single quotation
 */
export function saveQuotation(quotation: Quotation): boolean {
  const quotations = getQuotations();
  const index = quotations.findIndex((q) => q.id === quotation.id);
  const now = new Date().toISOString();

  if (index >= 0) {
    quotations[index] = {
      ...quotation,
      updatedAt: now,
    };
  } else {
    quotations.unshift({
      ...quotation,
      createdAt: quotation.createdAt || now,
      updatedAt: now,
    });
  }

  return saveQuotations(quotations);
}

/**
 * Delete a quotation by ID
 */
export function deleteQuotation(id: string): boolean {
  const quotations = getQuotations();
  const filtered = quotations.filter((q) => q.id !== id);
  return saveQuotations(filtered);
}

/**
 * Duplicate a quotation with new ID, auto-incremented number, and today's date
 */
export function duplicateQuotation(sourceId: string): Quotation | null {
  const source = getQuotationById(sourceId);
  if (!source) return null;

  const quotations = getQuotations();
  const settings = getCompanySettings();
  const nextSeq = getNextSequenceNumber(quotations, settings.currentSequenceNumber);
  const newNumber = formatQuotationNumber(settings.quotationPrefix, nextSeq);

  // Update settings next sequence
  saveCompanySettings({
    ...settings,
    currentSequenceNumber: nextSeq + 1,
  });

  const now = new Date().toISOString();
  const duplicated: Quotation = {
    ...source,
    id: 'quote_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    quotationNumber: newNumber,
    quotationDate: getCurrentDateFormatted(),
    clientName: `${source.clientName} (Copy)`,
    status: 'draft',
    createdAt: now,
    updatedAt: now,
  };

  saveQuotation(duplicated);
  return duplicated;
}

/**
 * Load company settings
 */
export function getCompanySettings(): CompanySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      saveCompanySettings(DEFAULT_COMPANY_SETTINGS);
      return DEFAULT_COMPANY_SETTINGS;
    }
    const settings = safeJsonParse<CompanySettings>(raw, DEFAULT_COMPANY_SETTINGS);
    // Ensure all default properties exist if old version
    return { ...DEFAULT_COMPANY_SETTINGS, ...settings };
  } catch (err) {
    console.warn('localStorage error reading settings:', err);
    return DEFAULT_COMPANY_SETTINGS;
  }
}

/**
 * Save company settings
 */
export function saveCompanySettings(settings: CompanySettings): boolean {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return true;
  } catch (err) {
    console.error('Failed to save settings:', err);
    return false;
  }
}

/**
 * Export all data to JSON
 */
export function exportBackupData(): string {
  const data: BackupData = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    settings: getCompanySettings(),
    quotations: getQuotations(),
  };
  return JSON.stringify(data, null, 2);
}

/**
 * Import backup JSON with basic validation
 */
export function importBackupData(jsonString: string): { success: boolean; message: string; count?: number } {
  try {
    const data = JSON.parse(jsonString) as Partial<BackupData>;
    if (!data.quotations || !Array.isArray(data.quotations)) {
      return { success: false, message: 'Invalid backup file: "quotations" array missing.' };
    }

    if (data.settings && typeof data.settings === 'object') {
      saveCompanySettings({ ...DEFAULT_COMPANY_SETTINGS, ...data.settings });
    }

    saveQuotations(data.quotations);
    return {
      success: true,
      message: `Successfully restored ${data.quotations.length} quotation(s) and company settings.`,
      count: data.quotations.length,
    };
  } catch (err) {
    return { success: false, message: 'Invalid JSON file: ' + (err instanceof Error ? err.message : String(err)) };
  }
}

/**
 * Reset to sample reference data
 */
export function resetToSampleData(): void {
  saveCompanySettings(DEFAULT_COMPANY_SETTINGS);
  saveQuotations([SAMPLE_QUOTATION]);
}
