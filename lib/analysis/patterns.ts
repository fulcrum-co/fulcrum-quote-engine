import { QuoteResponses, ComplexityScores, Pattern } from '@/lib/types/quote';

// Detect patterns and provide recommendations
export function detectPatterns(responses: QuoteResponses, scores: ComplexityScores): Pattern[] {
  const patterns: Pattern[] = [];

  // High revenue complexity with low team capacity
  if (scores.revenueComplexity > 60 && isLowTeamCapacity(responses)) {
    patterns.push({
      id: 'revenue_team_mismatch',
      name: 'Revenue Complexity Gap',
      description: 'Your revenue model is complex but team capacity is limited.',
      severity: 'warning',
      recommendations: [
        'Consider automating billing and invoicing processes',
        'Implement self-service capabilities for customers',
        'Evaluate adding finance operations support',
      ],
    });
  }

  // Multi-currency/entity without proper tools
  if (isMultiNational(responses) && !hasEnterpriseTools(responses)) {
    patterns.push({
      id: 'multinational_tools_gap',
      name: 'International Operations Gap',
      description: 'Operating across currencies or entities without enterprise-grade tools.',
      severity: 'critical',
      recommendations: [
        'Implement multi-currency accounting software',
        'Consider consolidation tools for multi-entity reporting',
        'Ensure compliance with local regulations',
      ],
    });
  }

  // High manual work with urgent timeline
  if (isHighManualWork(responses) && isUrgentTimeline(responses)) {
    patterns.push({
      id: 'urgency_automation_need',
      name: 'Urgent Automation Need',
      description: 'Significant manual work combined with urgent timeline pressure.',
      severity: 'critical',
      recommendations: [
        'Prioritize quick-win automations',
        'Consider phased implementation approach',
        'Identify processes with highest ROI for automation',
      ],
    });
  }

  // Complex integrations with limited technical capability
  if (needsComplexIntegrations(responses) && hasLimitedTechCapability(responses)) {
    patterns.push({
      id: 'integration_capability_gap',
      name: 'Integration Capability Gap',
      description: 'Complex integration needs but limited internal technical capability.',
      severity: 'warning',
      recommendations: [
        'Consider managed integration services',
        'Prioritize tools with pre-built connectors',
        'Plan for ongoing technical support',
      ],
    });
  }

  // High customer complexity with standard contracts
  if (scores.customerComplexity > 50 && hasStandardContracts(responses)) {
    patterns.push({
      id: 'customer_contract_opportunity',
      name: 'Contract Standardization Opportunity',
      description: 'Complex customer base with potential for more standardized offerings.',
      severity: 'info',
      recommendations: [
        'Consider tiered pricing packages',
        'Develop standard contract templates',
        'Implement customer self-service options',
      ],
    });
  }

  // Scale indicators present
  if (hasScaleIndicators(responses, scores)) {
    patterns.push({
      id: 'scale_readiness',
      name: 'Scale Readiness',
      description: 'Your organization shows signs of preparing for significant growth.',
      severity: 'info',
      recommendations: [
        'Build scalable processes before they become bottlenecks',
        'Invest in automation and self-service capabilities',
        'Document and standardize key workflows',
      ],
    });
  }

  // Compliance complexity
  if (hasSignificantCompliance(responses)) {
    patterns.push({
      id: 'compliance_focus',
      name: 'Compliance Complexity',
      description: 'Multiple compliance requirements require systematic approach.',
      severity: 'warning',
      recommendations: [
        'Implement audit-ready documentation practices',
        'Consider compliance automation tools',
        'Plan for regular compliance reviews',
      ],
    });
  }

  return patterns;
}

// Helper functions
function isLowTeamCapacity(responses: QuoteResponses): boolean {
  return (
    responses.teamResources.q21_finance_team_size === '0' ||
    responses.teamResources.q21_finance_team_size === '1_2'
  );
}

function isMultiNational(responses: QuoteResponses): boolean {
  return (
    responses.operationalComplexity.q14_currencies !== '1' ||
    responses.operationalComplexity.q15_legal_entities !== '1' ||
    responses.operationalComplexity.q13_locations !== '1'
  );
}

function hasEnterpriseTools(responses: QuoteResponses): boolean {
  const enterpriseTools = ['netsuite', 'sage', 'other_erp'];
  return responses.technology.q17_current_tools?.some((tool: string) =>
    enterpriseTools.includes(tool)
  ) || false;
}

function isHighManualWork(responses: QuoteResponses): boolean {
  return (
    responses.painPoints.q26_time_spent_manual === '20_40_hrs' ||
    responses.painPoints.q26_time_spent_manual === '40_plus_hrs'
  );
}

function isUrgentTimeline(responses: QuoteResponses): boolean {
  return (
    responses.goalsOutcomes.q31_timeline_pressure === 'urgent' ||
    responses.goalsOutcomes.q31_timeline_pressure === 'critical'
  );
}

function needsComplexIntegrations(responses: QuoteResponses): boolean {
  return responses.technology.q18_integration_needs === 'complex';
}

function hasLimitedTechCapability(responses: QuoteResponses): boolean {
  return responses.teamResources.q23_technical_capability === 'limited';
}

function hasStandardContracts(responses: QuoteResponses): boolean {
  return responses.customerComplexity.q11_contract_complexity === 'standard';
}

function hasScaleIndicators(responses: QuoteResponses, scores: ComplexityScores): boolean {
  const goals = responses.goalsOutcomes.q29_primary_goals || [];
  return (
    goals.includes('scale') &&
    scores.overallComplexity < 60 &&
    (responses.companyOverview.q3_annual_revenue === '2m_5m' ||
      responses.companyOverview.q3_annual_revenue === '5m_10m')
  );
}

function hasSignificantCompliance(responses: QuoteResponses): boolean {
  return (responses.operationalComplexity.q16_compliance_requirements?.length || 0) >= 3;
}
