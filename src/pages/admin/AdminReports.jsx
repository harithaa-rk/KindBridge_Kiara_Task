import React, { useState, useEffect } from "react";
import { Download, FileSpreadsheet, Filter, IndianRupee, Users, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import StatCard from "../../components/admin/StatCard";
import StatusBadge from "../../components/admin/StatusBadge";
import { getDonations, getCampaigns } from "../../utils/storage";

export default function AdminReports() {
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const [dateRange, setDateRange] = useState("All");
  const [selectedCampaign, setSelectedCampaign] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState("All");

  useEffect(() => {
    setDonations(getDonations());
    setCampaigns(getCampaigns());
  }, []);

  const filtered = donations.filter((d) => {
    const matchesCamp = selectedCampaign === "All" || d.campaignName === selectedCampaign;
    const matchesPayment = selectedPayment === "All" || (d.paymentMethod && d.paymentMethod.includes(selectedPayment));
    return matchesCamp && matchesPayment;
  });

  const totalAmount = filtered.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);
  const avgDonation = filtered.length > 0 ? Math.round(totalAmount / filtered.length) : 0;
  const successfulCount = filtered.filter((d) => (d.status || "Successful") === "Successful").length;
  const monthlyCount = filtered.filter((d) => d.frequency === "Monthly").length;

  // Generate frontend CSV export
  const handleExportCSV = () => {
    const headers = ["Transaction ID", "Donor", "Campaign", "Amount (INR)", "Payment Method", "Date", "Status"];
    const rows = filtered.map((d) => [
      `"${d.id || d.referenceId}"`,
      `"${d.donorName || "Supporter"}"`,
      `"${d.campaignName || "General Fund"}"`,
      d.amount,
      `"${d.paymentMethod || "QR Code"}"`,
      `"${d.date}"`,
      `"${d.status || "Successful"}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `kindbridge-donation-report-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Financial & Impact Reports
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
            Audit platform disbursements, donor trends, and generate downloadable accounting reports.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="btn btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
        >
          <Download size={16} />
          <span>Export CSV Report</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div style={{ background: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "1rem 1.25rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
          <Filter size={15} /> Filters:
        </div>

        <select
          value={selectedCampaign}
          onChange={(e) => setSelectedCampaign(e.target.value)}
          style={{ padding: "0.45rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.825rem", background: "#ffffff" }}
        >
          <option value="All">All Campaigns</option>
          {campaigns.map((c) => (
            <option key={c.id} value={c.title}>{c.title}</option>
          ))}
        </select>

        <select
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          style={{ padding: "0.45rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.825rem", background: "#ffffff" }}
        >
          <option value="All">All Payment Types</option>
          <option value="QR">QR Code</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Net Banking">Net Banking</option>
        </select>
      </div>

      {/* Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
        <StatCard
          icon={IndianRupee}
          title="Total Filtered"
          value={`₹${totalAmount.toLocaleString("en-IN")}`}
          change={`${filtered.length} gifts`}
          comparisonText="in selection"
          accentColor="#059669"
        />

        <StatCard
          icon={Users}
          title="Average Donation"
          value={`₹${avgDonation.toLocaleString("en-IN")}`}
          change="per supporter"
          comparisonText=""
          accentColor="#0284c7"
        />

        <StatCard
          icon={CheckCircle2}
          title="Successful Transactions"
          value={successfulCount}
          change="100%"
          comparisonText="verified rate"
          accentColor="#10b981"
        />

        <StatCard
          icon={Calendar}
          title="Monthly Recurring"
          value={monthlyCount}
          change="Pledged"
          comparisonText="regular donors"
          accentColor="#f59e0b"
        />
      </div>

      {/* Report Preview Table */}
      <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong style={{ fontSize: "1rem", color: "#0f172a" }}>Report Dataset Preview</strong>
            <span style={{ fontSize: "0.8rem", color: "#64748b", display: "block" }}>Ready for export to CSV format</span>
          </div>
          <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 600 }}>
            {filtered.length} entries queued
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b", fontSize: "0.78rem" }}>
                <th style={{ padding: "0.75rem 1rem" }}>Reference</th>
                <th style={{ padding: "0.75rem 1rem" }}>Donor</th>
                <th style={{ padding: "0.75rem 1rem" }}>Campaign</th>
                <th style={{ padding: "0.75rem 1rem" }}>Amount</th>
                <th style={{ padding: "0.75rem 1rem" }}>Method</th>
                <th style={{ padding: "0.75rem 1rem" }}>Date</th>
                <th style={{ padding: "0.75rem 1rem" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 10).map((d) => (
                <tr key={d.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", fontSize: "0.78rem" }}>{d.id || d.referenceId}</td>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#0f172a" }}>{d.donorName}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "#334155" }}>{d.campaignName}</td>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#059669" }}>₹{Number(d.amount).toLocaleString("en-IN")}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "#64748b" }}>{d.paymentMethod}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "#64748b" }}>{d.date}</td>
                  <td style={{ padding: "0.75rem 1rem" }}><StatusBadge status={d.status || "Successful"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
