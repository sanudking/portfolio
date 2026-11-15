const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    category: "web",
    vc: 0,
    description:
      "This site — a React + Vite portfolio with interactive 3D planet models, a hand-rolled design system and Framer Motion transitions.",
    stack: ["React", "Vite", "Framer Motion"],
    repo: "https://github.com/sanudking",
  },
  {
    id: 2,
    title: "ML Model",
    category: "ml",
    vc: 1,
    description:
      "An end-to-end machine learning experiment: data preparation, model training and an evaluation pass on real-world samples.",
    stack: ["Python", "scikit-learn", "Pandas"],
    repo: "https://github.com/sanudking",
  },
  {
    id: 3,
    title: "Tic Tac Toe",
    category: "react",
    vc: 0,
    description:
      "A clean, keyboard-friendly take on the classic game with win detection and a reset flow built entirely in React state.",
    stack: ["React", "CSS", "JavaScript"],
    repo: "https://github.com/sanudking",
  },
  {
    id: 4,
    title: "Physics Simulator",
    category: "ar",
    vc: 1,
    description:
      "An interactive sandbox for experimenting with motion and collisions, rendered in the browser with a simple physics loop.",
    stack: ["JavaScript", "Canvas", "Physics"],
    repo: "https://github.com/sanudking",
  },
  {
    id: 5,
    title: "JEE College Predictor",
    category: "data",
    vc: 1,
    description:
      "A tool that maps JEE ranks to likely colleges and branches from historical cut-off data, with fast client-side filtering.",
    stack: ["React", "Data", "Tailwind"],
    repo: "https://github.com/sanudking",
  },
  {
    id: 6,
    title: "HackShare",
    category: "web",
    vc: 1,
    description:
      "A hackathon collaboration hub where teams share ideas, resources and updates in one shared workspace.",
    stack: ["Node.js", "Express", "MongoDB"],
    repo: "https://github.com/sanudking",
  },
];

export const categoryLabels = {
  web: "Web",
  ml: "ML",
  react: "React",
  ar: "Simulation",
  data: "Data",
};

export default projects;
