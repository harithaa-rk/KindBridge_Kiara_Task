import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleQuickDemoFill = () => {
    setEmail("sarah.jenkins@kindfund.org");
    setPassword("password123");
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Frontend validation
    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    // Success in demo mode
    login({ email, name: email.split("@")[0] });
    setSuccessMessage("Login successful — demo mode");

    // Clear after delay or allow user to see it
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to track your donations and support causes</p>
        </div>

        {successMessage && (
          <div className="auth-alert-success">
            <CheckCircle2 size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="auth-alert-success" style={{ backgroundColor: "var(--danger-bg)", borderColor: "var(--danger-border)", color: "var(--danger-text)" }}>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">
              Email Address
            </label>
            <input
              id="email-input"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password-input">
              Password
            </label>
            <input
              id="password-input"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-checkbox-row">
            <label className="checkbox-wrap">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault();
                alert("Demo mode: Password reset email simulated.");
              }}
              style={{ color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: "600" }}
            >
              Forgot password?
            </a>
          </div>

          <button type="submit" className="auth-submit-btn">
            Login
          </button>
        </form>

        <div className="demo-credentials-pill">
          <span>Need demo credentials?</span>
          <button
            type="button"
            onClick={handleQuickDemoFill}
            style={{ color: "var(--accent-primary)", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "3px" }}
          >
            <Sparkles size={12} /> Auto Fill Demo
          </button>
        </div>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/register" className="auth-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
