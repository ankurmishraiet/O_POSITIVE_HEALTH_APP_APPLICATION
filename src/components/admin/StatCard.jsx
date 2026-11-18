import { C, cardBase } from "../../theme";

export default function StatCard({ color, icon, label, value, foot }) {
  return (
    <div style={{ ...cardBase, padding: "14px 18px 12px", position: "relative", marginTop: 22, flex: "1 1 200px", minWidth: 200 }}>
      <div style={{ position: "absolute", top: -22, left: 16, width: 64, height: 64, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 26, boxShadow: `0 6px 16px ${color}66` }}>
        {icon}
      </div>
      <div style={{ textAlign: "right", minHeight: 52 }}>
        <div style={{ fontSize: 13, color: C.muted }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 600, color: C.text }}>{value}</div>
      </div>
      <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 10, paddingTop: 8, fontSize: 12, color: C.muted }}>{foot}</div>
    </div>
  );
}