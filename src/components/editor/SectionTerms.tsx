import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, CreditCard, ShieldCheck } from 'lucide-react';
import { DEFAULT_PAYMENT_TERMS } from '../../constants/defaults';

interface SectionTermsProps {
  materialConditions: string;
  paymentTerms: string[];
  brandStatement: string;
  onChange: (updated: {
    materialConditions?: string;
    paymentTerms?: string[];
    brandStatement?: string;
  }) => void;
}

export const SectionTerms: React.FC<SectionTermsProps> = ({
  materialConditions,
  paymentTerms,
  brandStatement,
  onChange,
}) => {
  const [newTerm, setNewTerm] = useState('');

  const handleAddTerm = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTerm.trim()) return;
    onChange({ paymentTerms: [...paymentTerms, newTerm.trim()] });
    setNewTerm('');
  };

  const handleRemoveTerm = (index: number) => {
    onChange({ paymentTerms: paymentTerms.filter((_, idx) => idx !== index) });
  };

  return (
    <div className="space-y-5">
      {/* 1. Material Condition Banner */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#0e3c63]" />
          <span>Material Condition Notice Banner</span>
        </label>
        <textarea
          rows={2}
          value={materialConditions}
          onChange={(e) => onChange({ materialConditions: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
          placeholder="Cement, Sand to be provided by the client, or charged at actual cost."
        />
        <p className="text-[11px] text-slate-500 mt-0.5">
          Displayed in a highlighted banner below exclusions.
        </p>
      </div>

      {/* 2. PAYMENT TERMS Section */}
      <div className="pt-3 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-black text-[#e66827] uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-[#0e3c63]" />
            <span>PAYMENT TERMS</span>
          </label>
          <button
            type="button"
            onClick={() => onChange({ paymentTerms: [...DEFAULT_PAYMENT_TERMS] })}
            className="text-[11px] text-slate-500 hover:text-[#0e3c63] flex items-center gap-1 font-semibold"
            title="Reset to default payment terms"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="space-y-1.5 mb-2.5">
          {paymentTerms.map((term, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between bg-blue-50/50 border border-blue-200/80 px-3 py-2 rounded-xl text-xs"
            >
              <div className="flex items-start gap-2 pr-2 text-slate-800">
                <span className="text-[#0e3c63] font-bold select-none">•</span>
                <span className="font-medium leading-snug">{term}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveTerm(idx)}
                className="min-h-[38px] min-w-[38px] text-slate-400 hover:text-rose-500 flex items-center justify-center p-1 shrink-0 active:scale-90"
                aria-label="Remove payment term"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddTerm} className="flex gap-2">
          <input
            type="text"
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            placeholder="Add payment stage (e.g. 50% advance...)"
            className="flex-1 min-h-[44px] px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="submit"
            className="min-h-[44px] px-4 py-2 bg-[#0e3c63] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#114979] shadow-xs active:scale-95 transition-transform shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </form>
      </div>

      {/* 3. Brand Statement Banner */}
      <div className="pt-3 border-t border-slate-200">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          Authorized Brand Statement Banner
        </label>
        <input
          type="text"
          value={brandStatement}
          onChange={(e) => onChange({ brandStatement: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
          placeholder="We use UltraTech/ Fosroc/ Konkem/ Solcon products."
        />
        <p className="text-[11px] text-slate-500 mt-0.5">
          Displayed above the signatory at the bottom.
        </p>
      </div>
    </div>
  );
};
