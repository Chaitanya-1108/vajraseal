import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import type { CompanySettings, Quotation } from '../../types/quotation';
import { QuotationPDFDocument } from './QuotationPDFDocument';
import { createQuotationFilename } from '../../utils/formatters';
import { Download, Loader2, Share2, Check } from 'lucide-react';

interface PDFGeneratorButtonProps {
  quotation: Quotation;
  settings: CompanySettings;
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon' | 'outline';
  showShare?: boolean;
}

export const PDFGeneratorButton: React.FC<PDFGeneratorButtonProps> = ({
  quotation,
  settings,
  className = '',
  variant = 'primary',
  showShare = true,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canShare = typeof navigator !== 'undefined' && !!navigator.share && !!navigator.canShare;

  const generatePDFBlob = async (): Promise<Blob> => {
    const doc = <QuotationPDFDocument quotation={quotation} settings={settings} />;
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();
    return blob;
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      setErrorMessage(null);

      const blob = await generatePDFBlob();
      const filename = createQuotationFilename(quotation.quotationNumber, quotation.clientName);

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      console.error('PDF Generation failed:', err);
      setErrorMessage('Could not generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    try {
      setIsGenerating(true);
      setErrorMessage(null);

      const blob = await generatePDFBlob();
      const filename = createQuotationFilename(quotation.quotationNumber, quotation.clientName);
      const file = new File([blob], filename, { type: 'application/pdf' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Quotation ${quotation.quotationNumber}`,
          text: `Waterproofing Quotation for ${quotation.clientName}`,
        });
      } else {
        // Fallback to standard download
        await handleDownload();
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const buttonBaseStyles =
    'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#0e3c63] to-[#0a2c49] text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:from-[#114979] hover:to-[#0e3c63] px-5 py-2.5 text-sm',
    secondary:
      'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 px-4 py-2 text-sm',
    outline:
      'border-2 border-[#0e3c63] text-[#0e3c63] hover:bg-[#0e3c63] hover:text-white px-4 py-2 text-sm',
    icon: 'p-2.5 text-slate-700 hover:text-[#0e3c63] hover:bg-slate-100 rounded-lg',
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`${buttonBaseStyles} ${variantStyles[variant]} ${className}`}
        title="Download PDF Quotation"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />
            <span>Building PDF...</span>
          </>
        ) : isSuccess ? (
          <>
            <Check className="w-4 h-4 mr-2 text-emerald-400" />
            <span>Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            <span>Download A4 PDF</span>
          </>
        )}
      </button>

      {showShare && canShare && (
        <button
          onClick={handleShare}
          disabled={isGenerating}
          className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-[#0e3c63] transition-colors shadow-sm"
          title="Share via WhatsApp or Mobile"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}

      {errorMessage && (
        <span className="text-xs text-rose-500 font-medium ml-2">{errorMessage}</span>
      )}
    </div>
  );
};
