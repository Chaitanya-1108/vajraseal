import React from 'react';
import type { Quotation, QuotationStatus } from '../../types/quotation';
import { getCurrentDateFormatted } from '../../utils/formatters';
import { User, Calendar, Hash, MapPin, Phone, Building } from 'lucide-react';

interface SectionClientInfoProps {
  quotation: Quotation;
  onChange: (updated: Partial<Quotation>) => void;
  isDuplicateNumber?: boolean;
}

export const SectionClientInfo: React.FC<SectionClientInfoProps> = ({
  quotation,
  onChange,
  isDuplicateNumber = false,
}) => {
  const statusColors: Record<QuotationStatus, { bg: string; text: string; label: string }> = {
    draft: { bg: 'bg-amber-100 text-amber-800 border-amber-300', text: 'text-amber-800', label: 'Draft' },
    issued: { bg: 'bg-blue-100 text-blue-800 border-blue-300', text: 'text-blue-800', label: 'Issued' },
    approved: { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', text: 'text-emerald-800', label: 'Approved' },
    rejected: { bg: 'bg-rose-100 text-rose-800 border-rose-300', text: 'text-rose-800', label: 'Rejected' },
  };

  return (
    <div className="space-y-4">
      {/* Quotation Number & Date row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Quotation Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-[#0e3c63]" />
              Quotation Number
            </span>
            {isDuplicateNumber && (
              <span className="text-[11px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                Already In Use!
              </span>
            )}
          </label>
          <input
            type="text"
            value={quotation.quotationNumber}
            onChange={(e) => onChange({ quotationNumber: e.target.value })}
            className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-sm font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 ${
              isDuplicateNumber
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-300 focus:border-[#0e3c63] focus:ring-blue-100 bg-white'
            }`}
            placeholder="e.g. VS-2026-101"
            required
          />
        </div>

        {/* Quotation Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#0e3c63]" />
              Date (DD-MM-YYYY)
            </span>
            <button
              type="button"
              onClick={() => onChange({ quotationDate: getCurrentDateFormatted() })}
              className="text-[11px] text-[#0e3c63] hover:underline font-bold py-1 px-1"
            >
              Set Today
            </button>
          </label>
          <input
            type="text"
            value={quotation.quotationDate}
            onChange={(e) => onChange({ quotationDate: e.target.value })}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold tracking-wide bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
            placeholder="DD-MM-YYYY"
            required
          />
        </div>
      </div>

      {/* Client Name & City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Client Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#0e3c63]" />
            Client Name *
          </label>
          <input
            type="text"
            value={quotation.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
            placeholder="e.g. Shri. Manish Bogawat Sir"
            required
          />
        </div>

        {/* Client City */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-[#0e3c63]" />
            City *
          </label>
          <input
            type="text"
            value={quotation.clientCity}
            onChange={(e) => onChange({ clientCity: e.target.value })}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
            placeholder="e.g. Yavatmal"
            required
          />
        </div>
      </div>

      {/* Optional Client Phone & Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            Client Phone (Optional)
          </label>
          <input
            type="tel"
            value={quotation.clientPhone || ''}
            onChange={(e) => onChange({ clientPhone: e.target.value })}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
            placeholder="e.g. 9876543210"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            Client Address (Optional)
          </label>
          <input
            type="text"
            value={quotation.clientAddress || ''}
            onChange={(e) => onChange({ clientAddress: e.target.value })}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
            placeholder="e.g. Plot No 12, Civil Lines"
          />
        </div>
      </div>

      {/* Quotation Status Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Quotation Status
        </label>
        <div className="flex flex-wrap gap-2">
          {(['draft', 'issued', 'approved', 'rejected'] as QuotationStatus[]).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => onChange({ status: st })}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                quotation.status === st
                  ? `${statusColors[st].bg} border-current ring-2 ring-offset-1`
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {statusColors[st].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
