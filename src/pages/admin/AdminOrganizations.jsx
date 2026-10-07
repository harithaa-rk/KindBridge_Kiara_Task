import React, { useState, useEffect } from "react";
import { Plus, Search, Building2, Edit3, Trash2, ExternalLink, X, Save, CheckCircle2 } from "lucide-react";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getOrganizations, saveOrganizations, saveOrganization, logAdminActivity } from "../../utils/storage";

export default function AdminOrganizations() {
  const [orgs, setOrgs] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Children & Education",
    email: "",
    website: "",
    description: "",
    status: "Active"
  });

  const loadData = () => {
    setOrgs(getOrganizations());
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingOrg(null);
    setFormData({
      name: "",
      category: "Children & Education",
      email: "",
      website: "",
      description: "",
      status: "Active"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (org) => {
    setEditingOrg(org);
    setFormData({
      name: org.name || "",
      category: org.category || "General",
      email: org.email || "",
      website: org.website || "",
      description: org.description || "",
      status: org.status || "Active"
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingOrg) {
      saveOrganization({ ...editingOrg, ...formData });
      logAdminActivity(`Organization "${formData.name}" updated`, "Admin");
    } else {
      saveOrganization(formData);
      logAdminActivity(`New organization "${formData.name}" registered`, "Admin");
    }

    setIsModalOpen(false);
    loadData();
  };

  const handleToggleStatus = (org) => {
    const newStatus = org.status === "Active" ? "Inactive" : "Active";
    saveOrganization({ ...org, status: newStatus });
    logAdminActivity(`Organization "${org.name}" status changed to ${newStatus}`, "Admin");
    loadData();
  };

  const filtered = orgs.filter((o) => {
    const q = search.toLowerCase().trim();
    return !q || o.name.toLowerCase().includes(q) || o.category.toLowerCase().includes(q);
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Organizations & Partners
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
            Vetted humanitarian NGOs, grassroot trusts, and community foundations.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="btn btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
        >
          <Plus size={16} />
          <span>Add Organization</span>
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ background: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "1rem 1.25rem", display: "flex", alignItems: "center" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "380px" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search organizations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "0.55rem 1rem 0.55rem 2.25rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none" }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
        {filtered.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b", fontSize: "0.8rem" }}>
                  <th style={{ padding: "0.85rem 1.25rem" }}>Organization Name</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Sector</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Campaigns</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Total Raised</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Contact Email</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Status</th>
                  <th style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((org) => (
                  <tr key={org.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <strong style={{ color: "#0f172a", display: "block" }}>{org.name}</strong>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{org.website}</span>
                    </td>
                    <td style={{ padding: "1rem", color: "#475569" }}>
                      <span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600 }}>
                        {org.category}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", color: "#334155" }}>
                      {org.campaignCount || 1} campaigns
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <strong style={{ color: "#059669" }}>
                        ₹{Number(org.totalRaised).toLocaleString("en-IN")}
                      </strong>
                    </td>
                    <td style={{ padding: "1rem", color: "#64748b", fontSize: "0.8rem" }}>
                      {org.email}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <StatusBadge status={org.status || "Active"} />
                    </td>
                    <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button
                          type="button"
                          onClick={() => openEditModal(org)}
                          title="Edit"
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#0284c7", padding: "4px" }}
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(org)}
                          title={org.status === "Active" ? "Deactivate" : "Activate"}
                          style={{ background: "none", border: "none", cursor: "pointer", color: org.status === "Active" ? "#dc2626" : "#16a34a", fontSize: "0.75rem", fontWeight: 600, padding: "4px" }}
                        >
                          {org.status === "Active" ? "Deactivate" : "Activate"}
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
            title="No organizations found"
            actionText="Add Organization"
            onAction={openCreateModal}
          />
        )}
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ background: "#ffffff", borderRadius: "16px", maxWidth: "540px", width: "100%", padding: "2rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
                {editingOrg ? "Edit Organization" : "Register Organization"}
              </h2>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Sector Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#ffffff" }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Description / Mission
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Organization
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
