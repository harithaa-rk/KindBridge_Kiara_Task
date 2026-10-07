import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Copy,
  PauseCircle,
  PlayCircle,
  ExternalLink,
  Target,
  Users
} from "lucide-react";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import {
  getCampaigns,
  saveCampaigns,
  saveCampaign,
  deleteCampaign,
  logAdminActivity
} from "../../utils/storage";

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const loadData = () => {
    setCampaigns(getCampaigns());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete campaign "${title}"?`)) {
      deleteCampaign(id);
      logAdminActivity(`Campaign "${title}" deleted`, "Admin");
      loadData();
    }
  };

  const handleDuplicate = (campaign) => {
    const duplicated = {
      ...campaign,
      id: Date.now(),
      title: `${campaign.title} (Copy)`,
      raised: 0,
      donors: "0",
      status: "Draft"
    };
    saveCampaign(duplicated);
    logAdminActivity(`Campaign duplicated as "${duplicated.title}"`, "Admin");
    loadData();
  };

  const handleTogglePause = (campaign) => {
    const newStatus = campaign.status === "Paused" ? "Active" : "Paused";
    const updated = { ...campaign, status: newStatus };
    saveCampaign(updated);
    logAdminActivity(`Campaign "${campaign.title}" status changed to ${newStatus}`, "Admin");
    loadData();
  };

  // Filter campaigns
  const filtered = campaigns.filter((c) => {
    const matchesSearch =
      !search.trim() ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.organization && c.organization.toLowerCase().includes(search.toLowerCase())) ||
      (c.category && c.category.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = ["All", ...new Set(campaigns.map((c) => c.category).filter(Boolean))];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Campaign Management
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
            Oversee, publish, modify, and monitor verified fundraising initiatives.
          </p>
        </div>

        <Link
          to="/admin/campaigns/create"
          className="btn btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1.2rem" }}
        >
          <Plus size={16} />
          <span>+ Create Campaign</span>
        </Link>
      </div>

      {/* Filters & Search Toolbar */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          padding: "1rem 1.25rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ position: "relative", minWidth: "260px", flex: 1 }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search campaigns by title, org..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 1rem 0.5rem 2.25rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "0.85rem",
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "0.85rem",
              background: "#ffffff",
              color: "#334155"
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "0.85rem",
              background: "#ffffff",
              color: "#334155"
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Campaigns Table / Cards */}
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
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b", fontSize: "0.8rem" }}>
                  <th style={{ padding: "0.85rem 1.25rem" }}>Campaign</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Category</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Organization</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Target</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Raised / Progress</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Donors</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Status</th>
                  <th style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const pct = Math.min(Math.round(((c.raised || 0) / (c.target || 1)) * 100), 100);
                  return (
                    <tr
                      key={c.id}
                      style={{ borderBottom: "1px solid #f1f5f9", transition: "background-color 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fcfcfd")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                          <img
                            src={c.image || "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80"}
                            alt={c.title}
                            style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80";
                            }}
                          />
                          <div>
                            <Link
                              to={`/admin/campaigns/${c.id}/edit`}
                              style={{ fontWeight: 700, color: "#0f172a", textDecoration: "none", fontSize: "0.9rem" }}
                            >
                              {c.title}
                            </Link>
                            <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>
                              ID: {c.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: "1rem" }}>
                        <span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>
                          {c.category}
                        </span>
                      </td>

                      <td style={{ padding: "1rem", color: "#334155", fontSize: "0.85rem" }}>
                        {c.organization}
                      </td>

                      <td style={{ padding: "1rem", fontWeight: 600, color: "#0f172a" }}>
                        ₹{Number(c.target).toLocaleString("en-IN")}
                      </td>

                      <td style={{ padding: "1rem" }}>
                        <div style={{ minWidth: "120px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "3px" }}>
                            <strong style={{ color: "#059669" }}>₹{Number(c.raised).toLocaleString("en-IN")}</strong>
                            <span>{pct}%</span>
                          </div>
                          <div style={{ height: "5px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${pct}%`, background: "#059669" }} />
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: "1rem", color: "#64748b", fontSize: "0.85rem" }}>
                        {c.donors || "0"}
                      </td>

                      <td style={{ padding: "1rem" }}>
                        <StatusBadge status={c.status || "Active"} />
                      </td>

                      <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                          {/* Live Link */}
                          <Link
                            to={`/campaign/${c.id}`}
                            target="_blank"
                            title="View on User Site"
                            style={{ padding: "6px", color: "#64748b", borderRadius: "6px" }}
                          >
                            <ExternalLink size={15} />
                          </Link>

                          {/* Pause/Resume Toggle */}
                          <button
                            type="button"
                            onClick={() => handleTogglePause(c)}
                            title={c.status === "Paused" ? "Resume Campaign" : "Pause Campaign"}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", color: c.status === "Paused" ? "#16a34a" : "#d97706" }}
                          >
                            {c.status === "Paused" ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
                          </button>

                          {/* Duplicate */}
                          <button
                            type="button"
                            onClick={() => handleDuplicate(c)}
                            title="Duplicate Campaign"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", color: "#64748b" }}
                          >
                            <Copy size={15} />
                          </button>

                          {/* Edit */}
                          <Link
                            to={`/admin/campaigns/${c.id}/edit`}
                            title="Edit Campaign"
                            style={{ padding: "6px", color: "#0284c7" }}
                          >
                            <Edit3 size={15} />
                          </Link>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(c.id, c.title)}
                            title="Delete Campaign"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", color: "#dc2626" }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No campaigns found"
            description="No campaigns match your current filters or search term."
            actionText="+ Create Campaign"
            actionLink="/admin/campaigns/create"
          />
        )}
      </div>
    </div>
  );
}
