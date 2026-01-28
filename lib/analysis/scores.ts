import { QuoteResponses, ComplexityScores } from '@/lib/types/quote';

// Revenue complexity scoring
export function calculateRevenueComplexity(responses: QuoteResponses): number {
  let score = 0;

  // Revenue streams (1-10 scale)
  score += responses.revenueComplexity.q5_revenue_streams * 10;

  // Pricing models (more = more complex)
  const pricingModels = responses.revenueComplexity.q6_pricing_models?.length || 0;
  score += pricingModels * 15;

  // Recurring revenue (less recurring = more complex billing)
  const recurringMap: Record<string, number> = {
    '75_100': 0,
    '50_75': 10,
    '25_50': 20,
    '0_25': 30,
  };
  score += recurringMap[responses.revenueComplexity.q7_recurring_revenue_pct] || 0;

  // Billing frequency (more options = more complex)
  const billingFrequencies = responses.revenueComplexity.q8_billing_frequency?.length || 0;
  score += billingFrequencies * 10;

  return Math.min(100, score);
}

// Customer complexity scoring
export function calculateCustomerComplexity(responses: QuoteResponses): number {
  let score = 0;

  // Customer count
  const customerMap: Record<string, number> = {
    '1_50': 10,
    '51_200': 25,
    '201_500': 40,
    '501_2000': 60,
    '2000_plus': 80,
  };
  score += customerMap[responses.customerComplexity.q9_customer_count] || 0;

  // Customer segments
  score += responses.customerComplexity.q10_customer_segments * 5;

  // Contract complexity
  const contractMap: Record<string, number> = {
    'standard': 0,
    'semi_custom': 15,
    'mixed': 25,
    'fully_custom': 40,
  };
  score += contractMap[responses.customerComplexity.q11_contract_complexity] || 0;

  // Sales cycle length
  const cycleMap: Record<string, number> = {
    'under_1_month': 0,
    '1_3_months': 10,
    '3_6_months': 20,
    '6_12_months': 30,
    'over_12_months': 40,
  };
  score += cycleMap[responses.customerComplexity.q12_sales_cycle_length] || 0;

  return Math.min(100, score);
}

// Operational complexity scoring
export function calculateOperationalComplexity(responses: QuoteResponses): number {
  let score = 0;

  // Locations
  const locationMap: Record<string, number> = {
    '1': 0,
    '2_5': 15,
    '6_10': 30,
    '10_plus': 50,
  };
  score += locationMap[responses.operationalComplexity.q13_locations] || 0;

  // Currencies
  const currencyMap: Record<string, number> = {
    '1': 0,
    '2_3': 15,
    '4_10': 30,
    '10_plus': 50,
  };
  score += currencyMap[responses.operationalComplexity.q14_currencies] || 0;

  // Legal entities
  const entityMap: Record<string, number> = {
    '1': 0,
    '2_3': 15,
    '4_5': 25,
    '5_plus': 40,
  };
  score += entityMap[responses.operationalComplexity.q15_legal_entities] || 0;

  // Compliance requirements
  const complianceCount = responses.operationalComplexity.q16_compliance_requirements?.length || 0;
  score += complianceCount * 8;

  return Math.min(100, score);
}

// Technology complexity scoring
export function calculateTechnologyComplexity(responses: QuoteResponses): number {
  let score = 0;

  // Current tools (more = more integration work)
  const toolCount = responses.technology.q17_current_tools?.length || 0;
  score += toolCount * 8;

  // Integration needs
  const integrationMap: Record<string, number> = {
    'none': 0,
    'basic': 15,
    'moderate': 35,
    'complex': 60,
  };
  score += integrationMap[responses.technology.q18_integration_needs] || 0;

  // Data migration
  const migrationMap: Record<string, number> = {
    'none': 0,
    'small': 10,
    'medium': 25,
    'large': 40,
    'enterprise': 60,
  };
  score += migrationMap[responses.technology.q19_data_migration] || 0;

  return Math.min(100, score);
}

// Calculate all complexity scores
export function calculateAllScores(responses: QuoteResponses): ComplexityScores {
  const revenueComplexity = calculateRevenueComplexity(responses);
  const customerComplexity = calculateCustomerComplexity(responses);
  const operationalComplexity = calculateOperationalComplexity(responses);
  const technologyComplexity = calculateTechnologyComplexity(responses);

  // Weighted average for overall complexity
  const overallComplexity = Math.round(
    (revenueComplexity * 0.25) +
    (customerComplexity * 0.25) +
    (operationalComplexity * 0.25) +
    (technologyComplexity * 0.25)
  );

  return {
    revenueComplexity,
    customerComplexity,
    operationalComplexity,
    technologyComplexity,
    overallComplexity,
  };
}
