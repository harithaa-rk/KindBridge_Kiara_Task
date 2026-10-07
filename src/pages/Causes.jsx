import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, RotateCcw } from "lucide-react";
import { getCampaigns, getCategories } from "../utils/storage";
import CampaignCard from "../components/CampaignCard";

export default function Causes({ searchQuery, setSearchQuery }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [campaignsList, setCampaignsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [localSearch, setLocalSearch] = useState(urlSearch || searchQuery || "");

  // Load from local storage dynamically
  useEffect(() => {
    const loadedCampaigns = getCampaigns();
    // Exclude Draft campaigns from public listing
    const publicCampaigns = loadedCampaigns.filter((c) => c.status !== "Draft");
    setCampaignsList(publicCampaigns);

    const storedCats = getCategories();
    const catNames = ["All", ...storedCats.filter((c) => c.status !== "Inactive").map((c) => c.name)];
    // Ensure uniqueness
    setCategoriesList([...new Set(catNames)]);
  }, []);

  const activeSearch = localSearch || urlSearch || "";

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setLocalSearch(val);
    if (setSearchQuery) setSearchQuery(val);
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setLocalSearch("");
    if (setSearchQuery) setSearchQuery("");
    setSearchParams({});
  };

  // Filter campaigns by category and search text
  const filteredCampaigns = campaignsList.filter((campaign) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (campaign.category && campaign.category.toLowerCase() === selectedCategory.toLowerCase());

    const query = activeSearch.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      (campaign.title && campaign.title.toLowerCase().includes(query)) ||
      (campaign.organization && campaign.organization.toLowerCase().includes(query)) ||
      (campaign.category && campaign.category.toLowerCase().includes(query)) ||
      (campaign.description && campaign.description.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="causes-page">
      {/* Page Header */}
      <div className="section-header" style={{ marginBottom: "2rem" }}>
        <div>
          <h1 className="section-title">Explore Causes</h1>
          <p className="section-subtitle">
            Discover verified campaigns and choose where your kindness can create the greatest impact.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
        {/* Search input in page */}
        <div style={{ maxWidth: "480px", position: "relative" }}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by title, organization or category..."
            value={localSearch}
            onChange={handleSearchChange}
          />
        </div>

        {/* Category Tabs */}
        <div className="filter-bar">
          <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.35rem", marginRight: "0.5rem" }}>
            <Filter size={15} /> Category:
          </span>
          {categoriesList.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: "600" }}>
          Showing <strong>{filteredCampaigns.length}</strong> {filteredCampaigns.length === 1 ? "cause" : "causes"}
          {selectedCategory !== "All" && <span> in <strong>{selectedCategory}</strong></span>}
          {localSearch.trim() && <span> matching "<strong>{localSearch}</strong>"</span>}
        </p>
        {(selectedCategory !== "All" || localSearch.trim()) && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="btn btn-outline"
            style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", gap: "0.35rem" }}
          >
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Campaigns Grid or Empty State */}
      {filteredCampaigns.length > 0 ? (
        <div className="campaigns-grid">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Search size={28} />
          </div>
          <h2 className="empty-state-title">No causes found.</h2>
          <p className="empty-state-desc">
            Try searching for another campaign or check different categories.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="btn btn-primary"
          >
            Clear Search & Filters
          </button>
        </div>
      )}
    </div>
  );
}
