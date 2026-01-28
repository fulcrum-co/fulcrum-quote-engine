import { Section } from './types/quote';

export const sections: Section[] = [
  // Section 0: Contact Information
  {
    id: 'contact',
    title: 'Contact Information',
    description: 'Tell us about yourself so we can personalize your quote.',
    questions: [
      {
        id: 'name',
        text: 'Name',
        type: 'text',
        required: true,
        placeholder: 'Your full name',
      },
      {
        id: 'email',
        text: 'Email',
        type: 'text',
        required: true,
        placeholder: 'you@company.com',
      },
      {
        id: 'companyName',
        text: 'Company Name',
        type: 'text',
        required: true,
        placeholder: 'Your organization',
      },
      {
        id: 'role',
        text: 'Your Role/Title',
        type: 'text',
        required: true,
        placeholder: 'CEO, CFO, VP Finance, etc.',
      },
      {
        id: 'phone',
        text: 'Phone (optional)',
        type: 'text',
        required: false,
        placeholder: '+1 (555) 123-4567',
      },
    ],
  },

  // Section 1: Company Overview
  {
    id: 'companyOverview',
    title: 'Company Overview',
    description: 'Help us understand your business at a high level.',
    questions: [
      {
        id: 'q1_industry',
        text: 'What industry is your company in?',
        type: 'select',
        required: true,
        options: [
          { value: 'saas', label: 'SaaS / Software' },
          { value: 'ecommerce', label: 'E-commerce / Retail' },
          { value: 'fintech', label: 'Fintech / Financial Services' },
          { value: 'healthcare', label: 'Healthcare / Life Sciences' },
          { value: 'manufacturing', label: 'Manufacturing' },
          { value: 'professional_services', label: 'Professional Services' },
          { value: 'media', label: 'Media / Entertainment' },
          { value: 'real_estate', label: 'Real Estate' },
          { value: 'education', label: 'Education' },
          { value: 'nonprofit', label: 'Nonprofit' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        id: 'q2_business_model',
        text: 'What is your primary business model?',
        type: 'radio',
        required: true,
        options: [
          { value: 'b2b', label: 'B2B - Selling to businesses' },
          { value: 'b2c', label: 'B2C - Selling to consumers' },
          { value: 'b2b2c', label: 'B2B2C - Both business and consumer' },
          { value: 'marketplace', label: 'Marketplace - Connecting buyers and sellers' },
          { value: 'hybrid', label: 'Hybrid - Multiple models' },
        ],
      },
      {
        id: 'q3_annual_revenue',
        text: 'What is your current annual revenue?',
        type: 'radio',
        required: true,
        options: [
          { value: 'pre_revenue', label: 'Pre-revenue' },
          { value: '0_500k', label: '$0 - $500K' },
          { value: '500k_2m', label: '$500K - $2M' },
          { value: '2m_5m', label: '$2M - $5M' },
          { value: '5m_10m', label: '$5M - $10M' },
          { value: '10m_plus', label: '$10M+' },
        ],
      },
      {
        id: 'q4_employee_count',
        text: 'How many employees does your company have?',
        type: 'radio',
        required: true,
        options: [
          { value: '1_5', label: '1-5 employees' },
          { value: '6_15', label: '6-15 employees' },
          { value: '16_30', label: '16-30 employees' },
          { value: '31_50', label: '31-50 employees' },
          { value: '51_100', label: '51-100 employees' },
          { value: '100_plus', label: '100+ employees' },
        ],
      },
    ],
  },

  // Section 2: Revenue Complexity
  {
    id: 'revenueComplexity',
    title: 'Revenue Complexity',
    description: 'Tell us about how you generate and manage revenue.',
    questions: [
      {
        id: 'q5_revenue_streams',
        text: 'How many distinct revenue streams does your business have?',
        type: 'slider',
        required: true,
        min: 1,
        max: 10,
      },
      {
        id: 'q6_pricing_models',
        text: 'Which pricing models do you use? (Select all that apply)',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'subscription', label: 'Subscription / Recurring' },
          { value: 'one_time', label: 'One-time purchases' },
          { value: 'usage_based', label: 'Usage-based / Metered' },
          { value: 'tiered', label: 'Tiered pricing' },
          { value: 'custom', label: 'Custom / Negotiated' },
          { value: 'freemium', label: 'Freemium model' },
          { value: 'licensing', label: 'Licensing fees' },
        ],
      },
      {
        id: 'q7_recurring_revenue_pct',
        text: 'What percentage of your revenue is recurring?',
        type: 'radio',
        required: true,
        options: [
          { value: '0_25', label: '0-25%' },
          { value: '25_50', label: '25-50%' },
          { value: '50_75', label: '50-75%' },
          { value: '75_100', label: '75-100%' },
        ],
      },
      {
        id: 'q8_billing_frequency',
        text: 'How frequently do you bill customers? (Select all that apply)',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'monthly', label: 'Monthly' },
          { value: 'quarterly', label: 'Quarterly' },
          { value: 'annually', label: 'Annually' },
          { value: 'one_time', label: 'One-time' },
          { value: 'milestone', label: 'Milestone-based' },
          { value: 'custom', label: 'Custom schedules' },
        ],
      },
    ],
  },

  // Section 3: Customer Complexity
  {
    id: 'customerComplexity',
    title: 'Customer Complexity',
    description: 'Help us understand your customer base.',
    questions: [
      {
        id: 'q9_customer_count',
        text: 'How many active customers do you have?',
        type: 'radio',
        required: true,
        options: [
          { value: '1_50', label: '1-50 customers' },
          { value: '51_200', label: '51-200 customers' },
          { value: '201_500', label: '201-500 customers' },
          { value: '501_2000', label: '501-2,000 customers' },
          { value: '2000_plus', label: '2,000+ customers' },
        ],
      },
      {
        id: 'q10_customer_segments',
        text: 'How many distinct customer segments do you serve?',
        type: 'slider',
        required: true,
        min: 1,
        max: 10,
      },
      {
        id: 'q11_contract_complexity',
        text: 'How would you describe your typical customer contracts?',
        type: 'radio',
        required: true,
        options: [
          { value: 'standard', label: 'Standardized - Same terms for all customers' },
          { value: 'semi_custom', label: 'Semi-custom - Standard with some variations' },
          { value: 'fully_custom', label: 'Fully custom - Each contract is unique' },
          { value: 'mixed', label: 'Mixed - Varies significantly by customer' },
        ],
      },
      {
        id: 'q12_sales_cycle_length',
        text: 'What is your typical sales cycle length?',
        type: 'radio',
        required: true,
        options: [
          { value: 'under_1_month', label: 'Under 1 month' },
          { value: '1_3_months', label: '1-3 months' },
          { value: '3_6_months', label: '3-6 months' },
          { value: '6_12_months', label: '6-12 months' },
          { value: 'over_12_months', label: 'Over 12 months' },
        ],
      },
    ],
  },

  // Section 4: Operational Complexity
  {
    id: 'operationalComplexity',
    title: 'Operational Complexity',
    description: 'Tell us about your operational footprint.',
    questions: [
      {
        id: 'q13_locations',
        text: 'How many business locations or offices do you have?',
        type: 'radio',
        required: true,
        options: [
          { value: '1', label: '1 location' },
          { value: '2_5', label: '2-5 locations' },
          { value: '6_10', label: '6-10 locations' },
          { value: '10_plus', label: '10+ locations' },
        ],
      },
      {
        id: 'q14_currencies',
        text: 'How many currencies do you operate in?',
        type: 'radio',
        required: true,
        options: [
          { value: '1', label: '1 currency (domestic only)' },
          { value: '2_3', label: '2-3 currencies' },
          { value: '4_10', label: '4-10 currencies' },
          { value: '10_plus', label: '10+ currencies' },
        ],
      },
      {
        id: 'q15_legal_entities',
        text: 'How many legal entities does your organization have?',
        type: 'radio',
        required: true,
        options: [
          { value: '1', label: '1 entity' },
          { value: '2_3', label: '2-3 entities' },
          { value: '4_5', label: '4-5 entities' },
          { value: '5_plus', label: '5+ entities' },
        ],
      },
      {
        id: 'q16_compliance_requirements',
        text: 'Which compliance requirements apply to your business? (Select all that apply)',
        type: 'checkbox',
        required: false,
        options: [
          { value: 'soc2', label: 'SOC 2' },
          { value: 'gaap', label: 'GAAP compliance' },
          { value: 'ifrs', label: 'IFRS' },
          { value: 'hipaa', label: 'HIPAA' },
          { value: 'gdpr', label: 'GDPR' },
          { value: 'pci', label: 'PCI-DSS' },
          { value: 'asc606', label: 'ASC 606 (Revenue Recognition)' },
          { value: 'other', label: 'Other industry-specific' },
        ],
      },
    ],
  },

  // Section 5: Technology Landscape
  {
    id: 'technology',
    title: 'Technology Landscape',
    description: 'Help us understand your current technology stack.',
    questions: [
      {
        id: 'q17_current_tools',
        text: 'Which tools do you currently use? (Select all that apply)',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'quickbooks', label: 'QuickBooks' },
          { value: 'xero', label: 'Xero' },
          { value: 'netsuite', label: 'NetSuite' },
          { value: 'sage', label: 'Sage' },
          { value: 'salesforce', label: 'Salesforce' },
          { value: 'hubspot', label: 'HubSpot' },
          { value: 'stripe', label: 'Stripe' },
          { value: 'excel', label: 'Excel / Google Sheets' },
          { value: 'other_erp', label: 'Other ERP' },
          { value: 'none', label: 'No dedicated system' },
        ],
      },
      {
        id: 'q18_integration_needs',
        text: 'What level of integration do you need with existing systems?',
        type: 'radio',
        required: true,
        options: [
          { value: 'none', label: 'None - Starting fresh' },
          { value: 'basic', label: 'Basic - Simple data import/export' },
          { value: 'moderate', label: 'Moderate - Real-time sync with 2-3 systems' },
          { value: 'complex', label: 'Complex - Deep integration with multiple systems' },
        ],
      },
      {
        id: 'q19_data_migration',
        text: 'How much historical data needs to be migrated?',
        type: 'radio',
        required: true,
        options: [
          { value: 'none', label: 'None - Starting fresh' },
          { value: 'small', label: 'Small - Less than 1 year' },
          { value: 'medium', label: 'Medium - 1-3 years' },
          { value: 'large', label: 'Large - 3-5 years' },
          { value: 'enterprise', label: 'Enterprise - 5+ years' },
        ],
      },
      {
        id: 'q20_custom_requirements',
        text: 'Do you have any specific technical or custom requirements?',
        type: 'textarea',
        required: false,
        maxLength: 500,
        placeholder: 'Describe any custom integrations, workflows, or technical requirements...',
      },
    ],
  },

  // Section 6: Team & Resources
  {
    id: 'teamResources',
    title: 'Team & Resources',
    description: 'Tell us about your team capacity.',
    questions: [
      {
        id: 'q21_finance_team_size',
        text: 'How many people are on your finance/accounting team?',
        type: 'radio',
        required: true,
        options: [
          { value: '0', label: 'None - Founder handles it' },
          { value: '1_2', label: '1-2 people' },
          { value: '3_5', label: '3-5 people' },
          { value: '6_10', label: '6-10 people' },
          { value: '10_plus', label: '10+ people' },
        ],
      },
      {
        id: 'q22_ops_team_size',
        text: 'How many people are on your operations team?',
        type: 'radio',
        required: true,
        options: [
          { value: '0', label: 'None - No dedicated ops team' },
          { value: '1_2', label: '1-2 people' },
          { value: '3_5', label: '3-5 people' },
          { value: '6_10', label: '6-10 people' },
          { value: '10_plus', label: '10+ people' },
        ],
      },
      {
        id: 'q23_technical_capability',
        text: 'How would you rate your team\'s technical capability?',
        type: 'radio',
        required: true,
        options: [
          { value: 'limited', label: 'Limited - Basic spreadsheet skills' },
          { value: 'moderate', label: 'Moderate - Comfortable with business software' },
          { value: 'strong', label: 'Strong - Can configure and customize tools' },
          { value: 'expert', label: 'Expert - Can build custom solutions' },
        ],
      },
      {
        id: 'q24_change_management',
        text: 'How much change management support will your team need?',
        type: 'radio',
        required: true,
        options: [
          { value: 'minimal', label: 'Minimal - Team adapts quickly' },
          { value: 'some', label: 'Some - Need basic training' },
          { value: 'significant', label: 'Significant - Need comprehensive training' },
          { value: 'extensive', label: 'Extensive - Major organizational change' },
        ],
      },
    ],
  },

  // Section 7: Current Pain Points
  {
    id: 'painPoints',
    title: 'Current Challenges',
    description: 'Help us understand your biggest pain points.',
    questions: [
      {
        id: 'q25_primary_challenges',
        text: 'What are your primary operational challenges? (Select up to 3)',
        type: 'checkbox',
        required: true,
        maxSelections: 3,
        options: [
          { value: 'manual_processes', label: 'Too many manual processes' },
          { value: 'data_silos', label: 'Data scattered across systems' },
          { value: 'reporting', label: 'Lack of real-time reporting' },
          { value: 'scaling', label: 'Difficulty scaling operations' },
          { value: 'cash_flow', label: 'Cash flow visibility' },
          { value: 'compliance', label: 'Compliance and audit readiness' },
          { value: 'forecasting', label: 'Inaccurate forecasting' },
          { value: 'team_bandwidth', label: 'Team bandwidth constraints' },
        ],
      },
      {
        id: 'q26_time_spent_manual',
        text: 'How many hours per week does your team spend on manual data entry and reconciliation?',
        type: 'radio',
        required: true,
        options: [
          { value: 'under_10_hrs', label: 'Under 10 hours' },
          { value: '10_20_hrs', label: '10-20 hours' },
          { value: '20_40_hrs', label: '20-40 hours' },
          { value: '40_plus_hrs', label: '40+ hours' },
        ],
      },
      {
        id: 'q27_reporting_gaps',
        text: 'What reports or insights are you currently missing?',
        type: 'textarea',
        required: false,
        maxLength: 400,
        placeholder: 'Describe the reports or visibility you wish you had...',
      },
      {
        id: 'q28_biggest_bottleneck',
        text: 'What is the single biggest bottleneck in your operations today?',
        type: 'textarea',
        required: true,
        maxLength: 400,
        placeholder: 'Describe your most significant operational bottleneck...',
      },
    ],
  },

  // Section 8: Goals & Outcomes
  {
    id: 'goalsOutcomes',
    title: 'Goals & Outcomes',
    description: 'What are you hoping to achieve?',
    questions: [
      {
        id: 'q29_primary_goals',
        text: 'What are your primary goals for this initiative? (Select all that apply)',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'efficiency', label: 'Improve operational efficiency' },
          { value: 'visibility', label: 'Gain better financial visibility' },
          { value: 'scale', label: 'Prepare for growth/scale' },
          { value: 'compliance', label: 'Strengthen compliance posture' },
          { value: 'reduce_costs', label: 'Reduce operational costs' },
          { value: 'faster_close', label: 'Faster month-end close' },
          { value: 'better_decisions', label: 'Enable better decision-making' },
        ],
      },
      {
        id: 'q30_success_metrics',
        text: 'How will you measure success? (Select all that apply)',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'time_saved', label: 'Time saved on manual tasks' },
          { value: 'error_reduction', label: 'Reduction in errors' },
          { value: 'faster_reporting', label: 'Faster reporting cycles' },
          { value: 'cost_savings', label: 'Cost savings' },
          { value: 'revenue_growth', label: 'Revenue growth support' },
          { value: 'audit_readiness', label: 'Improved audit readiness' },
          { value: 'team_satisfaction', label: 'Team satisfaction' },
        ],
      },
      {
        id: 'q31_timeline_pressure',
        text: 'How urgent is addressing these challenges?',
        type: 'radio',
        required: true,
        options: [
          { value: 'flexible', label: 'Flexible - No immediate pressure' },
          { value: 'moderate', label: 'Moderate - Within the next quarter' },
          { value: 'urgent', label: 'Urgent - Need to act soon' },
          { value: 'critical', label: 'Critical - Impacting business now' },
        ],
      },
      {
        id: 'q32_roi_expectations',
        text: 'What ROI or outcomes would make this investment worthwhile?',
        type: 'textarea',
        required: false,
        maxLength: 400,
        placeholder: 'Describe your expectations for return on investment...',
      },
    ],
  },

  // Section 9: Budget & Investment
  {
    id: 'budget',
    title: 'Budget & Investment',
    description: 'Help us understand your investment parameters.',
    questions: [
      {
        id: 'q33_budget_range',
        text: 'What is your expected budget for this initiative?',
        type: 'radio',
        required: true,
        options: [
          { value: 'under_5k', label: 'Under $5,000/month' },
          { value: '5k_10k', label: '$5,000 - $10,000/month' },
          { value: '10k_25k', label: '$10,000 - $25,000/month' },
          { value: '25k_50k', label: '$25,000 - $50,000/month' },
          { value: '50k_100k', label: '$50,000 - $100,000/month' },
          { value: '100k_plus', label: '$100,000+/month' },
          { value: 'unsure', label: 'Unsure - Need guidance' },
        ],
      },
      {
        id: 'q34_investment_timeline',
        text: 'When are you looking to make this investment?',
        type: 'radio',
        required: true,
        options: [
          { value: 'this_quarter', label: 'This quarter' },
          { value: 'next_quarter', label: 'Next quarter' },
          { value: 'this_year', label: 'This fiscal year' },
          { value: 'next_year', label: 'Next fiscal year' },
          { value: 'exploring', label: 'Just exploring options' },
        ],
      },
      {
        id: 'q35_decision_process',
        text: 'Who is involved in the decision-making process?',
        type: 'radio',
        required: true,
        options: [
          { value: 'sole', label: 'I make the decision alone' },
          { value: 'small_team', label: 'Small leadership team (2-3 people)' },
          { value: 'committee', label: 'Executive committee' },
          { value: 'board', label: 'Board approval required' },
        ],
      },
      {
        id: 'q36_previous_investments',
        text: 'Have you previously invested in similar solutions? (Select all that apply)',
        type: 'checkbox',
        required: false,
        options: [
          { value: 'accounting_software', label: 'Accounting software' },
          { value: 'erp', label: 'ERP system' },
          { value: 'consulting', label: 'Management consulting' },
          { value: 'fractional', label: 'Fractional CFO/COO' },
          { value: 'automation', label: 'Process automation' },
          { value: 'none', label: 'No previous investments' },
        ],
      },
    ],
  },

  // Section 10: Next Steps & Readiness
  {
    id: 'readiness',
    title: 'Next Steps',
    description: 'Help us understand your readiness and preferred next steps.',
    questions: [
      {
        id: 'q37_implementation_readiness',
        text: 'How soon are you ready to begin implementation?',
        type: 'radio',
        required: true,
        options: [
          { value: 'ready_now', label: 'Ready to start immediately' },
          { value: '1_3_months', label: 'Within 1-3 months' },
          { value: '3_6_months', label: 'Within 3-6 months' },
          { value: '6_plus_months', label: '6+ months out' },
          { value: 'evaluating', label: 'Just evaluating options' },
        ],
      },
      {
        id: 'q38_preferred_next_step',
        text: 'What would be most valuable as a next step?',
        type: 'radio',
        required: true,
        options: [
          { value: 'detailed_quote', label: 'A detailed quote with pricing' },
          { value: 'demo', label: 'A product demo' },
          { value: 'consultation', label: 'A consultation call' },
          { value: 'more_info', label: 'More information first' },
          { value: 'internal_review', label: 'I need to review internally' },
        ],
      },
    ],
  },
];

export const TOTAL_SECTIONS = sections.length;
export const QUOTE_SECTIONS = sections.slice(1); // Sections after contact info
