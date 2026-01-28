'use client';

import { Question as QuestionType } from '@/lib/types/quote';
import { TextInput, TextArea, RadioGroup, CheckboxGroup, Select, Slider } from '@/components/ui';

interface QuestionProps {
  question: QuestionType;
  value: unknown;
  error?: string;
  onChange: (value: unknown) => void;
  questionNumber?: number;
}

export default function Question({ question, value, error, onChange, questionNumber }: QuestionProps) {
  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <TextInput
            name={question.id}
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            error={error}
          />
        );

      case 'textarea':
        return (
          <TextArea
            name={question.id}
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            maxLength={question.maxLength}
            error={error}
          />
        );

      case 'radio':
        return (
          <RadioGroup
            name={question.id}
            options={question.options || []}
            value={value as string}
            onChange={onChange}
            error={error}
          />
        );

      case 'checkbox':
        return (
          <CheckboxGroup
            name={question.id}
            options={question.options || []}
            value={value as string[]}
            onChange={onChange}
            maxSelections={question.maxSelections}
            error={error}
          />
        );

      case 'select':
        return (
          <Select
            name={question.id}
            options={question.options || []}
            value={value as string}
            onChange={onChange}
            error={error}
          />
        );

      case 'slider':
        return (
          <Slider
            name={question.id}
            min={question.min || 1}
            max={question.max || 10}
            value={value as number}
            onChange={onChange}
            error={error}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-[#1a1a1a]">
          {questionNumber !== undefined && (
            <span className="text-[#6b7280] mr-2">{questionNumber}.</span>
          )}
          {question.text}
          {question.required && <span className="text-[#dc2626] ml-1">*</span>}
        </h3>
      </div>
      {renderInput()}
    </div>
  );
}
