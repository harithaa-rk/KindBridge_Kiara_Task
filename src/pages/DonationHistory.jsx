import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  History,
  Heart,
  CreditCard,
  CheckCircle2,
  Trash2,
  PlusCircle,
  ShieldCheck
} from "lucide-react";
import { getDonations } from "../data/donationsStorage";
import { formatCurrency } from "../data/campaigns";

export default function DonationHistory() {
  const [donations, setDonations] = useState(() => getDonations());

  const handleClearHistory = () => {
    if (window.confirm("Clear your demo donation history?")) {
      localStorage.removeItem("kindbridge_donations");
      setDonations([]);
    }
  };

  const totalDonated = donations.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <div className="donation-history-page">
      <div className="section-header" style={{ marginBottom: "2rem" }}>
        <div>
          <h1 className="section-title">My Donation History</h1>
          <p className="section-subtitle">
            Track all your contributions and witness the cumulative impact of your generosity.
          </p>
        </div>

        {donations.length > 0 && (
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link to="/causes" className="btn btn-primary" style={{ fontSize: "0.85rem" }}>
              <PlusCircle size={15} />
              <span>Donate to a Cause</span>
            </Link>
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: "0.85rem", color: "var(--danger-text)" }}
              onClick={handleClearHistory}
            >
              <Trash2 size={15} />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>

      {/* Summary KPI Cards */}
      <div className="history-kpi-grid">
        <div className="history-kpi-card">
          <span className="kpi-label">Total Amount Contributed</span>
          <span className="kpi-value highlight">{formatCurrency(totalDonated)}</span>
          <span className="kpi-sub">Simulated frontend donations</span>
        </div>

        <div className="history-kpi-card">
          <span className="kpi-label">Contributions Made</span>
          <span className="kpi-value">{donations.length}</span>
          <span className="kpi-sub">Across all partner campaigns</span>
        </div>

        <div className="history-kpi-card">
          <span className="kpi-label">Demo Platform Status</span>
          <span className="kpi-value" style={{ color: "var(--accent-primary)", fontSize: "1.2rem", fontWeight: "800" }}>
            Active Verified
          </span>
          <span className="kpi-sub">100% Transparent simulation</span>
        </div>
      </div>

      {/* Donations List / Table */}
      {donations.length > 0 ? (
        <div className="history-list-card">
          <div className="table-responsive">
            <table className="donations-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Amount</th>
                  <th>Frequency</th>
                  <th>Payment Method</th>
                  <th>Date</th>
                  <th>Reference ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((item, index) => (
                  <tr key={item.referenceId || index}>
                    <td>
                      <strong style={{ color: "var(--text-primary)" }}>{item.campaignName}</strong>
                    </td>
                    <td>
                      <span className="donation-amt-pill">{formatCurrency(item.amount)}</span>
                    </td>
                    <td>
                      <span className="badge-frequency">{item.frequency || "One-time"}</span>
                    </td>
                    <td>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        <CreditCard size={14} />
                        {item.paymentMethod || "QR Code"}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {item.date}
                    </td>
                    <td>
                      <code className="ref-code">{item.referenceId}</code>
                    </td>
                    <td>
                      <span className="badge-status-success">
                        <CheckCircle2 size={12} />
                        {item.status || "Successful"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="empty-state" style={{ margin: "3rem auto" }}>
          <div className="empty-state-icon">
            <History size={32} />
          </div>
          <h2 className="empty-state-title">No donations recorded yet</h2>
          <p className="empty-state-desc">
            You haven't made any demo donations yet. Explore our verified campaigns and test the complete donation journey!
          </p>
          <Link to="/causes" className="btn btn-primary btn-lg">
            <Heart size={18} />
            <span>Explore Causes & Donate</span>
          </Link>
        </div>
      )}

      {/* Safe Data Disclaimer */}
      <div className="history-safe-disclaimer">
        <ShieldCheck size={18} color="var(--accent-primary)" />
        <span>
          Privacy Guarantee: Only harmless demo receipt metadata is stored in your browser's local storage. No card numbers, CVVs, or financial credentials are ever captured or preserved.
        </span>
      </div>
    </div>
  );
}
