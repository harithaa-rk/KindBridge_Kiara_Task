import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Calendar, Tag, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { getUpdates } from "../utils/storage";

export default function Updates() {
  const [updates, setUpdates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const all = getUpdates();
    setUpdates(all.filter((u) => u.status === "Published"));
  }, []);

  const categories = ["All", ...new Set(updates.map((u) => u.category).filter(Boolean))];

  const filtered = updates.filter(
    (u) => selectedCategory === "All" || u.category === selectedCategory
  );

  return (
    <div className="updates-page" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3rem" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "#ecfdf5",
          color: "#059669",
          padding: "6px 14px",
          borderRadius: "30px",
          fontSize: "0.85rem",
          fontWeight: 600,
          marginBottom: "1rem"
        }}>
          <Bell size={16} /> Verified Platform Dispatches
        </div>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.75rem" }}>
          Platform & Field Updates
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#64748b", lineHeight: 1.6 }}>
          Stay informed with real-time humanitarian field milestones, partner audits, and operational breakthroughs.
        </p>

        {/* Categories */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginTop: "1.75rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      {filtered.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {filtered.map((item) => (
            <article
              key={item.id}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                padding: "1.75rem",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
                alignItems: "flex-start",
                flexWrap: "wrap"
              }}
            >
              {item.image && (
                <div style={{ width: "240px", height: "160px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
              )}

              <div style={{ flex: 1, minWidth: "280px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.6rem" }}>
                  <span style={{
                    background: "#f1f5f9",
                    color: "#0f172a",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: "6px"
                  }}>
                    {item.category}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", color: "#64748b" }}>
                    <Calendar size={13} /> {item.date}
                  </span>
                </div>

                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.75rem", lineHeight: 1.35 }}>
                  {item.title}
                </h2>

                <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  {item.description}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "#059669", fontWeight: 600 }}>
                    <ShieldCheck size={16} /> Verified Field Report
                  </div>
                  <Link to="/causes" className="btn btn-outline" style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", marginLeft: "auto", gap: "0.35rem" }}>
                    <Heart size={13} /> Support Causes
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Bell size={40} color="#94a3b8" />
          <h2 className="empty-state-title">No Updates Available</h2>
          <p className="empty-state-desc">There are no updates in this category currently.</p>
        </div>
      )}
    </div>
  );
}
