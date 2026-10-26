import React, { useState } from 'react';
import type { CompanySettings, TreatmentItem } from '../../types/quotation';
import { BrandLogo } from '../common/BrandLogo';
import { DEFAULT_COMPANY_SETTINGS } from '../../constants/defaults';
import {
  Save,
  Building,
  Upload,
  RotateCcw,
  Download,
  FileUp,
  Layers,
  Plus,
  Trash2,
  Check,
  AlertCircle,
} from 'lucide-react';

interface SettingsPageProps {
  settings: CompanySettings;
  onSave: (settings: CompanySettings) => void;
  onExportBackup: () => void;
  onImportBackup: (jsonString: string) => { success: boolean; message: string; count?: number };
  onResetSampleData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings: initialSettings,
  onSave,
  onExportBackup,
  onImportBackup,
  onResetSampleData,
}) => {
  const [formData, setFormData] = useState<CompanySettings>(initialSettings);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importMessage, setImportMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [showImportConfirm, setShowImportConfirm] = useState(false);
  const [pendingImportJson, setPendingImportJson] = useState<string | null>(null);

  const handleChange = (updates: Partial<CompanySettings>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Image upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Logo image should be under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        handleChange({ logoUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  // JSON Import handler
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setPendingImportJson(content);
        setShowImportConfirm(true);
      };
      reader.readAsText(file);
    }
  };

  const confirmImport = () => {
    if (pendingImportJson) {
      const result = onImportBackup(pendingImportJson);
      setImportMessage({
        text: result.message,
        error: !result.success,
      });
      if (result.success) {
        // Refresh formData from imported
        try {
          const parsed = JSON.parse(pendingImportJson);
          if (parsed.settings) {
            setFormData({ ...DEFAULT_COMPANY_SETTINGS, ...parsed.settings });
          }
        } catch {
          // Ignore
        }
      }
      setShowImportConfirm(false);
      setPendingImportJson(null);
    }
  };

  // Treatment Item default rates
  const handleAddDefaultItem = () => {
    const newItem: TreatmentItem = {
      id: 'def_' + Date.now(),
      treatmentName: 'New Waterproofing Treatment',
      rate: '₹ 0/- Sq. Ft',
      isCategoryHeader: false,
    };
    handleChange({
      defaultTreatmentItems: [...formData.defaultTreatmentItems, newItem],
    });
  };

  const handleUpdateDefaultItem = (id: string, updates: Partial<TreatmentItem>) => {
    const updated = formData.defaultTreatmentItems.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    handleChange({ defaultTreatmentItems: updated });
  };

  const handleRemoveDefaultItem = (id: string) => {
    const updated = formData.defaultTreatmentItems.filter((item) => item.id !== id);
    handleChange({ defaultTreatmentItems: updated });
  };

  return (
    <div className="pb-28 max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Settings Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#0e3c63]">
            CONFIGURATION
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Company Settings & Defaults
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Configure business branding, signatory details, default rates, and backup data.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-gradient-to-r from-[#0e3c63] to-[#114979] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-900/20 active:scale-95 transition-all"
        >
          {saveSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Saved Successfully!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Branding & Logo */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building className="w-4 h-4 text-[#0e3c63]" />
            <h2 className="text-sm font-bold text-slate-900">
              1. Brand Identity & Header
            </h2>
          </div>

          {/* Live Logo Preview Box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BrandLogo
                customLogoUrl={formData.logoUrl}
                hindiName={formData.companyNameHindi}
                englishName={formData.companyNameEnglish}
                businessType={formData.businessType}
                tagline={formData.tagline}
                size="md"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="cursor-pointer px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>

              {formData.logoUrl && (
                <button
                  type="button"
                  onClick={() => handleChange({ logoUrl: '' })}
                  className="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-semibold"
                >
                  Reset Default
                </button>
              )}
            </div>
          </div>

          {/* Name & Tagline Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Company Name (Devanagari / Hindi)
              </label>
              <input
                type="text"
                value={formData.companyNameHindi}
                onChange={(e) => handleChange({ companyNameHindi: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-[#e66827] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="वज्र"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Company Name (English)
              </label>
              <input
                type="text"
                value={formData.companyNameEnglish}
                onChange={(e) => handleChange({ companyNameEnglish: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-[#0e3c63] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="SEAL"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Business Type / Subtitle
              </label>
              <input
                type="text"
                value={formData.businessType}
                onChange={(e) => handleChange({ businessType: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="WATERPROOFING SOLUTIONS"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange({ tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Stronger Walls | Drier Spaces | Longer Life"
              />
            </div>
          </div>

          {/* Address & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange({ address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="53, Laxmi Nagar, Yavatmal – 445001"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange({ phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="9423116548"
              />
            </div>
          </div>
        </div>

        {/* 2. Signatory & Authorized Vendor Statement */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              2. Signatory & Authorized Vendor Footer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Default Signatory Name
              </label>
              <input
                type="text"
                value={formData.signatoryName}
                onChange={(e) => handleChange({ signatoryName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Rajendra Deshpande"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Default Signatory Phone
              </label>
              <input
                type="tel"
                value={formData.signatoryPhone}
                onChange={(e) => handleChange({ signatoryPhone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="9423116548"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Authorized Vendor Statement (Footer)
            </label>
            <input
              type="text"
              value={formData.authorizedVendorFooter}
              onChange={(e) => handleChange({ authorizedVendorFooter: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Authorized Waterproofing Vendor of Ultratech Cement"
            />
          </div>
        </div>

        {/* 3. Numbering Sequence */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              3. Quotation Numbering Configuration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quotation Prefix
              </label>
              <input
                type="text"
                value={formData.quotationPrefix}
                onChange={(e) => handleChange({ quotationPrefix: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold uppercase bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="VS"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Next Sequence Number
              </label>
              <input
                type="number"
                value={formData.currentSequenceNumber}
                onChange={(e) =>
                  handleChange({ currentSequenceNumber: parseInt(e.target.value, 10) || 101 })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="101"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Preview format: <span className="font-bold text-[#0e3c63]">{formData.quotationPrefix}-{new Date().getFullYear()}-{String(formData.currentSequenceNumber).padStart(3, '0')}</span>
          </p>
        </div>

        {/* 4. Default Treatment Items & Rates */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0e3c63]" />
              <h2 className="text-sm font-bold text-slate-900">
                4. Default Treatment Items & Standard Rates
              </h2>
            </div>
            <button
              type="button"
              onClick={handleAddDefaultItem}
              className="text-xs text-[#0e3c63] font-bold flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Preset Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {formData.defaultTreatmentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs"
              >
                <input
                  type="text"
                  value={item.treatmentName}
                  onChange={(e) =>
                    handleUpdateDefaultItem(item.id, { treatmentName: e.target.value })
                  }
                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
                  placeholder="Treatment Name"
                />
                <input
                  type="text"
                  value={item.rate}
                  onChange={(e) => handleUpdateDefaultItem(item.id, { rate: e.target.value })}
                  className="w-32 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-[#0e3c63]"
                  placeholder="Rate (e.g. ₹ 70/- Sq. Ft)"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDefaultItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Backup, JSON Export & Import */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              5. Local Data Backup & Recovery
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Your quotations and settings are stored locally on this device. Export JSON backups regularly to keep your files secure or transfer them to another phone.
            </p>
          </div>

          {importMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                importMessage.error
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              {importMessage.error ? (
                <AlertCircle className="w-4 h-4 shrink-0" />
              ) : (
                <Check className="w-4 h-4 shrink-0" />
              )}
              <span>{importMessage.text}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
            {/* Export JSON Button */}
            <button
              type="button"
              onClick={onExportBackup}
              className="min-h-[44px] px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Export All to JSON</span>
            </button>

            {/* Import JSON Button */}
            <label className="min-h-[44px] cursor-pointer px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95">
              <FileUp className="w-4 h-4 text-[#0e3c63] shrink-0" />
              <span>Import JSON Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>

            {/* Reset to Sample Reference */}
            <button
              type="button"
              onClick={onResetSampleData}
              className="min-h-[44px] px-3.5 py-2.5 text-xs text-slate-600 hover:text-[#0e3c63] hover:bg-slate-100 rounded-xl font-semibold flex items-center justify-center gap-1.5 sm:ml-auto active:scale-95"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>Reset Reference Template</span>
            </button>
          </div>
        </div>

        {/* Save button footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#0e3c63] to-[#114979] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
          >
            Save All Settings
          </button>
        </div>
      </form>

      {/* Import Warning Modal */}
      {showImportConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Overwrite Existing Data?</h3>
            <p className="text-xs text-slate-600 mt-1">
              Importing this backup will replace current quotations and company settings. Make sure you have exported your current data if needed.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setShowImportConfirm(false);
                  setPendingImportJson(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmImport}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0e3c63] hover:bg-[#114979] text-white shadow-md"
              >
                Yes, Restore Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
