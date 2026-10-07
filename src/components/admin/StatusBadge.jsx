import React from "react";

export default function StatusBadge({ status = "Active" }) {
  const normalized = String(status).toLowerCase().trim();

  let bg = "#f1f5f9";
  let color = "#475569";
  let border = "#cbd5e1";

  if (["successful", "active", "published"].includes(normalized)) {
    bg = "#ecfdf5";
    color = "#047857";
    border = "#a7f3d0";
  } else if (["pending", "draft", "paused"].includes(normalized)) {
    bg = "#fffbeb";
    color = "#b45309";
    border = "#fde68a";
  } else if (["failed", "inactive", "deactivated", "cancelled"].includes(normalized)) {
    bg = "#fef2f2";
    color = "#b91c1c";
    border = "#fecaca";
  } else if (["completed"].includes(normalized)) {
    bg = "#eff6ff";
    color = "#1d4ed8";
    border = "#bfdbfe";
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "3px 9px",
        borderRadius: "20px",
        fontSize: "0.75rem",
        fontWeight: 600,
        backgroundColor: bg,
        color: color,
        border: `1px solid ${border}`,
        whiteSpace: "nowrap"
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: color
        }}
      />
      {status}
    </span>
  );
}
