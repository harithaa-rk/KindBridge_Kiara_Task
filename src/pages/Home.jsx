import React from "react";
import { Link } from "react-router-dom";
import { Heart, Compass, ShieldCheck, Zap, Sparkles, ArrowRight } from "lucide-react";
import { campaigns } from "../data/campaigns";
import CampaignCard from "../components/CampaignCard";
import ImpactStats from "../components/ImpactStats";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  // Display 4 featured campaign cards
  const featuredCampaigns = campaigns.slice(0, 4);

  const handleHeroImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/hero-image.jpg";
  };

  return (
    <div className="home-page">
      {/* 5. Hero Section */}
      <section className="hero-section" aria-label="Hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Together We Can</span>
          </div>

          <h1 className="hero-title">
            Small Acts.<br />
            Bigger Tomorrows.
          </h1>

          <p className="hero-description">
            Support meaningful causes and help create a better tomorrow for those in need. Every small act of kindness bridges hope and builds sustainable transformation.
          </p>

          <div className="hero-actions">
            {/* Donate Now -> /donate/1 */}
            <Link to="/donate/1" className="btn btn-primary btn-lg">
              <Heart size={18} />
              <span>Donate Now</span>
            </Link>
            <Link to="/causes" className="btn btn-outline btn-lg">
              <Compass size={18} />
              <span>Explore Causes</span>
            </Link>
          </div>
        </div>

        <div className="hero-image-wrap">
          <div className="hero-image-card">
            <img
              src="https://i.pinimg.com/originals/76/f4/f9/76f4f9c5114f656076a90f95d5a3e9c8.jpg"
              alt="KindBridge Community Support"
              className="hero-image"
              onError={handleHeroImageError}
              loading="eager"
            />
          </div>

          {/* Floating decorative badge */}
          <div className="hero-stat-floating">
            <div className="floating-icon">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="floating-value">100% Verified</div>
              <div className="floating-label">Transparent Community Causes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Impact Statistics */}
      <ImpactStats />

      {/* 7. Featured Causes */}
      <section className="section-container" aria-label="Featured Causes">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Causes</h2>
            <p className="section-subtitle">Choose a cause and make a difference.</p>
          </div>
          <Link
            to="/causes"
            className="btn btn-outline"
            style={{ fontSize: "0.875rem" }}
          >
            <span>View All Causes</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="campaigns-grid">
          {featuredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>

      {/* 13. How It Works Section */}
      <HowItWorks />

      {/* 14. Why KindBridge? (About Section) */}
      <section className="about-banner" aria-label="Why KindBridge">
        <div style={{ maxWidth: "720px" }}>
          <h2 className="section-title">Why KindBridge?</h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", marginTop: "0.75rem", lineHeight: "1.6" }}>
            KindBridge makes it simple for people to discover meaningful causes and support them through a transparent and easy-to-use donation experience.
          </p>
        </div>

        <div className="about-points-grid">
          <div className="about-point-card">
            <div className="about-point-icon">
              <ShieldCheck size={22} />
            </div>
            <h3 className="about-point-title">Transparent</h3>
            <p className="about-point-desc">
              See where your support is going with real-time fund tracking and verified impact reports.
            </p>
          </div>

          <div className="about-point-card">
            <div className="about-point-icon">
              <Zap size={22} />
            </div>
            <h3 className="about-point-title">Simple</h3>
            <p className="about-point-desc">
              Donate to causes in just a few steps with preset and flexible amounts designed for everyone.
            </p>
          </div>

          <div className="about-point-card">
            <div className="about-point-icon">
              <Heart size={22} />
            </div>
            <h3 className="about-point-title">Impactful</h3>
            <p className="about-point-desc">
              Every contribution can create meaningful change, directly helping families and communities thrive.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
