import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Zap, Heart, ArrowRight, Award } from "lucide-react";

export default function About() {
  const pillars = [
    {
      title: "Transparent",
      desc: "See where your support is going with real-time fund tracking, breakdown of costs, and verified NGO receipts.",
      icon: ShieldCheck
    },
    {
      title: "Simple",
      desc: "Donate to causes in just a few steps with preset and flexible amounts designed for everyone.",
      icon: Zap
    },
    {
      title: "Impactful",
      desc: "Every contribution can create meaningful change, directly helping families and communities thrive.",
      icon: Heart
    }
  ];

  const partners = [
    { name: "UNICEF (Demo Partner)", focus: "Children Education & Protection" },
    { name: "Global Health Foundation", focus: "Mobile Rural Clinics" },
    { name: "World Food Programme", focus: "Zero Hunger Initiatives" },
    { name: "Global Environment Fund", focus: "Reforestation & Ecosystem Restoration" }
  ];

  return (
    <div className="about-page">
      <div className="section-header" style={{ marginBottom: "2rem" }}>
        <div>
          <h1 className="section-title">About KindBridge</h1>
          <p className="section-subtitle">
            Small Acts. Big Impact. Connecting compassionate individuals with verified non-profits.
          </p>
        </div>
      </div>

      {/* Main Mission Card */}
      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-xl)",
          padding: "3rem",
          boxShadow: "var(--shadow-card)",
          marginBottom: "3.5rem"
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.35rem 0.85rem",
              borderRadius: "var(--radius-full)",
              background: "var(--bg-accent-light)",
              color: "var(--accent-primary)",
              fontWeight: "700",
              fontSize: "0.85rem",
              marginBottom: "1rem"
            }}
          >
            Our Mission
          </span>
          <h2 style={{ fontSize: "2.1rem", fontWeight: "800", color: "var(--text-primary)", lineHeight: "1.3", marginBottom: "1.25rem" }}>
            Making generosity accessible, transparent, and undeniably impactful.
          </h2>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
            KindBridge makes it simple for people to discover meaningful causes and support them through a transparent and easy-to-use donation experience. We bridge the gap between everyday donors and grassroots non-governmental organizations working on the frontlines of humanitarian and environmental relief.
          </p>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
            Whether providing nutritious meals for students, funding rural healthcare diagnostics, or planting trees for future generations, every single contribution creates a ripple of positive change.
          </p>
        </div>
      </div>

      {/* Pillars Section */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
          Our Core Principles
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          The foundation of everything we build at KindBridge.
        </p>

        <div className="about-points-grid" style={{ marginTop: "0" }}>
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="about-point-card">
                <div className="about-point-icon">
                  <Icon size={22} />
                </div>
                <h3 className="about-point-title">{pillar.title}</h3>
                <p className="about-point-desc">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sample NGO Partners */}
      <section
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-xl)",
          padding: "2.5rem",
          marginBottom: "3.5rem"
        }}
      >
        <div style={{ marginBottom: "1.75rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--text-primary)" }}>
            Sample Partner Organizations
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.25rem" }}>
            Representative humanitarian organizations featured in this prototype showcase.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
          {partners.map((partner) => (
            <div
              key={partner.name}
              style={{
                padding: "1.25rem",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", fontWeight: "700", marginBottom: "0.35rem" }}>
                <Award size={18} />
                <span style={{ fontSize: "0.95rem" }}>{partner.name}</span>
              </div>
              <div style={{ fontSize: "0.825rem", color: "var(--text-secondary)" }}>
                {partner.focus}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div
        style={{
          textAlign: "center",
          padding: "3rem 1.5rem",
          background: "linear-gradient(135deg, var(--bg-accent-light) 0%, #ffffff 100%)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--accent-border)"
        }}
      >
        <h2 style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
          Ready to Make a Difference?
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto 1.5rem" }}>
          Join our growing community of donors and bring hope to causes that need your kindness today.
        </p>
        <Link to="/donate/1" className="btn btn-primary btn-lg">
          <span>Make a Donation Now</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
