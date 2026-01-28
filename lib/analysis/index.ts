import { QuoteResponses, QuoteAnalysis } from '@/lib/types/quote';
import { calculateAllScores } from './scores';
import { determineTier } from './tiers';
import { calculatePricing } from './pricing';
import { detectPatterns } from './patterns';
import { calculateQualification } from './qualification';

export { calculateAllScores } from './scores';
export { determineTier, getTierInfo } from './tiers';
export { calculatePricing, formatCurrency } from './pricing';
export { detectPatterns } from './patterns';
export { calculateQualification } from './qualification';

// Main analysis function
export function analyzeQuote(responses: QuoteResponses): QuoteAnalysis {
  // Calculate complexity scores
  const scores = calculateAllScores(responses);

  // Determine service tier
  const tier = determineTier(responses, scores);

  // Calculate pricing estimate
  const pricing = calculatePricing(responses, scores, tier);

  // Detect patterns and recommendations
  const patterns = detectPatterns(responses, scores);

  // Calculate qualification score
  const qualification = calculateQualification(responses, scores, tier);

  return {
    scores,
    tier,
    pricing,
    patterns,
    qualificationScore: qualification.score,
    isQualified: qualification.isQualified,
  };
}
