import React from 'react';
import { Document, Page, Text, View, Image, Link } from '@react-pdf/renderer';
import { renderToBuffer } from '@react-pdf/renderer';
import { ContactInfo, QuoteResponses, QuoteAnalysis } from '@/lib/types/quote';
import { getTierInfo, formatCurrency } from '@/lib/analysis';
import { styles } from './styles';
import './fonts';
import path from 'path';
import fs from 'fs';

interface QuoteDocumentProps {
  contact: ContactInfo;
  responses: QuoteResponses;
  analysis: QuoteAnalysis;
  logoBase64?: string;
}

// Get severity color
function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return '#dc2626';
    case 'warning':
      return '#d97706';
    default:
      return '#059669';
  }
}

// Format industry display name
function formatIndustry(industry: string): string {
  const industryMap: Record<string, string> = {
    saas: 'SaaS / Software',
    ecommerce: 'E-commerce / Retail',
    fintech: 'Fintech / Financial Services',
    healthcare: 'Healthcare / Life Sciences',
    manufacturing: 'Manufacturing',
    professional_services: 'Professional Services',
    media: 'Media / Entertainment',
    real_estate: 'Real Estate',
    education: 'Education',
    nonprofit: 'Nonprofit',
    other: 'Other',
  };
  return industryMap[industry] || industry;
}

