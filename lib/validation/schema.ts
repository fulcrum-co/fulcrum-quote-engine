import { z } from 'zod';

// Contact validation
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role is required'),
  phone: z.string().optional(),
});

// Section 1: Company Overview
export const companyOverviewSchema = z.object({
  q1_industry: z.string().min(1, 'Industry is required'),
  q2_business_model: z.enum(['b2b', 'b2c', 'b2b2c', 'marketplace', 'hybrid']),
  q3_annual_revenue: z.enum(['pre_revenue', '0_500k', '500k_2m', '2m_5m', '5m_10m', '10m_plus']),
  q4_employee_count: z.enum(['1_5', '6_15', '16_30', '31_50', '51_100', '100_plus']),
});

// Section 2: Revenue Complexity
export const revenueComplexitySchema = z.object({
  q5_revenue_streams: z.number().min(1).max(10),
  q6_pricing_models: z.array(z.string()).min(1, 'Select at least one pricing model'),
  q7_recurring_revenue_pct: z.enum(['0_25', '25_50', '50_75', '75_100']),
  q8_billing_frequency: z.array(z.string()).min(1, 'Select at least one billing frequency'),
});

// Section 3: Customer Complexity
export const customerComplexitySchema = z.object({
  q9_customer_count: z.enum(['1_50', '51_200', '201_500', '501_2000', '2000_plus']),
  q10_customer_segments: z.number().min(1).max(10),
  q11_contract_complexity: z.enum(['standard', 'semi_custom', 'fully_custom', 'mixed']),
  q12_sales_cycle_length: z.enum(['under_1_month', '1_3_months', '3_6_months', '6_12_months', 'over_12_months']),
});

// Section 4: Operational Complexity
export const operationalComplexitySchema = z.object({
  q13_locations: z.enum(['1', '2_5', '6_10', '10_plus']),
  q14_currencies: z.enum(['1', '2_3', '4_10', '10_plus']),
  q15_legal_entities: z.enum(['1', '2_3', '4_5', '5_plus']),
  q16_compliance_requirements: z.array(z.string()).optional(),
});

// Section 5: Technology
export const technologySchema = z.object({
  q17_current_tools: z.array(z.string()).min(1, 'Select at least one tool'),
  q18_integration_needs: z.enum(['none', 'basic', 'moderate', 'complex']),
  q19_data_migration: z.enum(['none', 'small', 'medium', 'large', 'enterprise']),
  q20_custom_requirements: z.string().max(500).optional(),
});

// Section 6: Team Resources
export const teamResourcesSchema = z.object({
  q21_finance_team_size: z.enum(['0', '1_2', '3_5', '6_10', '10_plus']),
  q22_ops_team_size: z.enum(['0', '1_2', '3_5', '6_10', '10_plus']),
  q23_technical_capability: z.enum(['limited', 'moderate', 'strong', 'expert']),
  q24_change_management: z.enum(['minimal', 'some', 'significant', 'extensive']),
});

// Section 7: Pain Points
export const painPointsSchema = z.object({
  q25_primary_challenges: z.array(z.string()).min(1).max(3, 'Select up to 3 challenges'),
  q26_time_spent_manual: z.enum(['under_10_hrs', '10_20_hrs', '20_40_hrs', '40_plus_hrs']),
  q27_reporting_gaps: z.string().max(400).optional(),
  q28_biggest_bottleneck: z.string().min(1, 'This field is required').max(400),
});

// Section 8: Goals & Outcomes
export const goalsOutcomesSchema = z.object({
  q29_primary_goals: z.array(z.string()).min(1, 'Select at least one goal'),
  q30_success_metrics: z.array(z.string()).min(1, 'Select at least one metric'),
  q31_timeline_pressure: z.enum(['flexible', 'moderate', 'urgent', 'critical']),
  q32_roi_expectations: z.string().max(400).optional(),
});

// Section 9: Budget
export const budgetSchema = z.object({
  q33_budget_range: z.enum(['under_5k', '5k_10k', '10k_25k', '25k_50k', '50k_100k', '100k_plus', 'unsure']),
  q34_investment_timeline: z.enum(['this_quarter', 'next_quarter', 'this_year', 'next_year', 'exploring']),
  q35_decision_process: z.enum(['sole', 'small_team', 'committee', 'board']),
  q36_previous_investments: z.array(z.string()).optional(),
});

// Section 10: Readiness
export const readinessSchema = z.object({
  q37_implementation_readiness: z.enum(['ready_now', '1_3_months', '3_6_months', '6_plus_months', 'evaluating']),
  q38_preferred_next_step: z.enum(['detailed_quote', 'demo', 'consultation', 'more_info', 'internal_review']),
});

// Complete quote responses schema
export const quoteResponsesSchema = z.object({
  contact: contactSchema,
  companyOverview: companyOverviewSchema,
  revenueComplexity: revenueComplexitySchema,
  customerComplexity: customerComplexitySchema,
  operationalComplexity: operationalComplexitySchema,
  technology: technologySchema,
  teamResources: teamResourcesSchema,
  painPoints: painPointsSchema,
  goalsOutcomes: goalsOutcomesSchema,
  budget: budgetSchema,
  readiness: readinessSchema,
});

export type QuoteResponsesInput = z.infer<typeof quoteResponsesSchema>;
