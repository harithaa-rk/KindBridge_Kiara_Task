// Centralized LocalStorage Storage Utility for KindBridge Prototype
// Provides bidirectional synchronization between User donation flow and Admin dashboard.

import {
  initialCampaigns,
  initialDonations,
  initialDonors,
  initialOrganizations,
  initialStories,
  initialUpdates,
  initialCategories,
  initialActivityLogs
} from "../data/adminData";

export const KEYS = {
  CAMPAIGNS: "kindbridge_campaigns",
  DONATIONS: "kindbridge_donations",
  DONORS: "kindbridge_donors",
  ORGANIZATIONS: "kindbridge_organizations",
  STORIES: "kindbridge_stories",
  UPDATES: "kindbridge_updates",
  CATEGORIES: "kindbridge_categories",
  SETTINGS: "kindbridge_settings",
  ACTIVITY_LOGS: "kindbridge_activity_logs",
  ADMIN_LOGGED_IN: "kindbridge_admin_logged_in"
};

// Default platform settings
export const defaultSettings = {
  adminName: "Haritha R",
  adminEmail: "admin@kindbridge.demo",
  adminRole: "Super Administrator",
  platformName: "KindBridge Administration",
  currency: "INR (₹)",
  minDonationAmount: 100,
  demoMode: true,
  emailNotifications: true,
  dailySummary: true,
  autoApproveCampaigns: false
};

// Safe JSON helper
function getStoredItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setStoredItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
}

// ----------------- CAMPAIGNS -----------------
export function getCampaigns() {
  return getStoredItem(KEYS.CAMPAIGNS, initialCampaigns);
}

export function saveCampaigns(campaigns) {
  setStoredItem(KEYS.CAMPAIGNS, campaigns);
  return campaigns;
}

export function getCampaignById(id) {
  const campaigns = getCampaigns();
  return campaigns.find((c) => String(c.id) === String(id));
}

export function saveCampaign(campaignData) {
  const campaigns = getCampaigns();
  let updated;
  if (campaignData.id) {
    const index = campaigns.findIndex((c) => String(c.id) === String(campaignData.id));
    if (index !== -1) {
      updated = [...campaigns];
      updated[index] = { ...updated[index], ...campaignData };
    } else {
      updated = [campaignData, ...campaigns];
    }
  } else {
    const newId = Date.now();
    const newCampaign = {
      ...campaignData,
      id: newId,
      raised: Number(campaignData.raised) || 0,
      donors: campaignData.donors || "0",
      daysLeft: campaignData.daysLeft || 60,
      status: campaignData.status || "Active"
    };
    updated = [newCampaign, ...campaigns];
  }
  saveCampaigns(updated);
  return updated;
}

export function deleteCampaign(id) {
  const campaigns = getCampaigns();
  const updated = campaigns.filter((c) => String(c.id) !== String(id));
  saveCampaigns(updated);
  return updated;
}

// ----------------- DONATIONS -----------------
export function getDonations() {
  return getStoredItem(KEYS.DONATIONS, initialDonations);
}

export function saveDonations(donations) {
  setStoredItem(KEYS.DONATIONS, donations);
  return donations;
}

