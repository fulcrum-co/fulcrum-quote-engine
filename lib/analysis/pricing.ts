import { QuoteResponses, ComplexityScores, ServiceTier, PricingEstimate } from '@/lib/types/quote';

// Base pricing by tier (monthly)
const BASE_PRICING: Record<ServiceTier, { min: number; max: number }> = {
  starter: { min: 2500, max: 5000 },
  growth: { min: 5000, max: 10000 },
  scale: { min: 10000, max: 25000 },
  enterprise: { min: 25000, max: 75000 },
};

// Implementation base costs by tier
const IMPLEMENTATION_PRICING: Record<ServiceTier, { min: number; max: number }> = {
  starter: { min: 5000, max: 15000 },
  growth: { min: 15000, max: 35000 },
  scale: { min: 35000, max: 75000 },
  enterprise: { min: 75000, max: 200000 },
};

// Calculate pricing estimate
export function calculatePricing(
  responses: QuoteResponses,
  scores: ComplexityScores,
  tier: ServiceTier
): PricingEstimate {
  const basePricing = BASE_PRICING[tier];
  const implementationBase = IMPLEMENTATION_PRICING[tier];

  // Complexity multiplier (1.0 to 1.5)
  const complexityMultiplier = 1 + (scores.overallComplexity / 200);

  // Integration adjustment
  const integrationAdjustment = getIntegrationAdjustment(responses.technology.q18_integration_needs);

  // Data migration adjustment
  const migrationAdjustment = getMigrationAdjustment(responses.technology.q19_data_migration);

  // Calculate monthly pricing
  const monthlyMin = Math.round(basePricing.min * complexityMultiplier * integrationAdjustment);
  const monthlyMax = Math.round(basePricing.max * complexityMultiplier * integrationAdjustment);

  // Calculate implementation pricing
  const implementationMin = Math.round(
    implementationBase.min * complexityMultiplier * migrationAdjustment
  );
  const implementationMax = Math.round(
    implementationBase.max * complexityMultiplier * migrationAdjustment
  );

  // Determine confidence level
  const confidence = determineConfidence(responses, scores);

  return {
    tier,
    monthlyMin,
    monthlyMax,
    implementationMin,
    implementationMax,
    confidence,
  };
}

function getIntegrationAdjustment(integrationNeeds: string): number {
  const adjustments: Record<string, number> = {
    'none': 1.0,
    'basic': 1.1,
    'moderate': 1.25,
    'complex': 1.5,
  };
  return adjustments[integrationNeeds] || 1.0;
}

function getMigrationAdjustment(migration: string): number {
  const adjustments: Record<string, number> = {
    'none': 1.0,
    'small': 1.1,
    'medium': 1.25,
    'large': 1.4,
    'enterprise': 1.6,
  };
  return adjustments[migration] || 1.0;
}

function determineConfidence(responses: QuoteResponses, scores: ComplexityScores): 'low' | 'medium' | 'high' {
  // High variance in scores = lower confidence
  const scoreVariance = calculateVariance([
    scores.revenueComplexity,
    scores.customerComplexity,
    scores.operationalComplexity,
    scores.technologyComplexity,
  ]);

  // Budget clarity affects confidence
  const budgetKnown = responses.budget.q33_budget_range !== 'unsure';

  // Timeline clarity affects confidence
  const timelineKnown = responses.budget.q34_investment_timeline !== 'exploring';

  if (scoreVariance < 200 && budgetKnown && timelineKnown) {
    return 'high';
  } else if (scoreVariance < 400 || (budgetKnown && timelineKnown)) {
    return 'medium';
  } else {
    return 'low';
  }
}

function calculateVariance(values: number[]): number {
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  return values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
}

// Format pricing for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
