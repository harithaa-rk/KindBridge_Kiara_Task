import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  IndianRupee,
  HeartHandshake,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ArrowRight
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Choose a Cause",
      desc: "Browse our curated list of verified initiatives across Education, Healthcare, Food, and Environment. Review the organization background, fundraising target, and tangible impact goals.",
      icon: Search
    },
    {
      num: "02",
      title: "Choose Your Amount",
      desc: "Select convenient preset donation options (₹500, ₹1,000, ₹2,000, ₹5,000, ₹10,000) or enter a custom amount (minimum ₹100). Every rupee counts directly towards the cause.",
      icon: IndianRupee
    },
    {
      num: "03",
      title: "Select Payment & QR Code",
      desc: "Complete your simulation using UPI, large Demo QR Code with 5-minute security countdown, Debit/Credit Card, or Net Banking.",
      icon: HeartHandshake
    },
    {
      num: "04",
      title: "Instant Confirmation & Receipt",
      desc: "Receive real-time progress indicators, unique demo reference ID, downloadable receipt, and instant logging in your local Donation History.",
      icon: TrendingUp
    }
  ];

  const faqs = [
    {
      q: "Are the non-profit partners on KindBridge verified?",
      a: "Yes. In real-world deployment, every partner undergoes strict compliance checks, registration verification (such as 12A and 80G tax certifications in India), and past track record audits before campaigns go live."
    },
    {
      q: "Can I donate any amount I choose?",
      a: "Absolutely. While we offer convenient preset buttons, you can enter any custom amount you are comfortable giving (minimum ₹100)."
    },
    {
      q: "Is payment processing real on this prototype?",
      a: "No. KindBridge is currently a frontend prototype. No real money or bank accounts are debited. All transactions simulate the final donation experience using demo UPI/QR simulators."
    },
    {
      q: "How does the QR Code simulation work?",
      a: "When you select QR Code, a demo QR code is generated with a 5-minute countdown. You can click 'Simulate Payment' to see how the system processes and confirms donations without touching real funds."
    },
    {
      q: "Where can I see my previous donations?",
      a: "All demo donations are safely preserved in your browser and visible on the 'My Donations' page (/donations)."
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="how-it-works-page">
      <div className="section-header" style={{ marginBottom: "2rem" }}>
        <div>
          <h1 className="section-title">How KindBridge Works</h1>
          <p className="section-subtitle">
            A frictionless, trustworthy pathway from compassionate intention to lasting real-world impact.
          </p>
        </div>
      </div>

      {/* Steps List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div className="step-icon-box">
                  <Icon size={24} />
                </div>
                <span style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--text-tertiary)", opacity: 0.5 }}>
                  {s.num}
                </span>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "0.6rem" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.925rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Trust Banner */}
      <div
        style={{
          background: "var(--bg-accent-light)",
          border: "1px solid var(--accent-border)",
          borderRadius: "var(--radius-xl)",
          padding: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "4rem"
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", fontWeight: "700", marginBottom: "0.5rem" }}>
            <ShieldCheck size={20} />
            <span>KindBridge Transparency Promise</span>
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            Every rupee is tracked with precision.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            We believe donors deserve clarity. Over 98% of campaign funds directly power on-the-ground community initiatives.
          </p>
        </div>

        <Link to="/donate/1" className="btn btn-primary btn-lg">
          <span>Try Demo Donation</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* FAQ Accordion */}
      <section style={{ maxWidth: "800px", margin: "0 auto 3rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--text-primary)" }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Got questions about how giving works? We've got answers.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden"
              }}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                style={{
                  width: "100%",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                  fontSize: "1rem",
                  fontWeight: "700",
                  color: "var(--text-primary)"
                }}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: openFaq === idx ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease"
                  }}
                />
              </button>
              {openFaq === idx && (
                <div style={{ padding: "0 1.5rem 1.25rem", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
