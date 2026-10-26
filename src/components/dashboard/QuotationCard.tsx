import React from 'react';
import type { CompanySettings, Quotation, QuotationStatus } from '../../types/quotation';
import { JPGGeneratorButton } from '../jpg/JPGGeneratorButton';
import { QuotationPreview } from '../preview/QuotationPreview';
import {
  Calendar,
  Building,
  Edit3,
  Copy,
  Trash2,
  Eye,
  FileCheck2,
} from 'lucide-react';

interface QuotationCardProps {
  quotation: Quotation;
  settings: CompanySettings;
  onView: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export const QuotationCard: React.FC<QuotationCardProps> = ({
  quotation,
  settings,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  const statusStyles: Record<QuotationStatus, { bg: string; text: string; dot: string }> = {
    draft: { bg: 'bg-amber-50 text-amber-800 border-amber-200', text: 'Draft', dot: 'bg-amber-400' },
    issued: { bg: 'bg-blue-50 text-blue-800 border-blue-200', text: 'Issued', dot: 'bg-blue-500' },
    approved: { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', text: 'Approved', dot: 'bg-emerald-500' },
    rejected: { bg: 'bg-rose-50 text-rose-800 border-rose-200', text: 'Rejected', dot: 'bg-rose-500' },
  };

  const status = statusStyles[quotation.status] || statusStyles.draft;
  const cardExportId = `vajra-card-export-${quotation.id}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Header: Quotation Number & Status */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#0e3c63] text-white font-extrabold text-xs tracking-wider">
              {quotation.quotationNumber}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{quotation.quotationDate}</span>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${status.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            <span>{status.text}</span>
          </span>
        </div>

        {/* Client details */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0e3c63] transition-colors leading-snug line-clamp-1">
          {quotation.clientName || 'Untitled Client'}
        </h3>

        <div className="flex items-center gap-1 text-xs text-slate-600 mt-1">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-700">{quotation.clientCity || 'City not specified'}</span>
          {quotation.clientAddress && (
            <span className="text-slate-400 truncate text-[11px]">
              • {quotation.clientAddress}
            </span>
          )}
        </div>

        {/* Treatment items summary preview */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-[#0e3c63]" />
            <span className="font-semibold text-slate-800">
              {quotation.treatmentItems.filter((i) => !i.isCategoryHeader).length} treatments
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {quotation.inclusions.length} includes
          </span>
        </div>
      </div>

      {/* Action buttons footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={onView}
            className="min-h-[40px] min-w-[40px] p-2 text-slate-600 hover:text-[#0e3c63] hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center active:scale-95"
            title="Preview A4 Document"
            type="button"
            aria-label="Preview A4 Document"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={onEdit}
            className="min-h-[40px] min-w-[40px] p-2 text-slate-600 hover:text-[#0e3c63] hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center active:scale-95"
            title="Edit Quotation"
            type="button"
            aria-label="Edit Quotation"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={onDuplicate}
            className="min-h-[40px] min-w-[40px] p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors flex items-center justify-center active:scale-95"
            title="Duplicate as new quotation"
            type="button"
            aria-label="Duplicate Quotation"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            onClick={onDelete}
            className="min-h-[40px] min-w-[40px] p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center justify-center active:scale-95"
            title="Delete Quotation"
            type="button"
            aria-label="Delete Quotation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* 1-Tap Download JPG Button */}
        <JPGGeneratorButton
          quotation={quotation}
          targetElementId={cardExportId}
          variant="outline"
          showShare={false}
          className="!py-1.5 !px-3 !text-xs font-bold"
        />
      </div>

      {/* Hidden Unscaled Render Host for Direct Card JPG Generation */}
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
          id={cardExportId}
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
            className="!shadow-none !border-none !m-0"
          />
        </div>
      </div>
    </div>
  );
};
