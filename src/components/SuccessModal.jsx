import React, { useEffect } from "react";
import { Heart, X } from "lucide-react";
import { formatCurrency } from "../data/campaigns";

export default function SuccessModal({ amount, campaignTitle, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            color: "var(--text-tertiary)",
            padding: "4px"
          }}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="modal-icon-circle">
          <Heart size={36} fill="#059669" color="#059669" />
        </div>

        <h2 className="modal-title">Thank You! ❤️</h2>

        <p className="modal-message">
          Your donation of <strong>{formatCurrency(amount)}</strong> can help make a difference.
          {campaignTitle && (
            <span style={{ display: "block", marginTop: "0.5rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              Towards: <em>{campaignTitle}</em>
            </span>
          )}
        </p>

        <div className="modal-notice">
          This is a frontend demo and no real payment has been processed.
        </div>

        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
