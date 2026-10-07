import React from "react";
import { Users, Layers, Building2, ShieldCheck } from "lucide-react";

export default function ImpactStats() {
  const stats = [
    {
      value: "12,500+",
      label: "People Helped",
      icon: Users,
    },
    {
      value: "250+",
      label: "Active Campaigns",
      icon: Layers,
    },
    {
      value: "50+",
      label: "Partner Organizations",
      icon: Building2,
    },
    {
      value: "98%",
      label: "Transparency",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="stats-section" aria-label="KindFund Impact Statistics">
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-icon-wrapper">
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
