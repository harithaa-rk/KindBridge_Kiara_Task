import React, { useState, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  CheckCircle2,
  Download,
  History,
  Home,
  Heart,
  ShieldCheck,
  FileText,
  Printer,
  X
} from "lucide-react";
import { formatCurrency } from "../data/campaigns";
import { getDonations } from "../data/donationsStorage";

export default function PaymentResult() {
  const location = useLocation();

  // Retrieve donation from location state or fallback to newest in localStorage
  const latestDonation = useMemo(() => {
    return (
      location.state?.donation ||
      getDonations()[0] || {
        campaignName: "Support Education for Every Child",
        amount: 2000,
        paymentMethod: "QR Code",
        frequency: "One-time",
        date: new Date().toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        referenceId: "KB-DEMO-20261007-83921",
        donorName: "Kind Supporter",
        status: "Successful",
        demo: true,
      }
    );
  }, [location.state]);

  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="payment-result-page">
      <div className="success-result-card">
        {/* Large Success Icon */}
        <div className="success-icon-bubble">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>

        {/* 12. Headings & Messages */}
        <h1 className="success-heading">Thank You for Your Kindness!</h1>
        <p className="success-subheading">
          Your donation has been successfully recorded. You are helping create lasting, positive change.
        </p>

        {/* Prominent Demo Notice */}
        <div className="demo-payment-banner">
          <span className="demo-pill-tag">DEMO PAYMENT</span>
          <p className="demo-notice-text">
            No real payment was processed. This transaction was executed in prototype simulation mode.
          </p>
        </div>

        {/* Donation Details Card */}
        <div className="success-details-box">
          <div className="success-row">
            <span className="success-label">Campaign</span>
            <span className="success-value">{latestDonation.campaignName}</span>
          </div>

          <div className="success-row">
            <span className="success-label">Amount</span>
            <span className="success-value highlight-amount">
              {formatCurrency(latestDonation.amount)}
            </span>
          </div>

          <div className="success-row">
            <span className="success-label">Payment Method</span>
            <span className="success-value">{latestDonation.paymentMethod}</span>
          </div>

          <div className="success-row">
            <span className="success-label">Donation Type</span>
            <span className="success-value">{latestDonation.frequency}</span>
          </div>

          <div className="success-row">
            <span className="success-label">Date</span>
            <span className="success-value">{latestDonation.date}</span>
          </div>

          <div className="success-row" style={{ borderBottom: "none" }}>
            <span className="success-label">Reference ID</span>
            <span className="success-value code-font">{latestDonation.referenceId}</span>
          </div>
        </div>

        {/* 13. Success Actions */}
        <div className="success-action-buttons">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowReceiptModal(true)}
          >
            <Download size={16} />
            <span>Download Demo Receipt</span>
          </button>

          <Link to="/donations" className="btn btn-outline">
            <History size={16} />
            <span>View Donation History</span>
          </Link>

          <Link to="/causes" className="btn btn-soft">
            <Heart size={16} />
            <span>Donate Again</span>
          </Link>

          <Link to="/" className="btn btn-outline">
            <Home size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="security-note">
          <ShieldCheck size={16} color="var(--accent-primary)" />
          <span>KindBridge Transparent Giving Network • Record Logged to Local History</span>
        </div>
      </div>

      {/* Demo Receipt Modal */}
      {showReceiptModal && (
        <div className="modal-backdrop" onClick={() => setShowReceiptModal(false)}>
          <div
            className="modal-card receipt-modal-box"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 580, textAlign: "left" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FileText size={22} color="var(--accent-primary)" />
                <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--text-primary)" }}>
                  Official Demo Donation Receipt
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                style={{ color: "var(--text-tertiary)", padding: "4px" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Receipt Watermark Stamp */}
            <div className="receipt-demo-watermark">
              DEMO PAYMENT — NO REAL TRANSACTION
            </div>

            <div className="receipt-paper">
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
                <div>
                  <h4 style={{ fontWeight: "800", color: "var(--accent-primary)" }}>KindBridge Foundation</h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Sector 44, Bengaluru, India</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>support@kindbridge.org</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block" }}>Receipt No:</span>
                  <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>{latestDonation.referenceId}</strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginTop: "2px" }}>Date: {latestDonation.date}</span>
                </div>
              </div>

              <div style={{ marginBottom: "1rem", fontSize: "0.875rem" }}>
                <div style={{ color: "var(--text-secondary)", marginBottom: "2px" }}>Donor Name:</div>
                <strong style={{ color: "var(--text-primary)" }}>
                  {latestDonation.donorName || "Haritha R"}
                </strong>
              </div>

              <table className="receipt-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Type</th>
                    <th style={{ textAlign: "right" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{latestDonation.campaignName}</td>
                    <td>{latestDonation.frequency}</td>
                    <td style={{ textAlign: "right", fontWeight: "700" }}>
                      {formatCurrency(latestDonation.amount)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" style={{ fontWeight: "800" }}>Total Contributed</td>
                    <td style={{ textAlign: "right", fontWeight: "800", color: "var(--accent-primary)" }}>
                      {formatCurrency(latestDonation.amount)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "1.25rem", borderTop: "1px dashed var(--border-light)", paddingTop: "0.75rem" }}>
                * This document is a simulated receipt generated for prototype demonstration purposes. Section 80G tax benefits are illustrative only.
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handlePrintReceipt}
              >
                <Printer size={16} />
                <span>Print / Save as PDF</span>
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowReceiptModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
