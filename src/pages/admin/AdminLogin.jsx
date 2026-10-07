import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { setAdminLoggedIn } from "../../utils/storage";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@kindbridge.demo");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (email.trim() === "admin@kindbridge.demo" && password === "admin123") {
      setIsSubmitting(true);
      setTimeout(() => {
        setAdminLoggedIn(true);
        navigate("/admin");
      }, 500);
    } else {
      setError("Invalid demo credentials. Use admin@kindbridge.demo / admin123");
    }
  };

  const handleQuickFill = () => {
    setEmail("admin@kindbridge.demo");
    setPassword("admin123");
    setError("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "18px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
          padding: "2.5rem 2rem",
          position: "relative"
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "#ecfdf5",
              color: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              border: "1px solid #a7f3d0"
            }}
          >
            <Shield size={28} />
          </div>

          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.4rem" }}>
            Admin Console
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748b", margin: 0 }}>
            KindBridge Nonprofit Platform Administration
          </p>
        </div>

        {/* Demo Prototype Notice */}
        <div
          style={{
            backgroundColor: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: "10px",
            padding: "0.85rem 1rem",
            marginBottom: "1.5rem",
            fontSize: "0.8rem",
            color: "#92400e"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, marginBottom: "4px" }}>
            <Sparkles size={14} color="#d97706" />
            <span>Frontend-Only Prototype Login</span>
          </div>
          <div>
            This is a mock authentication interface for evaluation. Real credentials or servers are not used.
          </div>
          <div style={{ marginTop: "6px", fontFamily: "monospace", fontSize: "0.78rem", background: "rgba(255,255,255,0.7)", padding: "4px 8px", borderRadius: "4px" }}>
            Email: <strong>admin@kindbridge.demo</strong><br />
            Password: <strong>admin123</strong>
          </div>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              padding: "0.75rem",
              marginBottom: "1.25rem",
              color: "#b91c1c",
              fontSize: "0.825rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
              Administrator Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.65rem 1rem 0.65rem 2.25rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.4rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>
                Password
              </label>
              <button
                type="button"
                onClick={handleQuickFill}
                style={{ background: "none", border: "none", color: "#059669", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}
              >
                Auto-fill Demo
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.65rem 1rem 0.65rem 2.25rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "0.95rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "0.5rem"
            }}
          >
            {isSubmitting ? "Signing in..." : "Access Admin Console"}
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #f1f5f9" }}>
          <Link
            to="/"
            style={{ fontSize: "0.825rem", color: "#64748b", textDecoration: "none" }}
          >
            ← Return to KindBridge Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
