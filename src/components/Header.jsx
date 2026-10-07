import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, LogIn, UserPlus, LogOut, User, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Header({ onToggleMobileMenu, searchQuery, onSearchChange }) {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [internalQuery, setInternalQuery] = useState(searchQuery || "");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(internalQuery);
    }
    navigate(`/causes?search=${encodeURIComponent(internalQuery)}`);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInternalQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={onToggleMobileMenu}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        {/* Mobile Mini Logo */}
        <Link to="/" className="mobile-header-brand">
          <img
            src="/kindbridge-logo.jpg"
            alt="KindBridge"
            style={{ width: 34, height: 34, borderRadius: "8px", objectFit: "cover" }}
          />
        </Link>

        <form onSubmit={handleSearchSubmit} className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for a cause..."
            value={searchQuery !== undefined ? searchQuery : internalQuery}
            onChange={handleInputChange}
          />
        </form>
      </div>

      <div className="header-right">
        {/* Quick Donate Now button */}
        <Link to="/donate/1" className="btn btn-soft" style={{ fontSize: "0.85rem", padding: "0.5rem 0.9rem" }}>
          <Heart size={14} />
          <span>Donate</span>
        </Link>

        {isLoggedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.8rem",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--bg-accent-light)",
                color: "var(--accent-primary)",
                fontSize: "0.85rem",
                fontWeight: "700"
              }}
            >
              <User size={15} />
              <span>{user.name}</span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="btn btn-outline"
              style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem" }}
              title="Logout"
            >
              <LogOut size={15} />
              <span className="hide-on-mobile">Logout</span>
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">
              <LogIn size={16} />
              <span>Login</span>
            </Link>
            <Link to="/register" className="btn btn-primary">
              <UserPlus size={16} />
              <span>Register</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
