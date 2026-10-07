import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, User, ArrowRight, Heart, X } from "lucide-react";
import { getStories } from "../utils/storage";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeStoryModal, setActiveStoryModal] = useState(null);

  useEffect(() => {
    const all = getStories();
    setStories(all.filter((s) => s.status === "Published"));
  }, []);

  const categories = ["All", ...new Set(stories.map((s) => s.category).filter(Boolean))];

  const filtered = stories.filter(
    (s) => selectedCategory === "All" || s.category === selectedCategory
  );

  return (
    <div className="stories-page" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "#ecfdf5",
          color: "#059669",
          padding: "6px 14px",
          borderRadius: "30px",
          fontSize: "0.85rem",
          fontWeight: 600,
          marginBottom: "1rem"
        }}>
          <BookOpen size={16} /> Real Impact Stories
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.75rem" }}>
          Stories of Hope & Transformation
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#64748b", lineHeight: 1.6 }}>
          Discover how every contribution through KindBridge changes lives, empowers communities, and builds sustainable futures.
        </p>

        {/* Category Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginTop: "1.75rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      {filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2rem" }}>
          {filtered.map((story) => (
            <div
              key={story.id}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
            >
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img
                  src={story.image || "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"}
                  alt={story.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <span style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: "rgba(15, 23, 42, 0.75)",
                  color: "#ffffff",
                  backdropFilter: "blur(4px)",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: 600
                }}>
                  {story.category}
                </span>
              </div>

              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.8rem", color: "#64748b", marginBottom: "0.75rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Calendar size={13} /> {story.publishDate}
                  </span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <User size={13} /> {story.author || "Editorial"}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.75rem", lineHeight: 1.4 }}>
                  {story.title}
                </h3>

                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.6, flex: 1, marginBottom: "1.25rem" }}>
                  {story.shortDescription}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid #f1f5f9" }}>
                  <button
                    type="button"
                    onClick={() => setActiveStoryModal(story)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#059669",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: 0
                    }}
                  >
                    <span>Read Full Story</span>
                    <ArrowRight size={14} />
                  </button>

                  <Link
                    to="/causes"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.8rem",
                      color: "#64748b",
                      textDecoration: "none"
                    }}
                  >
                    <Heart size={13} color="#e11d48" /> Support Cause
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <BookOpen size={40} color="#94a3b8" />
          <h2 className="empty-state-title">No Stories Available</h2>
          <p className="empty-state-desc">There are no published impact stories in this category yet.</p>
        </div>
      )}

      {/* Story Detail Modal */}
      {activeStoryModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "20px",
            maxWidth: "650px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            position: "relative"
          }}>
            <button
              type="button"
              onClick={() => setActiveStoryModal(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(255, 255, 255, 0.9)",
                border: "1px solid #e2e8f0",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>

            <img
              src={activeStoryModal.image}
              alt={activeStoryModal.title}
              style={{ width: "100%", height: "260px", objectFit: "cover" }}
            />

            <div style={{ padding: "2rem" }}>
              <span style={{
                background: "#dcfce7",
                color: "#15803d",
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "20px"
              }}>
                {activeStoryModal.category}
              </span>

              <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: "1rem 0 0.5rem" }}>
                {activeStoryModal.title}
              </h2>

              <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>
                Published on {activeStoryModal.publishDate} by {activeStoryModal.author}
              </p>

              <div style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#334155" }}>
                <p style={{ fontWeight: 600, color: "#0f172a", marginBottom: "1rem" }}>
                  {activeStoryModal.shortDescription}
                </p>
                <p>{activeStoryModal.fullStory}</p>
              </div>

              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link to="/causes" className="btn btn-primary" onClick={() => setActiveStoryModal(null)}>
                  <Heart size={16} /> Donate to a Similar Cause
                </Link>
                <button type="button" className="btn btn-outline" onClick={() => setActiveStoryModal(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
