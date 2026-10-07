import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Calendar, IndianRupee, Heart, Shield, CheckCircle2 } from "lucide-react";
import StatusBadge from "../../components/admin/StatusBadge";
import { getDonorById, getDonations } from "../../utils/storage";

export default function AdminDonorDetails() {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const foundDonor = getDonorById(id);
    setDonor(foundDonor || null);

    if (foundDonor) {
      const allDonations = getDonations();
      const donorEmail = (foundDonor.email || "").toLowerCase();
      const donorName = (foundDonor.name || "").toLowerCase();
      const matched = allDonations.filter(
        (d) =>
          (d.donorEmail && d.donorEmail.toLowerCase() === donorEmail) ||
          (d.donorName && d.donorName.toLowerCase() === donorName)
      );
      setDonations(matched);
    }
  }, [id]);

  if (!donor) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <p style={{ color: "#64748b" }}>Donor record not found.</p>
        <Link to="/admin/donors" className="btn btn-outline">Back to Donors</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Back button */}
      <div>
        <Link
          to="/admin/donors"
          className="btn btn-outline"
          style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem", gap: "0.35rem" }}
        >
          <ArrowLeft size={15} />
          <span>Back to Donors</span>
        </Link>
      </div>

      {/* Profile Overview Card */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          padding: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.25rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#ecfdf5",
              color: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              fontWeight: 800,
              border: "2px solid #a7f3d0"
            }}
          >
            {donor.name.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                {donor.name}
              </h1>
              <StatusBadge status={donor.status || "Active"} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "6px", fontSize: "0.85rem", color: "#64748b" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Mail size={13} /> {donor.email}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Phone size={13} /> {donor.phone}
              </span>
              {donor.isAnonymous && (
                <span style={{ color: "#d97706", fontWeight: 600 }}>Anonymous Donor</span>
              )}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "0.8rem", color: "#64748b", display: "block" }}>Lifetime Giving</span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#059669" }}>
            ₹{Number(donor.totalDonations).toLocaleString("en-IN")}
          </div>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
            Across {donor.donationCount} donations
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>First Contribution</span>
          <strong style={{ display: "block", fontSize: "1.1rem", color: "#0f172a", marginTop: "4px" }}>
            {donor.firstDonation || "15 Jul 2026"}
          </strong>
        </div>

        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Most Recent Gift</span>
          <strong style={{ display: "block", fontSize: "1.1rem", color: "#0f172a", marginTop: "4px" }}>
            {donor.lastDonation || "07 Oct 2026"}
          </strong>
        </div>

        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Average Donation</span>
          <strong style={{ display: "block", fontSize: "1.1rem", color: "#059669", marginTop: "4px" }}>
            ₹{Math.round(donor.totalDonations / (donor.donationCount || 1)).toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      {/* Contribution History Table */}
      <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem" }}>
          Giving History & Ledger
        </h2>

        {donations.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b", fontSize: "0.78rem" }}>
                  <th style={{ padding: "0.6rem 0.85rem" }}>Campaign</th>
                  <th style={{ padding: "0.6rem 0.85rem" }}>Amount</th>
                  <th style={{ padding: "0.6rem 0.85rem" }}>Date</th>
                  <th style={{ padding: "0.6rem 0.85rem" }}>Payment Method</th>
                  <th style={{ padding: "0.6rem 0.85rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                    <td style={{ padding: "0.75rem 0.85rem", fontWeight: 600, color: "#0f172a" }}>
                      {d.campaignName}
                    </td>
                    <td style={{ padding: "0.75rem 0.85rem" }}>
                      <strong style={{ color: "#059669" }}>₹{Number(d.amount).toLocaleString("en-IN")}</strong>
                    </td>
                    <td style={{ padding: "0.75rem 0.85rem", color: "#64748b" }}>
                      {d.date}
                    </td>
                    <td style={{ padding: "0.75rem 0.85rem", color: "#64748b" }}>
                      {d.paymentMethod}
                    </td>
                    <td style={{ padding: "0.75rem 0.85rem" }}>
                      <StatusBadge status={d.status || "Successful"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
            Individual demo donation transactions will appear here as they are logged.
          </p>
        )}
      </div>
    </div>
  );
}
