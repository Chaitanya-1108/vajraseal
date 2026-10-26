import type { Quotation } from '../types/quotation';

/**
 * Generates formatted quotation number: PREFIX-YEAR-SEQUENCE
 * e.g., VS-2026-101
 */
export function formatQuotationNumber(prefix: string, sequence: number, year?: number): string {
  const currentYear = year || new Date().getFullYear();
  const cleanPrefix = (prefix || 'VS').toUpperCase().trim();
  const seqStr = String(sequence).padStart(3, '0');
  return `${cleanPrefix}-${currentYear}-${seqStr}`;
}

/**
 * Parses quotation number to extract sequence number if matching prefix-year-seq
 */
export function extractSequenceNumber(quotationNumber: string): number | null {
  const match = quotationNumber.match(/-(\d+)$/);
  if (match && match[1]) {
    const num = parseInt(match[1], 10);
    return isNaN(num) ? null : num;
  }
  return null;
}

/**
 * Checks if a quotation number already exists for a different quotation
 */
export function isQuotationNumberDuplicate(
  quotations: Quotation[],
  newNumber: string,
  excludeId?: string
): boolean {
  const normalized = newNumber.trim().toLowerCase();
  return quotations.some(
    (q) => q.id !== excludeId && q.quotationNumber.trim().toLowerCase() === normalized
  );
}

/**
 * Finds the highest sequence number used in quotations or settings
 */
export function getNextSequenceNumber(quotations: Quotation[], fallbackSeq: number = 101): number {
  let highest = fallbackSeq;
  for (const q of quotations) {
    const seq = extractSequenceNumber(q.quotationNumber);
    if (seq !== null && seq >= highest) {
      highest = seq + 1;
    }
  }
  return highest;
}
