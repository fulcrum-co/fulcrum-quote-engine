'use client';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export default function Select({ name, options, value, onChange, error, placeholder = 'Select an option...' }: SelectProps) {
  return (
    <div className="space-y-1">
      <select
        name={name}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-3 rounded-lg border appearance-none bg-white
          ${error ? 'border-[#dc2626]' : 'border-[#e5e7eb]'}
          focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent
          ${!value ? 'text-[#9ca3af]' : 'text-[#1a1a1a]'}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem',
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-[#dc2626]">{error}</p>
      )}
    </div>
  );
}
