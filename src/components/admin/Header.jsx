import { useNavigate } from "react-router-dom";
import { C, font } from "../../theme";

export default function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "14px 28px", flexWrap: "wrap", gap: 14 }}>
      <input
        placeholder="Search"
        style={{ border: "none", borderBottom: `1px solid ${C.line}`, background: "transparent", padding: "6px 4px", fontSize: 14, outline: "none", fontFamily: font, width: 160 }}
      />
      <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>🔍</div>
      <div style={{ position: "relative", fontSize: 18 }}>
        🔔
        <span style={{ position: "absolute", top: -6, right: -8, background: C.orange, color: "#fff", fontSize: 10, borderRadius: 10, padding: "1px 5px" }}>5</span>
      </div>
      <button onClick={logout} style={{ border: "none", cursor: "pointer", background: C.indigo, color: "#fff", fontFamily: font, fontSize: 13, padding: "8px 16px", borderRadius: 6 }}>
        Logout
      </button>
    </header>
  );
}