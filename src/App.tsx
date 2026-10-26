import { useState, useEffect } from 'react';
import type { CompanySettings, Quotation } from './types/quotation';
import {
  getQuotations,
  getCompanySettings,
  saveQuotation,
  saveCompanySettings,
  deleteQuotation,
  duplicateQuotation,
  exportBackupData,
  importBackupData,
  resetToSampleData,
} from './utils/storage';
import { formatQuotationNumber, getNextSequenceNumber, isQuotationNumberDuplicate } from './utils/numbering';
import { getCurrentDateFormatted } from './utils/formatters';
import { SAMPLE_QUOTATION } from './constants/defaults';
import { Navbar, type ActiveTab } from './components/common/Navbar';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { QuotationEditor } from './components/editor/QuotationEditor';
import { PreviewPage } from './components/preview/PreviewPage';
import { SettingsPage } from './components/settings/SettingsPage';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [settings, setSettings] = useState<CompanySettings>(getCompanySettings());
  const [currentQuotation, setCurrentQuotation] = useState<Quotation>(SAMPLE_QUOTATION);

  // Load initial data on mount
  useEffect(() => {
    const loadedQuotations = getQuotations();
    const loadedSettings = getCompanySettings();
    setQuotations(loadedQuotations);
    setSettings(loadedSettings);

    if (loadedQuotations.length > 0) {
      setCurrentQuotation(loadedQuotations[0]);
    }
  }, []);

  // Handler: Create New Quotation
  const handleCreateNew = () => {
    const nextSeq = getNextSequenceNumber(quotations, settings.currentSequenceNumber);
    const newNumber = formatQuotationNumber(settings.quotationPrefix, nextSeq);

    // Increment settings sequence
    const updatedSettings = {
      ...settings,
      currentSequenceNumber: nextSeq + 1,
    };
    saveCompanySettings(updatedSettings);
    setSettings(updatedSettings);

    const now = new Date().toISOString();
    const newQuotation: Quotation = {
      id: 'quote_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      quotationNumber: newNumber,
      quotationDate: getCurrentDateFormatted(),
      clientName: '',
      clientCity: '',
      clientAddress: '',
      clientPhone: '',
      subject: settings.defaultSubject,
      greeting: settings.defaultGreeting,
      introParagraph1: settings.defaultIntro1,
      introParagraph2: settings.defaultIntro2,
      servicesList: [...settings.defaultServicesList],
      showServicesList: true,
      tableSectionTitle: 'WATERPROOFING QUOTATION',
      treatmentItems: settings.defaultTreatmentItems.map((item, idx) => ({
        ...item,
        id: `new_item_${idx}_${Date.now()}`,
      })),
      inclusions: [...settings.defaultInclusions],
      exclusions: [...settings.defaultExclusions],
      materialConditions: settings.defaultMaterialCondition,
      paymentTerms: [...settings.defaultPaymentTerms],
      brandStatement: settings.defaultBrandStatement,
      signatureName: settings.signatoryName,
      signaturePhone: settings.signatoryPhone,
      authorizedVendorText: settings.authorizedVendorFooter,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    };

    saveQuotation(newQuotation);
    setQuotations(getQuotations());
    setCurrentQuotation(newQuotation);
    setActiveTab('editor');
  };

  // Handler: Save Quotation Draft
  const handleSaveQuotation = (updated: Quotation) => {
    saveQuotation(updated);
    setQuotations(getQuotations());
    setCurrentQuotation(updated);
  };

  // Handler: Preview Quotation
  const handlePreviewQuotation = (quotation: Quotation) => {
    saveQuotation(quotation);
    setCurrentQuotation(quotation);
    setActiveTab('preview');
  };

  // Handler: Duplicate Quotation
  const handleDuplicateQuotation = (sourceId: string) => {
    const dup = duplicateQuotation(sourceId);
    if (dup) {
      const updatedList = getQuotations();
      setQuotations(updatedList);
      setSettings(getCompanySettings());
      setCurrentQuotation(dup);
      setActiveTab('editor');
    }
  };

  // Handler: Delete Quotation
  const handleDeleteQuotation = (id: string) => {
    deleteQuotation(id);
    const updated = getQuotations();
    setQuotations(updated);
    if (currentQuotation.id === id && updated.length > 0) {
      setCurrentQuotation(updated[0]);
    }
  };

  // Handler: Save Settings
  const handleSaveSettings = (newSettings: CompanySettings) => {
    saveCompanySettings(newSettings);
    setSettings(newSettings);
  };

  // Handler: Export Backup JSON
  const handleExportBackup = () => {
    const jsonStr = exportBackupData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VajraSeal_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handler: Import Backup JSON
  const handleImportBackup = (jsonString: string) => {
    const result = importBackupData(jsonString);
    if (result.success) {
      setQuotations(getQuotations());
      const loadedSettings = getCompanySettings();
      setSettings(loadedSettings);
      const list = getQuotations();
      if (list.length > 0) {
        setCurrentQuotation(list[0]);
      }
    }
    return result;
  };

  // Handler: Reset to Sample Reference
  const handleResetSample = () => {
    resetToSampleData();
    setQuotations(getQuotations());
    setSettings(getCompanySettings());
    setCurrentQuotation(SAMPLE_QUOTATION);
  };

  const isDuplicateNumber = isQuotationNumberDuplicate(
    quotations,
    currentQuotation.quotationNumber,
    currentQuotation.id
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Hide standard navbar when in full-screen Preview mode */}
      {activeTab !== 'preview' && (
        <Navbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          settings={settings}
          quotationCount={quotations.length}
        />
      )}

      {/* Main Page Routing */}
      <main className="flex-1 py-4 sm:py-6">
        {activeTab === 'dashboard' && (
          <DashboardPage
            quotations={quotations}
            settings={settings}
            onCreateNew={handleCreateNew}
            onView={(q) => {
              setCurrentQuotation(q);
              setActiveTab('preview');
            }}
            onEdit={(q) => {
              setCurrentQuotation(q);
              setActiveTab('editor');
            }}
            onDuplicate={handleDuplicateQuotation}
            onDelete={handleDeleteQuotation}
            onResetSample={handleResetSample}
          />
        )}

        {activeTab === 'editor' && (
          <QuotationEditor
            quotation={currentQuotation}
            settings={settings}
            onSave={handleSaveQuotation}
            onPreview={handlePreviewQuotation}
            onBack={() => setActiveTab('dashboard')}
            isDuplicateNumber={isDuplicateNumber}
          />
        )}

        {activeTab === 'preview' && (
          <PreviewPage
            quotation={currentQuotation}
            settings={settings}
            onEdit={() => setActiveTab('editor')}
            onBack={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsPage
            settings={settings}
            onSave={handleSaveSettings}
            onExportBackup={handleExportBackup}
            onImportBackup={handleImportBackup}
            onResetSampleData={handleResetSample}
          />
        )}
      </main>
    </div>
  );
}

export default App;
