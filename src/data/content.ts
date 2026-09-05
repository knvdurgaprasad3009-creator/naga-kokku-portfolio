/**
 * Single source of truth for every piece of site copy.
 * Content is taken verbatim from portfolio-content-draft.md.
 */

export const site = {
  name: "Naga Prasad Kokku",
  /** Nav brand and footer — the full three-part name is too wide for the bar. */
  shortName: "Naga Kokku",
  brandLeft: "NAGA",
  brandRight: "KOKKU",
  title: "Product Manager — IoT, AI & Enterprise Platforms",
  email: "knvdurgaprasad3009@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/knvdurgaprasad/",
  linkedinLabel: "linkedin.com/in/knvdurgaprasad",
  location: "Memphis, TN",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Competencies", href: "#competencies" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Recognition", href: "#recognition" },
  { label: "Ask Naga", href: "#ask" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  /** Status pill above the headline. */
  status: "Open to Product Manager / Senior PM roles",
  /**
   * The H1, split into display lines. The middle line renders as outlined
   * type, so keep it the shortest of the three.
   */
  headlineLines: ["PRODUCT LEADERSHIP", "ACROSS IoT, AI &", "ENTERPRISE PLATFORMS"],
  outlinedLine: 1,
  /** Rotating phrases in the typed line under the headline. */
  typedPhrases: [
    "Industrial IoT",
    "AI & RAG Systems",
    "Enterprise Platforms",
    "Digital Twins",
  ],
  sub: "7+ years building and commercializing enterprise, Industrial IoT, RAG, digital-twin, and asset-management products across global operations. I turn physical operations data into intelligent, automated software — uncovering $7.2M in unmanaged spend and eliminating $4M in unnecessary purchases along the way.",
  primaryCta: { label: "Start a Conversation", href: "#contact" },
  secondaryCta: { label: "View Flagship Work", href: "#projects" },
};

/**
 * Four of the five stats in the content doc — the same four the approved
 * mockup leads with. `to` drives the count-up animation; prefix/suffix render
 * statically so the mono numerals never reflow mid-count.
 */
export const stats = [
  { prefix: "", to: 7, suffix: "+", decimals: 0, label: "Years of product & delivery experience" },
  { prefix: "$", to: 7.2, suffix: "M", decimals: 1, label: "Unmanaged spend uncovered" },
  { prefix: "", to: 6, suffix: "", decimals: 0, label: "Global regions commercialized" },
  { prefix: "", to: 95, suffix: "%", decimals: 0, label: "AI order-intake accuracy shipped" },
];

export const skills = [
  "Product Strategy",
  "Product Discovery",
  "Roadmaps & Prioritization",
  "Industrial IoT",
  "Connected Products",
  "Enterprise Platforms",
  "RAG",
  "AI Assistants",
  "OCR",
  "Digital Twins",
  "Workflow Automation",
  "Supply Chain",
  "Inventory & Asset Management",
  "API Integrations",
  "Product Analytics",
  "SQL",
  "Python",
  "Power BI",
  "Figma",
  "Azure DevOps",
  "Agile/Scrum",
];

export const about = {
  paragraphs: [
    "Product leader with 7+ years spanning Buckman Laboratories and Tata Consultancy Services, connecting physical operations, enterprise software, and intelligent automation. I have commercialized SaaS and Industrial IoT products across six global regions, 3,000 customers, and 10,000 sites — taking products from Figma prototype to 100% adoption in production.",
    "My work sits at the intersection of hardware and software: from RAG-powered order-intake bots with 95% accuracy, to connected-loom digital twins that increased manufacturing utilization by 55%. I lead cross-functional teams across Engineering, Finance, Supply Chain, SAP, and Legal, and I prioritize ruthlessly with MoSCoW and RICE to protect the highest-ROI work.",
    "MS in Industrial and Systems Engineering (University of Minnesota), BS in Mechatronics Engineering. CSPO certified, Microsoft Certified Power BI Data Analyst.",
  ],
  snapshot: [
    { label: "BASED IN", value: "Memphis, TN" },
    { label: "CURRENT ROLE", value: "Digital Product Specialist (PM), Buckman Laboratories" },
    { label: "PRIOR ROLE", value: "Digital Innovation Product Lead, TCS" },
    { label: "EDUCATION", value: "MS, Industrial & Systems Engineering — U Minnesota" },
    { label: "CERTIFICATION", value: "CSPO · Power BI Data Analyst Associate" },
    { label: "FOCUS", value: "Industrial IoT × Enterprise Product Management" },
  ],
};

export const competencies = [
  {
    num: "01",
    title: "Product Strategy & Execution",
    tags: [
      "Product Discovery",
      "Roadmaps & Prioritization (MoSCoW, RICE)",
      "Product Analytics",
      "Agile/Scrum",
      "Stakeholder Alignment (CDO/CFO/Engineering/Legal)",
      "Figma Prototyping",
    ],
  },
  {
    num: "02",
    title: "Industrial IoT & Connected Systems",
    tags: [
      "Industrial IoT",
      "Connected Products",
      "Digital Twins",
      "Sensor/Logistics API Integration",
      "Asset & Inventory Management",
      "Supply Chain Optimization",
    ],
  },
  {
    num: "03",
    title: "AI & Intelligent Automation",
    tags: [
      "RAG Systems",
      "AI Assistants (AI-Q Bot)",
      "OCR-to-SAP Automation",
      "RBAC",
      "Workflow Automation",
      "SQL",
      "Python",
      "Power BI",
    ],
  },
];

export const projects = [
  {
    fig: "01",
    org: "BUCKMAN LABORATORIES",
    title: "Global Equipment Ordering & Asset Management Platform",
    body: "Commercialized an equipment-ordering and asset-management SaaS product across six regions, 3,000 customers, 10,000 sites, 400 sales reps, and ~2,000 internal users — reaching 100% adoption. Centralized global equipment governance after exposing $7.2M in unmanaged annual spend.",
    metrics: [
      { num: "$7.2M", label: "Unmanaged spend uncovered" },
      { num: "50%", label: "Equipment expenditure reduced" },
    ],
    tags: ["SaaS", "Governance", "SKU Consolidation", "Business Rules Engine"],
  },
  {
    fig: "02",
    org: "BUCKMAN LABORATORIES",
    title: "AI-Q Bot — RAG-Powered Order Intake Assistant",
    body: "Owned AI-Q Bot from product design through production: combining RAG, RBAC, a 2,000+ SKU knowledge base, and OCR-to-SAP order intake to automate order placement with 95% accuracy.",
    metrics: [
      { num: "95%", label: "Order placement accuracy" },
      { num: "2,000+", label: "SKU knowledge base" },
    ],
    tags: ["RAG", "OCR", "RBAC", "SAP Integration"],
  },
  {
    fig: "03",
    org: "BUCKMAN LABORATORIES",
    title: "Smart Inventory — Industrial IoT Deployment",
    body: "Deployed Smart Inventory across 20 customer sites and 250 sensored tanks using Industrial IoT and logistics APIs, cutting rush orders 70%, expired-product returns 80%, and plant overtime by ~$0.5M annually.",
    metrics: [
      { num: "70%", label: "Rush orders reduced" },
      { num: "80%", label: "Expired-product returns reduced" },
    ],
    tags: ["Industrial IoT", "Sensors", "Predictive Logistics"],
  },
  {
    fig: "04",
    org: "TATA CONSULTANCY SERVICES (R&D)",
    title: "Digital Handloom 4.0 / Bridgital Loom",
    body: "Productized a connected hardware, e-commerce, and digital-twin platform, leading a 14-person cross-functional team on a $1.2M, 36-month initiative. Field discovery with 60+ weavers across 15+ clusters. Co-invented two patented digital-textile solutions; showcased at Adobe Summit and AI Impact Summit 2026.",
    metrics: [
      { num: "55%", label: "Loom utilization increase" },
      { num: "62%", label: "Downtime reduction" },
    ],
    tags: ["Digital Twin", "Connected Hardware", "IoT", "Patents"],
  },
];

export const experience = [
  {
    role: "Digital Product Specialist (Product Manager)",
    org: "Buckman Laboratories International Inc.",
    place: "Memphis, TN",
    dates: "FEB 2024 — PRESENT",
    current: true,
    bullets: [
      "Commercialized equipment-ordering and asset-management SaaS products across six regions, 3,000 customers, 10,000 sites, 400 sales reps, and ~2,000 internal users, reaching 100% adoption across initial deployments.",
      "Centralized global equipment governance after exposing $7.2M in annual unmanaged spend, consolidating SKUs, approval gates, vendor purchasing, and asset reuse, reducing equipment expenditure 50% over two years and avoiding $4M in new purchases within six months.",
      "Automated equipment selection with business rules, recommendation logic, compliance controls, and auto-approvals, cutting subject-matter-expert review time 50%.",
      "Deployed Smart Inventory across 20 customer sites and 250 sensored tanks using Industrial IoT and logistics APIs, reducing rush orders 70%, expired-product returns 80%, and plant overtime by ~$0.5M annually.",
      "Implemented predictive freight optimization using demand forecasting and inventory signals, saving ~$0.2M annually and improving logistics efficiency 15%.",
      "Owned AI-Q Bot from product design through production, combining RAG, RBAC, a 2,000+ SKU knowledge base, and OCR-to-SAP order intake, achieving 95% accuracy in automated order placement.",
      "Prioritized the multi-product roadmap with MoSCoW and RICE, deferring a global safety-audit integration by ~12 months to protect higher-ROI operational releases while maintaining existing compliance coverage.",
      "Directed ~28 production releases through biweekly Agile sprints, aligning the CDO/CFO, Engineering, Finance, Supply Chain, SAP, Legal, Sales, and vendor teams while mentoring junior PM/POs and interns.",
    ],
  },
  {
    role: "Digital Innovation Intern",
    org: "Buckman Laboratories",
    place: "Memphis, TN",
    dates: "MAY 2023 — DEC 2023",
    current: false,
    bullets: [
      "Secured $300K executive approval for the Global Equipment Ordering and Asset Management MVPs through Figma prototypes, workflow automation, and stakeholder demos while reducing process turnaround 5% and earning a GEM Award.",
    ],
  },
  {
    role: "Digital Innovation Product Lead",
    org: "Tata Consultancy Services",
    place: "Chennai, India",
    dates: "JUN 2018 — JUL 2022",
    current: false,
    bullets: [
      "Productized Digital Handloom 4.0, later branded Bridgital Loom, into a connected hardware, e-commerce, and digital-twin platform while functionally leading a 14-person Mechanical, Electronics, Software, and QA/BA team on a $1.2M, 36-month initiative.",
      "Conducted field discovery with 60+ end users across 15+ weaving clusters and two manufacturing sites, translating loom setup, maintenance, pattern, usability, and commercialization needs into the product roadmap.",
      "Improved manufacturing performance through connected-device workflows and digital-twin diagnostics, increasing loom utilization 55%, reducing downtime 62%, and lifting productivity 20%+.",
      "Analyzed 3,000+ operational data points with Python and Power BI, diagnosing ~35% of cycle-time and OEE variation and using the findings to guide process and product changes.",
      "Validated three digital looms with six trained weavers across Chennai and Kanchipuram, achieving independent fabric production across the pilot and generating follow-on requests for additional machines.",
      "Shipped nearly 20 e-commerce and digital-twin releases with 80% on-time delivery, strengthening testing and release-readiness practices after early issues and delivering 17 consecutive releases without blocker defects.",
      "Co-invented two patented digital-textile solutions behind Bridgital Loom; the product was later showcased at Adobe Summit in Las Vegas and AI Impact Summit 2026 in New Delhi.",
    ],
  },
  {
    role: "Digital Innovation Engineer",
    org: "Tata Consultancy Services",
    place: "Chennai, India",
    dates: "JUN 2016 — JUN 2018",
    current: false,
    bullets: [
      "Engineered and simulated connected loom hardware and reconfigurable Jacquard systems using SolidWorks/CAD, manufacturing validation, and rapid prototyping, reducing hardware costs 30%.",
    ],
  },
  {
    role: "Digital Innovation Intern",
    org: "Tata Consultancy Services",
    place: "Chennai, India",
    dates: "JAN 2016 — APR 2016",
    current: false,
    bullets: [
      "Prototyped a mobile-controlled Jacquard card-punching machine and produced a woven fabric proof of concept within four months, earning a GEM Award and a full-time offer to join TCS R&D.",
    ],
  },
  {
    role: "Manufacturing Engineer",
    org: "Shanmugha Precision Forging",
    place: "India",
    dates: "EARLIER",
    current: false,
    bullets: [],
  },
];

export const recognition = [
  {
    num: "01",
    title: "Awards",
    items: [
      "Best of Buckman Award",
      "4× Buckman GEM Awards",
      "TCS Best Impact Award",
      "4× TCS Star Team Awards",
    ],
  },
  {
    num: "02",
    title: "Patents",
    items: ["Inventor on 2 TCS digital-textile patents (1 issued, 1 filed)"],
  },
  {
    num: "03",
    title: "Education",
    items: [
      "MS, Industrial and Systems Engineering — University of Minnesota, Twin Cities",
      "BS, Mechatronics Engineering — SASTRA University, India",
    ],
  },
  {
    num: "04",
    title: "Certifications",
    items: [
      "Certified Scrum Product Owner (CSPO), Scrum Alliance",
      "Microsoft Certified: Power BI Data Analyst Associate",
      "Project Management Certificate, Carlson School of Management",
      "Generative AI for Product Managers",
      "AI Product Manager Certification, CodeBasics (in progress)",
    ],
  },
];

export const chat = {
  starters: [
    "What's your biggest product win?",
    "How do you approach IoT product development?",
    "What's your PM tech stack?",
  ],
  disclaimer:
    "AI-generated responses grounded in Naga's résumé — may occasionally be imperfect.",
};

export const contact = {
  openTo:
    "Product Manager / Senior Product Manager roles — Industrial IoT, AI Products & Enterprise Platforms",
};
