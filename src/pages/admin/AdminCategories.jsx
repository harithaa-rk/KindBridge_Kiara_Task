import React, { useState, useEffect } from "react";
import { Plus, Tags, Edit3, X, CheckCircle2, Shield } from "lucide-react";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getCategories, saveCategories, logAdminActivity } from "../../utils/storage";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [nameInput, setNameInput] = useState("");

  const loadData = () => {
    setCategories(getCategories());
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAdd = () => {
    setEditingCategory(null);
    setNameInput("");
    setIsModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditingCategory(cat);
    setNameInput(cat.name);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    let updated;
    if (editingCategory) {
      updated = categories.map((c) =>
        c.id === editingCategory.id ? { ...c, name: nameInput.trim() } : c
      );
      logAdminActivity(`Category "${editingCategory.name}" renamed to "${nameInput.trim()}"`, "Admin");
    } else {
      const newCat = {
        id: `CAT-${Date.now().toString().slice(-4)}`,
        name: nameInput.trim(),
        campaignCount: 0,
        totalDonations: 0,
        status: "Active"
      };
      updated = [...categories, newCat];
      logAdminActivity(`New category "${newCat.name}" added`, "Admin");
    }

    saveCategories(updated);
    setCategories(updated);
    setIsModalOpen(false);
  };

  const handleToggle = (cat) => {
    const newStatus = cat.status === "Active" ? "Inactive" : "Active";
    const updated = categories.map((c) =>
      c.id === cat.id ? { ...c, status: newStatus } : c
    );
    saveCategories(updated);
    setCategories(updated);
    logAdminActivity(`Category "${cat.name}" status changed to ${newStatus}`, "Admin");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Cause Categories
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
            Taxonomies used to categorize fundraising campaigns across KindBridge.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="btn btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
        >
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b", fontSize: "0.8rem" }}>
              <th style={{ padding: "0.85rem 1.25rem" }}>Category Name</th>
              <th style={{ padding: "0.85rem 1rem" }}>Active Campaigns</th>
              <th style={{ padding: "0.85rem 1rem" }}>Total Platform Volume</th>
              <th style={{ padding: "0.85rem 1rem" }}>Status</th>
              <th style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <strong style={{ color: "#0f172a" }}>{cat.name}</strong>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>{cat.id}</span>
                </td>

                <td style={{ padding: "1rem", color: "#334155" }}>
                  {cat.campaignCount || 0} campaigns
                </td>

                <td style={{ padding: "1rem" }}>
                  <strong style={{ color: "#059669" }}>
                    ₹{Number(cat.totalDonations || 0).toLocaleString("en-IN")}
                  </strong>
                </td>

                <td style={{ padding: "1rem" }}>
                  <StatusBadge status={cat.status || "Active"} />
                </td>

                <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                    <button
                      type="button"
                      onClick={() => openEdit(cat)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#0284c7", padding: "4px" }}
                      title="Rename"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggle(cat)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: cat.status === "Active" ? "#dc2626" : "#16a34a",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "4px"
                      }}
                    >
                      {cat.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ background: "#ffffff", borderRadius: "16px", maxWidth: "420px", width: "100%", padding: "2rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
                {editingCategory ? "Rename Category" : "Add New Category"}
              </h2>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Category Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wildlife Protection"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
