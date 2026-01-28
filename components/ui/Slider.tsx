'use client';

interface SliderProps {
  name: string;
  min: number;
  max: number;
  value?: number;
  onChange: (value: number) => void;
  error?: string;
}

export default function Slider({ name, min, max, value = min, onChange, error }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold text-[#1a1a1a]">
          {value}{value >= max ? '+' : ''}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-[#e5e7eb] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:bg-[#1a1a1a]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-md
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:bg-[#1a1a1a]
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-0
          "
          style={{
            background: `linear-gradient(to right, #1a1a1a 0%, #1a1a1a ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between mt-2 text-sm text-[#6b7280]">
          <span>{min}</span>
          <span>{max}+</span>
        </div>
      </div>
      {error && (
        <p className="text-sm text-[#dc2626]">{error}</p>
      )}
    </div>
  );
}
