const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    category: "web",
    description:
      "This site — a React + Vite portfolio with interactive 3D planet models, a hand-rolled design system and Framer Motion transitions.",
    stack: ["React", "Vite", "Framer Motion"],
    repo: "https://github.com/sanudking/portfolio",
    live: "https://sudhanshu.dev/",
  },
  {
    id: 2,
    title: "Distributed LLM Inference",
    category: "ml",
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
  },
  {
    id: 3,
    title: "Milk Adulteration Detector",
    category: "ml",
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
  {
    id: 4,
    title: "Physics Simulator",
    category: "ar",
    description:
      "An interactive sandbox for experimenting with motion and collisions, rendered in the browser with a simple physics loop.",
    stack: ["JavaScript", "Canvas", "Physics"],
    repo: "https://github.com/sanudking/physicsSanu",
    live: "https://physics-sanu.vercel.app/",
  },
  {
    id: 5,
    title: "Procedural Voxel Terrain Generator",
    category: "3d",
    description:
      "A Minecraft-inspired voxel engine with a seeded PRNG written from scratch, so the same seed always generates the identical world. Real-time GUI controls recalculate world size, scale and noise offsets at runtime.",
    stack: ["Three.js", "Vite", "JavaScript", "lil-gui"],
    live: "https://three-qaq1.vercel.app/",
  },
  {
    id: 6,
    title: "Flutter Projects & Exam Tracker",
    category: "mobile",
    description:
      "Exam Tracker is a cross-platform app with account login, exam scheduling and a built-in Pomodoro timer — alongside a live showcase of Flutter and Dart UI experiments.",
    stack: ["Flutter", "Dart", "Supabase", "Vercel"],
    live: "https://flutter-projects-portfolio.vercel.app/",
  },
];

export const categoryLabels = {
  web: "Web",
  ml: "ML",
  react: "React",
  ar: "Simulation",
  "3d": "3D",
  mobile: "Mobile",
  data: "Data",
};

export default projects;
