// Contact information
export interface ContactInfo {
  name: string;
  email: string;
  companyName: string;
  role: string;
  phone?: string;
}

// Section 1: Company Overview
export interface CompanyOverviewResponses {
  q1_industry: string;
  q2_business_model: 'b2b' | 'b2c' | 'b2b2c' | 'marketplace' | 'hybrid';
  q3_annual_revenue: 'pre_revenue' | '0_500k' | '500k_2m' | '2m_5m' | '5m_10m' | '10m_plus';
  q4_employee_count: '1_5' | '6_15' | '16_30' | '31_50' | '51_100' | '100_plus';
}

// Section 2: Revenue Complexity
export interface RevenueComplexityResponses {
  q5_revenue_streams: number; // 1-10+ scale
  q6_pricing_models: string[]; // multi-select
  q7_recurring_revenue_pct: '0_25' | '25_50' | '50_75' | '75_100';
  q8_billing_frequency: string[]; // multi-select
}

// Section 3: Customer Complexity
export interface CustomerComplexityResponses {
  q9_customer_count: '1_50' | '51_200' | '201_500' | '501_2000' | '2000_plus';
  q10_customer_segments: number; // 1-10+ scale
  q11_contract_complexity: 'standard' | 'semi_custom' | 'fully_custom' | 'mixed';
  q12_sales_cycle_length: 'under_1_month' | '1_3_months' | '3_6_months' | '6_12_months' | 'over_12_months';
}

// Section 4: Operational Complexity
export interface OperationalComplexityResponses {
  q13_locations: '1' | '2_5' | '6_10' | '10_plus';
  q14_currencies: '1' | '2_3' | '4_10' | '10_plus';
  q15_legal_entities: '1' | '2_3' | '4_5' | '5_plus';
  q16_compliance_requirements?: string[]; // multi-select, optional
}

// Section 5: Technology Landscape
export interface TechnologyResponses {
  q17_current_tools: string[]; // multi-select
  q18_integration_needs: 'none' | 'basic' | 'moderate' | 'complex';
  q19_data_migration: 'none' | 'small' | 'medium' | 'large' | 'enterprise';
  q20_custom_requirements?: string; // textarea, optional
}

// Section 6: Team & Resources
export interface TeamResourcesResponses {
  q21_finance_team_size: '0' | '1_2' | '3_5' | '6_10' | '10_plus';
  q22_ops_team_size: '0' | '1_2' | '3_5' | '6_10' | '10_plus';
  q23_technical_capability: 'limited' | 'moderate' | 'strong' | 'expert';
  q24_change_management: 'minimal' | 'some' | 'significant' | 'extensive';
}

// Section 7: Current Pain Points
export interface PainPointsResponses {
  q25_primary_challenges: string[]; // multi-select, max 3
  q26_time_spent_manual: 'under_10_hrs' | '10_20_hrs' | '20_40_hrs' | '40_plus_hrs';
  q27_reporting_gaps?: string; // textarea, optional
  q28_biggest_bottleneck: string; // textarea
}

// Section 8: Goals & Outcomes
export interface GoalsOutcomesResponses {
  q29_primary_goals: string[]; // multi-select
  q30_success_metrics: string[]; // multi-select
  q31_timeline_pressure: 'flexible' | 'moderate' | 'urgent' | 'critical';
  q32_roi_expectations?: string; // textarea, optional
}

// Section 9: Budget & Investment
export interface BudgetResponses {
  q33_budget_range: 'under_5k' | '5k_10k' | '10k_25k' | '25k_50k' | '50k_100k' | '100k_plus' | 'unsure';
  q34_investment_timeline: 'this_quarter' | 'next_quarter' | 'this_year' | 'next_year' | 'exploring';
  q35_decision_process: 'sole' | 'small_team' | 'committee' | 'board';
  q36_previous_investments?: string[]; // multi-select, optional
}

// Section 10: Next Steps & Readiness
export interface ReadinessResponses {
  q37_implementation_readiness: 'ready_now' | '1_3_months' | '3_6_months' | '6_plus_months' | 'evaluating';
  q38_preferred_next_step: 'detailed_quote' | 'demo' | 'consultation' | 'more_info' | 'internal_review';
}

// Complete quote responses
export interface QuoteResponses {
  contact: ContactInfo;
  companyOverview: CompanyOverviewResponses;
  revenueComplexity: RevenueComplexityResponses;
  customerComplexity: CustomerComplexityResponses;
  operationalComplexity: OperationalComplexityResponses;
  technology: TechnologyResponses;
  teamResources: TeamResourcesResponses;
  painPoints: PainPointsResponses;
  goalsOutcomes: GoalsOutcomesResponses;
  budget: BudgetResponses;
  readiness: ReadinessResponses;
}

// Question metadata
export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'radio' | 'checkbox' | 'text' | 'textarea' | 'slider' | 'select';
  options?: QuestionOption[];
  required?: boolean;
  maxSelections?: number;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

// Analysis types
export interface ComplexityScores {
  revenueComplexity: number;
  customerComplexity: number;
  operationalComplexity: number;
  technologyComplexity: number;
  overallComplexity: number;
}

export type ServiceTier = 'starter' | 'growth' | 'scale' | 'enterprise';

export interface PricingEstimate {
  tier: ServiceTier;
  monthlyMin: number;
  monthlyMax: number;
  implementationMin: number;
  implementationMax: number;
  confidence: 'low' | 'medium' | 'high';
}

export interface Pattern {
  id: string;
  name: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  recommendations: string[];
}

export interface QuoteAnalysis {
  scores: ComplexityScores;
  tier: ServiceTier;
  pricing: PricingEstimate;
  patterns: Pattern[];
  qualificationScore: number;
  isQualified: boolean;
}
