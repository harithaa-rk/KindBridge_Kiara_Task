import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  FileSpreadsheet,
  IndianRupee,
  Receipt,
  Eye,
  CheckCircle2,
  Calendar,
  X,
  Printer
} from "lucide-react";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getDonations, getCampaigns } from "../../utils/storage";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  // Search & Filters
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [frequencyFilter, setFrequencyFilter] = useState("All");
  const [campaignFilter, setCampaignFilter] = useState("All");

  // Receipt modal state
  const [activeReceipt, setActiveReceipt] = useState(null);

  useEffect(() => {
    setDonations(getDonations());
    setCampaigns(getCampaigns());
  }, []);

  const filtered = donations.filter((d) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (d.donorName && d.donorName.toLowerCase().includes(q)) ||
      (d.donorEmail && d.donorEmail.toLowerCase().includes(q)) ||
      (d.id && String(d.id).toLowerCase().includes(q)) ||
      (d.referenceId && String(d.referenceId).toLowerCase().includes(q)) ||
      (d.campaignName && d.campaignName.toLowerCase().includes(q));

    const matchesPayment =
      paymentFilter === "All" ||
      (d.paymentMethod && d.paymentMethod.toLowerCase().includes(paymentFilter.toLowerCase()));

    const matchesStatus = statusFilter === "All" || d.status === statusFilter;
    const matchesFreq = frequencyFilter === "All" || d.frequency === frequencyFilter;
    const matchesCamp = campaignFilter === "All" || d.campaignName === campaignFilter;

    return matchesSearch && matchesPayment && matchesStatus && matchesFreq && matchesCamp;
  });

  const totalFilteredAmount = filtered.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Donations
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
            Comprehensive register of platform contributions, receipts, and demo transactions.
          </p>
        </div>

        <Link
          to="/admin/reports"
          className="btn btn-outline"
          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", gap: "0.4rem", background: "#ffffff" }}
        >
          <FileSpreadsheet size={15} />
          <span>Export CSV</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          padding: "1rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search by Donor name, campaign, reference ID, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.55rem 1rem 0.55rem 2.25rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "0.875rem",
              outline: "none"
            }}
          />
        </div>

        {/* Filter dropdowns */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* Payment Method */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            style={{ padding: "0.45rem 0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.825rem", background: "#ffffff" }}
          >
            <option value="All">All Payment Methods</option>
            <option value="UPI">UPI</option>
            <option value="QR Code">QR Code</option>
            <option value="Card">Card</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Demo">Demo Payment</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: "0.45rem 0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.825rem", background: "#ffffff" }}
          >
            <option value="All">All Statuses</option>
            <option value="Successful">Successful</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          {/* Frequency */}
          <select
            value={frequencyFilter}
            onChange={(e) => setFrequencyFilter(e.target.value)}
            style={{ padding: "0.45rem 0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.825rem", background: "#ffffff" }}
          >
            <option value="All">All Frequencies</option>
            <option value="One-time">One-time</option>
            <option value="Monthly">Monthly</option>
          </select>

          {/* Campaign Filter */}
          <select
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            style={{ padding: "0.45rem 0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.825rem", background: "#ffffff", maxWidth: "220px" }}
          >
            <option value="All">All Campaigns</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.title}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#64748b" }}>
        <span>
          Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? "donation" : "donations"}
        </span>
        <span>
          Total Value: <strong style={{ color: "#059669" }}>₹{totalFilteredAmount.toLocaleString("en-IN")}</strong>
        </span>
      </div>

      {/* Donations Table */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        }}
      >
        {filtered.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b", fontSize: "0.78rem" }}>
                  <th style={{ padding: "0.85rem 1rem" }}>Transaction ID</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Donor</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Campaign</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Organization</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Amount</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Method</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Frequency</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Date</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Status</th>
                  <th style={{ padding: "0.85rem 1rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr
                    key={d.id}
                    style={{ borderBottom: "1px solid #f1f5f9", transition: "background-color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fcfcfd")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td style={{ padding: "0.85rem 1rem", fontFamily: "monospace", fontSize: "0.78rem", color: "#475569" }}>
                      {d.id || d.referenceId}
                    </td>

                    <td style={{ padding: "0.85rem 1rem" }}>
                      <strong style={{ color: "#0f172a", display: "block" }}>{d.donorName || "Supporter"}</strong>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{d.donorEmail}</span>
                    </td>

                    <td style={{ padding: "0.85rem 1rem", color: "#334155" }}>
                      {d.campaignName || "General Fund"}
                    </td>

                    <td style={{ padding: "0.85rem 1rem", color: "#64748b" }}>
                      {d.organization || "KindBridge Partner"}
                    </td>

                    <td style={{ padding: "0.85rem 1rem" }}>
                      <strong style={{ color: "#059669" }}>₹{Number(d.amount).toLocaleString("en-IN")}</strong>
                    </td>

                    <td style={{ padding: "0.85rem 1rem", color: "#64748b" }}>
                      {d.paymentMethod || "QR Code"}
                    </td>

                    <td style={{ padding: "0.85rem 1rem", color: "#64748b" }}>
                      {d.frequency || "One-time"}
                    </td>

                    <td style={{ padding: "0.85rem 1rem", color: "#64748b", whiteSpace: "nowrap" }}>
                      {d.date}
                    </td>

                    <td style={{ padding: "0.85rem 1rem" }}>
                      <StatusBadge status={d.status || "Successful"} />
                    </td>

                    <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                        <Link
                          to={`/admin/donations/${d.id}`}
                          title="View Details"
                          style={{
                            padding: "4px 8px",
                            borderRadius: "6px",
                            backgroundColor: "#f1f5f9",
                            color: "#0f172a",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3px"
                          }}
                        >
                          <Eye size={12} /> View
                        </Link>

                        <button
                          type="button"
                          onClick={() => setActiveReceipt(d)}
                          title="View Receipt"
                          style={{
                            padding: "4px 8px",
                            borderRadius: "6px",
                            backgroundColor: "#ecfdf5",
                            color: "#059669",
                            border: "none",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3px"
                          }}
                        >
                          <Receipt size={12} /> Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No donations found"
            description="No transactions match the selected filters or search terms."
          />
        )}
      </div>

      {/* Demo Receipt Modal */}
      {activeReceipt && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "16px",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{ padding: "1.5rem", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={18} color="#059669" />
                <strong style={{ fontSize: "1rem", color: "#0f172a" }}>Official Demo Donation Receipt</strong>
              </div>
              <button
                type="button"
                onClick={() => setActiveReceipt(null)}
                style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.85rem" }}>
              <div style={{ textAlign: "center", padding: "1rem 0", background: "#f8fafc", borderRadius: "10px" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Total Donated</span>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#059669" }}>
                  ₹{Number(activeReceipt.amount).toLocaleString("en-IN")}
                </div>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Demo Receipt • 80G Tax Deductible (Sample)</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", borderBottom: "1px dashed #e2e8f0", paddingBottom: "1rem" }}>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Reference Number</span>
                  <div style={{ fontFamily: "monospace", fontWeight: 600 }}>{activeReceipt.id || activeReceipt.referenceId}</div>
                </div>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Date</span>
                  <div style={{ fontWeight: 600 }}>{activeReceipt.date}</div>
                </div>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Donor</span>
                  <div style={{ fontWeight: 600 }}>{activeReceipt.donorName}</div>
                </div>
                <div>
                  <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Payment Method</span>
                  <div style={{ fontWeight: 600 }}>{activeReceipt.paymentMethod}</div>
                </div>
              </div>

              <div>
                <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Designated Campaign</span>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>{activeReceipt.campaignName}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{activeReceipt.organization || "KindBridge Partner"}</div>
              </div>
            </div>

            <div style={{ padding: "1rem 1.5rem", background: "#f8fafc", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-outline"
                style={{ padding: "0.45rem 0.85rem", fontSize: "0.8rem", gap: "0.35rem" }}
              >
                <Printer size={14} /> Print Receipt
              </button>
              <button
                type="button"
                onClick={() => setActiveReceipt(null)}
                className="btn btn-primary"
                style={{ padding: "0.45rem 1rem", fontSize: "0.8rem" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
