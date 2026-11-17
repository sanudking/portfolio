const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    categories: ["web"],
    description:
      "This site — a React + Vite portfolio with interactive 3D planet models, a hand-rolled design system and Framer Motion transitions.",
    stack: ["React", "Vite", "Framer Motion"],
    repo: "https://github.com/sanudking/portfolio",
    live: "https://sudhanshu.dev/",
    image: "/images/projects/portfolio.jpg",
    imageAlt:
      "Portfolio homepage with the 3D Earth hero, navigation and theme switcher",
  },
  {
    id: 2,
    title: "Distributed LLM Inference",
    categories: ["ml", "web"],
    description:
      "A browser-only distributed Transformer inference demo. A 6-layer, 11M-parameter byte-level model is split across two phones — each holds half the layers and only activations and token IDs cross the link.",
    highlights: [
      "Serverless WebRTC DataChannel pairing via QR codes",
      "Adaptive chunking under queue pressure and SHA-256 partition checks",
      "CPU-only FP32 inference running in Web Workers",
    ],
    stack: ["JavaScript", "WebRTC", "Web Workers", "Vite", "IndexedDB"],
    repo: "https://github.com/sanudking/minimol",
    live: "https://timely-quokka-ddbc6b.netlify.app/",
    image: "/images/projects/minimol.jpg",
    imageAlt:
      "MiniMoL landing page with the headline One model. Two phones. and phone partition controls",
  },
  {
    id: 3,
    title: "JobMatch",
    categories: ["ml", "web"],
    description:
      "A database-free resume-to-job matching prototype. Upload a text-based PDF resume, search Adzuna listings, retrieve relevant jobs with BGE embeddings, and evaluate the shortlist with Groq's openai/gpt-oss-120b.",
    highlights: [
      "PyMuPDF extracts resume text in memory; emails and phone numbers are redacted before anything reaches Groq",
      "BGE embeddings shortlist relevant postings locally on CPU, with keyword-retrieval fallback",
      "Groq returns match scores, matched and missing skills, and explanations for each shortlisted job",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Sentence Transformers",
      "Groq",
      "Adzuna API",
      "React",
    ],
    repo: "https://github.com/sanudking/AI-JobSearch",
    image: "/images/projects/jobmatch.jpg",
    imageAlt:
      "JobMatch interface with a resume upload, job role and location fields, and 14 matching jobs",
  },
  {
    id: 4,
    title: "Physics Simulator",
    categories: ["ar", "3d"],
    description:
      "A 3D physics lab in the browser — pendulum, inclined plane, torque balance and elastic collision experiments with draggable objects, live parameter sliders and calculated measurements.",
    stack: ["JavaScript", "WebGL", "Physics"],
    repo: "https://github.com/sanudking/physicsSanu",
    live: "https://physics3d.vercel.app/",
    image: "/images/projects/physics-lab.jpg",
    imageAlt:
      "Physics Lab pendulum experiment with a 3D view, parameter sliders and live measurements",
  },
  {
    id: 5,
    title: "Procedural Voxel Terrain Generator",
    categories: ["3d", "web"],
    description:
      "A Minecraft-inspired voxel engine with a seeded PRNG written from scratch, so the same seed always generates the identical world. Real-time GUI controls recalculate world size, scale and noise offsets at runtime.",
    stack: ["Three.js", "Vite", "JavaScript", "lil-gui"],
    live: "https://three-qaq1.vercel.app/",
    image: "/images/projects/voxel-terrain.jpg",
    imageAlt:
      "CubeCraft voxel terrain generated from a seed, with terrain controls in the corner",
  },
  {
    id: 6,
    title: "Flutter Projects & Exam Tracker",
    categories: ["mobile"],
    description:
      "Exam Tracker is a cross-platform app with account login, exam scheduling and a built-in Pomodoro timer — alongside a live showcase of Flutter and Dart UI experiments.",
    stack: ["Flutter", "Dart", "Supabase", "Vercel"],
    live: "https://flutter-projects-portfolio.vercel.app/",
    image: "/images/projects/flutter-projects.jpg",
    imageAlt:
      "Grid of Flutter apps: Spotify, ExamTracker, RoboMarket and an Info profile screen",
  },
  {
    id: 7,
    title: "Milk Adulteration Detector",
    categories: ["ml"],
    period: "Feb – Apr 2026",
    description:
      "A low-cost multi-sensor platform: ESP32 firmware streams live pH, conductivity, turbidity and temperature readings to a host app that flags adulterants and was presented in venture-panel pitches.",
    highlights: [
      "Rule-based thresholds combined with an optional Random Forest classifier",
      "Flask demo app for live readings and classification",
    ],
    stack: ["ESP32", "Python", "Flask", "scikit-learn"],
    repo: "https://github.com/sanudking/milk-detector",
  },
];

export const categoryLabels = {
  web: "Web",
  ml: "ML",
  ar: "Simulation",
  "3d": "3D",
  mobile: "Mobile",
};

export default projects;