export function saveDonation(donationData) {
  const donations = getDonations();
  const dateFormatted =
    donationData.date ||
    new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

  const fullDonation = {
    ...donationData,
    id: donationData.id || donationData.referenceId || `KB-DEMO-${Date.now()}`,
    referenceId: donationData.referenceId || donationData.id || `KB-DEMO-${Date.now()}`,
    date: dateFormatted,
    demo: true
  };

  const updatedDonations = [fullDonation, ...donations];
  saveDonations(updatedDonations);

  // Synchronize campaign raised amount
  if (fullDonation.campaignId || fullDonation.campaignName) {
    const campaigns = getCampaigns();
    const campIndex = campaigns.findIndex(
      (c) =>
        String(c.id) === String(fullDonation.campaignId) ||
        c.title.toLowerCase() === (fullDonation.campaignName || "").toLowerCase()
    );
    if (campIndex !== -1) {
      const camp = campaigns[campIndex];
      const newRaised = (Number(camp.raised) || 0) + (Number(fullDonation.amount) || 0);
      const currentDonors = parseInt(camp.donors, 10) || 0;
      campaigns[campIndex] = {
        ...camp,
        raised: newRaised,
        donors: `${currentDonors + 1}+`
      };
      saveCampaigns(campaigns);
    }
  }

  // Synchronize or create donor profile
  if (fullDonation.donorEmail || fullDonation.donorName) {
    const donors = getDonors();
    const donorEmail = (fullDonation.donorEmail || "").trim().toLowerCase();
    const existingIndex = donors.findIndex(
      (d) => d.email && d.email.toLowerCase() === donorEmail
    );

    if (existingIndex !== -1) {
      const existing = donors[existingIndex];
      donors[existingIndex] = {
        ...existing,
        totalDonations: (Number(existing.totalDonations) || 0) + (Number(fullDonation.amount) || 0),
        donationCount: (Number(existing.donationCount) || 0) + 1,
        lastDonation: dateFormatted
      };
      saveDonors(donors);
    } else if (fullDonation.donorName) {
      const newDonor = {
        id: `DNR-${Date.now().toString().slice(-4)}`,
        name: fullDonation.donorName,
        email: fullDonation.donorEmail || "anonymous@kindbridge.demo",
        phone: fullDonation.donorPhone || "+91 98000 00000",
        totalDonations: Number(fullDonation.amount) || 0,
        donationCount: 1,
        firstDonation: dateFormatted,
        lastDonation: dateFormatted,
        status: "Active",
        isAnonymous: Boolean(fullDonation.isAnonymous)
      };
      saveDonors([newDonor, ...donors]);
    }
  }

  // Log activity
  logAdminActivity(
    `Demo donation received (₹${Number(fullDonation.amount).toLocaleString("en-IN")} via ${fullDonation.paymentMethod || "QR Code"})`,
    fullDonation.donorName || "Supporter"
  );

  return updatedDonations;
}

// ----------------- DONORS -----------------
export function getDonors() {
  return getStoredItem(KEYS.DONORS, initialDonors);
}

export function saveDonors(donors) {
  setStoredItem(KEYS.DONORS, donors);
  return donors;
}

export function getDonorById(id) {
  const donors = getDonors();
  return donors.find((d) => String(d.id) === String(id));
}

// ----------------- ORGANIZATIONS -----------------
export function getOrganizations() {
  return getStoredItem(KEYS.ORGANIZATIONS, initialOrganizations);
}

export function saveOrganizations(orgs) {
  setStoredItem(KEYS.ORGANIZATIONS, orgs);
  return orgs;
}

export function saveOrganization(orgData) {
  const orgs = getOrganizations();
  let updated;
  if (orgData.id) {
    const idx = orgs.findIndex((o) => String(o.id) === String(orgData.id));
    if (idx !== -1) {
      updated = [...orgs];
      updated[idx] = { ...updated[idx], ...orgData };
    } else {
      updated = [orgData, ...orgs];
    }
  } else {
    const newOrg = {
      ...orgData,
      id: `ORG-${Date.now().toString().slice(-3)}`,
      campaignCount: orgData.campaignCount || 0,
      totalRaised: orgData.totalRaised || 0,
      status: orgData.status || "Active"
    };
    updated = [newOrg, ...orgs];
  }
  saveOrganizations(updated);
  return updated;
}

// ----------------- STORIES -----------------
export function getStories() {
  return getStoredItem(KEYS.STORIES, initialStories);
}

export function saveStories(stories) {
  setStoredItem(KEYS.STORIES, stories);
  return stories;
}

export function saveStory(storyData) {
  const stories = getStories();
  let updated;
  if (storyData.id) {
    const idx = stories.findIndex((s) => String(s.id) === String(storyData.id));
    if (idx !== -1) {
      updated = [...stories];
      updated[idx] = { ...updated[idx], ...storyData };
    } else {
      updated = [storyData, ...stories];
    }
  } else {
    const newStory = {
      ...storyData,
      id: `STR-${Date.now().toString().slice(-4)}`,
      publishDate:
        storyData.publishDate ||
        new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }),
      status: storyData.status || "Published"
    };
    updated = [newStory, ...stories];
  }
  saveStories(updated);
  logAdminActivity(`Story '${storyData.title || "Impact Story"}' updated`, "Admin");
  return updated;
}

