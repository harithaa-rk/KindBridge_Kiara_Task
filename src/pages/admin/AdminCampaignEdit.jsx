import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Trash2, ExternalLink } from "lucide-react";
import { getCampaignById, saveCampaign, deleteCampaign, logAdminActivity, getCategories } from "../../utils/storage";

export default function AdminCampaignEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const availableCategories = getCategories().map((c) => c.name);

  const [campaign, setCampaign] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    organization: "",
    target: "",
    raised: 0,
    donors: "0",
    image: "",
    impactSummary: "",
    status: "Active"
  });

  useEffect(() => {
    const found = getCampaignById(id);
    if (found) {
      setCampaign(found);
      setFormData({
        title: found.title || "",
        description: found.description || "",
        category: found.category || "Education",
        organization: found.organization || "",
        target: String(found.target || ""),
        raised: found.raised || 0,
        donors: found.donors || "0",
        image: found.image || "",
        impactSummary: found.impactSummary || "",
        status: found.status || "Active"
      });
    }
  }, [id]);

  if (!campaign) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <p style={{ color: "#64748b" }}>Campaign not found or loading...</p>
        <Link to="/admin/campaigns" className="btn btn-outline">Back to Campaigns</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...campaign,
      ...formData,
      target: Number(formData.target) || campaign.target
    };

    saveCampaign(updated);
    logAdminActivity(`Campaign "${updated.title}" updated`, "Admin");
    alert("Campaign updated successfully! Changes are immediately visible on the public site.");
    navigate("/admin/campaigns");
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to permanently delete "${campaign.title}"?`)) {
      deleteCampaign(campaign.id);
      logAdminActivity(`Campaign "${campaign.title}" deleted`, "Admin");
      navigate("/admin/campaigns");
    }
  };

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link
          to="/admin/campaigns"
          className="btn btn-outline"
          style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem", gap: "0.35rem" }}
        >
          <ArrowLeft size={15} />
          <span>Back to Campaigns</span>
        </Link>

        <Link
          to={`/campaign/${campaign.id}`}
          target="_blank"
          className="btn btn-outline"
          style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem", gap: "0.35rem" }}
        >
          <ExternalLink size={14} />
          <span>View on Public Site</span>
        </Link>
      </div>

      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
          Edit Campaign
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
          Managing: <strong>{campaign.title}</strong> (ID: {campaign.id})
        </p>
      </div>

      <form onSubmit={handleSave} style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Status selector */}
          <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.4rem" }}>
              Campaign Operating Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem", background: "#ffffff" }}
            >
              <option value="Active">Active (Accepting Donations)</option>
              <option value="Paused">Paused (Displays "Campaign temporarily unavailable")</option>
              <option value="Completed">Completed (Displays "Campaign Completed")</option>
              <option value="Draft">Draft (Hidden from public catalog)</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Campaign Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", background: "#ffffff" }}
              >
                {availableCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
                Organization
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
                Target Amount (₹)
              </label>
              <input
                type="number"
                name="target"
                value={formData.target}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
                Currently Raised (₹)
              </label>
              <input
                type="number"
                name="raised"
                value={formData.raised}
                onChange={(e) => setFormData((prev) => ({ ...prev, raised: Number(e.target.value) }))}
                style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Impact Summary
            </label>
            <input
              type="text"
              name="impactSummary"
              value={formData.impactSummary}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "1.5rem", borderTop: "1px solid #f1f5f9" }}>
            <button
              type="button"
              onClick={handleDelete}
              className="btn"
              style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", padding: "0.6rem 1rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Trash2 size={16} /> Delete Campaign
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: "0.65rem 1.5rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
