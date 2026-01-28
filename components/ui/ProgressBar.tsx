'use client';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-[#6b7280]">
        <span>Section {current} of {total}</span>
        <span>{Math.round(percentage)}% complete</span>
      </div>
      <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1a1a1a] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
