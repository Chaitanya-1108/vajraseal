import React, { useState, useEffect } from 'react';
import type { CompanySettings, Quotation } from '../../types/quotation';
import { QuotationPreview } from './QuotationPreview';
import { ZoomControls } from './ZoomControls';
import { JPGGeneratorButton } from '../jpg/JPGGeneratorButton';
import { ArrowLeft, Edit3, Printer } from 'lucide-react';

interface PreviewPageProps {
  quotation: Quotation;
  settings: CompanySettings;
  onEdit: () => void;
  onBack: () => void;
}

export const PreviewPage: React.FC<PreviewPageProps> = ({
  quotation,
  settings,
  onEdit,
  onBack,
}) => {
  const [scale, setScale] = useState(1.0);

  // Auto-fit on screens smaller than 850px on mount and window resize
  useEffect(() => {
    const calculateFitScale = () => {
      if (typeof window !== 'undefined') {
        const screenWidth = window.innerWidth;
        if (screenWidth < 850) {
          const padding = screenWidth < 380 ? 16 : 32;
          const target = Math.min(1.0, (screenWidth - padding) / 794);
          setScale(Math.max(0.25, Math.round(target * 100) / 100));
        }
      }
    };

    calculateFitScale();
    window.addEventListener('resize', calculateFitScale);
    return () => window.removeEventListener('resize', calculateFitScale);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900/95 text-white flex flex-col">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-3 py-2.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Back & Document Title */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center active:scale-95"
              title="Back"
              type="button"
              aria-label="Back to previous page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="leading-tight">
              <div className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-wider">
                DOCUMENT PREVIEW
              </div>
              <h1 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>{quotation.quotationNumber}</span>
                <span className="text-slate-500 font-normal">|</span>
                <span className="text-slate-300 truncate max-w-[120px] xs:max-w-[160px] sm:max-w-xs">
                  {quotation.clientName || 'Quotation'}
                </span>
              </h1>
            </div>
          </div>

          {/* Desktop & Tablet Zoom Controls */}
          <div className="hidden sm:block order-2">
            <ZoomControls scale={scale} onScaleChange={setScale} />
          </div>

          {/* Actions: Edit & Download JPG */}
          <div className="flex items-center gap-1.5 sm:gap-2 order-3 ml-auto sm:ml-0">
            <button
              onClick={handlePrint}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all min-h-[44px]"
              title="Print directly"
              type="button"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onEdit}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all min-h-[44px] active:scale-95"
              type="button"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Edit</span>
            </button>

            {/* Prominent High-Resolution Download JPG Button */}
            <JPGGeneratorButton
              quotation={quotation}
              targetElementId="vajra-export-host"
              variant="primary"
              showShare={true}
            />
          </div>
        </div>
      </header>

      {/* Document Viewport Container */}
      <main className="flex-1 overflow-x-auto overflow-y-auto p-2 sm:p-6 flex items-start justify-center pb-24 sm:pb-8">
        <div
          className="relative transition-all duration-150 ease-out origin-top my-2 sm:my-4"
          style={{
            // Container dimensions match scaled A4 to prevent clipping and enable proper scrolling
            width: `${210 * 3.7795 * scale}px`,
            minHeight: `${297 * 3.7795 * scale}px`,
          }}
        >
          <QuotationPreview
            quotation={quotation}
            settings={settings}
            scale={scale}
            className="rounded-sm shadow-2xl"
          />
        </div>
      </main>

      {/* Floating Bottom Quick Zoom Bar for mobile phones */}
      <footer className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95%]">
        <ZoomControls scale={scale} onScaleChange={setScale} />
      </footer>

      {/* Dedicated Off-Screen Render Container for High-Resolution (~2480x3508) JPG Export */}
      <div
        style={{
          position: 'fixed',
          top: '-99999px',
          left: '0px',
          width: '794px',
          overflow: 'hidden',
          zIndex: -999,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <div
          id="vajra-export-host"
          style={{
            width: '794px',
            backgroundColor: '#ffffff',
            color: '#000000',
          }}
        >
          <QuotationPreview
            quotation={quotation}
            settings={settings}
            scale={1}
            id="export-doc-element"
            className="!shadow-none !m-0 !border-none"
          />
        </div>
      </div>
    </div>
  );
};
