import React from 'react';

interface MiniSparklineProps {
  points: number[];
  isBullish: boolean;
  className?: string;
}

export const MiniSparkline: React.FC<MiniSparklineProps> = ({ points, isBullish, className = 'w-full h-9' }) => {
  if (!points || points.length < 2) return null;

  const width = 140;
  const height = 36;
  const paddingY = 4;
  const availableHeight = height - paddingY * 2;

  const minVal = Math.min(...points);
  const maxVal = Math.max(...points);
  const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

  const stepX = width / (points.length - 1);

  // Compute points coords
  const coords = points.map((val, idx) => {
    const x = idx * stepX;
    const normalizedY = (val - minVal) / range;
    const y = height - paddingY - normalizedY * availableHeight;
    return { x, y };
  });

  // Build cubic bezier SVG path
  let pathD = `M ${coords[0].x},${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    const cp1x = prev.x + stepX / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + stepX / 2;
    const cp2y = curr.y;
    pathD += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
  }

  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  const lineColor = isBullish ? '#00E676' : '#FF1744';
  const fillGradientId = `spark-fill-${isBullish ? 'bull' : 'bear'}-${Math.random().toString(36).substring(2, 7)}`;
  const lastPoint = coords[coords.length - 1];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Area under curve */}
      <path d={areaD} fill={`url(#${fillGradientId})`} />

      {/* Sparkline curve */}
      <path
        d={pathD}
        fill="none"
        stroke={lineColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pulsing endpoint */}
      <circle cx={lastPoint.x} cy={lastPoint.y} r="4.5" fill={lineColor} fillOpacity="0.3" />
      <circle cx={lastPoint.x} cy={lastPoint.y} r="2.2" fill={lineColor} />
    </svg>
  );
};
