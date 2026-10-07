import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className="admin-dashboard-layout"
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      {/* Collapsible Admin Sidebar */}
      <AdminSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflowX: "hidden"
        }}
      >
        <AdminHeader onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

        {/* Demo Mode Notice Banner (Subtle, professional) */}
        <div
          style={{
            backgroundColor: "#ecfdf5",
            borderBottom: "1px solid #d1fae5",
            padding: "0.5rem 1.5rem",
            fontSize: "0.8rem",
            color: "#065f46",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#059669"
              }}
            />
            <span>
              <strong>Demo Administration Mode:</strong> This dashboard uses client-side sample data and browser localStorage. No real transactions or server operations are processed.
            </span>
          </div>
          <span style={{ fontSize: "0.75rem", color: "#047857", opacity: 0.85 }}>
            KindBridge v2.4 (Frontend Prototype)
          </span>
        </div>

        {/* Page Content */}
        <main
          style={{
            flex: 1,
            padding: "2rem 1.75rem",
            maxWidth: "1440px",
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box"
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
