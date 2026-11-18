import { useState } from "react";
import StatCard from "../../components/admin/StatCard";
import ChartCard from "../../components/admin/ChartCard";
import { LineChart, BarChart } from "../../components/admin/Charts";
import { C, font, cardBase } from "../../theme";

const tasks = {
  Urgent: ["Review critical lab results for Ward 3", "Restock oxygen cylinders in emergency", "Call back patient in bed 12 about discharge"],
  Routine: ["Update vaccination records", "Schedule monthly health camp", "Send follow-up reminders"],
  Admin: ["Approve staff leave requests", "Reconcile pharmacy invoices", "Renew equipment service contract"],
};

const staff = [
  ["Dr. Harpreet Singh", "Cardiology", "42 patients"],
  ["Dr. Simran Kaur", "Pediatrics", "38 patients"],
  ["Dr. Amit Sharma", "General Medicine", "55 patients"],
  ["Dr. Neha Gill", "Gynecology", "31 patients"],
];

export default function Dashboard() {
  const [tab, setTab] = useState("Urgent");
  const [done, setDone] = useState({ Urgent0: true });

  return (
    <>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <StatCard color={C.orange} icon="🩺" label="Patients Today" value="148" foot="⚠ View waiting list" />
        <StatCard color={C.indigo} icon="💰" label="Revenue" value="₹34,245" foot="🕒 Last 24 hours" />
        <StatCard color={C.red} icon="❗" label="Critical Cases" value="7" foot="🏷 Tracked in ICU" />
        <StatCard color={C.teal} icon="👥" label="New Patients" value="+245" foot="🔄 Just updated" />
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 8 }}>
        <ChartCard color={C.indigo} title="Daily Appointments" sub={<><span style={{ color: C.green }}>↑ 55%</span> increase this week.</>} foot="🕒 updated 4 minutes ago">
          <LineChart data={[12, 20, 8, 22, 28, 18, 38]} labels={["M", "T", "W", "T", "F", "S", "S"]} />
        </ChartCard>
        <ChartCard color={C.orange} title="Monthly Check-ups" sub="Last campaign performance" foot="🕒 campaign sent 2 days ago">
          <BarChart data={[540, 450, 320, 780, 560, 530, 330, 450, 570, 650, 770, 900]} labels={["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]} />
        </ChartCard>
        <ChartCard color={C.navy} title="Completed Treatments" sub="Last campaign performance" foot="🕒 campaign sent 2 days ago">
          <LineChart data={[60, 700, 400, 250, 230, 180, 160]} labels={["12a", "3a", "6a", "9a", "12p", "3p", "6p"]} />
        </ChartCard>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 24 }}>
        <div style={{ ...cardBase, flex: "1 1 340px", minWidth: 300, overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(135deg, ${C.indigo}, ${C.navy})`, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ color: "#ffffffcc", fontSize: 13 }}>Tasks:</span>
            {Object.keys(tasks).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ border: "none", cursor: "pointer", fontFamily: font, fontSize: 13, padding: "6px 14px", borderRadius: 6, background: tab === t ? "#ffffff30" : "transparent", color: "#fff" }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ padding: "8px 18px 14px" }}>
            {tasks[tab].map((t, i) => {
              const key = tab + i;
              return (
                <label key={key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${C.line}`, cursor: "pointer", fontSize: 14 }}>
                  <input type="checkbox" checked={!!done[key]} onChange={() => setDone({ ...done, [key]: !done[key] })} style={{ accentColor: C.indigo, width: 16, height: 16 }} />
                  <span style={{ textDecoration: done[key] ? "line-through" : "none", color: done[key] ? C.muted : C.text }}>{t}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div style={{ ...cardBase, flex: "1 1 340px", minWidth: 300, overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(135deg, ${C.orange}, #E67E00)`, padding: "14px 18px", color: "#fff" }}>
            <div style={{ fontSize: 17, fontWeight: 500 }}>Doctor Stats</div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>Consultations this month</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ color: C.orange, textAlign: "left" }}>
                {["Name", "Department", "Load"].map((h) => <th key={h} style={{ padding: "12px 18px", fontWeight: 500 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {staff.map((r) => (
                <tr key={r[0]} style={{ borderTop: `1px solid ${C.line}` }}>
                  <td style={{ padding: "12px 18px" }}>{r[0]}</td>
                  <td style={{ padding: "12px 18px", color: C.muted }}>{r[1]}</td>
                  <td style={{ padding: "12px 18px" }}>
                    <span style={{ background: `${C.indigo}1A`, color: C.indigo, fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 20 }}>{r[2]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}