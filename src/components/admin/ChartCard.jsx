import { C, cardBase } from "../../theme";

export default function ChartCard({ color, title, sub, foot, children }) {
  return (
    <div style={{ ...cardBase, flex: "1 1 280px", minWidth: 280, padding: "0 16px 12px", marginTop: 20 }}>
      <div style={{ background: color, borderRadius: 10, marginTop: -16, padding: "14px 8px 6px", boxShadow: `0 6px 16px ${color}66` }}>{children}</div>
      <div style={{ padding: "12px 4px 0" }}>
        <div style={{ fontSize: 17, fontWeight: 500, color: C.text }}>{title}</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{sub}</div>
        <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 12, paddingTop: 8, fontSize: 12, color: C.muted }}>{foot}</div>
      </div>
    </div>
  );
}