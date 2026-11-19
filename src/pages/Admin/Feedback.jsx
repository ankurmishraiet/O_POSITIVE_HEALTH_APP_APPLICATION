import { useState, useEffect } from "react";
import { C, font, cardBase } from "../../theme";

const API = "http://localhost:5000/api/admin/feedbacks";

const thStyle = {
  textAlign: "left",
  padding: "12px 14px",
  fontSize: 13,
  color: C.muted,
  borderBottom: `1px solid ${C.line}`,
};

const tdStyle = {
  padding: "12px 14px",
  fontSize: 14,
  color: C.text,
  borderBottom: `1px solid ${C.line}`,
  verticalAlign: "top",
};

const stars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

export default function Feedback() {
  const [data, setData] = useState({ total: 0, average: 0, items: [] });
  const token = localStorage.getItem("adminToken");

  const loadFeedbacks = async () => {
    const res = await fetch(API, {
      headers: { Authorization: "Bearer " + token },
    });
    const result = await res.json();
    if (result && Array.isArray(result.items)) setData(result);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  return (
    <div style={{ fontFamily: font }}>
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <div style={{ ...cardBase, padding: 20, minWidth: 180 }}>
          <div style={{ fontSize: 13, color: C.muted }}>Total Feedback</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.indigo }}>
            {data.total}
          </div>
        </div>

        <div style={{ ...cardBase, padding: 20, minWidth: 180 }}>
          <div style={{ fontSize: 13, color: C.muted }}>Average Rating</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.orange }}>
            {data.average} ★
          </div>
        </div>
      </div>

      <div style={{ ...cardBase, padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Rating</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((item) => (
              <tr key={item._id}>
                <td style={tdStyle}>
                  {item.user && item.user.name ? item.user.name : "-"}
                </td>
                <td style={tdStyle}>
                  {item.user && item.user.phone ? item.user.phone : "-"}
                </td>
                <td style={{ ...tdStyle, color: C.orange, whiteSpace: "nowrap" }}>
                  {stars(item.rating)}
                </td>
                <td style={tdStyle}>{item.message || "-"}</td>
                <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {data.items.length === 0 && (
              <tr>
                <td style={{ ...tdStyle, textAlign: "center" }} colSpan={5}>
                  Abhi koi feedback nahi aaya
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}