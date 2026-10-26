import React from 'react';
import type { CompanySettings, Quotation } from '../../types/quotation';
import { BrandLogo } from '../common/BrandLogo';
import { Home, Phone } from 'lucide-react';

interface QuotationPreviewProps {
  quotation: Quotation;
  settings: CompanySettings;
  scale?: number;
  className?: string;
  id?: string;
}

export const QuotationPreview: React.FC<QuotationPreviewProps> = ({
  quotation,
  settings,
  scale = 1,
  className = '',
  id = 'quotation-a4-document',
}) => {
  return (
    <div
      className={`relative bg-white shadow-2xl transition-transform origin-top mx-auto ${className}`}
      style={{
        width: '210mm',
        minHeight: '297mm',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        boxSizing: 'border-box',
        color: '#000000',
        fontFamily: "'Inter', 'Noto Sans Devanagari', Arial, sans-serif",
      }}
      id={id}
    >
      {/* Outer Content Container with padding */}
      <div className="p-8 pb-14 flex flex-col justify-between min-h-[297mm] box-sizing">
        <div>
          {/* 1. Header: Logo (Left) and Address/Phone (Right) */}
          <div className="flex items-center justify-between pb-4 border-b border-transparent">
            {/* Left: Brand Logo & Tagline */}
            <div className="pr-4">
              <BrandLogo
                customLogoUrl={settings.logoUrl}
                hindiName={settings.companyNameHindi}
                englishName={settings.companyNameEnglish}
                businessType={settings.businessType}
                tagline={settings.tagline}
                size="document"
              />
            </div>

            {/* Vertical separator */}
            <div className="w-[1.5px] h-14 bg-slate-400 mx-2 self-center"></div>

            {/* Right: Address & Phone */}
            <div className="flex flex-col items-end text-right pl-3 text-[13px] font-bold text-slate-900 leading-snug">
              <div className="flex items-center gap-1.5 justify-end">
                <span>{settings.address}</span>
                <span className="p-1 rounded bg-[#0e3c63] text-white inline-flex items-center justify-center">
                  <Home className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="flex items-center gap-1.5 justify-end mt-2">
                <span className="tracking-wide text-[14px]">{settings.phone}</span>
                <span className="p-1 rounded bg-[#0e3c63] text-white inline-flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* 2. Cyan Information Banner */}
          <div className="mt-2 bg-[#8ee2fc] rounded-none p-3.5 text-slate-900 grid grid-cols-2 gap-4 relative">
            {/* Left Column: Quotation Details */}
            <div className="pr-4 border-r border-[#0e3c63]/40">
              <div className="text-[#e66827] font-bold text-[14px] tracking-wide uppercase mb-1">
                QUOTATION DETAILS
              </div>
              <div className="text-[13px] font-bold">
                <span className="text-slate-900">Quotation No.:</span>{' '}
                <span className="text-black font-extrabold">{quotation.quotationNumber}</span>
              </div>
              <div className="text-[13px] font-bold mt-0.5">
                <span className="text-slate-900">Date:</span>{' '}
                <span className="text-black font-extrabold">{quotation.quotationDate}</span>
              </div>
            </div>

            {/* Right Column: Prepared For */}
            <div className="pl-2">
              <div className="text-[#e66827] font-bold text-[14px] tracking-wide uppercase mb-1">
                PREPARED FOR
              </div>
              <div className="text-[13px] font-bold">
                <span className="text-slate-900">Client Name:</span>{' '}
                <span className="text-black font-extrabold">{quotation.clientName}</span>
              </div>
              <div className="text-[13px] font-bold mt-0.5">
                <span className="text-slate-900">City:</span>{' '}
                <span className="text-black font-extrabold">{quotation.clientCity}</span>
              </div>
              {quotation.clientAddress && (
                <div className="text-[11.5px] font-medium text-slate-700 mt-0.5 leading-tight">
                  {quotation.clientAddress}
                </div>
              )}
            </div>
          </div>

          {/* 3. Subject Line */}
          <div className="mt-4 text-[14px]">
            <span className="text-[#e66827] font-bold tracking-wide">SUBJECT :- </span>
            <span className="font-extrabold text-black">{quotation.subject}</span>
          </div>

          {/* 4. Greeting & Introduction Paragraphs */}
          <div className="mt-1.5 text-[12.5px] text-slate-900 leading-snug">
            <div className="font-semibold">{quotation.greeting}</div>
            <div className="mt-1 font-medium text-slate-900">
              {quotation.introParagraph1}
            </div>
            {quotation.introParagraph2 && (
              <div className="mt-1 font-medium text-slate-900">
                {quotation.introParagraph2}
              </div>
            )}
          </div>

          {/* 5. Waterproofing Services Bullet List (if enabled) */}
          {quotation.showServicesList && quotation.servicesList.length > 0 && (
            <div className="mt-1.5 ml-3 space-y-0.5">
              {quotation.servicesList.map((service, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[12.5px] font-medium text-slate-900">
                  <span className="text-slate-900 text-lg leading-none select-none">•</span>
                  <span>{service}</span>
                </div>
              ))}
            </div>
          )}

          {/* 6. WATERPROOFING QUOTATION Heading */}
          <div className="mt-3.5 text-[#e66827] font-bold text-[14px] tracking-wide uppercase">
            {quotation.tableSectionTitle || 'WATERPROOFING QUOTATION'}
          </div>

          {/* 7. Pricing Table */}
          <div className="mt-1 border border-black overflow-hidden">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#0e3c63] text-white text-[13px] font-bold">
                  <th className="py-1.5 px-3 border-r border-black text-center w-[12%]">Sr. No.</th>
                  <th className="py-1.5 px-4 border-r border-black w-[60%]">Treatment Area</th>
                  <th className="py-1.5 px-4 text-center w-[28%]">Rate</th>
                </tr>
              </thead>
              <tbody className="text-[12.5px] font-semibold divide-y divide-black">
                {quotation.treatmentItems.map((item) => {
                  if (item.isCategoryHeader) {
                    return (
                      <tr key={item.id} className="bg-white border-t border-black">
                        <td className="py-1.5 px-3 border-r border-black text-center text-slate-400 select-none">
                          -
                        </td>
                        <td
                          colSpan={2}
                          className="py-1.5 px-4 font-bold text-black text-[13px]"
                        >
                          {item.treatmentName}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={item.id} className="bg-white border-t border-black">
                      <td className="py-1.5 px-3 border-r border-black text-center font-bold text-black align-top">
                        {item.srNo || ''}
                      </td>
                      <td className="py-1.5 px-4 border-r border-black align-top text-black">
                        <div className="font-bold">{item.treatmentName}</div>
                        {item.productName && (
                          <div className="text-[11.5px] text-slate-600 font-normal">
                            Product: {item.productName}
                          </div>
                        )}
                        {item.description && (
                          <div className="text-[11px] text-slate-600 font-normal mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </td>
                      <td className="py-1.5 px-4 align-top font-bold text-black">
                        <div className="flex items-center gap-1">
                          <span>{item.rate}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 8. INCLUDES Section */}
          <div className="mt-3">
            <div className="text-[#e66827] font-bold text-[13.5px] uppercase tracking-wide">
              INCLUDES
            </div>
            <div className="ml-2 mt-0.5 space-y-0.5">
              {quotation.inclusions.map((inc, i) => (
                <div key={i} className="flex items-start gap-2 text-[12px] font-medium text-slate-900 leading-snug">
                  <span className="text-black text-base leading-none select-none">•</span>
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 9. EXCLUSION (NOT INCLUDED) Section */}
          <div className="mt-2.5">
            <div className="text-[#e66827] font-bold text-[13.5px] uppercase tracking-wide">
              EXCLUSION (NOT INCLUDED)
            </div>
            <div className="ml-2 mt-0.5 space-y-0.5">
              {quotation.exclusions.map((exc, i) => (
                <div key={i} className="flex items-start gap-2 text-[12px] font-medium text-slate-900 leading-snug">
                  <span className="text-black text-base leading-none select-none">•</span>
                  <span>{exc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 10. Material Condition Banner */}
          {quotation.materialConditions && (
            <div className="mt-2.5 bg-[#dcf4fd] py-1.5 px-3 rounded-none text-center">
              <span className="text-[12px] font-extrabold text-black">
                {quotation.materialConditions}
              </span>
            </div>
          )}

          {/* 11. PAYMENT TERMS Section */}
          <div className="mt-2.5">
            <div className="text-[#e66827] font-bold text-[13.5px] uppercase tracking-wide">
              PAYMENT TERMS
            </div>
            <div className="ml-2 mt-0.5 space-y-0.5">
              {quotation.paymentTerms.map((term, i) => (
                <div key={i} className="flex items-start gap-2 text-[12px] font-medium text-slate-900 leading-snug">
                  <span className="text-black text-base leading-none select-none">•</span>
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 12. Brand Statement Banner */}
          {quotation.brandStatement && (
            <div className="mt-2.5 bg-[#dcf4fd] py-1.5 px-3 rounded-none text-center">
              <span className="text-[12px] font-extrabold text-black">
                {quotation.brandStatement}
              </span>
            </div>
          )}

          {/* 13. Signatory Details */}
          <div className="mt-3.5 flex justify-end">
            <div className="text-right">
              <div className="text-[14px] font-extrabold italic text-[#0e3c63]">
                {quotation.signatureName || settings.signatoryName}
              </div>
              <div className="text-[13px] font-extrabold text-[#0e3c63] tracking-wide">
                {quotation.signaturePhone || settings.signatoryPhone}
              </div>
            </div>
          </div>
        </div>

        {/* 14. Bottom Navy Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0e3c63] py-2.5 text-center text-white">
          <div className="text-[13.5px] font-extrabold italic tracking-wide">
            {quotation.authorizedVendorText || settings.authorizedVendorFooter}
          </div>
        </div>
      </div>
    </div>
  );
};
