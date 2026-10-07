// Initial sample data for KindBridge Admin and Storage initialization
// Note: All data is stored in the browser's localStorage for demonstration purposes.

export const initialCampaigns = [
  {
    id: 1,
    title: "Education for Every Child",
    organization: "UNICEF (Demo Partner)",
    category: "Education",
    target: 500000,
    raised: 342000,
    donors: "842+",
    daysLeft: 45,
    status: "Active",
    startDate: "2026-09-01",
    endDate: "2026-11-15",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    description: "Provide quality education, school supplies, digital learning tools, and safe classroom environments for underprivileged children across rural and underserved communities.",
    impactSummary: "₹1,000 provides a student with a full term of textbooks, stationery, and learning materials."
  },
  {
    id: 2,
    title: "Better Healthcare for All",
    organization: "Global Health Foundation",
    category: "Healthcare",
    target: 400000,
    raised: 214200,
    donors: "489+",
    daysLeft: 32,
    status: "Active",
    startDate: "2026-09-10",
    endDate: "2026-11-20",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    description: "Deploy mobile health clinics, essential medicine supplies, diagnostic equipment, and maternal care to remote communities where hospitals are hours away.",
    impactSummary: "₹2,000 covers primary health checkups and essential medicine for 4 families."
  },
  {
    id: 3,
    title: "End Hunger, Build Hope",
    organization: "World Food Programme",
    category: "Food & Nutrition",
    target: 600000,
    raised: 320000,
    donors: "1,540+",
    daysLeft: 28,
    status: "Active",
    startDate: "2026-08-15",
    endDate: "2026-11-05",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
    description: "Distribute nutritious food kits, hot meals, and long-term agricultural seeds to drought-affected families and child care centers facing critical food insecurity.",
    impactSummary: "₹500 funds 20 nutritious balanced meals for children in community centers."
  },
  {
    id: 4,
    title: "Greener Tomorrow",
    organization: "Global Environment Fund",
    category: "Environment",
    target: 250000,
    raised: 95000,
    donors: "620+",
    daysLeft: 50,
    status: "Active",
    startDate: "2026-09-20",
    endDate: "2026-11-30",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    description: "Restore damaged ecosystems, plant native trees, organize community recycling initiatives, and establish urban green corridors to combat regional climate change.",
    impactSummary: "₹1,000 supports planting and protecting 10 native trees until maturity."
  },
  {
    id: 5,
    title: "Clean Drinking Water Initiative",
    organization: "Pure Life Water Mission",
    category: "Clean Water",
    target: 350000,
    raised: 281500,
    donors: "621+",
    daysLeft: 19,
    status: "Active",
    startDate: "2026-09-05",
    endDate: "2026-10-31",
    image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=1200&q=80",
    description: "Install solar-powered water filtration systems in dry villages, eradicating waterborne diseases and saving women and girls hours of daily travel.",
    impactSummary: "₹2,000 provides clean filtered drinking water access for an entire household for a year."
  },
  {
    id: 6,
    title: "Nutritious Mid-day Meals",
    organization: "Care & Nourish Trust",
    category: "Food & Nutrition",
    target: 300000,
    raised: 185000,
    donors: "740+",
    daysLeft: 23,
    status: "Active",
    startDate: "2026-09-12",
    endDate: "2026-11-10",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    description: "Ensure that students stay in school by providing wholesome, warm mid-day meals packed with proteins and essential micronutrients every school day.",
    impactSummary: "₹1,000 sponsors full hot lunches for two children for an entire school month."
  }
];

