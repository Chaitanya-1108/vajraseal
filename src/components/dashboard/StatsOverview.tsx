import React from 'react';
import type { Quotation } from '../../types/quotation';
import { FileText, Clock, Send, CheckCircle2 } from 'lucide-react';

interface StatsOverviewProps {
  quotations: Quotation[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ quotations }) => {
  const total = quotations.length;
  const drafts = quotations.filter((q) => q.status === 'draft').length;
  const issued = quotations.filter((q) => q.status === 'issued').length;
  const approved = quotations.filter((q) => q.status === 'approved').length;

  const stats = [
    { label: 'Total Quotes', count: total, icon: FileText, color: 'text-slate-800', bg: 'bg-slate-100' },
    { label: 'Drafts', count: drafts, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Issued', count: issued, icon: Send, color: 'text-[#0e3c63]', bg: 'bg-blue-50' },
    { label: 'Approved', count: approved, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div
            key={idx}
            className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-sm flex items-center gap-3"
          >
            <div className={`p-2.5 rounded-xl ${s.bg} shrink-0`}>
              <Icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {s.label}
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {s.count}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
