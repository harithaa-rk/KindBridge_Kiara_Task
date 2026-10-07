import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  User,
  Settings,
  LogOut,
  RotateCcw,
  Sparkles
} from "lucide-react";
import {
  getCampaigns,
  getDonations,
  getDonors,
  getStories,
  setAdminLoggedIn,
  resetDemoData
} from "../../utils/storage";

export default function AdminHeader({ onToggleMobileSidebar }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "New demo donation received",
      desc: "₹2,000 via QR Code from Haritha R",
      time: "10 mins ago",
      type: "success",
      link: "/admin/donations"
    },
    {
      id: 2,
      title: "Campaign reached 68% of target",
      desc: "'Education for Every Child' has raised ₹3.42L",
      time: "2 hours ago",
      type: "info",
      link: "/admin/campaigns"
    },
    {
      id: 3,
      title: "New impact story published",
      desc: "'A Bright Classroom for Aarohi' is now live on /stories",
      time: "Yesterday",
      type: "info",
      link: "/admin/stories"
    },
    {
      id: 4,
      title: "Platform verification audit",
      desc: "All Q3 partner disbursements verified successfully",
      time: "2 days ago",
      type: "success",
      link: "/admin/reports"
    }
  ];

  // Global search across datasets
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const q = searchQuery.toLowerCase().trim();
    const campaigns = getCampaigns().filter(
      (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
    const donations = getDonations().filter(
      (d) =>
        (d.donorName && d.donorName.toLowerCase().includes(q)) ||
        (d.campaignName && d.campaignName.toLowerCase().includes(q)) ||
        (d.id && String(d.id).toLowerCase().includes(q))
    );
    const donors = getDonors().filter(
      (d) => (d.name && d.name.toLowerCase().includes(q)) || (d.email && d.email.toLowerCase().includes(q))
    );
    const stories = getStories().filter(
      (s) => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );

    setSearchResults({
      campaigns: campaigns.slice(0, 3),
      donations: donations.slice(0, 3),
      donors: donors.slice(0, 3),
      stories: stories.slice(0, 2)
    });
  }, [searchQuery]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setAdminLoggedIn(false);
    navigate("/admin/login");
  };

  const handleResetData = () => {
    if (window.confirm("Reset all prototype data to the initial factory demo state?")) {
      resetDemoData();
      window.location.reload();
    }
  };

  const totalResults =
    searchResults
      ? searchResults.campaigns.length +
        searchResults.donations.length +
        searchResults.donors.length +
        searchResults.stories.length
      : 0;

  return (
    <header
      style={{
        height: "72px",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        position: "sticky",
        top: 0,
        zIndex: 900,
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
      }}
    >
      {/* Left: Mobile Toggle & Global Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1, maxWidth: "600px" }}>
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="admin-mobile-toggle-btn"
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "8px",
            color: "#475569",
            cursor: "pointer",
            display: "none"
          }}
          aria-label="Toggle navigation drawer"
        >
          <Menu size={20} />
        </button>

        {/* Global Search Bar */}
        <div ref={searchRef} style={{ position: "relative", width: "100%", maxWidth: "420px" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Search
              size={17}
              style={{
                position: "absolute",
                left: "12px",
                color: "#94a3b8",
                pointerEvents: "none"
              }}
            />
            <input
              type="text"
              placeholder="Search campaigns, donations, donors..."
              value={searchQuery}
              onFocus={() => setShowSearchDropdown(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              style={{
                width: "100%",
                padding: "0.55rem 1rem 0.55rem 2.25rem",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "0.875rem",
                backgroundColor: "#f8fafc",
                outline: "none",
                transition: "all 0.2s"
              }}
            />
          </div>

          {/* Search Dropdown Results */}
          {showSearchDropdown && searchQuery.trim() && searchResults && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                right: 0,
                background: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                maxHeight: "380px",
                overflowY: "auto",
                zIndex: 1000,
                padding: "0.5rem"
              }}
            >
              {totalResults === 0 ? (
                <div style={{ padding: "1.25rem", textAlign: "center", color: "#64748b", fontSize: "0.875rem" }}>
                  No matches found for "<strong>{searchQuery}</strong>"
                </div>
              ) : (
                <>
                  {/* Campaigns */}
                  {searchResults.campaigns.length > 0 && (
                    <div style={{ marginBottom: "0.75rem" }}>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", padding: "4px 8px", textTransform: "uppercase" }}>
                        Campaigns
                      </div>
                      {searchResults.campaigns.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => {
                            navigate(`/admin/campaigns/${c.id}/edit`);
                            setShowSearchDropdown(false);
                          }}
                          style={{
                            padding: "6px 8px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <span style={{ fontWeight: 600, color: "#0f172a" }}>{c.title}</span>
                          <span style={{ color: "#059669", fontSize: "0.75rem" }}>{c.category}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Donations */}
                  {searchResults.donations.length > 0 && (
                    <div style={{ marginBottom: "0.75rem" }}>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", padding: "4px 8px", textTransform: "uppercase" }}>
                        Donations
                      </div>
                      {searchResults.donations.map((d) => (
                        <div
                          key={d.id}
                          onClick={() => {
                            navigate(`/admin/donations/${d.id}`);
                            setShowSearchDropdown(false);
                          }}
                          style={{
                            padding: "6px 8px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <div>
                            <span style={{ fontWeight: 600, color: "#0f172a" }}>{d.donorName || "Supporter"}</span>
                            <span style={{ color: "#64748b", fontSize: "0.75rem", marginLeft: "6px" }}>({d.id})</span>
                          </div>
                          <span style={{ fontWeight: 700, color: "#059669" }}>₹{Number(d.amount).toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Donors */}
                  {searchResults.donors.length > 0 && (
                    <div style={{ marginBottom: "0.5rem" }}>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", padding: "4px 8px", textTransform: "uppercase" }}>
                        Donors
                      </div>
                      {searchResults.donors.map((dn) => (
                        <div
                          key={dn.id}
                          onClick={() => {
                            navigate(`/admin/donors/${dn.id}`);
                            setShowSearchDropdown(false);
                          }}
                          style={{
                            padding: "6px 8px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <span style={{ fontWeight: 600, color: "#0f172a" }}>{dn.name}</span>
                          <span style={{ color: "#64748b", fontSize: "0.75rem" }}>{dn.email}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        {/* Subtle Demo Notice Banner Pill */}
        <div
          className="demo-mode-header-pill"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#065f46"
          }}
          title="This dashboard uses sample data and browser storage. No real money or server calls are being processed."
        >
          <Sparkles size={13} style={{ color: "#059669" }} />
          <span>Demo Admin Mode</span>
        </div>

        {/* Reset Demo Data Button */}
        <button
          type="button"
          onClick={handleResetData}
          title="Reset sample data back to original demonstration values"
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "7px 10px",
            cursor: "pointer",
            color: "#64748b",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.8rem",
            fontWeight: 500
          }}
        >
          <RotateCcw size={14} />
          <span className="hide-on-mobile">Reset Demo Data</span>
        </button>

        {/* Notifications Bell */}
        <div ref={notifRef} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setShowNotifications((prev) => !prev)}
            style={{
              position: "relative",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              color: "#475569",
              display: "flex",
              alignItems: "center"
            }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                background: "#059669",
                color: "#ffffff",
                fontSize: "0.65rem",
                fontWeight: 700,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              4
            </span>
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                width: "320px",
                background: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                zIndex: 1000,
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  padding: "0.85rem 1rem",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <strong style={{ fontSize: "0.9rem", color: "#0f172a" }}>Notifications</strong>
                <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600 }}>4 new</span>
              </div>

              <div style={{ maxHeight: "320px", overflowY: "auto" }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setShowNotifications(false);
                      navigate(n.link);
                    }}
                    style={{
                      padding: "0.75rem 1rem",
                      borderBottom: "1px solid #f8fafc",
                      cursor: "pointer",
                      transition: "background-color 0.15s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2px" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a" }}>{n.title}</span>
                      <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{n.time}</span>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>{n.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ padding: "0.5rem", textAlign: "center", borderTop: "1px solid #f1f5f9", backgroundColor: "#fafafa" }}>
                <Link
                  to="/admin/donations"
                  onClick={() => setShowNotifications(false)}
                  style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 600, textDecoration: "none" }}
                >
                  View All Activity →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div ref={profileRef} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#059669",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(5, 150, 105, 0.3)"
              }}
            >
              HR
            </div>
          </button>

          {showProfileMenu && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                width: "200px",
                background: "#ffffff",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                zIndex: 1000,
                padding: "0.5rem 0"
              }}
            >
              <div style={{ padding: "0.5rem 1rem", borderBottom: "1px solid #f1f5f9" }}>
                <strong style={{ fontSize: "0.85rem", color: "#0f172a", display: "block" }}>Haritha R</strong>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>admin@kindbridge.demo</span>
              </div>

              <Link
                to="/admin/settings"
                onClick={() => setShowProfileMenu(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                  color: "#334155",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <Settings size={15} /> Settings
              </Link>

              <Link
                to="/"
                target="_blank"
                onClick={() => setShowProfileMenu(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                  color: "#334155",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <ExternalLink size={15} /> View Live Site
              </Link>

              <div style={{ borderTop: "1px solid #f1f5f9", margin: "0.25rem 0" }} />

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                  color: "#dc2626",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fef2f2")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