export const initialDonations = [
  {
    id: "KB-DEMO-20261007-83921",
    referenceId: "KB-DEMO-20261007-83921",
    donorName: "Haritha R",
    donorEmail: "harithaa.rk.27@gmail.com",
    donorPhone: "+91 999484610",
    campaignName: "Support Education for Every Child",
    organization: "UNICEF (Demo Partner)",
    amount: 2000,
    paymentMethod: "QR Code",
    frequency: "One-time",
    date: "07 Oct 2026",
    status: "Successful",
    demo: true
  },
  {
    id: "KB-DEMO-20261007-74219",
    referenceId: "KB-DEMO-20261007-74219",
    donorName: "Anonymous Donor",
    donorEmail: "anonymous@kindbridge.demo",
    donorPhone: "+91 98765 00000",
    campaignName: "Clean Drinking Water Initiative",
    organization: "Pure Life Water Mission",
    amount: 5000,
    paymentMethod: "UPI",
    frequency: "One-time",
    date: "07 Oct 2026",
    status: "Successful",
    demo: true
  },
  {
    id: "KB-DEMO-20261006-61842",
    referenceId: "KB-DEMO-20261006-61842",
    donorName: "Aarav Sharma",
    donorEmail: "aarav.sharma@example.com",
    donorPhone: "+91 98451 22334",
    campaignName: "Better Healthcare for All",
    organization: "Global Health Foundation",
    amount: 1000,
    paymentMethod: "Credit / Debit Card",
    frequency: "One-time",
    date: "06 Oct 2026",
    status: "Successful",
    demo: true
  },
  {
    id: "KB-DEMO-20261006-51203",
    referenceId: "KB-DEMO-20261006-51203",
    donorName: "Priya Nair",
    donorEmail: "priya.nair@example.com",
    donorPhone: "+91 97123 44556",
    campaignName: "End Hunger, Build Hope",
    organization: "World Food Programme",
    amount: 2500,
    paymentMethod: "Net Banking",
    frequency: "Monthly",
    date: "06 Oct 2026",
    status: "Successful",
    demo: true
  },
  {
    id: "KB-DEMO-20261005-40911",
    referenceId: "KB-DEMO-20261005-40911",
    donorName: "Vikram Malhotra",
    donorEmail: "vikram.m@example.com",
    donorPhone: "+91 99201 88776",
    campaignName: "Greener Tomorrow",
    organization: "Global Environment Fund",
    amount: 1500,
    paymentMethod: "QR Code",
    frequency: "One-time",
    date: "05 Oct 2026",
    status: "Successful",
    demo: true
  }
];

export const initialDonors = [
  {
    id: "DNR-001",
    name: "Haritha R",
    email: "harithaa.rk.27@gmail.com",
    phone: "+91 999484610",
    totalDonations: 12500,
    donationCount: 5,
    firstDonation: "15 Jul 2026",
    lastDonation: "07 Oct 2026",
    status: "Active",
    isAnonymous: false
  },
  {
    id: "DNR-002",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98451 22334",
    totalDonations: 6000,
    donationCount: 3,
    firstDonation: "02 Aug 2026",
    lastDonation: "06 Oct 2026",
    status: "Active",
    isAnonymous: false
  },
  {
    id: "DNR-003",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+91 97123 44556",
    totalDonations: 7500,
    donationCount: 3,
    firstDonation: "12 Aug 2026",
    lastDonation: "06 Oct 2026",
    status: "Active",
    isAnonymous: false
  },
  {
    id: "DNR-004",
    name: "Anonymous Donor",
    email: "anonymous@kindbridge.demo",
    phone: "+91 98765 00000",
    totalDonations: 5000,
    donationCount: 1,
    firstDonation: "07 Oct 2026",
    lastDonation: "07 Oct 2026",
    status: "Active",
    isAnonymous: true
  }
];

export const initialOrganizations = [
  {
    id: "ORG-001",
    name: "UNICEF (Demo Partner)",
    category: "Children & Education",
    campaignCount: 2,
    totalRaised: 342000,
    status: "Active",
    email: "contact@unicef-demo.org",
    website: "https://kindbridge.demo/unicef",
    description: "International humanitarian organization providing children with education, safety, and healthcare."
  },
  {
    id: "ORG-002",
    name: "Global Health Foundation",
    category: "Healthcare",
    campaignCount: 1,
    totalRaised: 214200,
    status: "Active",
    email: "info@globalhealth.demo",
    website: "https://kindbridge.demo/health",
    description: "Equipping remote villages with healthcare personnel, maternal support, and mobile diagnosis clinics."
  },
  {
    id: "ORG-003",
    name: "World Food Programme",
    category: "Food & Nutrition",
    campaignCount: 1,
    totalRaised: 320000,
    status: "Active",
    email: "relief@wfp-demo.org",
    website: "https://kindbridge.demo/wfp",
    description: "Leading humanitarian organization fighting hunger and delivering vital nutritional aid worldwide."
  },
  {
    id: "ORG-004",
    name: "Global Environment Fund",
    category: "Environment",
    campaignCount: 1,
    totalRaised: 95000,
    status: "Active",
    email: "earth@gef-demo.org",
    website: "https://kindbridge.demo/environment",
    description: "Advancing ecological reforestation, climate resilience, and urban green spaces."
  },
  {
    id: "ORG-005",
    name: "Pure Life Water Mission",
    category: "Clean Water",
    campaignCount: 1,
    totalRaised: 281500,
    status: "Active",
    email: "water@purelife.demo",
    website: "https://kindbridge.demo/water",
    description: "Solar filtration units bringing sustainable clean water access to drought-prone communities."
  }
];

