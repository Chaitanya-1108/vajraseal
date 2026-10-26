import React, { useState } from 'react';
import type { CompanySettings, Quotation } from '../../types/quotation';
import { SectionClientInfo } from './SectionClientInfo';
import { SectionIntro } from './SectionIntro';
import { SectionTreatments } from './SectionTreatments';
import { SectionInclusionsExclusions } from './SectionInclusionsExclusions';
import { SectionTerms } from './SectionTerms';
import { SectionSignatory } from './SectionSignatory';
import { JPGGeneratorButton } from '../jpg/JPGGeneratorButton';
import { QuotationPreview } from '../preview/QuotationPreview';
import {
  Save,
  Eye,
  ChevronDown,
  ChevronUp,
  User,
  FileText,
  Layers,
  ListCheck,
  CreditCard,
  PenTool,
  Check,
  ArrowLeft,
} from 'lucide-react';

interface QuotationEditorProps {
  quotation: Quotation;
  settings: CompanySettings;
  onSave: (quotation: Quotation) => void;
  onPreview: (quotation: Quotation) => void;
  onBack: () => void;
  isDuplicateNumber?: boolean;
}

export const QuotationEditor: React.FC<QuotationEditorProps> = ({
  quotation: initialQuotation,
  settings,
  onSave,
  onPreview,
  onBack,
  isDuplicateNumber = false,
}) => {
  const [formData, setFormData] = useState<Quotation>(initialQuotation);
  const [showSavedAlert, setShowSavedAlert] = useState(false);

  // Accordion section open/collapse states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    client: true,
    intro: false,
    treatments: true,
    inclusions: false,
    terms: false,
    signatory: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (updates: Partial<Quotation>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = () => {
    onSave(formData);
    setShowSavedAlert(true);
    setTimeout(() => setShowSavedAlert(false), 2500);
  };

  const sections = [
    {
      key: 'client',
      title: '1. Client & Quotation Details',
      subtitle: `${formData.clientName || 'Add client'} • ${formData.quotationNumber}`,
      icon: User,
      component: (
        <SectionClientInfo
          quotation={formData}
          onChange={handleChange}
          isDuplicateNumber={isDuplicateNumber}
        />
      ),
    },
    {
      key: 'intro',
      title: '2. Proposal Subject & Services List',
      subtitle: `${formData.subject} • ${formData.servicesList.length} services`,
      icon: FileText,
      component: <SectionIntro quotation={formData} onChange={handleChange} />,
    },
    {
      key: 'treatments',
      title: '3. Treatments & Pricing Table',
      subtitle: `${formData.treatmentItems.length} line items configured`,
      icon: Layers,
      component: (
        <SectionTreatments
          items={formData.treatmentItems}
          tableTitle={formData.tableSectionTitle}
          onItemsChange={(items) => handleChange({ treatmentItems: items })}
          onTableTitleChange={(title) => handleChange({ tableSectionTitle: title })}
          defaultPresets={settings.defaultTreatmentItems}
        />
      ),
    },
    {
      key: 'inclusions',
      title: '4. Inclusions & Exclusions',
      subtitle: `${formData.inclusions.length} includes • ${formData.exclusions.length} exclusions`,
      icon: ListCheck,
      component: (
        <SectionInclusionsExclusions
          inclusions={formData.inclusions}
          exclusions={formData.exclusions}
          onChange={handleChange}
        />
      ),
    },
    {
      key: 'terms',
      title: '5. Material Condition & Payment Terms',
      subtitle: `${formData.paymentTerms.length} payment stages`,
      icon: CreditCard,
      component: (
        <SectionTerms
          materialConditions={formData.materialConditions}
          paymentTerms={formData.paymentTerms}
          brandStatement={formData.brandStatement}
          onChange={handleChange}
        />
      ),
    },
    {
      key: 'signatory',
      title: '6. Signatory & Authorized Vendor',
      subtitle: `${formData.signatureName || settings.signatoryName}`,
      icon: PenTool,
      component: (
        <SectionSignatory
          signatureName={formData.signatureName}
          signaturePhone={formData.signaturePhone}
          authorizedVendorText={formData.authorizedVendorText}
          onChange={handleChange}
        />
      ),
    },
  ];

  return (
    <div className="pb-36 max-w-4xl mx-auto px-3 sm:px-6">
      {/* Top action header bar */}
      <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-md py-3 mb-4 border-b border-slate-200/90 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all shadow-xs active:scale-95"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Dashboard</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="flex items-center gap-2">
          {showSavedAlert && (
            <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Saved!</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-all shadow-xs active:scale-95"
          >
            <Save className="w-4 h-4 text-[#0e3c63]" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => onPreview(formData)}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0e3c63] to-[#114979] rounded-xl hover:shadow-md transition-all active:scale-95 shadow-xs"
          >
            <Eye className="w-4 h-4 text-cyan-300" />
            <span>Preview A4</span>
          </button>
        </div>
      </div>

      {/* Quotation title banner */}
      <div className="mb-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#0e3c63]">
            EDITING QUOTATION
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight truncate">
            {formData.quotationNumber}
          </h1>
          <p className="text-xs text-slate-500 font-medium truncate">
            For {formData.clientName || 'Untitled Client'} ({formData.clientCity || 'City'})
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#0e3c63]">
            {formData.status}
          </span>
          <div className="text-[11px] text-slate-400 mt-1 font-semibold">
            {formData.quotationDate}
          </div>
        </div>
      </div>

      {/* Accordion form sections */}
      <div className="space-y-3">
        {sections.map((sec) => {
          const isOpen = openSections[sec.key];
          const Icon = sec.icon;

          return (
            <div
              key={sec.key}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => toggleSection(sec.key)}
                className="w-full min-h-[50px] px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      isOpen ? 'bg-[#0e3c63] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                      {sec.title}
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                      {sec.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 p-1 shrink-0 ml-2">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100">
                  {sec.component}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Actions Bar for Mobile Phones */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2.5 px-3 sm:px-4 z-40 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="min-h-[44px] flex-1 py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <Save className="w-4 h-4 text-[#0e3c63] shrink-0" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => onPreview(formData)}
            className="min-h-[44px] flex-1 py-2 px-2.5 bg-[#0e3c63] hover:bg-[#114979] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-md"
          >
            <Eye className="w-4 h-4 text-cyan-300 shrink-0" />
            <span>Preview A4</span>
          </button>

          {/* Prominent High-Resolution Download JPG Button */}
          <JPGGeneratorButton
            quotation={formData}
            targetElementId="vajra-editor-export-host"
            variant="primary"
            showShare={true}
          />
        </div>
      </div>

      {/* Dedicated Off-Screen Render Host for High-Resolution (~2480x3508) JPG Export */}
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
          id="vajra-editor-export-host"
          style={{
            width: '794px',
            backgroundColor: '#ffffff',
            color: '#000000',
          }}
        >
          <QuotationPreview
            quotation={formData}
            settings={settings}
            scale={1}
            className="!shadow-none !m-0 !border-none"
          />
        </div>
      </div>
    </div>
  );
};
