import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

// User-Facing Pages
import Home from "./pages/Home";
import Causes from "./pages/Causes";
import CampaignDetails from "./pages/CampaignDetails";
import DonateFlow from "./pages/DonateFlow";
import PaymentResult from "./pages/PaymentResult";
import DonationHistory from "./pages/DonationHistory";
import Stories from "./pages/Stories";
import Updates from "./pages/Updates";
import HowItWorksPage from "./pages/HowItWorksPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Components & Pages
import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCampaigns from "./pages/admin/AdminCampaigns";
import AdminCampaignCreate from "./pages/admin/AdminCampaignCreate";
import AdminCampaignEdit from "./pages/admin/AdminCampaignEdit";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminDonationDetails from "./pages/admin/AdminDonationDetails";
import AdminDonors from "./pages/admin/AdminDonors";
import AdminDonorDetails from "./pages/admin/AdminDonorDetails";
import AdminOrganizations from "./pages/admin/AdminOrganizations";
import AdminStories from "./pages/admin/AdminStories";
import AdminUpdates from "./pages/admin/AdminUpdates";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminReports from "./pages/admin/AdminReports";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// User-Facing Layout
function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Sidebar (Desktop fixed & Mobile Drawer) */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
      />

      {/* Main Wrapper */}
      <div className="main-wrapper">
        <Header
          onToggleMobileMenu={toggleMobileMenu}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/causes"
              element={<Causes searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
            />
            <Route path="/campaign/:id" element={<CampaignDetails />} />
            
            {/* Complete Frontend-Only Donation Journey */}
            <Route path="/donate/:campaignId" element={<DonateFlow />} />
            <Route path="/donate" element={<DonateFlow />} />
            <Route path="/payment-result" element={<PaymentResult />} />
            <Route path="/donations" element={<DonationHistory />} />

            {/* Impact Stories & News Dispatches */}
            <Route path="/stories" element={<Stories />} />
            <Route path="/updates" element={<Updates />} />

            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Fallback 404 */}
            <Route
              path="*"
              element={
                <div className="empty-state" style={{ margin: "4rem auto" }}>
                  <h2 className="empty-state-title">Page Not Found</h2>
                  <p className="empty-state-desc">The page you are looking for does not exist.</p>
                  <a href="/" className="btn btn-primary">Return to Home</a>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin Demo Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="campaigns" element={<AdminCampaigns />} />
              <Route path="campaigns/create" element={<AdminCampaignCreate />} />
              <Route path="campaigns/:id" element={<AdminCampaignEdit />} />
              <Route path="campaigns/:id/edit" element={<AdminCampaignEdit />} />
              <Route path="donations" element={<AdminDonations />} />
              <Route path="donations/:id" element={<AdminDonationDetails />} />
              <Route path="donors" element={<AdminDonors />} />
              <Route path="donors/:id" element={<AdminDonorDetails />} />
              <Route path="organizations" element={<AdminOrganizations />} />
              <Route path="stories" element={<AdminStories />} />
              <Route path="updates" element={<AdminUpdates />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* All Public User Routes */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
