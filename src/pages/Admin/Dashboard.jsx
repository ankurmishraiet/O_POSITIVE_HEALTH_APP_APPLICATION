import { useState, useEffect } from "react";
import StatCard from "../../components/admin/StatCard";
import ChartCard from "../../components/admin/ChartCard";
import { LineChart, BarChart } from "../../components/admin/Charts";
import { C, font, cardBase } from "../../theme";

const API = "http://localhost:5000/api/admin/tasks";
const tabs = ["Urgent", "Routine", "Admin"];

const staff = [
  ["Dr. Harpreet Singh", "Cardiology", "42 patients"],
  ["Dr. Simran Kaur", "Pediatrics", "38 patients"],
  ["Dr. Amit Sharma", "General Medicine", "55 patients"],
  ["Dr. Neha Gill", "Gynecology", "31 patients"],
];

export default function Dashboard() {
  const [tab, setTab] = useState("Urgent");
  const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: "Bearer " + token };

  useEffect(() => {
    fetch(API, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTasks(data);
      });
  }, []);

  const toggleTask = async (id) => {
    const res = await fetch(API + "/" + id, { method: "PATCH", headers });
    const updated = await res.json();
    if (res.ok) setTasks(tasks.map((t) => (t._id === id ? updated : t)));
  };
    const addTask = async () => {
    if (!title.trim()) return;
    const res = await fetch(API, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ title, category: tab }),
    });
    const created = await res.json();
    if (res.ok) {
      setTasks([...tasks, created]);
      setTitle("");
    }
  };

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
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ border: "none", cursor: "pointer", fontFamily: font, fontSize: 13, padding: "6px 14px", borderRadius: 6, background: tab === t ? "#ffffff30" : "transparent", color: "#fff" }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ padding: "8px 18px 14px" }}>
                        <div style={{ display: "flex", gap: 8, padding: "10px 0" }}>
              <input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTask()} placeholder={"New " + tab + " task"} style={{ flex: 1, padding: "8px 12px", border: `1px solid ${C.line}`, borderRadius: 6, fontFamily: font, fontSize: 14 }} />
              <button onClick={addTask} style={{ border: "none", cursor: "pointer", background: C.indigo, color: "#fff", fontFamily: font, fontSize: 14, padding: "8px 16px", borderRadius: 6 }}>Add</button>
            </div>
            {tasks.filter((t) => t.category === tab).map((t) => (
              <label key={t._id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${C.line}`, cursor: "pointer", fontSize: 14 }}>
                <input type="checkbox" checked={t.done} onChange={() => toggleTask(t._id)} style={{ accentColor: C.indigo, width: 16, height: 16 }} />
                <span style={{ textDecoration: t.done ? "line-through" : "none", color: t.done ? C.muted : C.text }}>{t.title}</span>
              </label>
            ))}
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