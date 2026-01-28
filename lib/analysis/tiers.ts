import { QuoteResponses, ComplexityScores, ServiceTier } from '@/lib/types/quote';

// Determine the appropriate service tier based on complexity and company size
export function determineTier(responses: QuoteResponses, scores: ComplexityScores): ServiceTier {
  const { overallComplexity } = scores;

  // Get company size indicators
  const revenueLevel = getRevenueLevel(responses.companyOverview.q3_annual_revenue);
  const employeeLevel = getEmployeeLevel(responses.companyOverview.q4_employee_count);

  // Calculate a combined score
  const sizeScore = (revenueLevel + employeeLevel) / 2;
  const combinedScore = (overallComplexity + sizeScore) / 2;

  // Determine tier
  if (combinedScore < 25) {
    return 'starter';
  } else if (combinedScore < 50) {
    return 'growth';
  } else if (combinedScore < 75) {
    return 'scale';
  } else {
    return 'enterprise';
  }
}

function getRevenueLevel(revenue: string): number {
  const revenueMap: Record<string, number> = {
    'pre_revenue': 10,
    '0_500k': 20,
    '500k_2m': 35,
    '2m_5m': 50,
    '5m_10m': 70,
    '10m_plus': 90,
  };
  return revenueMap[revenue] || 30;
}

function getEmployeeLevel(employees: string): number {
  const employeeMap: Record<string, number> = {
    '1_5': 10,
    '6_15': 25,
    '16_30': 40,
    '31_50': 55,
    '51_100': 70,
    '100_plus': 90,
  };
  return employeeMap[employees] || 30;
}

// Get tier display information
export function getTierInfo(tier: ServiceTier): { name: string; description: string } {
  const tierInfo: Record<ServiceTier, { name: string; description: string }> = {
    starter: {
      name: 'Starter',
      description: 'Ideal for early-stage companies with straightforward operations',
    },
    growth: {
      name: 'Growth',
      description: 'For scaling companies with increasing operational complexity',
    },
    scale: {
      name: 'Scale',
      description: 'For established companies with significant operational needs',
    },
    enterprise: {
      name: 'Enterprise',
      description: 'For large organizations with complex, multi-faceted operations',
    },
  };

  return tierInfo[tier];
}
