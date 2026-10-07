import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Users,
  Clock,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  PauseCircle
} from "lucide-react";
import { getCampaignById } from "../utils/storage";
import { formatCurrency, calculateProgress } from "../data/campaigns";

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  // Donation state
  const presetAmounts = [500, 1000, 2000, 5000];
  const [selectedAmount, setSelectedAmount] = useState(2000);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmountInput, setCustomAmountInput] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const found = getCampaignById(id);
    setCampaign(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-secondary)" }}>Loading campaign details...</div>;
  }

  if (!campaign) {
    return (
      <div className="empty-state" style={{ margin: "4rem auto" }}>
        <div className="empty-state-icon" style={{ backgroundColor: "var(--danger-bg)", color: "var(--danger-text)" }}>
          <AlertCircle size={32} />
        </div>
        <h1 className="empty-state-title">Campaign Not Found</h1>
        <p className="empty-state-desc">
          The campaign you are looking for does not exist or may have been concluded.
        </p>
        <Link to="/causes" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Back to Causes</span>
        </Link>
      </div>
    );
  }

  const {
    title,
    organization,
    category,
    target,
    raised,
    donors,
    daysLeft,
    image,
    description,
    impactSummary,
    status = "Active"
  } = campaign;

  const isPaused = status === "Paused";
  const isCompleted = status === "Completed";
  const progress = calculateProgress(raised, target);

  const handleSelectPreset = (amount) => {
    setIsCustom(false);
    setSelectedAmount(amount);
    setValidationError("");
  };

  const handleCustomInputFocus = () => {
    setIsCustom(true);
    if (customAmountInput && Number(customAmountInput) >= 100) {
      setSelectedAmount(Number(customAmountInput));
    }
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setIsCustom(true);
    setCustomAmountInput(val);

    if (val.trim() === "") {
      setSelectedAmount(0);
      setValidationError("Please enter an amount.");
      return;
    }

    const num = Number(val);
    if (isNaN(num)) {
      setSelectedAmount(0);
      setValidationError("Please enter a valid numeric number.");
    } else if (num < 100) {
      setSelectedAmount(0);
      setValidationError("Donation amount must be at least ₹100.");
    } else {
      setSelectedAmount(num);
      setValidationError("");
    }
  };

  const handleDonateProceed = (e) => {
    e.preventDefault();
    if (isPaused || isCompleted) return;

    if (isCustom) {
      const num = Number(customAmountInput);
      if (isNaN(num) || num < 100) {
        setValidationError("Please enter a valid amount of at least ₹100.");
        return;
      }
    } else {
      if (!selectedAmount || selectedAmount < 100) {
        setValidationError("Please select or enter an amount of at least ₹100.");
        return;
      }
    }

    // Direct user into complete donation journey at /donate/:id
    navigate(`/donate/${campaign.id}`);
  };

  return (
    <div className="campaign-details-page">
      {/* Back button */}
      <div style={{ marginBottom: "1.25rem" }}>
        <Link
          to="/causes"
          className="btn btn-outline"
          style={{ padding: "0.45rem 0.9rem", fontSize: "0.85rem", gap: "0.4rem" }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Causes</span>
        </Link>
      </div>

      <div className="details-container">
        {/* Left Column: Media & Story */}
        <div className="details-main">
          <div className="details-hero-image-wrap">
            <img
              src={image}
              alt={title}
              className="details-hero-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>

          <div className="details-content">
            <div className="details-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="details-category-pill">{category}</span>
                {isPaused && (
                  <span style={{ background: "#fef3c7", color: "#92400e", fontSize: "0.75rem", fontWeight: 700, padding: "3px 8px", borderRadius: "4px" }}>
                    Paused
                  </span>
                )}
                {isCompleted && (
                  <span style={{ background: "#dcfce7", color: "#166534", fontSize: "0.75rem", fontWeight: 700, padding: "3px 8px", borderRadius: "4px" }}>
                    Completed
                  </span>
                )}
              </div>
              <h1 className="details-title">{title}</h1>
              <p className="details-org">
                By <span className="details-org-name">{organization}</span>
              </p>
            </div>

            {/* Campaign Progress Snapshot */}
            <div style={{ background: "var(--bg-subtle)", padding: "1.5rem", borderRadius: "var(--radius-lg)", marginBottom: "1.75rem" }}>
              <div className="progress-header" style={{ fontSize: "0.95rem" }}>
                <span className="progress-raised">
                  <strong>{formatCurrency(raised)}</strong> raised of {formatCurrency(target)}
                </span>
                <span className="progress-pct" style={{ fontSize: "1.1rem" }}>{progress}%</span>
              </div>

              <div className="progress-bar-bg" style={{ height: "10px", margin: "0.75rem 0" }}>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="details-metrics-row">
                <div className="metric-item">
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }} className="metric-val">
                    <Users size={16} /> {donors}
                  </span>
                  <span className="metric-lbl">Generous Donors</span>
                </div>
                <div className="metric-item">
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }} className="metric-val">
                    <Clock size={16} /> {daysLeft} Days
                  </span>
                  <span className="metric-lbl">Remaining Time</span>
                </div>
                <div className="metric-item">
                  <span className="metric-val">{category}</span>
                  <span className="metric-lbl">Primary Focus</span>
                </div>
              </div>
            </div>

            {/* Story & Description */}
            <h2 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              About this Campaign
            </h2>
            <p className="details-story">{description}</p>

            {impactSummary && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  backgroundColor: "var(--bg-accent-light)",
                  border: "1px solid var(--accent-border)",
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  marginTop: "1.25rem"
                }}
              >
                <CheckCircle2 size={20} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ fontSize: "0.9rem", color: "var(--accent-primary)", display: "block" }}>
                    Verified Impact Target
                  </strong>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                    {impactSummary}
                  </p>
                </div>
              </div>
            )}

            {/* Trust and Safety Guarantee */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
                fontSize: "0.85rem"
              }}
            >
              <ShieldCheck size={20} color="var(--accent-primary)" />
              <span>
                100% Verified Non-Profit Partner. KindBridge guarantees complete transparency on all fund disbursements.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Donation Fast Track Widget */}
        <aside className="donation-card" aria-label="Make a Donation">
          <h2 className="donation-card-title">Make a Contribution</h2>
          <p className="donation-card-desc">
            {isPaused
              ? "This campaign has been paused by administrators and is temporarily unavailable for donations."
              : isCompleted
              ? "This campaign has achieved its goal and is now successfully completed!"
              : "Choose an amount and click Donate Now to begin the secure donation flow."}
          </p>

          {isPaused ? (
            <div style={{
              background: "#fffbeb",
              border: "1px solid #fde68a",
              padding: "1.25rem",
              borderRadius: "10px",
              textAlign: "center",
              color: "#92400e",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1rem"
            }}>
              <PauseCircle size={28} />
              <strong style={{ fontSize: "1rem" }}>Campaign temporarily unavailable</strong>
              <p style={{ fontSize: "0.85rem", margin: 0 }}>
                Please explore our other active humanitarian causes while this initiative is under administrative review.
              </p>
              <Link to="/causes" className="btn btn-outline" style={{ marginTop: "0.5rem" }}>
                Browse Other Causes
              </Link>
            </div>
          ) : isCompleted ? (
            <div style={{
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              padding: "1.25rem",
              borderRadius: "10px",
              textAlign: "center",
              color: "#065f46",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1rem"
            }}>
              <CheckCircle2 size={28} />
              <strong style={{ fontSize: "1rem" }}>Campaign Completed</strong>
              <p style={{ fontSize: "0.85rem", margin: 0 }}>
                Thanks to generous donors like you, this initiative reached 100% of its needed funding.
              </p>
              <Link to="/causes" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
                Support Another Cause
              </Link>
            </div>
          ) : (
            <form onSubmit={handleDonateProceed}>
              {/* Amount Presets */}
              <div className="amount-buttons-grid">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`amount-chip ${!isCustom && selectedAmount === amt ? "active" : ""}`}
                    onClick={() => handleSelectPreset(amt)}
                  >
                    {formatCurrency(amt)}
                  </button>
                ))}
              </div>

              {/* Custom Amount Field */}
              <div className="custom-amount-wrapper">
                <label htmlFor="custom-amount" className="custom-input-label">
                  Or enter custom amount
                </label>
                <div className="custom-input-box">
                  <span className="currency-symbol">₹</span>
                  <input
                    id="custom-amount"
                    type="number"
                    min="100"
                    step="50"
                    placeholder="e.g. 2500"
                    className="custom-amount-input"
                    value={customAmountInput}
                    onFocus={handleCustomInputFocus}
                    onChange={handleCustomAmountChange}
                  />
                </div>

                {validationError && (
                  <div className="error-message">
                    <AlertCircle size={14} />
                    <span>{validationError}</span>
                  </div>
                )}
              </div>

              {/* Selected Amount Display */}
              <div className="donation-summary-box">
                <span className="summary-label">Selected Amount:</span>
                <span className="summary-value">
                  {selectedAmount > 0 ? formatCurrency(selectedAmount) : "₹0"}
                </span>
              </div>

              {/* Donate Now Button -> /donate/:id */}
              <button
                type="submit"
                className="btn-donate-submit"
                disabled={selectedAmount < 100}
              >
                <Heart size={18} />
                <span>
                  {selectedAmount > 0 ? `Donate Now (${formatCurrency(selectedAmount)})` : "Select an Amount"}
                </span>
                <ArrowRight size={16} />
              </button>

              <p className="donation-disclaimer">
                🔒 Prototype Demo Mode: Click will launch the complete donor details, QR code, and simulation flow.
              </p>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
