import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  Path,
  Image,
} from '@react-pdf/renderer';
import type { CompanySettings, Quotation } from '../../types/quotation';

// Register Devanagari font with react-pdf
const isBrowser = typeof window !== 'undefined';
const regularFontSrc = isBrowser
  ? `${window.location.origin}/fonts/NotoSansDevanagari-Regular.ttf`
  : 'public/fonts/NotoSansDevanagari-Regular.ttf';
const boldFontSrc = isBrowser
  ? `${window.location.origin}/fonts/NotoSansDevanagari-Bold.ttf`
  : 'public/fonts/NotoSansDevanagari-Bold.ttf';

Font.register({
  family: 'NotoSansDevanagari',
  fonts: [
    {
      src: regularFontSrc,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: regularFontSrc,
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      src: boldFontSrc,
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: boldFontSrc,
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  ],
});

// Disable font hyphenation warnings
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    width: '210mm',
    height: '297mm',
    paddingTop: 24,
    paddingBottom: 36,
    paddingHorizontal: 28,
    fontFamily: 'NotoSansDevanagari',
    fontSize: 9.5,
    color: '#000000',
    backgroundColor: '#ffffff',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  // Header styles
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  logoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoTextCol: {
    flexDirection: 'column',
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  brandHindi: {
    color: '#e66827',
    fontSize: 20,
    fontWeight: 'bold',
  },
  brandEnglish: {
    color: '#0e3c63',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  brandBusinessType: {
    color: '#0e3c63',
    fontSize: 8.5,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginTop: 1,
  },
  brandTagline: {
    color: '#475569',
    fontSize: 7.5,
    marginTop: 1,
  },
  headerDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#94a3b8',
    marginHorizontal: 10,
  },
  headerContactBlock: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  contactText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  contactIconBadge: {
    backgroundColor: '#0e3c63',
    padding: 2,
    borderRadius: 2,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Cyan Banner
  cyanBanner: {
    backgroundColor: '#8ee2fc',
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  bannerColLeft: {
    width: '50%',
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: '#0e3c63',
  },
  bannerColRight: {
    width: '50%',
    paddingLeft: 10,
  },
  bannerHeading: {
    color: '#e66827',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  bannerTextRow: {
    flexDirection: 'row',
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  bannerLabel: {
    color: '#0f172a',
    width: 80,
  },
  bannerValue: {
    color: '#000000',
    fontWeight: 'bold',
    flex: 1,
  },

  // Subject
  subjectRow: {
    flexDirection: 'row',
    marginTop: 8,
    fontSize: 10,
  },
  subjectPrefix: {
    color: '#e66827',
    fontWeight: 'bold',
  },
  subjectTitle: {
    color: '#000000',
    fontWeight: 'bold',
  },

  // Intro
  introSection: {
    marginTop: 4,
    fontSize: 8.8,
    lineHeight: 1.25,
  },
  greeting: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  introParagraph: {
    marginBottom: 2,
  },
  serviceBulletRow: {
    flexDirection: 'row',
    marginLeft: 8,
    marginBottom: 1.5,
    alignItems: 'center',
  },
  serviceBulletDot: {
    fontSize: 11,
    marginRight: 4,
  },
  serviceText: {
    fontSize: 8.8,
  },

  // Quotation Table
  tableHeading: {
    color: '#e66827',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 7,
    marginBottom: 3,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000000',
    marginTop: 1,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#0e3c63',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 9,
  },
  tableColSr: {
    width: '12%',
    textAlign: 'center',
    paddingVertical: 3,
    paddingHorizontal: 2,
    borderRightWidth: 1,
    borderRightColor: '#000000',
  },
  tableColTreatment: {
    width: '63%',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderRightColor: '#000000',
  },
  tableColRate: {
    width: '25%',
    textAlign: 'center',
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    fontSize: 8.8,
  },
  tableCategoryHeaderRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    backgroundColor: '#ffffff',
  },
  tableCategoryHeaderText: {
    fontWeight: 'bold',
    fontSize: 9,
    paddingVertical: 3,
    paddingHorizontal: 6,
    color: '#000000',
  },
  treatmentItemTitle: {
    fontWeight: 'bold',
    fontSize: 9,
    color: '#000000',
  },
  treatmentItemDesc: {
    fontSize: 7.5,
    color: '#475569',
    marginTop: 1,
  },
  rateText: {
    fontWeight: 'bold',
    fontSize: 9,
    textAlign: 'center',
  },

  // Sections (Includes & Exclusions)
  sectionTitle: {
    color: '#e66827',
    fontSize: 9.5,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginLeft: 6,
    marginBottom: 1.2,
    alignItems: 'flex-start',
  },
  bulletDot: {
    fontSize: 9,
    marginRight: 4,
  },
  bulletText: {
    fontSize: 8.2,
    flex: 1,
    lineHeight: 1.2,
  },

  // Tinted banners (Material & Brand)
  tintedBanner: {
    backgroundColor: '#dcf4fd',
    paddingVertical: 3,
    paddingHorizontal: 6,
    textAlign: 'center',
    marginTop: 5,
  },
  tintedBannerText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },

  // Signatory
  signatoryContainer: {
    alignItems: 'flex-end',
    marginTop: 6,
    paddingRight: 6,
  },
  signatoryName: {
    fontSize: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#0e3c63',
  },
  signatoryPhone: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0e3c63',
    marginTop: 1,
  },

  // Full-width navy footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0e3c63',
    paddingVertical: 6,
    textAlign: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 9.5,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

interface QuotationPDFProps {
  quotation: Quotation;
  settings: CompanySettings;
}

export const QuotationPDFDocument: React.FC<QuotationPDFProps> = ({
  quotation,
  settings,
}) => {
  return (
    <Document
      title={`Quotation_${quotation.quotationNumber}_${quotation.clientName}`}
      author={settings.companyNameEnglish}
      subject={quotation.subject}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.contentContainer}>
          {/* 1. Header */}
          <View style={styles.headerContainer}>
            {/* Logo Left */}
            <View style={styles.logoBlock}>
              {settings.logoUrl ? (
                <Image
                  src={settings.logoUrl}
                  style={{ width: 44, height: 44, objectFit: 'contain' }}
                />
              ) : (
                <Svg width={42} height={42} viewBox="0 0 100 100">
                  {/* House outline */}
                  <Path
                    d="M50 10L14 42V88H86V42L50 10Z"
                    fill="#FFFFFF"
                    stroke="#0e3c63"
                    strokeWidth={7}
                  />
                  {/* Chimney */}
                  <Path
                    d="M70 28V18H78V35"
                    stroke="#0e3c63"
                    strokeWidth={6}
                  />
                  {/* Droplet */}
                  <Path
                    d="M50 32C50 32 34 50 34 62C34 71 41.2 78 50 78C58.8 78 66 71 66 62C66 50 50 32 50 32Z"
                    fill="#0284c7"
                  />
                  {/* Droplet shine */}
                  <Path
                    d="M42 56C42 52 44.5 48 47 46"
                    stroke="#bae6fd"
                    strokeWidth={3.5}
                  />
                </Svg>
              )}

              <View style={styles.logoTextCol}>
                <View style={styles.brandTitleRow}>
                  <Text style={styles.brandHindi}>{settings.companyNameHindi}</Text>
                  <Text style={styles.brandEnglish}>{settings.companyNameEnglish}</Text>
                </View>
                <Text style={styles.brandBusinessType}>{settings.businessType}</Text>
                <Text style={styles.brandTagline}>{settings.tagline}</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.headerDivider} />

            {/* Right: Address & Phone */}
            <View style={styles.headerContactBlock}>
              <View style={styles.contactRow}>
                <Text style={styles.contactText}>{settings.address}</Text>
                <View style={styles.contactIconBadge}>
                  <Svg width={9} height={9} viewBox="0 0 24 24">
                    <Path
                      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                      fill="#FFFFFF"
                    />
                  </Svg>
                </View>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.contactText}>{settings.phone}</Text>
                <View style={styles.contactIconBadge}>
                  <Svg width={9} height={9} viewBox="0 0 24 24">
                    <Path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      fill="#FFFFFF"
                    />
                  </Svg>
                </View>
              </View>
            </View>
          </View>

          {/* 2. Cyan Information Banner */}
          <View style={styles.cyanBanner}>
            <View style={styles.bannerColLeft}>
              <Text style={styles.bannerHeading}>QUOTATION DETAILS</Text>
              <View style={styles.bannerTextRow}>
                <Text style={styles.bannerLabel}>Quotation No.:</Text>
                <Text style={styles.bannerValue}>{quotation.quotationNumber}</Text>
              </View>
              <View style={styles.bannerTextRow}>
                <Text style={styles.bannerLabel}>Date:</Text>
                <Text style={styles.bannerValue}>{quotation.quotationDate}</Text>
              </View>
            </View>

            <View style={styles.bannerColRight}>
              <Text style={styles.bannerHeading}>PREPARED FOR</Text>
              <View style={styles.bannerTextRow}>
                <Text style={styles.bannerLabel}>Client Name:</Text>
                <Text style={styles.bannerValue}>{quotation.clientName}</Text>
              </View>
              <View style={styles.bannerTextRow}>
                <Text style={styles.bannerLabel}>City:</Text>
                <Text style={styles.bannerValue}>{quotation.clientCity}</Text>
              </View>
            </View>
          </View>

          {/* 3. Subject */}
          <View style={styles.subjectRow}>
            <Text style={styles.subjectPrefix}>SUBJECT :- </Text>
            <Text style={styles.subjectTitle}>{quotation.subject}</Text>
          </View>

          {/* 4. Greeting & Intro */}
          <View style={styles.introSection}>
            <Text style={styles.greeting}>{quotation.greeting}</Text>
            <Text style={styles.introParagraph}>{quotation.introParagraph1}</Text>
            {quotation.introParagraph2 ? (
              <Text style={styles.introParagraph}>{quotation.introParagraph2}</Text>
            ) : null}
          </View>

          {/* 5. Services List */}
          {quotation.showServicesList && quotation.servicesList.length > 0 && (
            <View>
              {quotation.servicesList.map((service, idx) => (
                <View key={idx} style={styles.serviceBulletRow}>
                  <Text style={styles.serviceBulletDot}>•</Text>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          )}

          {/* 6. Table Heading */}
          <Text style={styles.tableHeading}>
            {quotation.tableSectionTitle || 'WATERPROOFING QUOTATION'}
          </Text>

          {/* 7. Pricing Table */}
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.tableColSr}>Sr. No.</Text>
              <Text style={styles.tableColTreatment}>Treatment Area</Text>
              <Text style={styles.tableColRate}>Rate</Text>
            </View>

            {quotation.treatmentItems.map((item) => {
              if (item.isCategoryHeader) {
                return (
                  <View key={item.id} style={styles.tableCategoryHeaderRow}>
                    <Text style={[styles.tableColSr, { borderRightWidth: 1 }]}>-</Text>
                    <Text
                      style={[
                        styles.tableCategoryHeaderText,
                        { width: '88%' },
                      ]}
                    >
                      {item.treatmentName}
                    </Text>
                  </View>
                );
              }
              return (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={[styles.tableColSr, { fontWeight: 'bold' }]}>
                    {item.srNo || ''}
                  </Text>
                  <View style={styles.tableColTreatment}>
                    <Text style={styles.treatmentItemTitle}>{item.treatmentName}</Text>
                    {item.productName ? (
                      <Text style={styles.treatmentItemDesc}>
                        Product: {item.productName}
                      </Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.treatmentItemDesc}>{item.description}</Text>
                    ) : null}
                  </View>
                  <Text style={[styles.tableColRate, styles.rateText]}>
                    {item.rate}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* 8. INCLUDES */}
          <View>
            <Text style={styles.sectionTitle}>INCLUDES</Text>
            {quotation.inclusions.map((inc, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{inc}</Text>
              </View>
            ))}
          </View>

          {/* 9. EXCLUSION (NOT INCLUDED) */}
          <View>
            <Text style={styles.sectionTitle}>EXCLUSION (NOT INCLUDED)</Text>
            {quotation.exclusions.map((exc, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{exc}</Text>
              </View>
            ))}
          </View>

          {/* 10. Material Condition Banner */}
          {quotation.materialConditions ? (
            <View style={styles.tintedBanner}>
              <Text style={styles.tintedBannerText}>{quotation.materialConditions}</Text>
            </View>
          ) : null}

          {/* 11. PAYMENT TERMS */}
          <View>
            <Text style={styles.sectionTitle}>PAYMENT TERMS</Text>
            {quotation.paymentTerms.map((term, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{term}</Text>
              </View>
            ))}
          </View>

          {/* 12. Brand Statement Banner */}
          {quotation.brandStatement ? (
            <View style={styles.tintedBanner}>
              <Text style={styles.tintedBannerText}>{quotation.brandStatement}</Text>
            </View>
          ) : null}

          {/* 13. Signatory */}
          <View style={styles.signatoryContainer}>
            <Text style={styles.signatoryName}>
              {quotation.signatureName || settings.signatoryName}
            </Text>
            <Text style={styles.signatoryPhone}>
              {quotation.signaturePhone || settings.signatoryPhone}
            </Text>
          </View>
        </View>

        {/* 14. Full-width navy footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {quotation.authorizedVendorText || settings.authorizedVendorFooter}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
