import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Clock, RefreshCw, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { formatCurrency } from "../data/campaigns";

export default function DemoQRCode({ amount, onSimulatePayment, isProcessing }) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)
  const isExpired = timeLeft <= 0;
  const [qrToken, setQrToken] = useState(1);

  // Generate QR code with harmless demo text
  useEffect(() => {
    const demoPayload = `KINDBRIDGE DEMO PAYMENT - NO REAL TRANSACTION - AMT: ${amount} - REF: ${qrToken}`;
    QRCode.toDataURL(demoPayload, {
      width: 270,
      margin: 1,
      color: {
        dark: "#0a192f",
        light: "#ffffff",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("Error generating demo QR:", err));
  }, [amount, qrToken]);

  // 5-minute countdown timer (5:00, 4:59, ... 0:00)
  useEffect(() => {
    if (isExpired || isProcessing) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired, isProcessing]);

  const handleResetQR = () => {
    setTimeLeft(300);
    setQrToken((prev) => prev + 1);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="checkout-upi-qr-card">
      {/* UPI / BHIM Header Banner */}
      <div className="checkout-bhim-upi-bar">
        <span className="bhim-tag">BHIM</span>
        <span className="upi-tag">UPI</span>
      </div>

      <h3 className="checkout-qr-heading">Pay through UPI QR Code</h3>

      <div className="checkout-qr-box">
        {isExpired ? (
          <div className="qr-expired-overlay">
            <Clock size={44} color="var(--danger-text)" />
            <h4 style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--danger-text)", marginTop: "0.5rem" }}>
              QR Code Expired
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0.35rem 0 1rem", textAlign: "center" }}>
              For security, this demo payment QR timed out after 5 minutes.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleResetQR}
            >
              <RefreshCw size={16} />
              <span>Generate New QR</span>
            </button>
          </div>
        ) : (
          <div className="qr-frame-styled">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Demo payment QR code"
                className="qr-img-render"
              />
            ) : (
              <div style={{ width: 250, height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Loader2 className="spinner-icon" size={32} />
              </div>
            )}
            <div className="qr-watermark-label">
              KINDBRIDGE DEMO PAYMENT
            </div>
          </div>
        )}
      </div>

      {!isExpired && (
        <div className="checkout-timer-bar">
          <Clock size={16} color="var(--danger-text)" />
          <span>
            Scan QR Code in <strong className="timer-digits-red">{formatTime(timeLeft)}</strong>
          </span>
        </div>
      )}

      {/* 9. Simulate Payment Button */}
      <div className="checkout-actions-bar">
        <button
          type="button"
          className="btn-simulate-payment"
          onClick={onSimulatePayment}
          disabled={isExpired || isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="spinner-icon" size={18} />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              <span>Simulate Payment ({formatCurrency(amount)})</span>
            </>
          )}
        </button>

        <p className="simulate-notice">
          Demo only — no real money will be transferred.
        </p>
      </div>

      <div className="qr-security-footer">
        <ShieldCheck size={16} color="var(--accent-primary)" />
        <span>KindBridge Secure Checkout • 256-Bit SSL Demo Sandbox</span>
      </div>
    </div>
  );
}
