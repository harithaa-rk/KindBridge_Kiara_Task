import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Bell, Edit3, Trash2, ExternalLink, X, Save } from "lucide-react";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getUpdates, saveUpdateItem, deleteUpdateItem, logAdminActivity } from "../../utils/storage";

export default function AdminUpdates() {
  const [updates, setUpdates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Platform News",
    description: "",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    status: "Published"
  });

  const loadData = () => {
    setUpdates(getUpdates());
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Platform News",
      description: "",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      status: "Published"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      category: item.category || "Platform News",
      description: item.description || "",
      image: item.image || "",
      status: item.status || "Published"
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingItem) {
      saveUpdateItem({ ...editingItem, ...formData });
      logAdminActivity(`Update "${formData.title}" edited`, "Admin");
    } else {
      saveUpdateItem(formData);
      logAdminActivity(`Update "${formData.title}" published`, "Admin");
    }

    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete update "${title}"?`)) {
      deleteUpdateItem(id);
      logAdminActivity(`Update "${title}" removed`, "Admin");
      loadData();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Platform Updates & Dispatches
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
            Operational news, field audits, and milestone notifications published to <Link to="/updates" target="_blank" style={{ color: "#059669", textDecoration: "none" }}>/updates</Link>.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link to="/updates" target="_blank" className="btn btn-outline" style={{ background: "#ffffff", padding: "0.55rem 0.9rem", fontSize: "0.85rem" }}>
            <ExternalLink size={14} /> View Live Updates
          </Link>
          <button type="button" onClick={openCreateModal} className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <Plus size={16} /> Post Update
          </button>
        </div>
      </div>

      {/* Updates List */}
      <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
        {updates.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b", fontSize: "0.8rem" }}>
                  <th style={{ padding: "0.85rem 1.25rem" }}>Title</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Category</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Date</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Status</th>
                  <th style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {updates.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <strong style={{ color: "#0f172a", display: "block" }}>{item.title}</strong>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{item.description?.slice(0, 75)}...</span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", color: "#64748b", fontSize: "0.8rem" }}>
                      {item.date}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <StatusBadge status={item.status || "Published"} />
                    </td>
                    <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#0284c7" }}
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}
                        >
                          <Trash2 size={15} />
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
            title="No platform updates posted"
            actionText="Post First Update"
            onAction={openCreateModal}
          />
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ background: "#ffffff", borderRadius: "16px", maxWidth: "560px", width: "100%", padding: "2rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
                {editingItem ? "Edit Update" : "Post Platform Update"}
              </h2>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Category
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
                    <option value="Published">Published (Live)</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Description / Announcement Body *
                </label>
                <textarea
                  rows={4}
                  required
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
                  Save Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
