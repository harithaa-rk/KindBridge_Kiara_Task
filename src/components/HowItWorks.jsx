import React from "react";
import { Search, IndianRupee, HeartHandshake, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose a Cause",
      description: "Find a campaign that matters to you across education, healthcare, food, and the environment.",
      icon: Search,
    },
    {
      step: "02",
      title: "Choose Your Amount",
      description: "Select how much you want to contribute, whether a fixed amount or your own custom gift.",
      icon: IndianRupee,
    },
    {
      step: "03",
      title: "Make a Difference",
      description: "Your support directly enables vetted community partners to deliver relief and sustainable aid.",
      icon: HeartHandshake,
    },
    {
      step: "04",
      title: "See the Impact",
      description: "Follow the transparent progress of campaigns and witness the positive change you sparked.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="how-it-works-section" aria-label="How KindFund Works">
      <div className="section-header" style={{ marginBottom: "0.5rem" }}>
        <div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Giving is simple, transparent, and creates real change in just four quick steps.
          </p>
        </div>
      </div>

      <div className="steps-grid">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.step} className="step-card">
              <div className="step-header">
                <div className="step-icon-box">
                  <Icon size={22} />
                </div>
                <span className="step-number">{item.step}</span>
              </div>
              <h3 className="step-title">{item.title}</h3>
              <p className="step-desc">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
