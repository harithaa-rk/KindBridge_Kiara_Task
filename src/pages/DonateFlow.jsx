import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Heart,
  Check,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Smartphone,
  Building,
  Zap,
  User,
  Mail,
  Phone,
  AlertCircle,
  Loader2,
  Lock,
  Edit3
} from "lucide-react";
import { formatCurrency } from "../data/campaigns";
import { getCampaignById, getCampaigns, saveDonation } from "../utils/storage";
import { generateReferenceId } from "../data/donationsStorage";
import DemoQRCode from "../components/DemoQRCode";

export default function DonateFlow() {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  // Find selected campaign or fallback to first
  const allCampaigns = getCampaigns();
  const currentCampaign =
    (campaignId ? getCampaignById(campaignId) : null) || allCampaigns[0] || {};

  // Step state: 1 = Amount & Frequency, 2 = Donor Details, 3 = Payment Method
  const [step, setStep] = useState(1);

  // Amount State
  const presetAmounts = [500, 1000, 2000, 5000, 10000];
  const [selectedAmount, setSelectedAmount] = useState(2000);
  const [isOtherAmount, setIsOtherAmount] = useState(false);
  const [customAmountInput, setCustomAmountInput] = useState("");
  const [amountError, setAmountError] = useState("");

  // Frequency State
  const [frequency, setFrequency] = useState("once"); // "once" | "monthly"

  // Donor Details State
  const [donorDetails, setDonorDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    isAnonymous: false,
  });
  const [detailsErrors, setDetailsErrors] = useState({});

  // Payment Method State: "qr" | "upi" | "card" | "netbanking" | "demo"
  const [paymentMethod, setPaymentMethod] = useState("qr");

  // UPI sub-options
  const [selectedUpiApp, setSelectedUpiApp] = useState("gpay");
  const [upiIdInput, setUpiIdInput] = useState("donor@okaxis");

  // Card sub-options
  const [cardData, setCardData] = useState({
    cardholder: "",
    cardNumber: "4532 •••• •••• 8891",
    expiry: "08/29",
    cvv: "•••",
  });

  // Net banking sub-options
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  // Processing state for demo simulations
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState("Processing Payment...");

  // Handle Amount Selection
  const handleSelectPreset = (amount) => {
    setIsOtherAmount(false);
    setSelectedAmount(amount);
    setAmountError("");
  };

  const handleSelectOther = () => {
    setIsOtherAmount(true);
    if (customAmountInput && Number(customAmountInput) >= 100) {
      setSelectedAmount(Number(customAmountInput));
      setAmountError("");
    } else {
      setSelectedAmount(0);
      setAmountError("Minimum donation amount is ₹100.");
    }
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmountInput(val);
    const num = Number(val);
    if (!val || isNaN(num) || num < 100) {
      setSelectedAmount(0);
      setAmountError("Please enter an amount of at least ₹100.");
    } else {
      setSelectedAmount(num);
      setAmountError("");
    }
  };

  // Step 1 Validation -> Proceed to Step 2
  const handleProceedToDetails = (e) => {
    e.preventDefault();
    if (!selectedAmount || selectedAmount < 100) {
      setAmountError("Please select or enter an amount of at least ₹100.");
      return;
    }
    setAmountError("");
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 2 Validation -> Proceed to Step 3
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    const errors = {};

    if (!donorDetails.fullName.trim()) {
      errors.fullName = "Full name is required.";
    }
    if (!donorDetails.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(donorDetails.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!donorDetails.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (donorDetails.phone.trim().length < 8) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (Object.keys(errors).length > 0) {
      setDetailsErrors(errors);
      return;
    }

    setDetailsErrors({});
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Execute demo payment simulation
  const handleExecutePaymentSimulation = (methodName, customMsg = "Processing Payment...") => {
    setIsProcessing(true);
    setProcessingMessage(customMsg);

    setTimeout(() => {
      setIsProcessing(false);

      const refId = generateReferenceId();
      const newDonation = {
        id: refId,
        referenceId: refId,
        campaignId: currentCampaign.id,
        campaignName: currentCampaign.title || "Support Education for Every Child",
        organization: currentCampaign.organization || "KindBridge Partner",
        amount: Number(selectedAmount),
        paymentMethod: methodName || "QR Code",
        frequency: frequency === "monthly" ? "Monthly" : "One-time",
        donorName: donorDetails.isAnonymous ? "Anonymous Donor" : (donorDetails.fullName || "Supporter"),
        donorEmail: donorDetails.email || "supporter@kindbridge.demo",
        donorPhone: donorDetails.phone || "+91 99948 46100",
        isAnonymous: Boolean(donorDetails.isAnonymous),
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Successful",
        demo: true,
      };

      // Save to localStorage
      saveDonation(newDonation);

      // Navigate to payment success page
      navigate("/payment-result", { state: { donation: newDonation } });
    }, 2000);
  };

  return (
    <div className="donate-flow-page">
      {/* 15. Donation Flow Stepper */}
      <div className="flow-stepper-wrap" aria-label="Donation progress">
        <div className="flow-stepper">
          <div className={`step-item ${step >= 1 ? (step > 1 ? "completed" : "active") : ""}`}>
            <span className="step-circle">{step > 1 ? <Check size={14} /> : "1"}</span>
            <span className="step-label">Donation</span>
          </div>
          <div className="step-divider" />
          <div className={`step-item ${step >= 2 ? (step > 2 ? "completed" : "active") : ""}`}>
            <span className="step-circle">{step > 2 ? <Check size={14} /> : "2"}</span>
            <span className="step-label">Details</span>
          </div>
          <div className="step-divider" />
          <div className={`step-item ${step === 3 ? "active" : ""}`}>
            <span className="step-circle">3</span>
            <span className="step-label">Payment</span>
          </div>
          <div className="step-divider" />
          <div className="step-item">
            <span className="step-circle">4</span>
            <span className="step-label">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="flow-grid-layout">
        {/* Main Flow Content */}
        <div className="flow-main-column">
          {/* ==========================================================
              STEP 1: SELECT DONATION AMOUNT & FREQUENCY
              ========================================================== */}
          {step === 1 && (
            <div className="flow-card">
              <div className="flow-card-header">
                <span className="flow-badge">
                  <Heart size={14} /> Step 1 of 3
                </span>
                <h1 className="flow-title">Make a Difference Today</h1>
                <p className="flow-campaign-subtitle">
                  Supporting <strong>{currentCampaign.title}</strong>
                </p>
              </div>

              {/* Campaign Mini Preview Card */}
              <div className="campaign-mini-banner">
                <img
                  src={currentCampaign.image}
                  alt={currentCampaign.title}
                  className="campaign-mini-img"
                />
                <div>
                  <span className="campaign-mini-category">{currentCampaign.category}</span>
                  <h4 className="campaign-mini-title">{currentCampaign.title}</h4>
                  <p className="campaign-mini-org">Organized by {currentCampaign.organization}</p>
                </div>
              </div>

              {/* 3. Donation Frequency */}
              <div className="frequency-selector-box">
                <label className="section-field-label">How often would you like to give?</label>
                <div className="frequency-toggle-grid">
                  <button
                    type="button"
                    className={`frequency-btn ${frequency === "once" ? "active" : ""}`}
                    onClick={() => setFrequency("once")}
                  >
                    <span className="frequency-radio-dot" />
                    <span>Give Once</span>
                  </button>
                  <button
                    type="button"
                    className={`frequency-btn ${frequency === "monthly" ? "active" : ""}`}
                    onClick={() => setFrequency("monthly")}
                  >
                    <span className="frequency-radio-dot" />
                    <span>Give Monthly</span>
                    <span className="monthly-badge">Demo</span>
                  </button>
                </div>
              </div>

              {/* 2. Choose Donation Amount */}
              <div className="amount-selection-section">
                <label className="section-field-label">Choose your donation amount</label>
                <div className="amount-presets-grid">
                  {presetAmounts.map((amt) => {
                    const isSelected = !isOtherAmount && selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        className={`amount-selection-tile ${isSelected ? "selected" : ""}`}
                        onClick={() => handleSelectPreset(amt)}
                      >
                        <span className="tile-currency">{formatCurrency(amt)}</span>
                        {isSelected && (
                          <span className="tile-check-icon">
                            <Check size={14} />
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {/* Other Amount Tile */}
                  <button
                    type="button"
                    className={`amount-selection-tile ${isOtherAmount ? "selected" : ""}`}
                    onClick={handleSelectOther}
                  >
                    <span className="tile-currency">Other Amount</span>
                    {isOtherAmount && (
                      <span className="tile-check-icon">
                        <Check size={14} />
                      </span>
                    )}
                  </button>
                </div>

                {/* Custom Amount Input Box */}
                {isOtherAmount && (
                  <div className="custom-input-container">
                    <label htmlFor="custom-amt-input" className="custom-amount-sublabel">
                      Enter customized amount (Min ₹100):
                    </label>
                    <div className="custom-input-with-symbol">
                      <span className="symbol-prefix">₹</span>
                      <input
                        id="custom-amt-input"
                        type="number"
                        min="100"
                        step="50"
                        placeholder="e.g. 2500"
                        className="custom-amount-input-box"
                        value={customAmountInput}
                        onChange={handleCustomAmountChange}
                        autoFocus
                      />
                    </div>
                  </div>
                )}

                {amountError && (
                  <div className="error-alert">
                    <AlertCircle size={15} />
                    <span>{amountError}</span>
                  </div>
                )}
              </div>

              {/* Impact Callout */}
              <div className="donation-impact-hint">
                <ShieldCheck size={18} color="var(--accent-primary)" />
                <span>
                  Your donation of <strong>{selectedAmount > 0 ? formatCurrency(selectedAmount) : "₹0"}</strong> will directly fund essential supplies and meals.
                </span>
              </div>

              {/* Step 1 Actions */}
              <div className="flow-actions-footer">
                <Link to={`/campaign/${currentCampaign.id}`} className="btn btn-outline">
                  <ArrowLeft size={16} />
                  <span>Back to Campaign</span>
                </Link>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleProceedToDetails}
                >
                  <span>Continue to Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ==========================================================
              STEP 2: DONOR DETAILS
              ========================================================== */}
          {step === 2 && (
            <div className="flow-card">
              <div className="flow-card-header">
                <span className="flow-badge">
                  <User size={14} /> Step 2 of 3
                </span>
                <h1 className="flow-title">Your Details</h1>
                <p className="flow-campaign-subtitle">
                  We need your contact information to send tax exemption demo receipts.
                </p>
              </div>

              <form onSubmit={handleProceedToPayment}>
                <div className="form-group">
                  <label className="form-label" htmlFor="donor-fullname">
                    Full Name <span style={{ color: "var(--danger-text)" }}>*</span>
                  </label>
                  <div className="input-with-icon">
                    <User size={18} className="field-icon" />
                    <input
                      id="donor-fullname"
                      type="text"
                      className={`form-input-with-icon ${detailsErrors.fullName ? "input-error" : ""}`}
                      placeholder="e.g. Haritha R"
                      value={donorDetails.fullName}
                      onChange={(e) =>
                        setDonorDetails({ ...donorDetails, fullName: e.target.value })
                      }
                    />
                  </div>
                  {detailsErrors.fullName && (
                    <span className="field-error-text">{detailsErrors.fullName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="donor-email">
                    Email Address <span style={{ color: "var(--danger-text)" }}>*</span>
                  </label>
                  <div className="input-with-icon">
                    <Mail size={18} className="field-icon" />
                    <input
                      id="donor-email"
                      type="email"
                      className={`form-input-with-icon ${detailsErrors.email ? "input-error" : ""}`}
                      placeholder="e.g. haritha@example.com"
                      value={donorDetails.email}
                      onChange={(e) =>
                        setDonorDetails({ ...donorDetails, email: e.target.value })
                      }
                    />
                  </div>
                  {detailsErrors.email && (
                    <span className="field-error-text">{detailsErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="donor-phone">
                    Phone Number <span style={{ color: "var(--danger-text)" }}>*</span>
                  </label>
                  <div className="input-with-icon">
                    <Phone size={18} className="field-icon" />
                    <input
                      id="donor-phone"
                      type="tel"
                      className={`form-input-with-icon ${detailsErrors.phone ? "input-error" : ""}`}
                      placeholder="e.g. +91 98765 43210"
                      value={donorDetails.phone}
                      onChange={(e) =>
                        setDonorDetails({ ...donorDetails, phone: e.target.value })
                      }
                    />
                  </div>
                  {detailsErrors.phone && (
                    <span className="field-error-text">{detailsErrors.phone}</span>
                  )}
                </div>

                <div className="anonymous-checkbox-box">
                  <label className="checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={donorDetails.isAnonymous}
                      onChange={(e) =>
                        setDonorDetails({ ...donorDetails, isAnonymous: e.target.checked })
                      }
                    />
                    <div>
                      <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
                        Donate anonymously
                      </strong>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                        Your name will not be shown on public supporter listings.
                      </p>
                    </div>
                  </label>
                </div>

                {/* 16. Back & Continue Buttons */}
                <div className="flow-actions-footer">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Amount</span>
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg">
                    <span>Continue to Payment</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ==========================================================
              STEP 3: PAYMENT METHOD (Section 6 - 11)
              ========================================================== */}
          {step === 3 && (
            <div className="flow-card">
              <div className="flow-card-header">
                <span className="flow-badge">
                  <Lock size={14} /> Step 3 of 3
                </span>
                <h1 className="flow-title">Choose a Payment Method</h1>
                <p className="flow-campaign-subtitle">
                  Select your preferred simulated payment method below.
                </p>
              </div>

              {/* Payment Methods Nav */}
              <div className="payment-method-selector-tabs">
                <button
                  type="button"
                  className={`payment-tab-btn ${paymentMethod === "qr" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("qr")}
                >
                  <QrCode size={18} />
                  <span>QR Code</span>
                  <span className="recommended-badge">Recommended</span>
                </button>

                <button
                  type="button"
                  className={`payment-tab-btn ${paymentMethod === "upi" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <Smartphone size={18} />
                  <span>UPI</span>
                </button>

                <button
                  type="button"
                  className={`payment-tab-btn ${paymentMethod === "card" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard size={18} />
                  <span>Debit / Card</span>
                </button>

                <button
                  type="button"
                  className={`payment-tab-btn ${paymentMethod === "netbanking" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("netbanking")}
                >
                  <Building size={18} />
                  <span>Net Banking</span>
                </button>

                <button
                  type="button"
                  className={`payment-tab-btn ${paymentMethod === "demo" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("demo")}
                >
                  <Zap size={18} />
                  <span>Demo Quick</span>
                </button>
              </div>

              {/* Method 1: QR CODE OPTION (Section 8 & 9) */}
              {paymentMethod === "qr" && (
                <DemoQRCode
                  amount={selectedAmount}
                  onSimulatePayment={() =>
                    handleExecutePaymentSimulation("QR Code", "Processing QR Payment...")
                  }
                  isProcessing={isProcessing}
                />
              )}

              {/* Method 2: UPI OPTION (Section 7) */}
              {paymentMethod === "upi" && (
                <div className="payment-subpanel">
                  <h3 className="subpanel-title">Pay using UPI</h3>
                  <p className="subpanel-desc">
                    Choose your UPI provider or enter a Virtual Payment Address (VPA).
                  </p>

                  <div className="upi-apps-row">
                    {[
                      { id: "gpay", label: "Google Pay" },
                      { id: "phonepe", label: "PhonePe" },
                      { id: "paytm", label: "Paytm" },
                      { id: "other", label: "Other UPI" }
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        className={`upi-app-chip ${selectedUpiApp === app.id ? "active" : ""}`}
                        onClick={() => setSelectedUpiApp(app.id)}
                      >
                        <Smartphone size={16} />
                        <span>{app.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="form-group" style={{ marginTop: "1.25rem" }}>
                    <label className="form-label" htmlFor="upi-vpa-input">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      id="upi-vpa-input"
                      type="text"
                      className="form-input"
                      placeholder="username@okhdfcbank"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                    />
                    <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "4px", display: "block" }}>
                      Demo VPA format. No real authorization request will be sent.
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn-simulate-payment"
                    style={{ marginTop: "1.5rem" }}
                    onClick={() =>
                      handleExecutePaymentSimulation("UPI (" + selectedUpiApp.toUpperCase() + ")")
                    }
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="spinner-icon" size={18} />
                        <span>{processingMessage}</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Pay {formatCurrency(selectedAmount)}</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Method 3: CARD PAYMENT (Section 10) */}
              {paymentMethod === "card" && (
                <div className="payment-subpanel">
                  <h3 className="subpanel-title">Pay via Debit or Credit Card</h3>
                  <p className="subpanel-desc">
                    Frontend simulation only. Do not enter real credit card numbers.
                  </p>

                  <div className="form-group">
                    <label className="form-label">Cardholder Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Haritha R"
                      value={cardData.cardholder || donorDetails.fullName || "Demo Cardholder"}
                      onChange={(e) =>
                        setCardData({ ...cardData, cardholder: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="4532 •••• •••• 8891"
                      value={cardData.cardNumber}
                      onChange={(e) =>
                        setCardData({ ...cardData, cardNumber: e.target.value })
                      }
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) =>
                          setCardData({ ...cardData, expiry: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="•••"
                        maxLength="4"
                        value={cardData.cvv}
                        onChange={(e) =>
                          setCardData({ ...cardData, cvv: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-simulate-payment"
                    style={{ marginTop: "1rem" }}
                    onClick={() =>
                      handleExecutePaymentSimulation("Credit / Debit Card", "Processing Secure Payment...")
                    }
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="spinner-icon" size={18} />
                        <span>Processing Secure Payment...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        <span>Pay {formatCurrency(selectedAmount)}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Method 4: NET BANKING (Section 11) */}
              {paymentMethod === "netbanking" && (
                <div className="payment-subpanel">
                  <h3 className="subpanel-title">Select Your Bank</h3>
                  <p className="subpanel-desc">
                    Choose from popular Indian banks to simulate net banking redirection.
                  </p>

                  <div className="banks-grid">
                    {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Other Banks"].map(
                      (bank) => (
                        <button
                          key={bank}
                          type="button"
                          className={`bank-option-tile ${selectedBank === bank ? "active" : ""}`}
                          onClick={() => setSelectedBank(bank)}
                        >
                          <Building size={16} />
                          <span>{bank}</span>
                        </button>
                      )
                    )}
                  </div>

                  <div className="demo-bank-environment-box">
                    <strong>Demo Banking Environment</strong>
                    <p>
                      You will not be redirected to any external banking gateway. Clicking below simulates immediate authorization.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn-simulate-payment"
                    style={{ marginTop: "1.25rem" }}
                    onClick={() =>
                      handleExecutePaymentSimulation(`Net Banking (${selectedBank})`, "Simulating Bank Authorization...")
                    }
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="spinner-icon" size={18} />
                        <span>Processing Bank Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>Simulate Bank Payment ({formatCurrency(selectedAmount)})</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Method 5: DEMO QUICK PAYMENT */}
              {paymentMethod === "demo" && (
                <div className="payment-subpanel" style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--bg-accent-light)",
                      color: "var(--accent-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem"
                    }}
                  >
                    <Zap size={28} />
                  </div>
                  <h3 className="subpanel-title">Instant 1-Click Demo Simulation</h3>
                  <p className="subpanel-desc" style={{ maxWidth: 440, margin: "0 auto 1.5rem" }}>
                    Bypass individual method screens and trigger the complete success confirmation immediately.
                  </p>

                  <button
                    type="button"
                    className="btn-simulate-payment"
                    onClick={() => handleExecutePaymentSimulation("Instant Demo")}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="spinner-icon" size={18} />
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <Check size={18} />
                        <span>Simulate Complete Payment ({formatCurrency(selectedAmount)})</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Step 3 Back Navigation */}
              <div className="flow-actions-footer" style={{ marginTop: "2rem" }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStep(2)}
                  disabled={isProcessing}
                >
                  <ArrowLeft size={16} />
                  <span>Change Donor Details</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ==========================================================
            RIGHT COLUMN: 5. DONATION SUMMARY & REVIEW
            ========================================================== */}
        <aside className="flow-summary-column">
          <div className="donation-summary-card">
            {/* Brand Logo & Campaign in Checkout */}
            <div className="checkout-sidebar-brand-box">
              <img
                src="/kindbridge-logo.jpg"
                alt="KindBridge Logo"
                className="checkout-sidebar-logo"
              />
              <div>
                <strong className="checkout-sidebar-brand-name">KindBridge</strong>
                <span className="checkout-sidebar-org-name">{currentCampaign.organization}</span>
              </div>
            </div>

            <h3 className="summary-card-title">Total Payable</h3>

            <div className="summary-rows-wrap">
              <div className="summary-data-row">
                <span className="summary-data-label">Campaign</span>
                <span className="summary-data-val">Support {currentCampaign.title}</span>
              </div>

              <div className="summary-data-row">
                <span className="summary-data-label">Donation Amount</span>
                <span className="summary-data-val">{formatCurrency(selectedAmount)}</span>
              </div>

              <div className="summary-data-row">
                <span className="summary-data-label">Frequency</span>
                <span className="summary-data-val">
                  {frequency === "monthly" ? "Monthly Demo" : "One-time"}
                </span>
              </div>

              {step >= 2 && donorDetails.fullName && (
                <div className="summary-data-row">
                  <span className="summary-data-label">Donor</span>
                  <span className="summary-data-val">
                    {donorDetails.isAnonymous ? "Anonymous Donor" : donorDetails.fullName}
                  </span>
                </div>
              )}

              {step >= 2 && donorDetails.email && (
                <div className="summary-data-row">
                  <span className="summary-data-label">Email</span>
                  <span className="summary-data-val" style={{ wordBreak: "break-all" }}>
                    {donorDetails.email}
                  </span>
                </div>
              )}

              <div className="summary-total-row">
                <span className="total-title">Total Payable</span>
                <span className="total-amount">{formatCurrency(selectedAmount)}</span>
              </div>
            </div>

            {/* Edit Donation Shortcut */}
            {step > 1 && (
              <button
                type="button"
                className="edit-donation-btn"
                onClick={() => setStep(1)}
              >
                <Edit3 size={14} />
                <span>Edit Amount</span>
              </button>
            )}

            <div className="checkout-secure-badge-box">
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-primary)", fontWeight: "700", fontSize: "0.85rem" }}>
                <ShieldCheck size={16} />
                <span>Secure Checkout ✓</span>
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", marginTop: "4px", fontFamily: "monospace" }}>
                Transaction Id: 12074331-{new Date().toISOString().slice(0, 10).replace(/-/g, "")}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
