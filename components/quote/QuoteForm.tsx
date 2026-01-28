'use client';

import { useReducer, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { sections, TOTAL_SECTIONS } from '@/lib/questions';
import { Button, ProgressBar } from '@/components/ui';
import Section from './Section';

// Form state types
interface FormState {
  currentSection: number;
  responses: Record<string, unknown>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  submitError: string | null;
}

type FormAction =
  | { type: 'SET_RESPONSE'; questionId: string; value: unknown }
  | { type: 'NEXT_SECTION' }
  | { type: 'PREV_SECTION' }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'CLEAR_ERROR'; questionId: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'LOAD_SAVED'; responses: Record<string, unknown>; currentSection: number };

const STORAGE_KEY = 'fulcrum_quote_progress';

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_RESPONSE':
      return {
        ...state,
        responses: { ...state.responses, [action.questionId]: action.value },
        errors: { ...state.errors, [action.questionId]: '' },
      };
    case 'NEXT_SECTION':
      return { ...state, currentSection: state.currentSection + 1 };
    case 'PREV_SECTION':
      return { ...state, currentSection: Math.max(0, state.currentSection - 1) };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'CLEAR_ERROR':
      return { ...state, errors: { ...state.errors, [action.questionId]: '' } };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, submitError: null };
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false };
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, submitError: action.error };
    case 'LOAD_SAVED':
      return { ...state, responses: action.responses, currentSection: action.currentSection };
    default:
      return state;
  }
}

const initialState: FormState = {
  currentSection: 0,
  responses: {
    q5_revenue_streams: 1,
    q10_customer_segments: 1,
  },
  errors: {},
  isSubmitting: false,
  submitError: null,
};

