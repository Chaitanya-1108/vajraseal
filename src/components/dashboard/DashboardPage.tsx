import React, { useState, useMemo } from 'react';
import type { CompanySettings, Quotation } from '../../types/quotation';
import { QuotationCard } from './QuotationCard';
import { StatsOverview } from './StatsOverview';
import {
  Plus,
  Search,
  FileText,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface DashboardPageProps {
  quotations: Quotation[];
  settings: CompanySettings;
  onCreateNew: () => void;
  onView: (quotation: Quotation) => void;
  onEdit: (quotation: Quotation) => void;
  onDuplicate: (quotationId: string) => void;
  onDelete: (quotationId: string) => void;
  onResetSample: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  quotations,
  settings,
  onCreateNew,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
  onResetSample,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filtered quotations based on search & status
  const filteredQuotations = useMemo(() => {
    return quotations.filter((q) => {
      const matchSearch =
        q.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.clientCity.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        selectedStatus === 'all' || q.status === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [quotations, searchQuery, selectedStatus]);

  const confirmDelete = () => {
    if (deletingId) {
      onDelete(deletingId);
      setDeletingId(null);
    }
  };

  const statusFilters = [
    { key: 'all', label: 'All Quotations' },
    { key: 'draft', label: 'Drafts' },
    { key: 'issued', label: 'Issued' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
  ];

  return (
    <div className="pb-24 max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Hero Welcome & Top CTA */}
      <div className="bg-gradient-to-r from-[#0e3c63] to-[#0a2742] rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-200 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Waterproofing Quotation System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-baseline gap-2">
            <span className="text-orange-400 font-devanagari">
              {settings.companyNameHindi}
            </span>
            <span>{settings.companyNameEnglish} Quotations</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            Generate, customize, and download true A4 waterproofing quotations on your mobile.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Quotation</span>
        </button>
      </div>

      {/* Stats Summary */}
      <StatsOverview quotations={quotations} />

      {/* Search and Filters Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by quotation number, client name, or city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63] transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {statusFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setSelectedStatus(f.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedStatus === f.key
                  ? 'bg-[#0e3c63] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quotations List */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
            Recent Quotations ({filteredQuotations.length})
          </h2>
          {quotations.length === 0 && (
            <button
              onClick={onResetSample}
              className="text-xs text-[#0e3c63] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Load Reference Sample</span>
            </button>
          )}
        </div>

        {filteredQuotations.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 bg-blue-50 text-[#0e3c63] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No quotations found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              {searchQuery
                ? `No quotation matches your search "${searchQuery}".`
                : 'Get started by creating your first waterproofing quotation.'}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                onClick={onCreateNew}
                className="px-4 py-2 bg-[#0e3c63] text-white rounded-xl text-xs font-bold hover:bg-[#114979]"
              >
                Create Quotation
              </button>
              {quotations.length === 0 && (
                <button
                  onClick={onResetSample}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
                >
                  Load Reference Sample
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuotations.map((q) => (
              <QuotationCard
                key={q.id}
                quotation={q}
                settings={settings}
                onView={() => onView(q)}
                onEdit={() => onEdit(q)}
                onDuplicate={() => onDuplicate(q.id)}
                onDelete={() => setDeletingId(q.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 animate-scale-up">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Quotation?</h3>
            <p className="text-xs text-slate-600 mt-1">
              This quotation will be permanently removed from your device storage. This action cannot be undone.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Floating Action Button (FAB) for Create New - Positioned safely above bottom nav */}
      <div className="sm:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={onCreateNew}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl shadow-orange-500/50 flex items-center justify-center active:scale-95 transition-transform"
          title="Create New Quotation"
          type="button"
          aria-label="Create New Quotation"
        >
          <Plus className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
