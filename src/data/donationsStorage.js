// Storage utility for KindBridge prototype donations (localStorage only)
// Re-exports from centralized storage to ensure 100% synchronization with Admin Dashboard

export {
  getDonations,
  saveDonation,
  saveDonations
} from "../utils/storage";

export function generateReferenceId() {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `KB-DEMO-${dateStr}-${randomSuffix}`;
}
