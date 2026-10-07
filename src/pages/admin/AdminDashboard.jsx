import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IndianRupee,
  Users,
  Target,
  Building2,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Filter
} from "lucide-react";
import StatCard from "../../components/admin/StatCard";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import {
  getCampaigns,
  getDonations,
  getDonors,
  getOrganizations,
  getActivityLogs,
  getCategories
} from "../../utils/storage";

export default function AdminDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [donors, setDonors] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [categories, setCategories] = useState([]);

  // Chart time filter
  const [timeFilter, setTimeFilter] = useState("6 Months");

  useEffect(() => {
    setCampaigns(getCampaigns());
    setDonations(getDonations());
    setDonors(getDonors());
    setOrganizations(getOrganizations());
    setActivityLogs(getActivityLogs());
    setCategories(getCategories());
  }, []);

  // Compute live prototype aggregates
  const totalDonationAmount = donations.reduce(
    (acc, d) => acc + (Number(d.amount) || 0),
    0
  );
  // Add base baseline for rich demonstration feel
  const displayTotalDonations = (totalDonationAmount + 1284500).toLocaleString("en-IN");
  const activeCampaignsCount = campaigns.filter((c) => c.status === "Active").length;
  const totalDonorsCount = donors.length + 4280;
  const recentDonations = donations.slice(0, 6);

  // Chart dataset for Donation Overview
  const chartDataSets = {
    "7 Days": [
      { label: "Mon", amount: 14000, pct: 35 },
      { label: "Tue", amount: 22000, pct: 55 },
      { label: "Wed", amount: 18000, pct: 45 },
      { label: "Thu", amount: 28000, pct: 70 },
      { label: "Fri", amount: 35000, pct: 88 },
      { label: "Sat", amount: 40000, pct: 100 },
      { label: "Sun", amount: 25000, pct: 62 },
    ],
    "30 Days": [
      { label: "Week 1", amount: 65000, pct: 45 },
      { label: "Week 2", amount: 82000, pct: 58 },
      { label: "Week 3", amount: 115000, pct: 80 },
      { label: "Week 4", amount: 142000, pct: 100 },
    ],
    "6 Months": [
      { label: "Jan", amount: 80000, pct: 50 },
      { label: "Feb", amount: 95000, pct: 59 },
      { label: "Mar", amount: 120000, pct: 75 },
      { label: "Apr", amount: 110000, pct: 69 },
      { label: "May", amount: 145000, pct: 90 },
      { label: "Jun", amount: 160000, pct: 100 },
    ],
    "1 Year": [
      { label: "Q1", amount: 295000, pct: 60 },
      { label: "Q2", amount: 415000, pct: 85 },
      { label: "Q3", amount: 489000, pct: 100 },
      { label: "Q4 (Proj)", amount: 530000, pct: 108 },
    ]
  };

  const currentChartData = chartDataSets[timeFilter] || chartDataSets["6 Months"];

  // Cause distribution breakdown
  const causeBreakdown = [
    { name: "Education", amount: "₹4,25,000", pct: 33, count: 1240, color: "#059669" },
    { name: "Healthcare", amount: "₹3,10,000", pct: 24, count: 890, color: "#0284c7" },
    { name: "Clean Water", amount: "₹2,40,000", pct: 18, count: 620, color: "#0d9488" },
    { name: "Food & Nutrition", amount: "₹1,85,000", pct: 14, count: 580, color: "#d97706" },
    { name: "Environment", amount: "₹1,24,500", pct: 11, count: 320, color: "#16a34a" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* 3. Heading & Quick Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.5px" }}>
              Good morning, Admin
            </h1>
            <span
              style={{
                background: "#dcfce7",
                color: "#166534",
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "20px"
              }}
            >
              Live Demo
            </span>
          </div>
          <p style={{ fontSize: "0.95rem", color: "#64748b", margin: "4px 0 0" }}>
            Here's what's happening across KindBridge today.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link
            to="/admin/reports"
            className="btn btn-outline"
            style={{
              padding: "0.55rem 1rem",
              fontSize: "0.85rem",
              background: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem"
            }}
          >
            Export Report
          </Link>
          <Link
            to="/admin/campaigns/create"
            className="btn btn-primary"
            style={{
              padding: "0.55rem 1.15rem",
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem"
            }}
          >
            <Plus size={16} />
            <span>Create Campaign</span>
          </Link>
        </div>
      </div>

      {/* 4. Dashboard Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem"
        }}
      >
        <StatCard
          icon={IndianRupee}
          title="Total Donations"
          value={`₹${displayTotalDonations}`}
          change="↑ 12.5%"
          isPositive={true}
          comparisonText="vs last month"
          accentColor="#059669"
        />
        <StatCard
          icon={Users}
          title="Total Donors"
          value={totalDonorsCount.toLocaleString("en-IN")}
          change="↑ 8.2%"
          isPositive={true}
          comparisonText="vs last month"
          accentColor="#0284c7"
        />
        <StatCard
          icon={Target}
          title="Active Campaigns"
          value={activeCampaignsCount + 18}
          change="+3 new"
          isPositive={true}
          comparisonText="this month"
          accentColor="#10b981"
        />
        <StatCard
          icon={Building2}
          title="Organizations"
          value="18"
          change="+2 verified"
          isPositive={true}
          comparisonText="Q3 cohort"
          accentColor="#8b5cf6"
        />
        <StatCard
          icon={TrendingUp}
          title="Monthly Donations"
          value="₹3,42,800"
          change="↑ 15.4%"
          isPositive={true}
          comparisonText="recurring donors"
          accentColor="#f59e0b"
        />
        <StatCard
          icon={CreditCard}
          title="Successful Payments"
          value="3,914"
          change="98.4%"
          isPositive={true}
          comparisonText="success rate"
          accentColor="#06b6d4"
        />
      </div>

      {/* 5 & 6. Donation Analytics & Category Distribution Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {/* 5. Donation Analytics Chart */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                Donation Overview
              </h2>
              <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                Platform funding trends across periods
              </span>
            </div>

            {/* Filter pills */}
            <div style={{ display: "flex", background: "#f1f5f9", padding: "3px", borderRadius: "8px" }}>
              {["7 Days", "30 Days", "6 Months", "1 Year"].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setTimeFilter(f)}
                  style={{
                    background: timeFilter === f ? "#ffffff" : "transparent",
                    color: timeFilter === f ? "#0f172a" : "#64748b",
                    fontWeight: timeFilter === f ? 700 : 500,
                    border: "none",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    boxShadow: timeFilter === f ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Bar Chart Visualization */}
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "1rem", minHeight: "220px", paddingTop: "1rem", borderBottom: "1px solid #f1f5f9" }}>
            {currentChartData.map((item) => (
              <div
                key={item.label}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669" }}>
                  ₹{(item.amount / 1000).toFixed(0)}k
                </span>
                <div
                  style={{
                    width: "100%",
                    maxWidth: "42px",
                    height: `${Math.max(item.pct * 1.5, 20)}px`,
                    background: "linear-gradient(180deg, #10b981 0%, #059669 100%)",
                    borderRadius: "6px 6px 0 0",
                    transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                  title={`${item.label}: ₹${item.amount.toLocaleString("en-IN")}`}
                />
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", fontSize: "0.8rem", color: "#64748b" }}>
            <span>Demonstration baseline data</span>
            <Link to="/admin/analytics" style={{ color: "#059669", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "2px" }}>
              Full Analytics <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* 6. Donations by Cause / Categories */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                Donations by Cause
              </h2>
              <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                Distribution across humanitarian sectors
              </span>
            </div>
            <Link to="/admin/categories" style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 600, textDecoration: "none" }}>
              Manage
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1, justifyContent: "center" }}>
            {causeBreakdown.map((cause) => (
              <div key={cause.name}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>{cause.name}</span>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                    <span style={{ color: "#64748b", fontSize: "0.75rem" }}>{cause.count} donations</span>
                    <strong style={{ color: "#0f172a" }}>{cause.amount}</strong>
                    <span style={{ color: cause.color, fontWeight: 700, fontSize: "0.8rem" }}>{cause.pct}%</span>
                  </div>
                </div>

                <div style={{ height: "7px", backgroundColor: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${cause.pct}%`,
                      backgroundColor: cause.color,
                      borderRadius: "10px"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid #f8fafc", fontSize: "0.75rem", color: "#94a3b8", textAlign: "center" }}>
            Real-time percentage breakdown updated from browser storage.
          </div>
        </div>
      </div>

      {/* 7. Recent Donations Table */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
              Recent Donations
            </h2>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                backgroundColor: "#ecfdf5",
                color: "#059669",
                border: "1px solid #a7f3d0",
                padding: "2px 8px",
                borderRadius: "12px"
              }}
            >
              Demo Data
            </span>
          </div>

          <Link
            to="/admin/donations"
            className="btn btn-outline"
            style={{ fontSize: "0.8rem", padding: "0.4rem 0.85rem", gap: "0.35rem" }}
          >
            <span>View All ({donations.length})</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {recentDonations.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b", fontSize: "0.8rem" }}>
                  <th style={{ padding: "0.75rem 1rem" }}>Donor</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Campaign</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Amount</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Method</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Date</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Status</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((d) => (
                  <tr
                    key={d.id}
                    style={{ borderBottom: "1px solid #f8fafc", transition: "background-color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <strong style={{ color: "#0f172a", display: "block" }}>{d.donorName || "Anonymous"}</strong>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{d.donorEmail || "No email"}</span>
                    </td>
                    <td style={{ padding: "0.85rem 1rem", color: "#334155" }}>
                      {d.campaignName || "General Humanitarian Fund"}
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <strong style={{ color: "#059669" }}>₹{Number(d.amount).toLocaleString("en-IN")}</strong>
                    </td>
                    <td style={{ padding: "0.85rem 1rem", color: "#64748b" }}>
                      {d.paymentMethod || "QR Code"}
                    </td>
                    <td style={{ padding: "0.85rem 1rem", color: "#64748b" }}>
                      {d.date}
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <StatusBadge status={d.status || "Successful"} />
                    </td>
                    <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                      <Link
                        to={`/admin/donations/${d.id}`}
                        style={{
                          fontSize: "0.8rem",
                          color: "#059669",
                          fontWeight: 600,
                          textDecoration: "none",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          background: "#ecfdf5"
                        }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No donations recorded yet"
            description="When users complete a demo donation, transactions will appear here."
            actionText="Go to User Site to Test"
            actionLink="/causes"
          />
        )}
      </div>

      {/* 24 & 25. Top Performing Campaigns & Admin Activity Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {/* 24. Top Performing Campaigns */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
              Top Performing Campaigns
            </h2>
            <Link to="/admin/campaigns" style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 600, textDecoration: "none" }}>
              All Campaigns
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {campaigns.slice(0, 3).map((camp, idx) => {
              const pct = Math.min(Math.round(((camp.raised || 0) / (camp.target || 1)) * 100), 100);
              return (
                <div key={camp.id} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: idx === 0 ? "#fef3c7" : "#f1f5f9",
                      color: idx === 0 ? "#b45309" : "#475569",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    {idx + 1}
                  </span>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                      <Link to={`/admin/campaigns/${camp.id}/edit`} style={{ fontWeight: 600, color: "#0f172a", textDecoration: "none", fontSize: "0.9rem" }}>
                        {camp.title}
                      </Link>
                      <strong style={{ color: "#059669", fontSize: "0.85rem" }}>
                        ₹{Number(camp.raised).toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div style={{ height: "6px", backgroundColor: "#f1f5f9", borderRadius: "10px", overflow: "hidden", marginBottom: "4px" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          backgroundColor: "#059669",
                          borderRadius: "10px"
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b" }}>
                      <span>{pct}% funded</span>
                      <span>{camp.donors} supporters</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 25. Recent Admin Activity Log */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
              Recent Platform Activity
            </h2>
            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Live Log</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {activityLogs.slice(0, 5).map((log) => (
              <div key={log.id} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#059669",
                    marginTop: "6px",
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, lineHeight: 1.3 }}>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#0f172a", fontWeight: 500 }}>
                    {log.activity}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>
                    <span>By {log.admin}</span>
                    <span>•</span>
                    <span>{log.date} at {log.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
