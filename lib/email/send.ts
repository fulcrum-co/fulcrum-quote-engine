import { Resend } from 'resend';
import { ContactInfo, QuoteAnalysis } from '@/lib/types/quote';
import { getProspectEmailHtml, getNotificationEmailHtml } from './templates';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SendQuoteEmailParams {
  contact: ContactInfo;
  analysis: QuoteAnalysis;
  quoteId: string;
  pdfBuffer: Buffer;
}

// Send quote report email to prospect
export async function sendQuoteEmail({
  contact,
  analysis,
  quoteId,
  pdfBuffer,
}: SendQuoteEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn('Resend not configured - skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Fulcrum <quotes@fulcrum.co>',
      to: contact.email,
      subject: `Your Quote Assessment Report - ${contact.companyName}`,
      html: getProspectEmailHtml(contact, analysis),
      attachments: [
        {
          filename: `${contact.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_Quote_Assessment.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error('Failed to send quote email:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending quote email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Send notification email to internal team
export async function sendNotificationEmail({
  contact,
  analysis,
  quoteId,
}: Omit<SendQuoteEmailParams, 'pdfBuffer'>): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn('Resend not configured - skipping notification');
    return { success: false, error: 'Email service not configured' };
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'team@fulcrum.co';

  try {
    const { error } = await resend.emails.send({
      from: 'Fulcrum Quote Engine <quotes@fulcrum.co>',
      to: notificationEmail,
      subject: `New Quote Assessment: ${contact.companyName} - ${analysis.isQualified ? 'Qualified' : 'Review Needed'}`,
      html: getNotificationEmailHtml(contact, analysis, quoteId),
    });

    if (error) {
      console.error('Failed to send notification email:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
