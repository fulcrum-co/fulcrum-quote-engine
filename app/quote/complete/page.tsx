import { Suspense } from 'react';
import QuoteCompleteContent from './QuoteCompleteContent';

export const metadata = {
  title: 'Assessment Complete | Fulcrum',
  description: 'Your quote assessment has been submitted successfully.',
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a1a1a]"></div>
    </div>
  );
}

export default function QuoteCompletePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <QuoteCompleteContent />
    </Suspense>
  );
}
