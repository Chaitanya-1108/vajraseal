import React from 'react';
import { UserCheck, Phone, Shield } from 'lucide-react';

interface SectionSignatoryProps {
  signatureName: string;
  signaturePhone: string;
  authorizedVendorText: string;
  onChange: (updated: {
    signatureName?: string;
    signaturePhone?: string;
    authorizedVendorText?: string;
  }) => void;
}

export const SectionSignatory: React.FC<SectionSignatoryProps> = ({
  signatureName,
  signaturePhone,
  authorizedVendorText,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-[#0e3c63]" />
            Signatory Name
          </label>
          <input
            type="text"
            value={signatureName}
            onChange={(e) => onChange({ signatureName: e.target.value })}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
            placeholder="e.g. Rajendra Deshpande"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#0e3c63]" />
            Signatory Phone
          </label>
          <input
            type="tel"
            value={signaturePhone}
            onChange={(e) => onChange({ signaturePhone: e.target.value })}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
            placeholder="e.g. 9423116548"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#0e3c63]" />
          Footer Authorized Vendor Statement
        </label>
        <input
          type="text"
          value={authorizedVendorText}
          onChange={(e) => onChange({ authorizedVendorText: e.target.value })}
          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0e3c63]"
          placeholder="e.g. Authorized Waterproofing Vendor of Ultratech Cement"
        />
        <p className="text-[11px] text-slate-500 mt-0.5">
          Displayed across the solid navy banner at the bottom of the page.
        </p>
      </div>
    </div>
  );
};
