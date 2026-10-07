import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Target,
  IndianRupee,
  Users,
  Building2,
  BookOpen,
  BellRing,
  Tags,
  FileSpreadsheet,
  BarChart3,
  Settings,
  LogOut,
  X,
  Shield,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { setAdminLoggedIn } from "../../utils/storage";

const menuItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/admin/campaigns", label: "Campaigns", icon: Target },
  { path: "/admin/donations", label: "Donations", icon: IndianRupee },
  { path: "/admin/donors", label: "Donors", icon: Users },
  { path: "/admin/organizations", label: "Organizations", icon: Building2 },
  { path: "/admin/stories", label: "Stories", icon: BookOpen },
  { path: "/admin/updates", label: "Updates", icon: BellRing },
  { path: "/admin/categories", label: "Categories", icon: Tags },
  { path: "/admin/reports", label: "Reports", icon: FileSpreadsheet },
  { path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({
  isOpen,
  onClose,
  collapsed,
  onToggleCollapse
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAdminLoggedIn(false);
    navigate("/admin/login");
  };

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(2px)",
            zIndex: 990
          }}
        />
      )}

      <aside
        className={`admin-sidebar ${isOpen ? "open" : ""} ${collapsed ? "collapsed" : ""}`}
        style={{
          width: collapsed ? "80px" : "260px",
          transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s ease",
          background: "#ffffff",
          borderRight: "1px solid #e2e8f0",
          height: "100vh",
          position: "sticky",
          top: 0,
          display: "flex",
          flexDirection: "column",
          zIndex: 995,
          boxShadow: "1px 0 6px rgba(0,0,0,0.02)"
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: collapsed ? "1.25rem 0.5rem" : "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            borderBottom: "1px solid #f1f5f9",
            minHeight: "72px"
          }}
        >
          <Link
            to="/admin"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              color: "inherit",
              overflow: "hidden"
            }}
          >
            <img
              src="/kindbridge-logo.jpg"
              alt="KindBridge"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                objectFit: "cover",
                flexShrink: 0
              }}
            />
            {!collapsed && (
              <div style={{ lineHeight: 1.2 }}>
                <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a", display: "block" }}>
                  KindBridge
                </span>
                <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700, letterSpacing: "0.5px" }}>
                  ADMINISTRATION
                </span>
              </div>
            )}
          </Link>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className="mobile-close-btn"
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              padding: "4px"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 0.75rem" }}>
          {!collapsed && (
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", padding: "0 0.75rem 0.5rem", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Main Navigation
            </div>
          )}
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {menuItems.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  title={collapsed ? item.label : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: collapsed ? "0.75rem" : "0.65rem 0.85rem",
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: active ? 700 : 500,
                    fontSize: "0.9rem",
                    color: active ? "#059669" : "#475569",
                    backgroundColor: active ? "#ecfdf5" : "transparent",
                    transition: "all 0.15s ease",
                    borderLeft: active ? "3px solid #059669" : "3px solid transparent"
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                      e.currentTarget.style.color = "#0f172a";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#475569";
                    }
                  }}
                >
                  <Icon size={19} style={{ flexShrink: 0, color: active ? "#059669" : "#64748b" }} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Links & Collapse Toggle */}
        <div style={{ padding: "0.75rem", borderTop: "1px solid #f1f5f9" }}>
          <Link
            to="/"
            target="_blank"
            title="View Live User Site"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: collapsed ? "0.65rem" : "0.55rem 0.85rem",
              justifyContent: collapsed ? "center" : "flex-start",
              borderRadius: "8px",
              color: "#64748b",
              textDecoration: "none",
              fontSize: "0.825rem",
              marginBottom: "0.5rem"
            }}
          >
            <ExternalLink size={16} />
            {!collapsed && <span>View Live Site</span>}
          </Link>

          {/* Desktop collapse button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="sidebar-collapse-btn"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "space-between",
              padding: "0.5rem 0.75rem",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              color: "#64748b",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600
            }}
          >
            {!collapsed && <span>Collapse Sidebar</span>}
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Admin Profile & Logout at Bottom */}
        <div
          style={{
            padding: collapsed ? "1rem 0.5rem" : "1rem 1.25rem",
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#fcfcfd",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                backgroundColor: "#059669",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.85rem",
                flexShrink: 0
              }}
            >
              HR
            </div>
            {!collapsed && (
              <div style={{ lineHeight: 1.2, overflow: "hidden" }}>
                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a", display: "block" }}>
                  Haritha R
                </span>
                <span style={{ fontSize: "0.725rem", color: "#64748b" }}>
                  Super Admin
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              type="button"
              onClick={handleLogout}
              title="Logout from Admin"
              style={{
                background: "none",
                border: "none",
                color: "#dc2626",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fee2e2")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
