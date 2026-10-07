// Sample campaign data for KindBridge
// Note: All campaigns and organizations are for demonstration purposes only.

export const campaigns = [
  {
    id: 1,
    title: "Education for Every Child",
    organization: "UNICEF (Demo Partner)",
    category: "Education",
    target: 500000,
    raised: 240000,
    donors: "1,200+",
    daysLeft: 45,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    description: "Provide quality education, school supplies, digital learning tools, and safe classroom environments for underprivileged children across rural and underserved communities. Every child deserves the opportunity to learn and build a brighter future.",
    featured: true,
    impactSummary: "₹1,000 provides a student with a full term of textbooks, stationery, and learning materials."
  },
  {
    id: 2,
    title: "Better Healthcare for All",
    organization: "Global Health Foundation (Demo Partner)",
    category: "Healthcare",
    target: 400000,
    raised: 175000,
    donors: "890+",
    daysLeft: 32,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    description: "Deploy mobile health clinics, essential medicine supplies, diagnostic equipment, and maternal care to remote communities where hospitals are hours away.",
    featured: true,
    impactSummary: "₹2,000 covers primary health checkups and essential medicine for 4 families."
  },
  {
    id: 3,
    title: "End Hunger, Build Hope",
    organization: "World Food Programme (Demo Partner)",
    category: "Food",
    target: 600000,
    raised: 320000,
    donors: "1,540+",
    daysLeft: 28,
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
    description: "Distribute nutritious food kits, hot meals, and long-term agricultural seeds to drought-affected families and child care centers facing critical food insecurity.",
    featured: true,
    impactSummary: "₹500 funds 20 nutritious balanced meals for children in community centers."
  },
  {
    id: 4,
    title: "Greener Tomorrow",
    organization: "Global Environment Fund (Demo Partner)",
    category: "Environment",
    target: 250000,
    raised: 95000,
    donors: "620+",
    daysLeft: 50,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    description: "Restore damaged ecosystems, plant native trees, organize community recycling initiatives, and establish urban green corridors to combat regional climate change.",
    featured: true,
    impactSummary: "₹1,000 supports planting and protecting 10 native trees until maturity."
  },
  {
    id: 5,
    title: "Clean Drinking Water Initiative",
    organization: "Pure Life Water Mission",
    category: "Healthcare",
    target: 350000,
    raised: 210000,
    donors: "980+",
    daysLeft: 19,
    image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=1200&q=80",
    description: "Install solar-powered water filtration systems in dry villages, eradicating waterborne diseases and saving women and girls hours of daily travel.",
    featured: false,
    impactSummary: "₹2,000 provides clean filtered drinking water access for an entire household for a year."
  },
  {
    id: 6,
    title: "Nutritious Mid-day Meals",
    organization: "Care & Nourish Trust",
    category: "Food",
    target: 300000,
    raised: 185000,
    donors: "740+",
    daysLeft: 23,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    description: "Ensure that students stay in school by providing wholesome, warm mid-day meals packed with proteins and essential micronutrients every school day.",
    featured: false,
    impactSummary: "₹1,000 sponsors full hot lunches for two children for an entire school month."
  }
];

export const categories = ["All", "Education", "Healthcare", "Food", "Environment"];

export const formatCurrency = (amount) => {
  return "₹" + Number(amount).toLocaleString("en-IN");
};

export const calculateProgress = (raised, target) => {
  if (!target || target === 0) return 0;
  return Math.min(100, Math.round((raised / target) * 100));
};
