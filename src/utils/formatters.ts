/**
 * Returns current date in Indian format DD-MM-YYYY
 */
export function getCurrentDateFormatted(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Validates if string matches DD-MM-YYYY
 */
export function isValidDateFormat(dateStr: string): boolean {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  if (!regex.test(dateStr)) return false;
  const [day, month, year] = dateStr.split('-').map(Number);
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 2000 || year > 2100) return false;
  return true;
}

/**
 * Creates clean filename for JPG download
 * Format: VS-2026-101-ClientName.jpg
 */
export function createQuotationJpgFilename(quotationNumber: string, clientName: string): string {
  const cleanNumber = quotationNumber.replace(/[^a-zA-Z0-9_-]/g, '-').trim() || 'VS-Quotation';
  const rawClient = (clientName || 'Client')
    .replace(/^(Shri\.|Mr\.|Mrs\.|Ms\.|Dr\.)\s*/i, '')
    .trim();

  // Allow alphanumeric, underscores, hyphens, and Devanagari characters
  const cleanClient = rawClient
    .replace(/[^a-zA-Z0-9_\u0900-\u097F-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 35) || 'Client';

  return `${cleanNumber}-${cleanClient}.jpg`;
}

/**
 * Backwards compatibility alias
 */
export const createQuotationFilename = createQuotationJpgFilename;

