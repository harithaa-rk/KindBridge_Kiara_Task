import React from "react";
import { Link } from "react-router-dom";
import { FolderOpen } from "lucide-react";

export default function EmptyState({
  icon: Icon = FolderOpen,
  title = "No records found",
  description = "No items match your current criteria or none have been created yet.",
  actionText,
  actionLink,
  onAction
}) {
  return (
    <div
      style={{
        padding: "3.5rem 1.5rem",
        textAlign: "center",
        background: "#ffffff",
        borderRadius: "14px",
        border: "1px dashed #cbd5e1",
        margin: "1rem 0"
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#f1f5f9",
          color: "#64748b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.25rem"
        }}
      >
        <Icon size={26} />
      </div>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.4rem" }}>
        {title}
      </h3>

      <p style={{ fontSize: "0.875rem", color: "#64748b", maxWidth: "420px", margin: "0 auto 1.5rem" }}>
        {description}
      </p>

      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary" style={{ display: "inline-flex" }}>
          {actionText}
        </Link>
      )}

      {actionText && !actionLink && onAction && (
        <button type="button" onClick={onAction} className="btn btn-primary" style={{ display: "inline-flex" }}>
          {actionText}
        </button>
      )}
    </div>
  );
}
