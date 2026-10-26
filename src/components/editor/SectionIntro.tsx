import React, { useState } from 'react';
import type { Quotation } from '../../types/quotation';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface SectionIntroProps {
  quotation: Quotation;
  onChange: (updated: Partial<Quotation>) => void;
}

export const SectionIntro: React.FC<SectionIntroProps> = ({
  quotation,
  onChange,
}) => {
  const [newService, setNewService] = useState('');

  const handleAddService = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newService.trim()) return;
    onChange({
      servicesList: [...quotation.servicesList, newService.trim()],
    });
    setNewService('');
  };

  const handleRemoveService = (index: number) => {
    const updated = quotation.servicesList.filter((_, idx) => idx !== index);
    onChange({ servicesList: updated });
  };

  return (
    <div className="space-y-4">
      {/* Subject Line */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          Proposal Subject *
        </label>
        <div className="flex rounded-xl overflow-hidden border border-slate-300 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-[#0e3c63]">
          <span className="bg-orange-50 px-3 py-2.5 text-xs font-black text-[#e66827] border-r border-orange-200 flex items-center select-none">
            SUBJECT :-
          </span>
          <input
            type="text"
            value={quotation.subject}
            onChange={(e) => onChange({ subject: e.target.value })}
            className="w-full px-3 py-2.5 text-sm font-semibold bg-white focus:outline-none"
            placeholder="e.g. Proposal for Waterproofing Work"
            required
          />
        </div>
      </div>

      {/* Greeting & Intro Paragraphs */}
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Salutation / Greeting
          </label>
          <input
            type="text"
            value={quotation.greeting}
            onChange={(e) => onChange({ greeting: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
            placeholder="e.g. Dear Sir/Madam,"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Introduction Opening Paragraph
          </label>
          <textarea
            rows={2}
            value={quotation.introParagraph1}
            onChange={(e) => onChange({ introParagraph1: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
            placeholder="We would like to offer our waterproofing services..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Services Header Text
          </label>
          <input
            type="text"
            value={quotation.introParagraph2}
            onChange={(e) => onChange({ introParagraph2: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
            placeholder="We have good experience in the waterproofing field and provide the following services:"
          />
        </div>
      </div>

      {/* Services Bullet Points with Toggle */}
      <div className="pt-2 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Waterproofing Services List
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={quotation.showServicesList}
              onChange={(e) => onChange({ showServicesList: e.target.checked })}
              className="rounded text-[#0e3c63] focus:ring-[#0e3c63] w-4 h-4"
            />
            <span>Show on quotation</span>
          </label>
        </div>

        {quotation.showServicesList && (
          <div className="space-y-2">
            <div className="space-y-1.5">
              {quotation.servicesList.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl text-xs font-medium"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0e3c63]" />
                    <span>{service}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(idx)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add service form */}
            <form onSubmit={handleAddService} className="flex gap-2 pt-1">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Add service (e.g. Expansion Joint Treatment)"
                className="flex-1 min-h-[44px] px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                className="min-h-[44px] px-4 py-2 bg-[#0e3c63] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#114979] active:scale-95 transition-transform shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