export const initialStories = [
  {
    id: "STR-001",
    title: "A Bright Classroom for Aarohi",
    author: "KindBridge Editorial",
    category: "Education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    shortDescription: "How donor support funded solar power, desks, and books for a village school in rural Rajasthan.",
    fullStory: "Eight-year-old Aarohi used to study in a single dark room with no electricity. Thanks to the Education for Every Child campaign, over 120 students now learn with digital tablets, clean solar lighting, and nutritious daily snacks.",
    publishDate: "05 Oct 2026",
    status: "Published"
  },
  {
    id: "STR-002",
    title: "From 6km Daily Walks to Clean Water at Home",
    author: "Meera Sen",
    category: "Clean Water",
    image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Meet Sunita, whose community no longer loses hours every morning hauling heavy water buckets.",
    fullStory: "Solar-powered deep borewells and gravity-fed taps now supply over 300 households with disease-free mineral drinking water. Women and girls can now pursue secondary schooling and income-generating work.",
    publishDate: "28 Sep 2026",
    status: "Published"
  },
  {
    id: "STR-003",
    title: "Nourishing 500 Young Minds Every Morning",
    author: "Dr. K. Rao",
    category: "Food & Nutrition",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    shortDescription: "How freshly prepared hot mid-day meals boosted school attendance by 42% in 3 months.",
    fullStory: "Child malnutrition directly impacts cognitive retention and attendance. The Care & Nourish Trust has established centralized hygienic kitchens that serve balanced protein-rich meals to primary schools.",
    publishDate: "15 Sep 2026",
    status: "Published"
  }
];

export const initialUpdates = [
  {
    id: "UPD-001",
    title: "Milestone: ₹10 Lakhs Disbursed to Active Humanitarian Missions",
    category: "Platform News",
    description: "KindBridge has crossed its Q3 milestone with 100% verified transparency records uploaded to the donor dashboard.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    date: "06 Oct 2026",
    status: "Published"
  },
  {
    id: "UPD-002",
    title: "New Mobile Clinic Deployed in Eastern Ghats",
    category: "Healthcare",
    description: "The Global Health Foundation has officially rolled out its 4th all-terrain medical van equipped with rapid diagnostics and ultrasound.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    date: "02 Oct 2026",
    status: "Published"
  },
  {
    id: "UPD-003",
    title: "Over 5,000 Native Trees Planted for Wildlife Corridors",
    category: "Environment",
    description: "Community volunteers joined hands to reforest 12 hectares of degraded soil with indigenous banyan, neem, and peepal saplings.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    date: "25 Sep 2026",
    status: "Published"
  }
];

export const initialCategories = [
  { id: "CAT-1", name: "Education", campaignCount: 1, totalDonations: 342000, status: "Active" },
  { id: "CAT-2", name: "Healthcare", campaignCount: 1, totalDonations: 214200, status: "Active" },
  { id: "CAT-3", name: "Food & Nutrition", campaignCount: 2, totalDonations: 505000, status: "Active" },
  { id: "CAT-4", name: "Environment", campaignCount: 1, totalDonations: 95000, status: "Active" },
  { id: "CAT-5", name: "Clean Water", campaignCount: 1, totalDonations: 281500, status: "Active" },
  { id: "CAT-6", name: "Children", campaignCount: 1, totalDonations: 342000, status: "Active" },
  { id: "CAT-7", name: "Women & Girls", campaignCount: 1, totalDonations: 185000, status: "Active" },
  { id: "CAT-8", name: "Emergency Relief", campaignCount: 0, totalDonations: 0, status: "Active" }
];

export const initialActivityLogs = [
  {
    id: "ACT-01",
    activity: "Demo donation received (₹2,000 via QR Code)",
    admin: "Haritha R (Donor)",
    date: "07 Oct 2026",
    time: "03:15 PM"
  },
  {
    id: "ACT-02",
    activity: "Campaign 'Clean Drinking Water Initiative' updated",
    admin: "Admin",
    date: "07 Oct 2026",
    time: "11:30 AM"
  },
  {
    id: "ACT-03",
    activity: "Story 'A Bright Classroom for Aarohi' published",
    admin: "Admin",
    date: "06 Oct 2026",
    time: "04:45 PM"
  },
  {
    id: "ACT-04",
    activity: "Quarterly Transparency Audit report generated",
    admin: "Admin",
    date: "05 Oct 2026",
    time: "10:20 AM"
  }
];
