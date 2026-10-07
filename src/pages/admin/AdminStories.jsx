import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, BookOpen, Edit3, Trash2, Eye, ExternalLink, X, Save, CheckCircle2 } from "lucide-react";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getStories, saveStory, deleteStory, logAdminActivity, getCategories } from "../../utils/storage";

export default function AdminStories() {
  const [stories, setStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(null);

  const availableCategories = getCategories().map((c) => c.name);

  const [formData, setFormData] = useState({
    title: "",
    author: "KindBridge Editorial",
    category: availableCategories[0] || "Education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    shortDescription: "",
    fullStory: "",
    status: "Published"
  });

  const loadData = () => {
    setStories(getStories());
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingStory(null);
    setFormData({
      title: "",
      author: "KindBridge Editorial",
      category: availableCategories[0] || "Education",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      shortDescription: "",
      fullStory: "",
      status: "Published"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (story) => {
    setEditingStory(story);
    setFormData({
      title: story.title || "",
      author: story.author || "Editorial",
      category: story.category || "Education",
      image: story.image || "",
      shortDescription: story.shortDescription || "",
      fullStory: story.fullStory || "",
      status: story.status || "Published"
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingStory) {
      saveStory({ ...editingStory, ...formData });
      logAdminActivity(`Story "${formData.title}" updated`, "Admin");
    } else {
      saveStory(formData);
      logAdminActivity(`Story "${formData.title}" published`, "Admin");
    }

    setIsModalOpen(false);
    loadData();
  };

  const handleTogglePublish = (story) => {
    const newStatus = story.status === "Published" ? "Draft" : "Published";
    saveStory({ ...story, status: newStatus });
    logAdminActivity(`Story "${story.title}" set to ${newStatus}`, "Admin");
    loadData();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete story "${title}"?`)) {
      deleteStory(id);
      logAdminActivity(`Story "${title}" deleted`, "Admin");
      loadData();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Impact Stories
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
            Published stories automatically display on the public <Link to="/stories" target="_blank" style={{ color: "#059669", textDecoration: "none" }}>/stories</Link> portal.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link to="/stories" target="_blank" className="btn btn-outline" style={{ background: "#ffffff", padding: "0.55rem 0.9rem", fontSize: "0.85rem" }}>
            <ExternalLink size={14} /> View Live Stories
          </Link>
          <button type="button" onClick={openCreateModal} className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <Plus size={16} /> Add Story
          </button>
        </div>
      </div>

      {/* Stories Table */}
      <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
        {stories.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b", fontSize: "0.8rem" }}>
                  <th style={{ padding: "0.85rem 1.25rem" }}>Story Title</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Author</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Category</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Published Date</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Status</th>
                  <th style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((story) => (
                  <tr key={story.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <img
                          src={story.image}
                          alt={story.title}
                          style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80";
                          }}
                        />
                        <div>
                          <strong style={{ color: "#0f172a", display: "block" }}>{story.title}</strong>
                          <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{story.shortDescription?.slice(0, 50)}...</span>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: "1rem", color: "#475569" }}>
                      {story.author || "Editorial"}
                    </td>

                    <td style={{ padding: "1rem" }}>
                      <span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600 }}>
                        {story.category}
                      </span>
                    </td>

                    <td style={{ padding: "1rem", color: "#64748b", fontSize: "0.8rem" }}>
                      {story.publishDate}
                    </td>

                    <td style={{ padding: "1rem" }}>
                      <StatusBadge status={story.status || "Published"} />
                    </td>

                    <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(story)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: story.status === "Published" ? "#d97706" : "#16a34a"
                          }}
                        >
                          {story.status === "Published" ? "Unpublish" : "Publish"}
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditModal(story)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#0284c7" }}
                        >
                          <Edit3 size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(story.id, story.title)}
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
            title="No impact stories yet"
            actionText="Write First Story"
            onAction={openCreateModal}
          />
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ background: "#ffffff", borderRadius: "16px", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
                {editingStory ? "Edit Story" : "Create Impact Story"}
              </h2>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Story Title *
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
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#ffffff" }}
                  >
                    {availableCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Cover Image URL
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
                  Short Summary / Hook
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  style={{ width: "100%", padding: "0.55rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Full Impact Narrative
                </label>
                <textarea
                  rows={4}
                  value={formData.fullStory}
                  onChange={(e) => setFormData({ ...formData, fullStory: e.target.value })}
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
                  <option value="Published">Published (Live on /stories)</option>
                  <option value="Draft">Draft (Admin Only)</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
