import React from 'react';
import type { CompanySettings } from '../../types/quotation';
import { BrandLogo } from './BrandLogo';
import { LayoutDashboard, PlusCircle, Settings } from 'lucide-react';

export type ActiveTab = 'dashboard' | 'editor' | 'preview' | 'settings';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  settings: CompanySettings;
  quotationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  settings,
}) => {
  return (
    <>
      {/* Top Desktop & Mobile Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between">
          {/* Logo brand click to home */}
          <button
            onClick={() => onTabChange('dashboard')}
            className="flex items-center text-left hover:opacity-90 transition-opacity min-h-[44px]"
            type="button"
            aria-label="Vajra Seal Home"
          >
            <BrandLogo
              customLogoUrl={settings.logoUrl}
              hindiName={settings.companyNameHindi}
              englishName={settings.companyNameEnglish}
              businessType={settings.businessType}
              tagline={settings.tagline}
              size="sm"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                activeTab === 'dashboard'
                  ? 'bg-[#0e3c63] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              type="button"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onTabChange('editor')}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                activeTab === 'editor'
                  ? 'bg-[#0e3c63] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              type="button"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Quotation</span>
            </button>

            <button
              onClick={() => onTabChange('settings')}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                activeTab === 'settings'
                  ? 'bg-[#0e3c63] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              type="button"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Fixed for phones) */}
      <nav
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-4 shadow-2xl flex items-center justify-around"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <button
          onClick={() => onTabChange('dashboard')}
          className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-95 ${
            activeTab === 'dashboard'
              ? 'text-[#0e3c63] font-bold'
              : 'text-slate-400 hover:text-slate-700'
          }`}
          type="button"
          aria-label="Dashboard"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">Dashboard</span>
        </button>

        <button
          onClick={() => onTabChange('editor')}
          className="flex flex-col items-center -mt-5 active:scale-90 transition-transform"
          type="button"
          aria-label="Create New Quotation"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/40 flex items-center justify-center">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 mt-1">Create</span>
        </button>

        <button
          onClick={() => onTabChange('settings')}
          className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-95 ${
            activeTab === 'settings'
              ? 'text-[#0e3c63] font-bold'
              : 'text-slate-400 hover:text-slate-700'
          }`}
          type="button"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px]">Settings</span>
        </button>
      </nav>
    </>
  );
};
