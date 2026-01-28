'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';

interface StoredQuoteData {
  id: string;
  pdfBase64: string;
  companyName: string;
}

export default function QuoteCompleteContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [quoteData, setQuoteData] = useState<StoredQuoteData | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fulcrum_quote_pdf');
      if (stored) {
        setQuoteData(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleDownload = () => {
    if (!quoteData?.pdfBase64) return;

    // Convert base64 to blob
    const byteCharacters = atob(quoteData.pdfBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${quoteData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_Quote_Assessment.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-[#e5e7eb]">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href="/">
            <Image
              src="/fulcrum-logo.png"
              alt="Fulcrum"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#ecfdf5] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#059669]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-semibold text-[#1a1a1a] mb-4">
            Thank You!
          </h1>

          <p className="text-lg text-[#6b7280] mb-8">
            Your quote assessment has been submitted successfully.
            {quoteData?.companyName && (
              <> We&apos;ve prepared a detailed report for {quoteData.companyName}.</>
            )}
          </p>

          {/* What to expect */}
          <div className="bg-[#f9fafb] rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-[#1a1a1a] mb-4">
              What happens next?
            </h2>
            <ul className="space-y-3 text-[#6b7280]">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a1a1a] text-white text-sm flex items-center justify-center">
                  1
                </span>
                <span>
                  Check your email for your detailed quote assessment report
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a1a1a] text-white text-sm flex items-center justify-center">
                  2
                </span>
                <span>
                  Review the complexity analysis and pricing estimate
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a1a1a] text-white text-sm flex items-center justify-center">
                  3
                </span>
                <span>
                  A team member will reach out within 1-2 business days
                </span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {quoteData?.pdfBase64 && (
              <Button onClick={handleDownload}>
                Download Report
              </Button>
            )}
            <Link href="/">
              <Button variant="outline">
                Return Home
              </Button>
            </Link>
          </div>

          {id && (
            <p className="mt-8 text-sm text-[#9ca3af]">
              Reference ID: {id}
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb]">
        <div className="max-w-2xl mx-auto px-4 py-6 text-center text-sm text-[#9ca3af]">
          Questions? Contact us at{' '}
          <a href="mailto:quotes@fulcrum.co" className="text-[#2563eb] hover:underline">
            quotes@fulcrum.co
          </a>
        </div>
      </footer>
    </div>
  );
}
