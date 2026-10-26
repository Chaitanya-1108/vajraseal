import { toCanvas } from 'html-to-image';
import html2canvas from 'html2canvas';

export interface ExportImageResult {
  blob: Blob;
  dataUrl?: string;
  width: number;
  height: number;
}

// Concurrency lock to prevent duplicate simultaneous exports
let isExportRunning = false;

/**
 * Ensures all web fonts and images in the target element are fully loaded before rendering
 */
export async function prepareForCapture(element: HTMLElement): Promise<void> {
  // 1. Wait for document fonts
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (e) {
      console.warn('Font loading check timed out or failed:', e);
    }
  }

  // 2. Wait for all img elements within element to decode
  const images = Array.from(element.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
        // Timeout safeguard
        setTimeout(resolve, 2000);
      });
    })
  );

  // 3. Small tick to allow layout paints
  await new Promise((resolve) => setTimeout(resolve, 150));
}

/**
 * Generates a high-quality A4 JPG blob (~2480 x 3508 px) from a DOM element
 */
export async function generateQuotationJpgBlob(
  targetElement: HTMLElement,
  options?: {
    quality?: number;
    pixelRatio?: number;
    onProgress?: (status: string) => void;
  }
): Promise<Blob> {
  if (isExportRunning) {
    throw new Error('An image export is already in progress. Please wait a moment.');
  }

  isExportRunning = true;
  const quality = options?.quality ?? 0.95;
  // 3.125 on 793.7px (210mm) produces ~2480px width, matching true A4 high-res standard
  const pixelRatio = options?.pixelRatio ?? 3.125;

  try {
    options?.onProgress?.('Preparing document fonts & branding...');
    await prepareForCapture(targetElement);

    options?.onProgress?.('Rendering high-resolution A4 image...');

    // Attempt primary capture with html-to-image toCanvas
    try {
      const canvas = await toCanvas(targetElement, {
        pixelRatio,
        backgroundColor: '#ffffff',
        cacheBust: true,
        style: {
          transform: 'none',
          margin: '0',
          boxShadow: 'none',
        },
      });

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b && b.size > 1000) {
              resolve(b);
            } else {
              reject(new Error('Primary renderer generated empty or invalid JPG blob.'));
            }
          },
          'image/jpeg',
          quality
        );
      });

      return blob;
    } catch (htmlToImageErr) {
      console.warn('html-to-image toCanvas failed, trying html2canvas fallback:', htmlToImageErr);

      // Fallback: html2canvas
      options?.onProgress?.('Optimizing image with fallback engine...');
      const canvas = await html2canvas(targetElement, {
        scale: pixelRatio,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(targetElement.id) || clonedDoc.body;
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.boxShadow = 'none';
            clonedElement.style.margin = '0';
          }
        },
      });

      return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (fallbackBlob) => {
            if (fallbackBlob && fallbackBlob.size > 1000) {
              resolve(fallbackBlob);
            } else {
              reject(new Error('Failed to create JPG image from canvas fallback.'));
            }
          },
          'image/jpeg',
          quality
        );
      });
    }
  } finally {
    isExportRunning = false;
  }
}

/**
 * Downloads a Blob as a file with the specified filename
 * Automatically revokes object URLs
 */
export function triggerFileDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 1000);
}

/**
 * Checks if the Web Share API can share the generated image file (e.g. for WhatsApp)
 */
export function canShareJpgFile(): boolean {
  if (typeof navigator === 'undefined' || !navigator.share || !navigator.canShare) {
    return false;
  }
  try {
    const dummyFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    return navigator.canShare({ files: [dummyFile] });
  } catch {
    return false;
  }
}

/**
 * Shares a JPG blob via the native mobile share sheet (WhatsApp, Telegram, etc.)
 */
export async function shareJpgBlob(
  blob: Blob,
  filename: string,
  title: string,
  text: string
): Promise<boolean> {
  if (!canShareJpgFile()) {
    return false;
  }

  const file = new File([blob], filename, { type: 'image/jpeg' });
  await navigator.share({
    files: [file],
    title,
    text,
  });
  return true;
}
