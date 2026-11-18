import { Routes, Route, Navigate } from "react-router-dom";
import AdminLoginPage from "../components/admin/AdminLoginPage";
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import ComingSoon from "../pages/Admin/ComingSoon";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* All admin pages share the sidebar + header */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={<ComingSoon title="Patients" />} />
        <Route path="appointments" element={<ComingSoon title="Appointments" />} />
        <Route path="reports" element={<ComingSoon title="Reports" />} />
        <Route path="pharmacy" element={<ComingSoon title="Pharmacy" />} />
        <Route path="locations" element={<ComingSoon title="Locations" />} />
        <Route path="notifications" element={<ComingSoon title="Notifications" />} />
      </Route>
    </Routes>
  );
}