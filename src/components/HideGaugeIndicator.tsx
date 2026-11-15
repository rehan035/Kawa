import { getGaugeSegments } from '../utils/tanneryLogic';

interface HideGaugeIndicatorProps {
  thicknessLabel: string;
  thicknessMm: number;
}

export function HideGaugeIndicator({ thicknessLabel, thicknessMm }: HideGaugeIndicatorProps) {
  const activeSegments = getGaugeSegments(thicknessMm);

  return (
    <div className="flex items-center justify-between gap-3 border-t border-[#D8CEBF] pt-2.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#544840] whitespace-nowrap">
        Hide Gauge
      </span>
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1"
          aria-label={`Thickness gauge ${thicknessLabel}, ${activeSegments} of 5`}
        >
          {[1, 2, 3, 4, 5].map((segment) => (
            <span
              key={segment}
              className={`h-2 w-3 border ${
                segment <= activeSegments
                  ? 'border-[#9B7732] bg-[#C5A059]'
                  : 'border-[#D8CEBF] bg-[#EBE3D7]'
              }`}
            />
          ))}
        </div>
        <span className="tabular-nums text-xs font-semibold text-[#1F1A17] whitespace-nowrap">
          {thicknessLabel}
        </span>
      </div>
    </div>
  );
}
