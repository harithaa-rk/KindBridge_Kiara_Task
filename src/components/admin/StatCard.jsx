import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  icon: Icon,
  title,
  value,
  change,
  isPositive = true,
  comparisonText = "vs last month",
  accentColor = "#059669",
  badgeText = "Demo Data"
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        padding: "1.25rem 1.4rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        transition: "box-shadow 0.2s, transform 0.2s"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#64748b" }}>
          {title}
        </span>
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            backgroundColor: `${accentColor}15`,
            color: accentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {Icon && <Icon size={20} />}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.5px" }}>
          {value}
        </h3>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
              fontWeight: 700,
              color: isPositive ? "#16a34a" : "#dc2626"
            }}
          >
            {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {change}
          </span>
          <span style={{ color: "#94a3b8" }}>{comparisonText}</span>
        </div>

        {badgeText && (
          <span
            style={{
              fontSize: "0.7rem",
              color: "#94a3b8",
              background: "#f8fafc",
              padding: "2px 6px",
              borderRadius: "4px",
              border: "1px solid #f1f5f9"
            }}
          >
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
