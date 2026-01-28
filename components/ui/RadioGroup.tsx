'use client';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function RadioGroup({ name, options, value, onChange, error }: RadioGroupProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            flex items-start gap-3 p-4 rounded-lg border cursor-pointer
            transition-all duration-150
            ${value === option.value
              ? 'border-[#1a1a1a] bg-[#f9fafb]'
              : 'border-[#e5e7eb] hover:border-[#9ca3af]'
            }
          `}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-0.5 w-4 h-4 text-[#1a1a1a] border-[#e5e7eb] focus:ring-[#1a1a1a]"
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
