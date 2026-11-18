import { NavLink } from "react-router-dom";
import { C } from "../../theme";

const menu = [
  ["Dashboard", "/admin/dashboard"],
  ["Patients", "/admin/patients"],
  ["Appointments", "/admin/appointments"],
  ["Reports", "/admin/reports"],
  ["Pharmacy", "/admin/pharmacy"],
  ["Locations", "/admin/locations"],
  ["Notifications", "/admin/notifications"],
    ["Doctors", "/admin/doctors"],
  ["Hospitals", "/admin/hospitals"],
  ["Videos", "/admin/videos"],
  ["Articles", "/admin/articles"],
];

export default function Sidebar() {
  return (
    <aside style={{ width: 240, flexShrink: 0, background: "#fff", boxShadow: "2px 0 16px rgba(31,27,122,0.06)", padding: "18px 14px", display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center", paddingBottom: 14, borderBottom: `1px solid ${C.line}`, marginBottom: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.indigo }}>
          <span style={{ color: C.orange }}>O</span> Positive Health
        </div>
        <div style={{ fontSize: 11, color: C.orange, letterSpacing: 2, marginTop: 2 }}>CARE BEFORE CURE</div>
      </div>

      {menu.map(([label, to]) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            display: "block", padding: "11px 16px", marginBottom: 6, borderRadius: 6, fontSize: 14, textDecoration: "none",
            background: isActive ? `linear-gradient(135deg, ${C.indigo}, ${C.navy})` : "transparent",
            color: isActive ? "#fff" : C.text,
            boxShadow: isActive ? `0 4px 14px ${C.indigo}66` : "none",
            fontWeight: isActive ? 500 : 400,
          })}
        >
          {label}
        </NavLink>
      ))}

      <div style={{ marginTop: "auto", padding: 14, borderRadius: 8, background: `${C.orange}18`, fontSize: 12, color: C.muted }}>
        <b style={{ color: C.orange }}>Need help?</b>
        <div style={{ marginTop: 4 }}>Contact support for setup and training.</div>
      </div>
    </aside>
  );
}