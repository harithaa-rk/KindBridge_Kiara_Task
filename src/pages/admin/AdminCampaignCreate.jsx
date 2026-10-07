import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Target, Save, CheckCircle2, Image, Sparkles } from "lucide-react";
import { saveCampaign, logAdminActivity, getCategories } from "../../utils/storage";

export default function AdminCampaignCreate() {
  const navigate = useNavigate();
  const availableCategories = getCategories().map((c) => c.name);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: availableCategories[0] || "Education",
    organization: "KindBridge Community Initiative",
    target: "500000",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "2026-12-31",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
    impactSummary: "₹1,000 directly provides essential relief supplies to families in need."
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (status) => {
    if (!formData.title.trim()) {
      alert("Please enter a campaign title.");
      return;
    }

    const newCampaign = {
      ...formData,
      target: Number(formData.target) || 100000,
      raised: 0,
      donors: "0",
      status: status // "Draft" or "Active"
    };

    saveCampaign(newCampaign);
    logAdminActivity(
      `Campaign "${newCampaign.title}" ${status === "Active" ? "published" : "saved as draft"}`,
      "Admin"
    );

    alert(`Campaign successfully ${status === "Active" ? "published and live on /causes" : "saved as draft"}!`);
    navigate("/admin/campaigns");
  };

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Back button */}
      <div>
        <Link
          to="/admin/campaigns"
          className="btn btn-outline"
          style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem", gap: "0.35rem" }}
        >
          <ArrowLeft size={15} />
          <span>Back to Campaigns</span>
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
          Create New Campaign
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
          Launch a new verified humanitarian initiative. Once published, it will appear on the public KindBridge causes catalog.
        </p>
      </div>

      {/* Form Card */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          padding: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Title */}
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Campaign Title *
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Emergency Food Support"
              value={formData.title}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.65rem 0.85rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "0.9rem"
              }}
            />
          </div>

          {/* Category & Organization Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
                Primary Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                  background: "#ffffff"
                }}
              >
                {availableCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
                Organizing Body / NGO *
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem"
                }}
              />
            </div>
          </div>

          {/* Target Amount & Dates */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
                Target Amount (₹ INR) *
              </label>
              <input
                type="number"
                name="target"
                min="10000"
                step="5000"
                value={formData.target}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem"
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Full Campaign Narrative & Description *
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Describe why this campaign is vital, what challenges it addresses, and who it helps..."
              value={formData.description}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.65rem 0.85rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "0.9rem",
                resize: "vertical"
              }}
            />
          </div>

          {/* Impact Summary */}
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Measurable Impact Formula
            </label>
            <input
              type="text"
              name="impactSummary"
              placeholder="e.g. ₹1,000 feeds a family of four for two full weeks."
              value={formData.impactSummary}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.65rem 0.85rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "0.9rem"
              }}
            />
          </div>

          {/* Image URL with live preview */}
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Campaign Hero Image (URL)
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.65rem 0.85rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "0.9rem",
                marginBottom: "0.75rem"
              }}
            />
            {formData.image && (
              <div style={{ width: "100%", maxHeight: "200px", borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              marginTop: "1.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid #f1f5f9"
            }}
          >
            <button
              type="button"
              onClick={() => handleSave("Draft")}
              className="btn btn-outline"
              style={{ padding: "0.65rem 1.25rem", fontSize: "0.9rem", gap: "0.4rem" }}
            >
              <Save size={16} />
              <span>Save Draft</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave("Active")}
              className="btn btn-primary"
              style={{ padding: "0.65rem 1.5rem", fontSize: "0.9rem", gap: "0.4rem" }}
            >
              <CheckCircle2 size={16} />
              <span>Publish Campaign</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