export function deleteStory(id) {
  const stories = getStories();
  const updated = stories.filter((s) => String(s.id) !== String(id));
  saveStories(updated);
  return updated;
}

// ----------------- UPDATES -----------------
export function getUpdates() {
  return getStoredItem(KEYS.UPDATES, initialUpdates);
}

export function saveUpdates(updates) {
  setStoredItem(KEYS.UPDATES, updates);
  return updates;
}

export function saveUpdateItem(updateData) {
  const updates = getUpdates();
  let updated;
  if (updateData.id) {
    const idx = updates.findIndex((u) => String(u.id) === String(updateData.id));
    if (idx !== -1) {
      updated = [...updates];
      updated[idx] = { ...updated[idx], ...updateData };
    } else {
      updated = [updateData, ...updates];
    }
  } else {
    const newItem = {
      ...updateData,
      id: `UPD-${Date.now().toString().slice(-4)}`,
      date:
        updateData.date ||
        new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }),
      status: updateData.status || "Published"
    };
    updated = [newItem, ...updates];
  }
  saveUpdates(updated);
  logAdminActivity(`Update '${updateData.title || "Platform Update"}' published`, "Admin");
  return updated;
}

export function deleteUpdateItem(id) {
  const updates = getUpdates();
  const updated = updates.filter((u) => String(u.id) !== String(id));
  saveUpdates(updated);
  return updated;
}

// ----------------- CATEGORIES -----------------
export function getCategories() {
  return getStoredItem(KEYS.CATEGORIES, initialCategories);
}

export function saveCategories(categories) {
  setStoredItem(KEYS.CATEGORIES, categories);
  return categories;
}

// ----------------- SETTINGS -----------------
export function getSettings() {
  return getStoredItem(KEYS.SETTINGS, defaultSettings);
}

export function saveSettings(settings) {
  setStoredItem(KEYS.SETTINGS, settings);
  return settings;
}

// ----------------- ACTIVITY LOGS -----------------
export function getActivityLogs() {
  return getStoredItem(KEYS.ACTIVITY_LOGS, initialActivityLogs);
}

export function logAdminActivity(activity, admin = "Admin") {
  const logs = getActivityLogs();
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const newLog = {
    id: `ACT-${Date.now().toString().slice(-4)}`,
    activity,
    admin,
    date: dateStr,
    time: timeStr
  };
  const updated = [newLog, ...logs.slice(0, 24)];
  setStoredItem(KEYS.ACTIVITY_LOGS, updated);
  return updated;
}

// ----------------- AUTH (FRONTEND ONLY) -----------------
export function isAdminLoggedIn() {
  return localStorage.getItem(KEYS.ADMIN_LOGGED_IN) === "true";
}

export function setAdminLoggedIn(status) {
  if (status) {
    localStorage.setItem(KEYS.ADMIN_LOGGED_IN, "true");
  } else {
    localStorage.removeItem(KEYS.ADMIN_LOGGED_IN);
  }
}

// Reset all demo data back to clean factory state
export function resetDemoData() {
  localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify(initialCampaigns));
  localStorage.setItem(KEYS.DONATIONS, JSON.stringify(initialDonations));
  localStorage.setItem(KEYS.DONORS, JSON.stringify(initialDonors));
  localStorage.setItem(KEYS.ORGANIZATIONS, JSON.stringify(initialOrganizations));
  localStorage.setItem(KEYS.STORIES, JSON.stringify(initialStories));
  localStorage.setItem(KEYS.UPDATES, JSON.stringify(initialUpdates));
  localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(initialCategories));
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(defaultSettings));
  localStorage.setItem(KEYS.ACTIVITY_LOGS, JSON.stringify(initialActivityLogs));
}
