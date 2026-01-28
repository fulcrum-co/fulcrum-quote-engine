import { QuoteResponses, ComplexityScores, ServiceTier } from '@/lib/types/quote';

interface QualificationResult {
  score: number;
  isQualified: boolean;
  factors: QualificationFactor[];
}

interface QualificationFactor {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

// Calculate qualification score (0-100)
export function calculateQualification(
  responses: QuoteResponses,
  scores: ComplexityScores,
  tier: ServiceTier
): QualificationResult {
  const factors: QualificationFactor[] = [];

  // Budget alignment (0-25 points)
  const budgetScore = calculateBudgetAlignment(responses, tier);
  factors.push({
    name: 'Budget Alignment',
    score: budgetScore,
    maxScore: 25,
    description: 'How well budget expectations align with recommended tier',
  });

  // Timeline readiness (0-20 points)
  const timelineScore = calculateTimelineReadiness(responses);
  factors.push({
    name: 'Timeline Readiness',
    score: timelineScore,
    maxScore: 20,
    description: 'Readiness to implement based on timeline',
  });

  // Decision authority (0-15 points)
  const authorityScore = calculateDecisionAuthority(responses);
  factors.push({
    name: 'Decision Authority',
    score: authorityScore,
    maxScore: 15,
    description: 'Level of decision-making authority',
  });

  // Pain point urgency (0-20 points)
  const urgencyScore = calculateUrgency(responses);
  factors.push({
    name: 'Problem Urgency',
    score: urgencyScore,
    maxScore: 20,
    description: 'Urgency of addressing current challenges',
  });

  // Engagement interest (0-20 points)
  const engagementScore = calculateEngagementInterest(responses);
  factors.push({
    name: 'Engagement Interest',
    score: engagementScore,
    maxScore: 20,
    description: 'Interest level in moving forward',
  });

  const totalScore = factors.reduce((sum, f) => sum + f.score, 0);
  const isQualified = totalScore >= 50;

  return {
    score: totalScore,
    isQualified,
    factors,
  };
}

function calculateBudgetAlignment(responses: QuoteResponses, tier: ServiceTier): number {
  const budget = responses.budget.q33_budget_range;

  // Budget to tier alignment
  const tierBudgetMap: Record<ServiceTier, string[]> = {
    starter: ['under_5k', '5k_10k'],
    growth: ['5k_10k', '10k_25k'],
    scale: ['10k_25k', '25k_50k'],
    enterprise: ['25k_50k', '50k_100k', '100k_plus'],
  };

  if (budget === 'unsure') return 10; // Neutral
  if (tierBudgetMap[tier].includes(budget)) return 25; // Perfect alignment

  // Check if budget is adjacent
  const allBudgets = ['under_5k', '5k_10k', '10k_25k', '25k_50k', '50k_100k', '100k_plus'];
  const tierBudgets = tierBudgetMap[tier];
  const budgetIndex = allBudgets.indexOf(budget);
  const tierIndices = tierBudgets.map((b: string) => allBudgets.indexOf(b));
  const minTierIndex = Math.min(...tierIndices);
  const maxTierIndex = Math.max(...tierIndices);

  if (budgetIndex === minTierIndex - 1 || budgetIndex === maxTierIndex + 1) {
    return 15; // Close alignment
  }

  return 5; // Misaligned
}

function calculateTimelineReadiness(responses: QuoteResponses): number {
  const timeline = responses.readiness.q37_implementation_readiness;
  const investmentTimeline = responses.budget.q34_investment_timeline;

  const readinessScores: Record<string, number> = {
    'ready_now': 20,
    '1_3_months': 16,
    '3_6_months': 10,
    '6_plus_months': 5,
    'evaluating': 3,
  };

  const investmentScores: Record<string, number> = {
    'this_quarter': 20,
    'next_quarter': 16,
    'this_year': 10,
    'next_year': 5,
    'exploring': 3,
  };

  return Math.round(
    ((readinessScores[timeline] || 0) + (investmentScores[investmentTimeline] || 0)) / 2
  );
}

function calculateDecisionAuthority(responses: QuoteResponses): number {
  const process = responses.budget.q35_decision_process;

  const authorityScores: Record<string, number> = {
    'sole': 15,
    'small_team': 12,
    'committee': 8,
    'board': 5,
  };

  return authorityScores[process] || 5;
}

function calculateUrgency(responses: QuoteResponses): number {
  const timeline = responses.goalsOutcomes.q31_timeline_pressure;
  const manualWork = responses.painPoints.q26_time_spent_manual;

  const timelineScores: Record<string, number> = {
    'critical': 12,
    'urgent': 10,
    'moderate': 6,
    'flexible': 3,
  };

  const manualWorkScores: Record<string, number> = {
    '40_plus_hrs': 8,
    '20_40_hrs': 6,
    '10_20_hrs': 4,
    'under_10_hrs': 2,
  };

  return (timelineScores[timeline] || 0) + (manualWorkScores[manualWork] || 0);
}

function calculateEngagementInterest(responses: QuoteResponses): number {
  const nextStep = responses.readiness.q38_preferred_next_step;

  const nextStepScores: Record<string, number> = {
    'detailed_quote': 20,
    'consultation': 18,
    'demo': 15,
    'more_info': 8,
    'internal_review': 5,
  };

  return nextStepScores[nextStep] || 5;
}
