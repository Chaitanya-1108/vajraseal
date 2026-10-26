import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, Check, XCircle } from 'lucide-react';
import { DEFAULT_INCLUSIONS, DEFAULT_EXCLUSIONS } from '../../constants/defaults';

interface SectionInclusionsExclusionsProps {
  inclusions: string[];
  exclusions: string[];
  onChange: (updated: { inclusions?: string[]; exclusions?: string[] }) => void;
}

export const SectionInclusionsExclusions: React.FC<SectionInclusionsExclusionsProps> = ({
  inclusions,
  exclusions,
  onChange,
}) => {
  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');

  const handleAddInclusion = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newInclusion.trim()) return;
    onChange({ inclusions: [...inclusions, newInclusion.trim()] });
    setNewInclusion('');
  };

  const handleRemoveInclusion = (index: number) => {
    onChange({ inclusions: inclusions.filter((_, idx) => idx !== index) });
  };

  const handleAddExclusion = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newExclusion.trim()) return;
    onChange({ exclusions: [...exclusions, newExclusion.trim()] });
    setNewExclusion('');
  };

  const handleRemoveExclusion = (index: number) => {
    onChange({ exclusions: exclusions.filter((_, idx) => idx !== index) });
  };

  return (
    <div className="space-y-6">
      {/* INCLUDES SECTION */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-black text-[#e66827] uppercase tracking-wider flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>INCLUDES (What is covered)</span>
          </label>
          <button
            type="button"
            onClick={() => onChange({ inclusions: [...DEFAULT_INCLUSIONS] })}
            className="text-[11px] text-slate-500 hover:text-[#0e3c63] flex items-center gap-1 font-semibold"
            title="Reset to default inclusions"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="space-y-1.5 mb-2.5">
          {inclusions.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between bg-emerald-50/50 border border-emerald-200/80 px-3 py-2 rounded-xl text-xs"
            >
              <div className="flex items-start gap-2 pr-2 text-slate-800">
                <span className="text-emerald-700 font-bold select-none">•</span>
                <span className="font-medium leading-snug">{item}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveInclusion(idx)}
                className="min-h-[38px] min-w-[38px] text-slate-400 hover:text-rose-500 flex items-center justify-center p-1 shrink-0 active:scale-90"
                aria-label="Remove inclusion"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddInclusion} className="flex gap-2">
          <input
            type="text"
            value={newInclusion}
            onChange={(e) => setNewInclusion(e.target.value)}
            placeholder="Add new inclusion point..."
            className="flex-1 min-h-[44px] px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
          <button
            type="submit"
            className="min-h-[44px] px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-emerald-800 shadow-xs active:scale-95 transition-transform shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </form>
      </div>

      {/* EXCLUSIONS SECTION */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-black text-[#e66827] uppercase tracking-wider flex items-center gap-1.5">
            <XCircle className="w-4 h-4 text-rose-500" />
            <span>EXCLUSION (NOT INCLUDED)</span>
          </label>
          <button
            type="button"
            onClick={() => onChange({ exclusions: [...DEFAULT_EXCLUSIONS] })}
            className="text-[11px] text-slate-500 hover:text-[#0e3c63] flex items-center gap-1 font-semibold p-1"
            title="Reset to default exclusions"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="space-y-1.5 mb-2.5">
          {exclusions.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between bg-rose-50/50 border border-rose-200/80 px-3 py-2 rounded-xl text-xs"
            >
              <div className="flex items-start gap-2 pr-2 text-slate-800">
                <span className="text-rose-600 font-bold select-none">•</span>
                <span className="font-medium leading-snug">{item}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveExclusion(idx)}
                className="min-h-[38px] min-w-[38px] text-slate-400 hover:text-rose-500 flex items-center justify-center p-1 shrink-0 active:scale-90"
                aria-label="Remove exclusion"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddExclusion} className="flex gap-2">
          <input
            type="text"
            value={newExclusion}
            onChange={(e) => setNewExclusion(e.target.value)}
            placeholder="Add new exclusion point..."
            className="flex-1 min-h-[44px] px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
          <button
            type="submit"
            className="min-h-[44px] px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-rose-700 shadow-xs active:scale-95 transition-transform shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </form>
      </div>
    </div>
  );
};
