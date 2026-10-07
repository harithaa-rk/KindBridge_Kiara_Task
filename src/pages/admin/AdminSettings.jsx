import React, { useState, useEffect } from "react";
import { Settings, User, Shield, Bell, CheckCircle2, Save, Sparkles, Lock, RotateCcw } from "lucide-react";
import { getSettings, saveSettings, logAdminActivity, resetDemoData } from "../../utils/storage";

export default function AdminSettings() {
  const [settings, setSettings] = useState(getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveSettings(settings);
    logAdminActivity("Platform settings updated", settings.adminName || "Admin");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleFactoryReset = () => {
    if (window.confirm("Reset all browser localStorage demo datasets back to original initial factory state?")) {
      resetDemoData();
      window.location.reload();
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
          Admin Settings & Platform Configuration
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
          Manage your administrator profile, donation parameters, and prototype runtime controls.
        </p>
      </div>

      {savedSuccess && (
        <div style={{ backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", padding: "0.85rem 1rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
          <CheckCircle2 size={16} />
          <span>Platform settings updated and persisted to browser storage!</span>
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {/* Administrator Profile Card */}
        <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <User size={18} color="#059669" /> Administrator Profile
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                Admin Name
              </label>
              <input
                type="text"
                name="adminName"
                value={settings.adminName}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                Email Address
              </label>
              <input
                type="email"
                name="adminEmail"
                value={settings.adminEmail}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
            </div>
          </div>
        </div>

        {/* Donation & Payment Parameters Card */}
        <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Shield size={18} color="#0284c7" /> Donation & Gateway Rules
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                Default Base Currency
              </label>
              <input
                type="text"
                disabled
                value="INR ₹ (Indian Rupee)"
                style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#f8fafc", color: "#64748b" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                Minimum Contribution (₹)
              </label>
              <input
                type="number"
                name="minDonationAmount"
                value={settings.minDonationAmount}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
            </div>
          </div>

          <div style={{ marginTop: "1.25rem", padding: "1rem", backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <strong style={{ fontSize: "0.9rem", color: "#065f46", display: "flex", alignItems: "center", gap: "4px" }}>
                <Sparkles size={15} /> Demo Payment Mode: ON
              </strong>
              <p style={{ margin: "2px 0 0", fontSize: "0.78rem", color: "#047857" }}>
                Required: Prototype routes all payments into simulated success callbacks without contacting real banking APIs.
              </p>
            </div>
            <span style={{ background: "#059669", color: "#ffffff", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>
              Active (Safe)
            </span>
          </div>
        </div>

        {/* Notifications & System Card */}
        <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Bell size={18} color="#f59e0b" /> Notification Preferences
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#334155", cursor: "pointer" }}>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
              <span>Send browser alerts on new demo donations</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#334155", cursor: "pointer" }}>
              <input
                type="checkbox"
                name="dailySummary"
                checked={settings.dailySummary}
                onChange={handleChange}
              />
              <span>Generate daily platform funding summary log</span>
            </label>
          </div>
        </div>

        {/* Save & Reset Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <button
            type="button"
            onClick={handleFactoryReset}
            className="btn btn-outline"
            style={{ color: "#dc2626", borderColor: "#fca5a5", fontSize: "0.85rem", gap: "0.4rem" }}
          >
            <RotateCcw size={15} /> Reset All Storage Data
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: "0.65rem 1.5rem", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <Save size={16} /> Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
