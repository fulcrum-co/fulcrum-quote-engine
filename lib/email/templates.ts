import { ContactInfo, QuoteAnalysis } from '@/lib/types/quote';
import { getTierInfo, formatCurrency } from '@/lib/analysis';

// Prospect email template (with PDF attachment)
export function getProspectEmailHtml(contact: ContactInfo, analysis: QuoteAnalysis): string {
  const tierInfo = getTierInfo(analysis.tier);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Your Quote Assessment Report</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <tr>
            <td style="padding: 40px 40px 20px;">
              <img src="https://fulcrum.co/logo.png" alt="Fulcrum" style="height: 32px; width: auto;">
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px;">
              <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #1a1a1a;">
                Your Quote Assessment Report
              </h1>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #6b7280;">
                Hi ${contact.name},
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #6b7280;">
                Thank you for completing the Fulcrum Quote Assessment. We've analyzed your responses
                and prepared a comprehensive report for ${contact.companyName}.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px;">
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px; font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">
                  Assessment Summary
                </h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="font-size: 14px; color: #6b7280;">Recommended Tier:</span>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="font-size: 14px; font-weight: 600; color: #1a1a1a;">${tierInfo.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="font-size: 14px; color: #6b7280;">Complexity Score:</span>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="font-size: 14px; font-weight: 600; color: #1a1a1a;">${analysis.scores.overallComplexity}/100</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="font-size: 14px; color: #6b7280;">Estimated Investment:</span>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="font-size: 14px; font-weight: 600; color: #1a1a1a;">
                        ${formatCurrency(analysis.pricing.monthlyMin)} - ${formatCurrency(analysis.pricing.monthlyMax)}/mo
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px;">
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #6b7280;">
                Your detailed report is attached to this email. It includes:
              </p>
              <ul style="margin: 0 0 24px; padding-left: 24px; font-size: 16px; line-height: 1.8; color: #6b7280;">
                <li>Complete complexity analysis</li>
                <li>Detailed pricing estimate</li>
                <li>Key insights and recommendations</li>
                <li>Suggested next steps</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #6b7280;">
                If you have any questions or would like to schedule a consultation,
                simply reply to this email.
              </p>
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #6b7280;">
                Best regards,<br>
                The Fulcrum Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
                Fulcrum | Building Operational Leverage
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

// Internal notification email template
export function getNotificationEmailHtml(
  contact: ContactInfo,
  analysis: QuoteAnalysis,
  quoteId: string
): string {
  const tierInfo = getTierInfo(analysis.tier);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Quote Assessment Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <tr>
            <td style="padding: 40px 40px 20px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a1a1a;">
                New Quote Assessment
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px;">
              <div style="background-color: ${analysis.isQualified ? '#ecfdf5' : '#fef3c7'}; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: ${analysis.isQualified ? '#065f46' : '#92400e'};">
                  ${analysis.isQualified ? '✓ Qualified Lead' : '○ Needs Review'} - Score: ${analysis.qualificationScore}/100
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px;">
              <h2 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #1a1a1a;">
                Contact Information
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">${contact.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Email:</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">
                    <a href="mailto:${contact.email}" style="color: #2563eb;">${contact.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Company:</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">${contact.companyName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Role:</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">${contact.role}</td>
                </tr>
                ${contact.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Phone:</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">${contact.phone}</td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px;">
              <h2 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #1a1a1a;">
                Assessment Results
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 160px;">Recommended Tier:</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">${tierInfo.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Complexity Score:</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">${analysis.scores.overallComplexity}/100</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Monthly Estimate:</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">
                    ${formatCurrency(analysis.pricing.monthlyMin)} - ${formatCurrency(analysis.pricing.monthlyMax)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Implementation:</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">
                    ${formatCurrency(analysis.pricing.implementationMin)} - ${formatCurrency(analysis.pricing.implementationMax)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Confidence:</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 500; text-transform: capitalize;">
                    ${analysis.pricing.confidence}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${analysis.patterns.length > 0 ? `
          <tr>
            <td style="padding: 0 40px;">
              <h2 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #1a1a1a;">
                Key Patterns Identified
              </h2>
              <ul style="margin: 0 0 24px; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #6b7280;">
                ${analysis.patterns.map(p => `<li>${p.name}: ${p.description}</li>`).join('')}
              </ul>
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Quote ID: ${quoteId}
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
