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
      "A research sandbox exploring distributed inference for large language models, sharding compute across workers for faster generation.",
    stack: ["Python", "LLMs", "Distributed Systems"],
    repo: "https://github.com/sanudking/minimol",
    live: "https://timely-quokka-ddbc6b.netlify.app/",
  },
  {
    id: 3,
    title: "Milk Detector",
    category: "ml",
    description:
      "A machine learning project that classifies milk quality and flags adulteration from sample data, covering preparation, training and evaluation.",
    stack: ["Python", "scikit-learn", "Pandas"],
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
    title: "CubeCraft",
    category: "3d",
    description:
      "An interactive 3D voxel sandbox built with Three.js, featuring procedural terrain generation and real-time block building.",
    stack: ["Three.js", "JavaScript", "WebGL"],
    live: "https://three-qaq1.vercel.app/",
  },
  {
    id: 6,
    title: "Flutter Projects",
    category: "mobile",
    description:
      "A curated showcase of cross-platform mobile applications and UI experiments built with Flutter and Dart.",
    stack: ["Flutter", "Dart", "Mobile"],
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
