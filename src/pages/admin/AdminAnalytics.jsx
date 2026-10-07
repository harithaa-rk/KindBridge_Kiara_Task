import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, Target, IndianRupee, PieChart, ArrowUpRight } from "lucide-react";
import { getCampaigns, getDonations } from "../../utils/storage";

export default function AdminAnalytics() {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    setCampaigns(getCampaigns());
    setDonations(getDonations());
  }, []);

  const paymentMethods = [
    { name: "UPI / BHIM", pct: 42, color: "#059669" },
    { name: "Dynamic QR Code", pct: 35, color: "#0284c7" },
    { name: "Credit / Debit Card", pct: 15, color: "#8b5cf6" },
    { name: "Net Banking", pct: 8, color: "#f59e0b" },
  ];

  const topCampaignsList = [
    { name: "Education for Every Child", raised: 342000, target: 500000, donors: 842 },
    { name: "Clean Water Initiative", raised: 281500, target: 350000, donors: 621 },
    { name: "Healthcare for Children", raised: 214200, target: 400000, donors: 489 },
    { name: "End Hunger, Build Hope", raised: 185000, target: 300000, donors: 412 },
  ];

  const growthPeriods = [
    { period: "Q1 2026", total: "₹4,80,000", growth: "+18%" },
    { period: "Q2 2026", total: "₹7,20,000", growth: "+24%" },
    { period: "Q3 2026", total: "₹10,50,000", growth: "+31%" },
    { period: "Q4 2026 (YTD)", total: "₹12,84,500", growth: "+15%" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
          Analytics & Insights
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
          Platform fundraising velocity, conversion metrics, and supporter behavioral trends.
        </p>
      </div>

      {/* Top 3 High-Impact Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
        {growthPeriods.map((g) => (
          <div key={g.period} style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{g.period} Growth</span>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "4px" }}>
              <strong style={{ fontSize: "1.6rem", color: "#0f172a" }}>{g.total}</strong>
              <span style={{ color: "#16a34a", fontWeight: 700, fontSize: "0.85rem" }}>{g.growth}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2-Column Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "1.5rem" }}>
        {/* Top Campaigns */}
        <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1.25rem" }}>
            Top Performing Campaigns
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {topCampaignsList.map((c, i) => {
              const pct = Math.round((c.raised / c.target) * 100);
              return (
                <div key={c.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.9rem" }}>
                      {i + 1}. {c.name}
                    </span>
                    <strong style={{ color: "#059669", fontSize: "0.9rem" }}>
                      ₹{c.raised.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div style={{ height: "6px", backgroundColor: "#f1f5f9", borderRadius: "10px", overflow: "hidden", marginBottom: "3px" }}>
                    <div style={{ height: "100%", width: `${pct}%`, backgroundColor: "#059669" }} />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b" }}>
                    <span>{pct}% of ₹{c.target.toLocaleString("en-IN")}</span>
                    <span>{c.donors} donors</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.75rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1.25rem" }}>
            Payment Method Preference
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {paymentMethods.map((m) => (
              <div key={m.name}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>{m.name}</span>
                  <strong style={{ color: m.color }}>{m.pct}%</strong>
                </div>

                <div style={{ height: "8px", backgroundColor: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${m.pct}%`, backgroundColor: m.color, borderRadius: "10px" }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "10px", fontSize: "0.8rem", color: "#64748b" }}>
            💡 <strong>Observation:</strong> QR Code and UPI options comprise 77% of all transaction volume, exhibiting the lowest payment friction in demo runs.
          </div>
        </div>
      </div>
    </div>
  );
}
