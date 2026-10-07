import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Home,
  Compass,
  HelpCircle,
  Info,
  Mail,
  LogIn,
  UserPlus,
  LogOut,
  X,
  History,
  Heart
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Causes", path: "/causes", icon: Compass },
    { name: "Donate Now", path: "/donate/1", icon: Heart },
    { name: "My Donations", path: "/donations", icon: History },
    { name: "How It Works", path: "/how-it-works", icon: HelpCircle },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const sidebarContent = (
    <>
      {/* Brand Header with Clean Logo (No double text overlap) */}
      <div className="sidebar-brand">
        <Link to="/" onClick={handleNavClick} className="sidebar-brand-link">
          <img
            src="/kindbridge-logo.jpg"
            alt="KindBridge - Small Acts. Bigger Tomorrows."
            className="sidebar-brand-logo"
          />
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mobile-close-btn"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Auth / User profile section */}
      <div className="sidebar-bottom">
        {isLoggedIn ? (
          <div className="sidebar-user-pill">
            <div className="sidebar-user-info">
              <div className="sidebar-user-avatar">
                {user.avatar || "U"}
              </div>
              <div>
                <div className="sidebar-user-name">{user.name}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: "600" }}>
                  Demo Account
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="sidebar-logout-btn"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              onClick={handleNavClick}
              className="btn-auth-link btn-sidebar-login"
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              onClick={handleNavClick}
              className="btn-auth-link btn-sidebar-register"
            >
              <UserPlus size={16} />
              <span>Register</span>
            </Link>
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="sidebar">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-sidebar-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Mobile Drawer Slider */}
      <div className={`mobile-drawer ${isOpen ? "open" : ""}`}>
        {sidebarContent}
      </div>
    </>
  );
}
