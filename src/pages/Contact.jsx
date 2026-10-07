import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill out all fields before sending your message.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setSuccessMessage("Thank you! Your inquiry has been submitted (Demo Mode). Our support desk will reach out within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="section-header" style={{ marginBottom: "2rem" }}>
        <div>
          <h1 className="section-title">Contact KindBridge</h1>
          <p className="section-subtitle">
            Have questions about donating, onboarding a non-profit, or exploring partnerships? We're here to help.
          </p>
        </div>
      </div>

      <div className="contact-layout">
        {/* Contact Info Panel */}
        <div className="contact-info-panel">
          <div className="contact-card-box">
            <div className="contact-card-icon">
              <Mail size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)" }}>Email Inquiries</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                support@kindbridge.org
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "4px" }}>
                Response time: Within 24 business hours
              </p>
            </div>
          </div>

          <div className="contact-card-box">
            <div className="contact-card-icon">
              <Phone size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)" }}>Donor Helpline</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                +91 (0) 800-KINDBRIDGE (546-3274)
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "4px" }}>
                Mon – Fri: 9:00 AM – 6:00 PM IST
              </p>
            </div>
          </div>

          <div className="contact-card-box">
            <div className="contact-card-icon">
              <MapPin size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)" }}>Office Address</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                KindBridge Non-Profit Foundation Hub<br />
                Innovation Park, Sector 44, Bengaluru, India
              </p>
            </div>
          </div>

          <div
            style={{
              padding: "1.5rem",
              background: "var(--bg-accent-light)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--accent-border)"
            }}
          >
            <h4 style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--accent-primary)", marginBottom: "0.4rem" }}>
              Are you an NGO?
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
              If you represent a registered charitable organization and want to launch a campaign, contact our partnership team.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-xl)",
            padding: "2.25rem",
            boxShadow: "var(--shadow-card)"
          }}
        >
          <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "0.4rem" }}>
            Send us a message
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Fill in the details below and we will get back to you promptly.
          </p>

          {successMessage && (
            <div className="auth-alert-success" style={{ marginBottom: "1.25rem" }}>
              <CheckCircle2 size={18} />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div
              className="auth-alert-success"
              style={{
                backgroundColor: "var(--danger-bg)",
                borderColor: "var(--danger-border)",
                color: "var(--danger-text)",
                marginBottom: "1.25rem"
              }}
            >
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Arun Kumar"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="arun@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                className="form-input"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                className="form-input"
                style={{ height: "auto", padding: "0.75rem 1rem", resize: "vertical" }}
                placeholder="Share your questions, ideas, or feedback..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.85rem", fontSize: "1rem" }}
            >
              <Send size={16} />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
