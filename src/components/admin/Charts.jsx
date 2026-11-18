import { C } from "../../theme";

export function LineChart({ data, labels }) {
  const w = 280, h = 120, max = Math.max(...data) * 1.1;
  const pts = data.map((v, i) => [10 + (i * (w - 20)) / (data.length - 1), h - 10 - (v / max) * (h - 20)]);
  return (
    <svg viewBox={`0 0 ${w} ${h + 18}`} style={{ width: "100%", display: "block" }}>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#fff" strokeOpacity="0.18" />
      ))}
      <polyline fill="none" stroke="#fff" strokeWidth="2.5" points={pts.map((p) => p.join(",")).join(" ")} />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={C.indigo} stroke="#fff" strokeWidth="2" />)}
      {labels.map((l, i) => (
        <text key={i} x={pts[i][0]} y={h + 14} fontSize="9" fill="#fff" fillOpacity="0.85" textAnchor="middle">{l}</text>
      ))}
    </svg>
  );
}

export function BarChart({ data, labels }) {
  const w = 280, h = 120, max = Math.max(...data) * 1.1, bw = (w - 20) / data.length - 6;
  return (
    <svg viewBox={`0 0 ${w} ${h + 18}`} style={{ width: "100%", display: "block" }}>
      {data.map((v, i) => {
        const bh = (v / max) * (h - 10);
        const x = 10 + i * (bw + 6);
        return (
          <g key={i}>
            <rect x={x} y={h - bh} width={bw} height={bh} rx="2" fill="#fff" fillOpacity="0.9" />
            <text x={x + bw / 2} y={h + 14} fontSize="8" fill="#fff" fillOpacity="0.85" textAnchor="middle">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}