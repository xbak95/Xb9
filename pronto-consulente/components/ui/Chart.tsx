/** Mini grafici SVG leggeri, senza dipendenze esterne, per KPI nelle dashboard. */

export function BarMiniChart({
  data,
  className,
  color = "#124A8A",
}: {
  data: { label: string; value: number }[];
  className?: string;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={className}>
      <div className="flex h-32 items-end gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-full w-full items-end">
              <div
                className="w-full rounded-md transition-all"
                style={{ height: `${(d.value / max) * 100}%`, backgroundColor: i === data.length - 1 ? "#C89B4A" : color, opacity: i === data.length - 1 ? 1 : 0.75 }}
              />
            </div>
            <span className="text-[11px] text-body">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LineMiniChart({ data, className, color = "#124A8A" }: { data: number[]; className?: string; color?: string }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DonutChart({
  segments,
  size = 140,
  strokeWidth = 16,
}: {
  segments: { value: number; color: string; label: string }[];
  size?: number;
  strokeWidth?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {segments.map((s, i) => {
          const dash = (s.value / total) * circumference;
          const circle = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += dash;
          return circle;
        })}
      </g>
    </svg>
  );
}
