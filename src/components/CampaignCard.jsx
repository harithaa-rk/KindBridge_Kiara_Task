import React from "react";
import { Link } from "react-router-dom";
import { Heart, Users, Info, PauseCircle, CheckCircle2 } from "lucide-react";
import { formatCurrency, calculateProgress } from "../data/campaigns";

export default function CampaignCard({ campaign }) {
  const { id, title, organization, category, target, raised, image, donors, status = "Active" } = campaign;
  const progress = calculateProgress(raised, target);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";
  };

  const isPaused = status === "Paused";
  const isCompleted = status === "Completed";

  return (
    <div className="campaign-card">
      <div className="card-image-box">
        <Link to={`/campaign/${id}`}>
          <img
            src={image}
            alt={title}
            className="card-image"
            onError={handleImageError}
            loading="lazy"
          />
        </Link>
        <span className="card-category-badge">{category}</span>
        {isPaused && (
          <span style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "#fef3c7",
            color: "#92400e",
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "4px 8px",
            borderRadius: "6px",
            border: "1px solid #fcd34d"
          }}>
            Paused
          </span>
        )}
        {isCompleted && (
          <span style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "#dcfce7",
            color: "#166534",
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "4px 8px",
            borderRadius: "6px",
            border: "1px solid #86efac"
          }}>
            Completed
          </span>
        )}
      </div>

      <div className="card-body">
        <div className="card-org-name">{organization}</div>
        <h3 className="card-title">
          <Link to={`/campaign/${id}`} style={{ color: "inherit", textDecoration: "none" }}>
            {title}
          </Link>
        </h3>

        <div className="card-progress-section">
          <div className="progress-header">
            <span className="progress-raised">{formatCurrency(raised)} raised</span>
            <span className="progress-pct">{progress}%</span>
          </div>

          <div
            className="progress-bar-bg"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="progress-footer">
            <span>Goal: {formatCurrency(target)}</span>
            {donors && (
              <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                <Users size={12} /> {donors}
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {isPaused ? (
              <button
                type="button"
                disabled
                className="btn"
                style={{
                  flex: 1,
                  background: "#f1f5f9",
                  color: "#64748b",
                  border: "1px solid #cbd5e1",
                  cursor: "not-allowed",
                  fontSize: "0.85rem",
                  padding: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem"
                }}
              >
                <PauseCircle size={15} />
                <span>Campaign temporarily unavailable</span>
              </button>
            ) : isCompleted ? (
              <button
                type="button"
                disabled
                className="btn"
                style={{
                  flex: 1,
                  background: "#ecfdf5",
                  color: "#047857",
                  border: "1px solid #a7f3d0",
                  cursor: "default",
                  fontSize: "0.85rem",
                  padding: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem"
                }}
              >
                <CheckCircle2 size={15} />
                <span>Campaign Completed</span>
              </button>
            ) : (
              <Link to={`/donate/${id}`} className="card-donate-btn" style={{ flex: 1 }}>
                <Heart size={15} />
                <span>Donate Now</span>
              </Link>
            )}

            <Link
              to={`/campaign/${id}`}
              className="btn btn-outline"
              style={{ padding: "0.75rem", borderRadius: "var(--radius-md)" }}
              title="View Campaign Details"
            >
              <Info size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
