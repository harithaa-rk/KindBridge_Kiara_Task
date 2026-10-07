import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Required fields check
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage("All fields are required. Please fill in all information.");
      return;
    }

    // Valid email format check
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Password minimum length check
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    // Password and confirm password must match check
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    // On success: Account created successfully — demo mode
    login({ name: fullName.trim(), email: email.trim() });
    setSuccessMessage("Account created successfully — demo mode");

    setTimeout(() => {
      navigate("/");
    }, 1400);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Create an Account</h1>
          <p className="auth-subtitle">Join thousands of donors making a daily difference</p>
        </div>

        {successMessage && (
          <div className="auth-alert-success">
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
              color: "var(--danger-text)"
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name-input">
              Full Name
            </label>
            <input
              id="name-input"
              type="text"
              className="form-input"
              placeholder="e.g. Maya Sharma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email-input">
              Email Address
            </label>
            <input
              id="reg-email-input"
              type="email"
              className="form-input"
              placeholder="maya@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-password-input">
              Password
            </label>
            <input
              id="reg-password-input"
              type="password"
              className="form-input"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirm-password-input">
              Confirm Password
            </label>
            <input
              id="confirm-password-input"
              type="password"
              className="form-input"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
