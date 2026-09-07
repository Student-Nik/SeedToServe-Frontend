import AdminFooter from "@/components/admin/AdminFooter";
import AdminNavbar from "@/components/admin/AdminNavbar";
import React from "react";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Admin Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Admin Footer */}
      <AdminFooter />

    </div>
  );
};

export default AdminLayout;