export default function QuoteForm() {
  const router = useRouter();
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { responses, currentSection } = JSON.parse(saved);
        dispatch({ type: 'LOAD_SAVED', responses, currentSection });
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          responses: state.responses,
          currentSection: state.currentSection,
        })
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [state.responses, state.currentSection]);

  const currentSectionData = sections[state.currentSection];
  const isFirstSection = state.currentSection === 0;
  const isLastSection = state.currentSection === TOTAL_SECTIONS - 1;

  // Calculate starting question number for current section
  const getStartingQuestionNumber = useCallback(() => {
    if (state.currentSection === 0) return undefined; // Contact section has no numbers
    let count = 0;
    for (let i = 1; i < state.currentSection; i++) {
      count += sections[i].questions.length;
    }
    return count + 1;
  }, [state.currentSection]);

  const validateSection = useCallback(() => {
    const errors: Record<string, string> = {};
    const section = sections[state.currentSection];

    for (const question of section.questions) {
      const value = state.responses[question.id];

      // Required validation
      if (question.required) {
        if (question.type === 'checkbox') {
          if (!value || (value as string[]).length === 0) {
            errors[question.id] = 'Please select at least one option';
          }
        } else if (question.type === 'slider') {
          if (value === undefined || value === null) {
            errors[question.id] = 'Please select a value';
          }
        } else if (question.type === 'textarea') {
          const text = (value as string) || '';
          if (!text.trim()) {
            errors[question.id] = 'This field is required';
          } else if (question.minLength && text.length < question.minLength) {
            errors[question.id] = `Please provide at least ${question.minLength} characters`;
          }
        } else if (!value || (typeof value === 'string' && !value.trim())) {
          errors[question.id] = 'This field is required';
        }
      }

      // Email validation
      if (question.id === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string)) {
          errors[question.id] = 'Please enter a valid email address';
        }
      }

      // Max selections validation for checkbox
      if (question.type === 'checkbox' && question.maxSelections && value) {
        if ((value as string[]).length > question.maxSelections) {
          errors[question.id] = `Please select at most ${question.maxSelections} options`;
        }
      }

      // Max length validation for textarea
      if (question.type === 'textarea' && question.maxLength && value) {
        if ((value as string).length > question.maxLength) {
          errors[question.id] = `Please keep your response under ${question.maxLength} characters`;
        }
      }
    }

    return errors;
  }, [state.currentSection, state.responses]);

  const handleNext = useCallback(() => {
    const errors = validateSection();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      // Scroll to first error
      const firstErrorId = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorId}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (isLastSection) {
      handleSubmit();
    } else {
      dispatch({ type: 'NEXT_SECTION' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [validateSection, isLastSection]);

  const handlePrev = useCallback(() => {
    dispatch({ type: 'PREV_SECTION' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async () => {
    dispatch({ type: 'SUBMIT_START' });

    try {
      // Structure the responses according to API expectations
      const formattedResponses = {
        contact: {
          name: state.responses.name as string,
          email: state.responses.email as string,
          companyName: state.responses.companyName as string,
          role: state.responses.role as string,
          phone: state.responses.phone as string || undefined,
        },
        companyOverview: {
          q1_industry: state.responses.q1_industry,
          q2_business_model: state.responses.q2_business_model,
          q3_annual_revenue: state.responses.q3_annual_revenue,
          q4_employee_count: state.responses.q4_employee_count,
        },
        revenueComplexity: {
          q5_revenue_streams: state.responses.q5_revenue_streams,
          q6_pricing_models: state.responses.q6_pricing_models,
          q7_recurring_revenue_pct: state.responses.q7_recurring_revenue_pct,
          q8_billing_frequency: state.responses.q8_billing_frequency,
        },
        customerComplexity: {
          q9_customer_count: state.responses.q9_customer_count,
          q10_customer_segments: state.responses.q10_customer_segments,
          q11_contract_complexity: state.responses.q11_contract_complexity,
          q12_sales_cycle_length: state.responses.q12_sales_cycle_length,
        },
        operationalComplexity: {
          q13_locations: state.responses.q13_locations,
          q14_currencies: state.responses.q14_currencies,
          q15_legal_entities: state.responses.q15_legal_entities,
          q16_compliance_requirements: state.responses.q16_compliance_requirements || [],
        },
        technology: {
          q17_current_tools: state.responses.q17_current_tools,
          q18_integration_needs: state.responses.q18_integration_needs,
          q19_data_migration: state.responses.q19_data_migration,
          q20_custom_requirements: state.responses.q20_custom_requirements || '',
        },
        teamResources: {
          q21_finance_team_size: state.responses.q21_finance_team_size,
          q22_ops_team_size: state.responses.q22_ops_team_size,
          q23_technical_capability: state.responses.q23_technical_capability,
          q24_change_management: state.responses.q24_change_management,
        },
        painPoints: {
          q25_primary_challenges: state.responses.q25_primary_challenges,
          q26_time_spent_manual: state.responses.q26_time_spent_manual,
          q27_reporting_gaps: state.responses.q27_reporting_gaps || '',
          q28_biggest_bottleneck: state.responses.q28_biggest_bottleneck,
        },
        goalsOutcomes: {
          q29_primary_goals: state.responses.q29_primary_goals,
          q30_success_metrics: state.responses.q30_success_metrics,
          q31_timeline_pressure: state.responses.q31_timeline_pressure,
          q32_roi_expectations: state.responses.q32_roi_expectations || '',
        },
        budget: {
          q33_budget_range: state.responses.q33_budget_range,
          q34_investment_timeline: state.responses.q34_investment_timeline,
          q35_decision_process: state.responses.q35_decision_process,
          q36_previous_investments: state.responses.q36_previous_investments || [],
        },
        readiness: {
          q37_implementation_readiness: state.responses.q37_implementation_readiness,
          q38_preferred_next_step: state.responses.q38_preferred_next_step,
        },
      };

      const response = await fetch('/api/quote/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedResponses),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit quote request');
      }

      const data = await response.json();

      // Clear saved progress
      localStorage.removeItem(STORAGE_KEY);

      // Store quote data for display on complete page
      if (data.pdfBase64) {
        localStorage.setItem('fulcrum_quote_pdf', JSON.stringify({
          id: data.id,
          pdfBase64: data.pdfBase64,
          companyName: data.companyName,
        }));
      }

      dispatch({ type: 'SUBMIT_SUCCESS' });

      // Navigate to completion page
      router.push(`/quote/complete?id=${data.id}`);
    } catch (error) {
      dispatch({
        type: 'SUBMIT_ERROR',
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-[#1a1a1a]">
              Quote Assessment
            </h1>
          </div>
          <ProgressBar current={state.currentSection + 1} total={TOTAL_SECTIONS} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-32">
        <Section
          section={currentSectionData}
          values={state.responses}
          errors={state.errors}
          onChange={(questionId, value) =>
            dispatch({ type: 'SET_RESPONSE', questionId, value })
          }
          startingQuestionNumber={getStartingQuestionNumber()}
        />
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb]">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {state.submitError && (
            <div className="mb-4 p-4 bg-[#dc2626]/10 border border-[#dc2626]/20 rounded-lg">
              <p className="text-sm text-[#dc2626]">{state.submitError}</p>
            </div>
          )}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={isFirstSection || state.isSubmitting}
              className={isFirstSection ? 'invisible' : ''}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              isLoading={state.isSubmitting}
              className="min-w-[140px]"
            >
              {isLastSection ? 'Submit Quote Request' : 'Continue'}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
