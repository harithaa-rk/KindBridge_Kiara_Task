import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Search, Eye, IndianRupee, Heart, Mail, Phone } from "lucide-react";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getDonors } from "../../utils/storage";

export default function AdminDonors() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDonors(getDonors());
  }, []);

  const filtered = donors.filter((d) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      (d.name && d.name.toLowerCase().includes(q)) ||
      (d.email && d.email.toLowerCase().includes(q)) ||
      (d.phone && d.phone.includes(q))
    );
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
          Donors
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0" }}>
          Registered champions and generous contributors supporting active campaigns.
        </p>
      </div>

      {/* Search Toolbar */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search donors by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.55rem 1rem 0.55rem 2.25rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "0.875rem",
              outline: "none"
            }}
          />
        </div>
      </div>

      {/* Donors Table */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        }}
      >
        {filtered.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b", fontSize: "0.8rem" }}>
                  <th style={{ padding: "0.85rem 1.25rem" }}>Donor Name</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Email</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Phone</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Total Donations</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Donations Count</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Last Donation</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Status</th>
                  <th style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((donor) => (
                  <tr
                    key={donor.id}
                    style={{ borderBottom: "1px solid #f1f5f9", transition: "background-color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fcfcfd")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "#ecfdf5",
                            color: "#059669",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            flexShrink: 0
                          }}
                        >
                          {donor.name ? donor.name.slice(0, 2).toUpperCase() : "AN"}
                        </div>
                        <div>
                          <Link
                            to={`/admin/donors/${donor.id}`}
                            style={{ fontWeight: 700, color: "#0f172a", textDecoration: "none" }}
                          >
                            {donor.name}
                          </Link>
                          {donor.isAnonymous && (
                            <span style={{ fontSize: "0.7rem", color: "#94a3b8", display: "block" }}>
                              (Anonymous on public site)
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: "1rem", color: "#334155" }}>
                      {donor.email || "—"}
                    </td>

                    <td style={{ padding: "1rem", color: "#64748b" }}>
                      {donor.phone || "—"}
                    </td>

                    <td style={{ padding: "1rem" }}>
                      <strong style={{ color: "#059669" }}>
                        ₹{Number(donor.totalDonations).toLocaleString("en-IN")}
                      </strong>
                    </td>

                    <td style={{ padding: "1rem", color: "#334155" }}>
                      {donor.donationCount} {donor.donationCount === 1 ? "gift" : "gifts"}
                    </td>

                    <td style={{ padding: "1rem", color: "#64748b" }}>
                      {donor.lastDonation || "Recent"}
                    </td>

                    <td style={{ padding: "1rem" }}>
                      <StatusBadge status={donor.status || "Active"} />
                    </td>

                    <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                      <Link
                        to={`/admin/donors/${donor.id}`}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          backgroundColor: "#ecfdf5",
                          color: "#059669",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px"
                        }}
                      >
                        <Eye size={13} /> Profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No donors found"
            description="No donors match the current search query."
          />
        )}
      </div>
    </div>
  );
}
