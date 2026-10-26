import React from 'react';
import type { TreatmentItem } from '../../types/quotation';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';

interface SectionTreatmentsProps {
  items: TreatmentItem[];
  tableTitle: string;
  onItemsChange: (items: TreatmentItem[]) => void;
  onTableTitleChange: (title: string) => void;
  defaultPresets?: TreatmentItem[];
}

export const SectionTreatments: React.FC<SectionTreatmentsProps> = ({
  items,
  tableTitle,
  onItemsChange,
  onTableTitleChange,
  defaultPresets = [],
}) => {
  const handleAddItem = (isCategoryHeader = false) => {
    const newItem: TreatmentItem = {
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      srNo: isCategoryHeader ? '' : String(items.filter((i) => !i.isCategoryHeader).length + 1),
      isCategoryHeader,
      treatmentName: isCategoryHeader ? 'New Treatment Category' : 'New Waterproofing Treatment',
      rate: isCategoryHeader ? '' : '₹ 0/-',
    };
    onItemsChange([...items, newItem]);
  };

  const handleUpdateItem = (id: string, updates: Partial<TreatmentItem>) => {
    const updated = items.map((item) => (item.id === id ? { ...item, ...updates } : item));
    onItemsChange(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    // Recalculate default sr numbers
    let currentSr = 1;
    const renumbered = updated.map((item) => {
      if (item.isCategoryHeader) return item;
      return { ...item, srNo: item.srNo ? String(currentSr++) : '' };
    });
    onItemsChange(renumbered);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onItemsChange(updated);
  };

  const handleAddPreset = (preset: TreatmentItem) => {
    const newItem: TreatmentItem = {
      ...preset,
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      srNo: preset.isCategoryHeader ? '' : String(items.filter((i) => !i.isCategoryHeader).length + 1),
    };
    onItemsChange([...items, newItem]);
  };

  return (
    <div className="space-y-4">
      {/* Table Section Title */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          Table Section Heading
        </label>
        <input
          type="text"
          value={tableTitle}
          onChange={(e) => onTableTitleChange(e.target.value)}
          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-[#e66827] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
          placeholder="WATERPROOFING QUOTATION"
        />
      </div>

      {/* Preset Quick-Buttons */}
      {defaultPresets.length > 0 && (
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3">
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Quick-Add Saved Treatments</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {defaultPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddPreset(preset)}
                className="min-h-[38px] px-3 py-1.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-medium text-slate-800 flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 text-[#0e3c63]" />
                <span className="truncate max-w-[150px] xs:max-w-none">{preset.treatmentName}</span>
                {preset.rate && (
                  <span className="font-bold text-[#0e3c63] bg-blue-50 px-1.5 py-0.5 rounded text-[10px]">
                    {preset.rate}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`border rounded-2xl p-3.5 transition-all shadow-xs ${
              item.isCategoryHeader
                ? 'bg-amber-50/50 border-amber-200'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Top row: Badges, Reorder, Delete */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                {item.isCategoryHeader ? (
                  <span className="px-2.5 py-1 rounded-md bg-amber-200 text-amber-900 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    Category Subheader
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-md bg-[#0e3c63] text-white text-[11px] font-black">
                    #{item.srNo || index + 1}
                  </span>
                )}
              </div>

              {/* Action Buttons: Move Up/Down, Delete with touch targets */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="min-h-[40px] min-w-[40px] p-2 rounded-xl text-slate-600 hover:bg-slate-100 disabled:opacity-25 flex items-center justify-center active:scale-90"
                  title="Move Up"
                  aria-label="Move item up"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="min-h-[40px] min-w-[40px] p-2 rounded-xl text-slate-600 hover:bg-slate-100 disabled:opacity-25 flex items-center justify-center active:scale-90"
                  title="Move Down"
                  aria-label="Move item down"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="min-h-[40px] min-w-[40px] p-2 rounded-xl text-rose-500 hover:bg-rose-50 flex items-center justify-center ml-1 active:scale-90"
                  title="Delete Item"
                  aria-label="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inputs based on item type */}
            {item.isCategoryHeader ? (
              <div>
                <label className="block text-[11px] font-bold text-amber-800 mb-1">
                  Category Title (appears bold across row in table)
                </label>
                <input
                  type="text"
                  value={item.treatmentName}
                  onChange={(e) => handleUpdateItem(item.id, { treatmentName: e.target.value })}
                  className="w-full min-h-[44px] px-3 py-2 rounded-xl border border-amber-300 bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-200"
                  placeholder="e.g. Waterproofing Treatment for Floor & Wall"
                />
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-3 sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">
                      Sr. No.
                    </label>
                    <input
                      type="text"
                      value={item.srNo || ''}
                      onChange={(e) => handleUpdateItem(item.id, { srNo: e.target.value })}
                      className="w-full min-h-[44px] px-2 py-2 rounded-xl border border-slate-300 text-xs text-center font-bold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="1"
                    />
                  </div>

                  <div className="col-span-9 sm:col-span-6">
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">
                      Treatment Area / Item *
                    </label>
                    <input
                      type="text"
                      value={item.treatmentName}
                      onChange={(e) => handleUpdateItem(item.id, { treatmentName: e.target.value })}
                      className="w-full min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="e.g. Grouting per hole / Fosroc Hydroproof Xtra"
                      required
                    />
                  </div>

                  <div className="col-span-12 sm:col-span-4">
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">
                      Rate / Unit *
                    </label>
                    <input
                      type="text"
                      value={item.rate}
                      onChange={(e) => handleUpdateItem(item.id, { rate: e.target.value })}
                      className="w-full min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-[#0e3c63] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="e.g. ₹ 200/- or ₹ 70/- Sq. Ft"
                      required
                    />
                  </div>
                </div>

                {/* Optional Product Name / Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <input
                    type="text"
                    value={item.productName || ''}
                    onChange={(e) => handleUpdateItem(item.id, { productName: e.target.value })}
                    className="w-full min-h-[40px] px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] bg-slate-50 focus:bg-white focus:outline-none"
                    placeholder="Product (optional, e.g. Fosroc)"
                  />
                  <input
                    type="text"
                    value={item.description || ''}
                    onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                    className="w-full min-h-[40px] px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] bg-slate-50 focus:bg-white focus:outline-none"
                    placeholder="Note (optional, e.g. for Potable Water tank)"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Item Actions */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
        <button
          type="button"
          onClick={() => handleAddItem(false)}
          className="min-h-[46px] flex-1 py-3 px-4 bg-[#0e3c63] hover:bg-[#114979] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Treatment Item</span>
        </button>
        <button
          type="button"
          onClick={() => handleAddItem(true)}
          className="min-h-[46px] py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
        >
          <Layers className="w-4 h-4" />
          <span>Add Category Subheader</span>
        </button>
      </div>
    </div>
  );
};
