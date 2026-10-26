import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Smartphone } from 'lucide-react';

interface ZoomControlsProps {
  scale: number;
  onScaleChange: (newScale: number) => void;
  className?: string;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  scale,
  onScaleChange,
  className = '',
}) => {
  const handleZoomIn = () => {
    onScaleChange(Math.min(scale + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    onScaleChange(Math.max(scale - 0.1, 0.25));
  };

  const handleReset = () => {
    onScaleChange(1.0);
  };

  const handleFitMobile = () => {
    if (typeof window === 'undefined') return;
    const screenWidth = window.innerWidth;
    // On narrow screens (320px - 375px), use smaller padding so quotation fills the viewport nicely
    const padding = screenWidth < 380 ? 16 : 32;
    const targetScale = Math.min(1.0, (screenWidth - padding) / 794);
    // Support small phones down to 320px
    onScaleChange(Math.max(0.25, Math.round(targetScale * 100) / 100));
  };

  return (
    <div
      className={`inline-flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 sm:px-3 py-1.5 rounded-2xl shadow-xl border border-slate-200/90 text-slate-700 text-xs font-semibold max-w-full overflow-x-auto ${className}`}
    >
      <button
        onClick={handleZoomOut}
        className="min-h-[38px] min-w-[38px] p-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-transform flex items-center justify-center text-slate-700"
        title="Zoom Out"
        type="button"
        aria-label="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </button>

      <span className="w-10 sm:w-12 text-center tabular-nums text-slate-800 font-bold text-xs select-none">
        {Math.round(scale * 100)}%
      </span>

      <button
        onClick={handleZoomIn}
        className="min-h-[38px] min-w-[38px] p-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-transform flex items-center justify-center text-slate-700"
        title="Zoom In"
        type="button"
        aria-label="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </button>

      <div className="w-[1px] h-4 bg-slate-200 mx-0.5 sm:mx-1" />

      <button
        onClick={handleFitMobile}
        className="min-h-[38px] px-2.5 py-1.5 rounded-xl hover:bg-blue-50 hover:text-[#0e3c63] flex items-center gap-1 active:scale-95 transition-transform text-[11px] font-bold"
        title="Fit to Screen Width"
        type="button"
      >
        <Smartphone className="w-3.5 h-3.5 text-[#0e3c63]" />
        <span>Fit</span>
      </button>

      <button
        onClick={handleReset}
        className="min-h-[38px] px-2.5 py-1.5 rounded-xl hover:bg-slate-100 flex items-center gap-1 active:scale-95 transition-transform text-[11px]"
        title="Actual Size (100%)"
        type="button"
      >
        <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
        <span className="hidden xs:inline sm:inline">100%</span>
      </button>
    </div>
  );
};