function QuoteDocument({ contact, responses, analysis, logoBase64 }: QuoteDocumentProps) {
  const tierInfo = getTierInfo(analysis.tier);
  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logoBase64 && (
            <Image style={styles.logo} src={logoBase64} />
          )}
          <Text style={styles.headerText}>Quote Assessment Report</Text>
        </View>

        <View style={styles.confidential}>
          <Text style={styles.confidentialText}>
            CONFIDENTIAL - Prepared exclusively for {contact.companyName}
          </Text>
        </View>

        <Text style={styles.title}>Quote Assessment Report</Text>
        <Text style={styles.subtitle}>
          Prepared for {contact.name} at {contact.companyName}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Overview</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Company</Text>
            <Text style={styles.value}>{contact.companyName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contact</Text>
            <Text style={styles.value}>{contact.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{contact.role}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Industry</Text>
            <Text style={styles.value}>{formatIndustry(responses.companyOverview.q1_industry)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Generated</Text>
            <Text style={styles.value}>{generatedDate}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Service Tier & Pricing</Text>
          <View style={styles.tierBadge}>
            <Text>{tierInfo.name.toUpperCase()}</Text>
          </View>
          <Text style={{ fontSize: 10, color: '#6b7280', marginTop: 8, marginBottom: 16 }}>
            {tierInfo.description}
          </Text>
          <View style={{ backgroundColor: '#f9fafb', borderRadius: 8, padding: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontSize: 10, color: '#6b7280' }}>Monthly Investment</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1a1a1a' }}>
                {formatCurrency(analysis.pricing.monthlyMin)} - {formatCurrency(analysis.pricing.monthlyMax)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 10, color: '#6b7280' }}>Implementation</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1a1a1a' }}>
                {formatCurrency(analysis.pricing.implementationMin)} - {formatCurrency(analysis.pricing.implementationMax)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Fulcrum - Confidential</Text>
          <Text style={styles.pageNumber}>Page 1</Text>
        </View>
      </Page>

      {/* Complexity Scores Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logoBase64 && (
            <Image style={styles.logo} src={logoBase64} />
          )}
          <Text style={styles.headerText}>Complexity Analysis</Text>
        </View>

        <Text style={styles.title}>Complexity Analysis</Text>
        <Text style={styles.subtitle}>
          Understanding your operational complexity across key dimensions
        </Text>

        <View style={styles.scoreCard}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreValue}>{analysis.scores.revenueComplexity}</Text>
            <Text style={styles.scoreLabel}>Revenue{'\n'}Complexity</Text>
          </View>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreValue}>{analysis.scores.customerComplexity}</Text>
            <Text style={styles.scoreLabel}>Customer{'\n'}Complexity</Text>
          </View>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreValue}>{analysis.scores.operationalComplexity}</Text>
            <Text style={styles.scoreLabel}>Operational{'\n'}Complexity</Text>
          </View>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreValue}>{analysis.scores.technologyComplexity}</Text>
            <Text style={styles.scoreLabel}>Technology{'\n'}Complexity</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Complexity Score</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#1a1a1a', marginRight: 16 }}>
              {analysis.scores.overallComplexity}
            </Text>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>out of 100</Text>
          </View>
          <Text style={{ fontSize: 10, color: '#6b7280', marginTop: 8 }}>
            {analysis.scores.overallComplexity < 30 && 'Your operations are relatively straightforward.'}
            {analysis.scores.overallComplexity >= 30 && analysis.scores.overallComplexity < 60 && 'Your operations have moderate complexity.'}
            {analysis.scores.overallComplexity >= 60 && 'Your operations are highly complex.'}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Fulcrum - Confidential</Text>
          <Text style={styles.pageNumber}>Page 2</Text>
        </View>
      </Page>

      {/* Pricing Estimate Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logoBase64 && (
            <Image style={styles.logo} src={logoBase64} />
          )}
          <Text style={styles.headerText}>Pricing Estimate</Text>
        </View>

        <Text style={styles.title}>Pricing Estimate</Text>
        <Text style={styles.subtitle}>
          Based on your complexity profile and requirements
        </Text>

        <View style={styles.pricingBox}>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Monthly Investment</Text>
            <Text style={styles.pricingValue}>
              {formatCurrency(analysis.pricing.monthlyMin)} - {formatCurrency(analysis.pricing.monthlyMax)}
            </Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Implementation Investment</Text>
            <Text style={styles.pricingValue}>
              {formatCurrency(analysis.pricing.implementationMin)} - {formatCurrency(analysis.pricing.implementationMax)}
            </Text>
          </View>
          <View style={[styles.pricingRow, { borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 12 }]}>
            <Text style={styles.pricingLabel}>Estimate Confidence</Text>
            <Text style={[styles.pricingValue, { textTransform: 'capitalize' }]}>
              {analysis.pricing.confidence}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>
            Note: These estimates are preliminary and based on the information provided.
            Final pricing will be determined after a detailed consultation to understand
            your specific requirements.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Fulcrum - Confidential</Text>
          <Text style={styles.pageNumber}>Page 3</Text>
        </View>
      </Page>

      {/* Patterns & Recommendations Page */}
      {analysis.patterns.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            {logoBase64 && (
              <Image style={styles.logo} src={logoBase64} />
            )}
            <Text style={styles.headerText}>Insights & Recommendations</Text>
          </View>

          <Text style={styles.title}>Key Insights</Text>
          <Text style={styles.subtitle}>
            Patterns identified from your assessment
          </Text>

          {analysis.patterns.slice(0, 4).map((pattern, index) => (
            <View key={index} style={styles.pattern}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: getSeverityColor(pattern.severity),
                  marginRight: 8,
                }} />
                <Text style={styles.patternTitle}>{pattern.name}</Text>
              </View>
              <Text style={styles.patternDescription}>{pattern.description}</Text>
              {pattern.recommendations.map((rec, recIndex) => (
                <View key={recIndex} style={{ flexDirection: 'row' }}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.recommendation}>{rec}</Text>
                </View>
              ))}
            </View>
          ))}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Fulcrum - Confidential</Text>
            <Text style={styles.pageNumber}>Page 4</Text>
          </View>
        </Page>
      )}

      {/* Next Steps Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logoBase64 && (
            <Image style={styles.logo} src={logoBase64} />
          )}
          <Text style={styles.headerText}>Next Steps</Text>
        </View>

        <Text style={styles.title}>Next Steps</Text>
        <Text style={styles.subtitle}>
          How to move forward with your assessment
        </Text>

        <View style={styles.nextSteps}>
          <Text style={styles.nextStepsTitle}>Your Preferred Next Step</Text>
          <Text style={styles.nextStepsText}>
            {responses.readiness.q38_preferred_next_step === 'detailed_quote' &&
              'A detailed quote with comprehensive pricing breakdown'}
            {responses.readiness.q38_preferred_next_step === 'demo' &&
              'A product demonstration to see our solutions in action'}
            {responses.readiness.q38_preferred_next_step === 'consultation' &&
              'A consultation call to discuss your specific needs'}
            {responses.readiness.q38_preferred_next_step === 'more_info' &&
              'Additional information about our services and capabilities'}
            {responses.readiness.q38_preferred_next_step === 'internal_review' &&
              'Time for internal review before taking next steps'}
          </Text>
        </View>

        <View style={[styles.section, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 16 }}>
            Ready to take the next step? Our team is here to help you navigate
            the path forward and answer any questions you may have.
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Link src="mailto:joe@fulcrumcollective.io" style={{ ...styles.value, color: '#2563eb', textDecoration: 'none' }}>
              joe@fulcrumcollective.io
            </Link>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Website</Text>
            <Link src="https://www.fulcrumcollective.io" style={{ ...styles.value, color: '#2563eb', textDecoration: 'none' }}>
              www.fulcrumcollective.io
            </Link>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Fulcrum - Confidential</Text>
          <Text style={styles.pageNumber}>Page {analysis.patterns.length > 0 ? 5 : 4}</Text>
        </View>
      </Page>
    </Document>
  );
}

// Generate PDF buffer
export async function generateQuotePDF(
  contact: ContactInfo,
  responses: QuoteResponses,
  analysis: QuoteAnalysis
): Promise<Buffer> {
  // Load logo
  let logoBase64: string | undefined;
  try {
    const logoPath = path.join(process.cwd(), 'public', 'fulcrum-logo.png');
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }
  } catch (error) {
    console.warn('Could not load logo:', error);
  }

  const buffer = await renderToBuffer(
    <QuoteDocument
      contact={contact}
      responses={responses}
      analysis={analysis}
      logoBase64={logoBase64}
    />
  );

  return Buffer.from(buffer);
}
