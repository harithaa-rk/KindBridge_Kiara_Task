import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, FileText, Briefcase, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  const resumeUrl = "https://drive.google.com/file/d/15M_Q0ZGUh8WlYQDa6XhouHS8E77AWyYW/view?usp=sharing";

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <img
              src="/kindbridge-logo.jpg"
              alt="KindBridge Logo"
              style={{ width: "42px", height: "42px", borderRadius: "10px", objectFit: "cover" }}
            />
            <span className="footer-brand-title">KindBridge</span>
          </div>
          <p className="footer-brand-tagline">
            Small Acts. Bigger Tomorrows.
          </p>
          <p style={{ fontSize: "0.825rem", color: "var(--text-tertiary)", marginTop: "0.75rem" }}>
            Empowering individuals to support meaningful causes through radical transparency and effortless giving.
          </p>
        </div>

        <div className="footer-links-group">
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link-item">Home</Link></li>
              <li><Link to="/causes" className="footer-link-item">Causes</Link></li>
              <li><Link to="/stories" className="footer-link-item">Impact Stories</Link></li>
              <li><Link to="/updates" className="footer-link-item">Platform Updates</Link></li>
              <li><Link to="/donations" className="footer-link-item">My Donations</Link></li>
              <li><Link to="/how-it-works" className="footer-link-item">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Causes</h4>
            <ul className="footer-links-list">
              <li><Link to="/causes?search=Education" className="footer-link-item">Education</Link></li>
              <li><Link to="/causes?search=Healthcare" className="footer-link-item">Healthcare</Link></li>
              <li><Link to="/causes?search=Food" className="footer-link-item">Food Distribution</Link></li>
              <li><Link to="/causes?search=Environment" className="footer-link-item">Environment</Link></li>
              <li><Link to="/causes?search=Clean+Water" className="footer-link-item">Clean Water</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Platform & Admin</h4>
            <ul className="footer-links-list">
              <li><Link to="/admin/login" className="footer-link-item" style={{ fontWeight: 600, color: "var(--primary-teal)" }}>Admin Portal</Link></li>
              <li><Link to="/about" className="footer-link-item">About Us</Link></li>
              <li><Link to="/contact" className="footer-link-item">Contact</Link></li>
              <li><Link to="/login" className="footer-link-item">Donor Login</Link></li>
              <li><span className="footer-link-item" style={{ opacity: 0.7 }}>Demo Mode Active</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Developer Profile & Hire Me Section */}
      <div style={{
        marginTop: "2.5rem",
        padding: "1.75rem 2rem",
        background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)",
        border: "1px solid #bbf7d0",
        borderRadius: "16px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <img
            src="/kindbridge-logo.jpg"
            alt="Haritha R - Developer"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #16a34a",
              boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)"
            }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#0f172a" }}>Haritha R</h3>
              <span style={{
                background: "#dcfce7",
                color: "#15803d",
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: "20px"
              }}>
                Lead Developer & Creator
              </span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#64748b" }}>
              Crafting high-performance web applications, accessible fintech UI, and social impact platforms.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
          <a
            href="tel:999484610"
            className="btn btn-outline"
            style={{
              padding: "0.5rem 0.9rem",
              fontSize: "0.85rem",
              background: "#ffffff",
              color: "#0f172a",
              borderColor: "#cbd5e1",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              borderRadius: "8px",
              textDecoration: "none"
            }}
          >
            <Phone size={15} style={{ color: "#16a34a" }} />
            <span>999484610</span>
          </a>

          <a
            href="mailto:harithaa.rk.27@gmail.com"
            className="btn btn-outline"
            style={{
              padding: "0.5rem 0.9rem",
              fontSize: "0.85rem",
              background: "#ffffff",
              color: "#0f172a",
              borderColor: "#cbd5e1",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              borderRadius: "8px",
              textDecoration: "none"
            }}
          >
            <Mail size={15} style={{ color: "#2563eb" }} />
            <span>harithaa.rk.27@gmail.com</span>
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{
              padding: "0.5rem 0.9rem",
              fontSize: "0.85rem",
              background: "#ffffff",
              color: "#0f172a",
              borderColor: "#cbd5e1",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              borderRadius: "8px",
              textDecoration: "none"
            }}
          >
            <FileText size={15} style={{ color: "#d97706" }} />
            <span>View Resume</span>
            <ExternalLink size={12} style={{ opacity: 0.6 }} />
          </a>

          <a
            href="mailto:harithaa.rk.27@gmail.com?subject=Job%20Opportunity%20/%20Hiring%20Haritha%20R&body=Hello%20Haritha,%0A%0AWe%20saw%20your%20work%20on%20KindBridge%20and%20would%20like%20to%20discuss%20an%20opportunity..."
            className="btn btn-primary"
            style={{
              padding: "0.55rem 1.25rem",
              fontSize: "0.875rem",
              background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
              color: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRadius: "8px",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(22, 163, 74, 0.25)",
              textDecoration: "none"
            }}
          >
            <Briefcase size={16} />
            <span>Hire Me</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom" style={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>© 2026 KindBridge. Designed & Developed by <strong>Haritha R</strong>.</span>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>•</span>
          <Link to="/admin" style={{ fontSize: "0.8rem", color: "#16a34a", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
            <ShieldCheck size={13} /> Admin Console
          </Link>
        </div>

        <div className="footer-social-row">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="Twitter / X"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="Facebook"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5V10.1H5.06v8.4h2.8z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
