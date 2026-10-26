import React, { useState } from 'react';
import type { Quotation } from '../../types/quotation';
import {
  generateQuotationJpgBlob,
  triggerFileDownload,
  shareJpgBlob,
  canShareJpgFile,
} from '../../utils/imageExport';
import { createQuotationJpgFilename } from '../../utils/formatters';
import { Download, Loader2, Share2, Check, AlertCircle } from 'lucide-react';

interface JPGGeneratorButtonProps {
  quotation: Quotation;
  targetElementId?: string; // ID of DOM element to capture, defaults to 'vajra-export-host'
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon' | 'outline';
  showShare?: boolean;
  onBeforeExport?: () => void;
}

export const JPGGeneratorButton: React.FC<JPGGeneratorButtonProps> = ({
  quotation,
  targetElementId = 'vajra-export-host',
  className = '',
  variant = 'primary',
  showShare = true,
  onBeforeExport,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canShare = canShareJpgFile();

  const getTargetElement = (): HTMLElement => {
    // 1. Try specified targetElementId
    let el = document.getElementById(targetElementId);
    // 2. If not found, try active quotation preview ID
    if (!el) {
      el = document.getElementById('quotation-a4-document');
    }
    if (!el) {
      throw new Error('Quotation document element was not found in the DOM.');
    }
    return el;
  };

  const handleDownload = async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      setErrorMessage(null);
      setStatusMessage('Preparing A4 image...');

      onBeforeExport?.();

      const element = getTargetElement();
      const filename = createQuotationJpgFilename(quotation.quotationNumber, quotation.clientName);

      const blob = await generateQuotationJpgBlob(element, {
        quality: 0.95,
        pixelRatio: 3.125, // Produces ~2480px width
        onProgress: (status) => setStatusMessage(status),
      });

      triggerFileDownload(blob, filename);

      setIsSuccess(true);
      setStatusMessage('Downloaded!');
      setTimeout(() => {
        setIsSuccess(false);
        setStatusMessage('');
      }, 3500);
    } catch (err) {
      console.error('JPG generation error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Could not generate JPG image.');
      setTimeout(() => setErrorMessage(null), 5000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      setErrorMessage(null);
      setStatusMessage('Preparing for WhatsApp...');

      onBeforeExport?.();

      const element = getTargetElement();
      const filename = createQuotationJpgFilename(quotation.quotationNumber, quotation.clientName);

      const blob = await generateQuotationJpgBlob(element, {
        quality: 0.95,
        pixelRatio: 3.125,
        onProgress: (status) => setStatusMessage(status),
      });

      const title = `Quotation ${quotation.quotationNumber} - वज्र SEAL`;
      const text = `Waterproofing Quotation for ${quotation.clientName} (${quotation.quotationNumber})`;

      const shared = await shareJpgBlob(blob, filename, title, text);
      if (!shared) {
        // Fallback to normal download if share cancelled or unavailable
        triggerFileDownload(blob, filename);
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Share error:', err);
        setErrorMessage('Failed to share image. Try downloading directly.');
        setTimeout(() => setErrorMessage(null), 4000);
      }
    } finally {
      setIsGenerating(false);
      setStatusMessage('');
    }
  };

  const buttonBaseStyles =
    'relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed select-none min-h-[44px] min-w-[44px]';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 px-5 py-2.5 text-xs sm:text-sm',
    secondary:
      'bg-gradient-to-r from-[#0e3c63] to-[#0a2742] hover:from-[#114979] hover:to-[#0e3c63] text-white shadow-md shadow-blue-900/20 px-4 py-2 text-xs sm:text-sm',
    outline:
      'border-2 border-orange-500 text-orange-600 bg-orange-50/50 hover:bg-orange-500 hover:text-white px-3.5 py-2 text-xs',
    icon: 'p-2.5 text-slate-700 hover:text-[#0e3c63] hover:bg-slate-100 rounded-xl',
  };

  return (
    <div className="inline-flex items-center gap-2 relative">
      {/* Primary Download Button */}
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`${buttonBaseStyles} ${variantStyles[variant]} ${className}`}
        title="Download high-resolution A4 JPG quotation"
        type="button"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin text-current shrink-0" />
            <span className="truncate">{statusMessage || 'Building JPG...'}</span>
          </>
        ) : isSuccess ? (
          <>
            <Check className="w-4 h-4 mr-2 text-emerald-300 shrink-0" />
            <span>Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2 shrink-0" />
            <span>Download JPG</span>
          </>
        )}
      </button>

      {/* WhatsApp / Native Mobile Share Button */}
      {showShare && canShare && (
        <button
          onClick={handleShare}
          disabled={isGenerating}
          type="button"
          className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all shadow-xs flex items-center justify-center gap-1.5 text-xs font-bold active:scale-95"
          title="Share quotation JPG to WhatsApp or other apps"
        >
          <Share2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="hidden sm:inline">Share</span>
        </button>
      )}

      {/* Error message toast tooltip */}
      {errorMessage && (
        <div className="absolute top-full left-0 mt-2 z-50 p-2.5 bg-rose-600 text-white text-xs rounded-xl shadow-xl flex items-center gap-1.5 whitespace-nowrap">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
