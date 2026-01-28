'use client';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  name: string;
  options: CheckboxOption[];
  value?: string[];
  onChange: (value: string[]) => void;
  error?: string;
  maxSelections?: number;
}

export default function CheckboxGroup({ name, options, value = [], onChange, error, maxSelections }: CheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      if (maxSelections && value.length >= maxSelections) {
        return; // Don't allow more selections
      }
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  const isDisabled = (optionValue: string): boolean => {
    return Boolean(maxSelections && value.length >= maxSelections && !value.includes(optionValue));
  };

  return (
    <div className="space-y-3">
      {maxSelections && (
        <p className="text-sm text-[#6b7280]">
          Select up to {maxSelections} {value.length > 0 && `(${value.length} selected)`}
        </p>
      )}
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            flex items-start gap-3 p-4 rounded-lg border cursor-pointer
            transition-all duration-150
            ${value.includes(option.value)
              ? 'border-[#1a1a1a] bg-[#f9fafb]'
              : 'border-[#e5e7eb] hover:border-[#9ca3af]'
            }
            ${isDisabled(option.value) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
            disabled={isDisabled(option.value)}
            className="mt-0.5 w-4 h-4 text-[#1a1a1a] border-[#e5e7eb] rounded focus:ring-[#1a1a1a]"
          />
          <span className="text-[#1a1a1a]">{option.label}</span>
        </label>
      ))}
      {error && (
        <p className="text-sm text-[#dc2626]">{error}</p>
      )}
    </div>
  );
}
