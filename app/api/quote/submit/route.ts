import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { quoteResponsesSchema } from '@/lib/validation/schema';
import { analyzeQuote } from '@/lib/analysis';
import { generateQuotePDF } from '@/lib/pdf/generate';
import { sendQuoteEmail, sendNotificationEmail } from '@/lib/email/send';
import { QuoteResponses } from '@/lib/types/quote';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate the data
    const validationResult = quoteResponsesSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten();
      console.error('Validation errors:', errors);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    const responses: QuoteResponses = validationResult.data;
    const quoteId = uuidv4();

    // Analyze the quote
    console.log('Analyzing quote responses...');
    const analysis = analyzeQuote(responses);
    console.log('Analysis complete:', {
      tier: analysis.tier,
      overallComplexity: analysis.scores.overallComplexity,
      qualificationScore: analysis.qualificationScore,
    });

    // Generate PDF
    let pdfBuffer: Buffer;
    let pdfError: Error | null = null;
    try {
      console.log('Starting PDF generation...');
      pdfBuffer = await generateQuotePDF(responses.contact, responses, analysis);
      console.log('PDF generated successfully, size:', pdfBuffer.length);
    } catch (err) {
      pdfError = err instanceof Error ? err : new Error(String(err));
      console.error('PDF generation failed:', pdfError.message, pdfError.stack);
      // Continue without PDF - don't fail the entire submission
      pdfBuffer = Buffer.from('');
    }

    // Send emails
    if (process.env.RESEND_API_KEY) {
      try {
        // Send quote email with attachment if PDF was generated
        if (pdfBuffer.length > 0) {
          const emailResult = await sendQuoteEmail({
            contact: responses.contact,
            analysis,
            quoteId,
            pdfBuffer,
          });

          if (!emailResult.success) {
            console.error('Failed to send quote email:', emailResult.error);
          } else {
            console.log('Quote email sent successfully to:', responses.contact.email);
          }
        } else {
          console.error('PDF was empty, cannot send quote email with attachment');
          console.error('PDF generation error was:', pdfError?.message || 'Unknown error');
        }

        // Always send notification email to admin
        await sendNotificationEmail({
          contact: responses.contact,
          analysis,
          quoteId,
        });
        console.log('Notification email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError instanceof Error ? emailError.message : emailError);
        // Don't fail the submission if email fails
      }
    } else {
      console.warn('RESEND_API_KEY not set, skipping emails');
    }

    // Log submission (in production, you'd store this)
    console.log('Quote submission completed:', {
      id: quoteId,
      company: responses.contact.companyName,
      contact: responses.contact.name,
      email: responses.contact.email,
      tier: analysis.tier,
      qualified: analysis.isQualified,
    });

    // Return success response with PDF data for client-side download
    return NextResponse.json({
      success: true,
      id: quoteId,
      tier: analysis.tier,
      pdfBase64: pdfBuffer.length > 0 ? pdfBuffer.toString('base64') : null,
      companyName: responses.contact.companyName,
    });
  } catch (error) {
    console.error('Submission error:', error instanceof Error ? error.stack : error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
