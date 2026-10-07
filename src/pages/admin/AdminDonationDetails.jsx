import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  User,
  CreditCard,
  Building2,
  Calendar,
  Lock,
  ExternalLink
} from "lucide-react";
import StatusBadge from "../../components/admin/StatusBadge";
import { getDonations } from "../../utils/storage";

export default function AdminDonationDetails() {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    const list = getDonations();
    const found = list.find((d) => String(d.id) === String(id) || String(d.referenceId) === String(id));
    setDonation(found || null);
  }, [id]);

  if (!donation) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <p style={{ color: "#64748b" }}>Donation transaction not found.</p>
        <Link to="/admin/donations" className="btn btn-outline">Back to Donations</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Back Button */}
      <div>
        <Link
          to="/admin/donations"
          className="btn btn-outline"
          style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem", gap: "0.35rem" }}
        >
          <ArrowLeft size={15} />
          <span>Back to Donations</span>
        </Link>
      </div>

      {/* Top Header Card */}
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
          gap: "1rem"
        }}
      >
        <div>
          <span style={{ fontSize: "0.8rem", color: "#64748b", display: "block" }}>
            Transaction Record
          </span>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: "2px 0 6px", fontFamily: "monospace" }}>
            {donation.id || donation.referenceId}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <StatusBadge status={donation.status || "Successful"} />
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>•</span>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{donation.date}</span>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "0.8rem", color: "#64748b", display: "block" }}>Donation Amount</span>
          <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#059669" }}>
            ₹{Number(donation.amount).toLocaleString("en-IN")}
          </div>
          <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600 }}>
            {donation.frequency || "One-time"} Gift
          </span>
        </div>
      </div>

      {/* 2-Column Info Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
        {/* Donor Details */}
        <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <User size={18} color="#059669" /> Donor Details
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f8fafc", paddingBottom: "6px" }}>
              <span style={{ color: "#64748b" }}>Full Name:</span>
              <strong style={{ color: "#0f172a" }}>{donation.donorName || "Anonymous Supporter"}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f8fafc", paddingBottom: "6px" }}>
              <span style={{ color: "#64748b" }}>Email:</span>
              <span style={{ color: "#0f172a" }}>{donation.donorEmail || "N/A"}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f8fafc", paddingBottom: "6px" }}>
              <span style={{ color: "#64748b" }}>Phone:</span>
              <span style={{ color: "#0f172a" }}>{donation.donorPhone || "N/A"}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Anonymous Donation:</span>
              <span style={{ color: donation.isAnonymous ? "#059669" : "#64748b", fontWeight: 600 }}>
                {donation.isAnonymous ? "Yes (Name hidden on public ledger)" : "No"}
              </span>
            </div>
          </div>
        </div>

        {/* Campaign & Organization */}
        <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Building2 size={18} color="#0284c7" /> Designated Initiative
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f8fafc", paddingBottom: "6px" }}>
              <span style={{ color: "#64748b" }}>Campaign Name:</span>
              <strong style={{ color: "#0f172a", textAlign: "right", maxWidth: "200px" }}>{donation.campaignName || "General Humanitarian Fund"}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f8fafc", paddingBottom: "6px" }}>
              <span style={{ color: "#64748b" }}>Organization:</span>
              <span style={{ color: "#0f172a" }}>{donation.organization || "KindBridge Community"}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f8fafc", paddingBottom: "6px" }}>
              <span style={{ color: "#64748b" }}>Payment Method:</span>
              <span style={{ color: "#0f172a", fontWeight: 600 }}>{donation.paymentMethod || "QR Code"}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Tax Receipt Status:</span>
              <span style={{ color: "#059669", fontWeight: 600 }}>Eligible (Demo 80G Issued)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Processing Timeline */}
      <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.75rem" }}>
        <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "1.5rem" }}>
          Transaction Timeline
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative", paddingLeft: "1.5rem" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "6px", top: "8px", bottom: "8px", width: "2px", backgroundColor: "#a7f3d0" }} />

          {/* Timeline steps */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "-1.5rem", width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#059669", border: "2px solid #ffffff" }} />
            <strong style={{ fontSize: "0.9rem", color: "#0f172a", display: "block" }}>1. Donation Created</strong>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Donor selected amount and confirmed contribution intent.</span>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "-1.5rem", width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#059669", border: "2px solid #ffffff" }} />
            <strong style={{ fontSize: "0.9rem", color: "#0f172a", display: "block" }}>2. Payment Initiated</strong>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Selected {donation.paymentMethod || "QR Code"} gateway flow.</span>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "-1.5rem", width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#059669", border: "2px solid #ffffff" }} />
            <strong style={{ fontSize: "0.9rem", color: "#0f172a", display: "block" }}>3. Payment Processing</strong>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Simulation webhook verification completed.</span>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "-1.5rem", width: "14px", height: "14px", borderRadius: "50%", backgroundColor: "#059669", border: "2px solid #ffffff" }} />
            <strong style={{ fontSize: "0.9rem", color: "#059669", display: "block" }}>4. Payment Successful</strong>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Funds allocated to campaign; receipt generated and saved.</span>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.825rem",
          color: "#64748b"
        }}
      >
        <Lock size={18} color="#059669" />
        <span>
          <strong>Privacy & Safety Compliance:</strong> Antigravity prototype data isolation in effect. Sensitive financial attributes (card PINs, bank passwords, full numbers) are never recorded or accessible.
        </span>
      </div>
    </div>
  );
}
