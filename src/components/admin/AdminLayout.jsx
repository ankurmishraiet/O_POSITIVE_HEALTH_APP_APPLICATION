import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { C, font } from "../../theme";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: font, color: C.text }}>
      <Sidebar />
      <main style={{ flex: 1, minWidth: 0 }}>
        <Header />
        <div style={{ padding: "0 28px 32px" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}