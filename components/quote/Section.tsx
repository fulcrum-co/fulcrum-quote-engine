'use client';

import { Section as SectionType } from '@/lib/types/quote';
import Question from './Question';

interface SectionProps {
  section: SectionType;
  values: Record<string, unknown>;
  errors: Record<string, string>;
  onChange: (questionId: string, value: unknown) => void;
  startingQuestionNumber?: number;
}

export default function Section({ section, values, errors, onChange, startingQuestionNumber }: SectionProps) {
  return (
    <div className="py-8 space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-[#1a1a1a]">{section.title}</h2>
        {section.description && (
          <p className="text-[#6b7280]">{section.description}</p>
        )}
      </div>

      <div className="space-y-8">
        {section.questions.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            value={values[question.id]}
            error={errors[question.id]}
            onChange={(value) => onChange(question.id, value)}
            questionNumber={startingQuestionNumber !== undefined ? startingQuestionNumber + index : undefined}
          />
        ))}
      </div>
    </div>
  );
}
