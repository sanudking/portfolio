import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import "@google/model-viewer";
import "../styles/hero.css";

const MotionDiv = motion.div;

const PLANETS = [
  {
    id: "earth",
    label: "Earth",
    model: "/models/earth.glb",
    icon: "/images/earth.svg",
    accent: "#38bdf8",
    bg: "#08080c",
  },
  {
    id: "sun",
    label: "Sun",
    model: "/models/sun.glb",
    icon: "/images/sun.svg",
    accent: "#fbbf24",
    bg: "#0d0906",
  },
  {
    id: "moon",
    label: "Moon",
    model: "/models/moon.glb",
    icon: "/images/moon.svg",
    accent: "#e2e8f0",
    bg: "#06080f",
  },
];

function getSavedPlanet() {
  try {
    const saved = localStorage.getItem("planet");
    return PLANETS.find((planet) => planet.id === saved) ?? PLANETS[0];
  } catch {
    return PLANETS[0];
  }
}

function Hero() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [activePlanet, setActivePlanet] = useState(getSavedPlanet);

  // The chosen planet drives the whole site theme, not just the 3D model.
  useEffect(() => {
    document.documentElement.dataset.theme = activePlanet.id;
    try {
      localStorage.setItem("planet", activePlanet.id);
    } catch {
      // Storage can be unavailable (private mode) — the theme still applies.
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", activePlanet.bg);
  }, [activePlanet]);

  const handleSelection = (planet) => {
    if (activePlanet.id === planet.id) return;

    // Spin the model we leave and the model we enter for a smooth hand-off.
    document.querySelectorAll(".spin-viewer").forEach((viewer) => {
      const name = viewer.getAttribute("data-name");
      if (name !== activePlanet.id && name !== planet.id) return;

      if (typeof viewer.getCameraOrbit === "function") {
        const orbit = viewer.getCameraOrbit();
        const targetTheta = orbit.theta + Math.PI - 0.001;
        viewer.cameraOrbit = `${targetTheta}rad ${orbit.phi}rad ${orbit.radius}m`;
      }
    });

    setActivePlanet(planet);
  };

  return (
    <section className="hero" style={{ "--planet": activePlanet.accent }}>
      <MotionDiv
        className="hero-left"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }
        }
      >
        <span className="hero-tag">
          <span className="dot" aria-hidden="true" />
          Open to internships & collaborations
        </span>

        <h1 className="hero-title">
          Hi, I&apos;m <span className="gradient-text">Sudhanshu</span>
        </h1>

        <p className="hero-desc">
          Full-stack developer and 2nd-year CSE undergrad at NIT Jalandhar. I
          build fast, accessible web apps — from React interfaces to the APIs
          behind them.
        </p>

        <div className="hero-buttons">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/projects")}
          >
            View projects
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate("/contact")}
          >
            Contact me
          </button>
        </div>

        <dl className="hero-meta">
          <div>
            <dt>Focus</dt>
            <dd>React · Node · MongoDB</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>Jalandhar, India</dd>
          </div>
        </dl>
      </MotionDiv>

      <div className="hero-right">
        <div className="viewer-container">
          <div className="viewer-glow" aria-hidden="true" />
          <div className="viewer-ring" aria-hidden="true" />

          {PLANETS.map((planet) => (
            <model-viewer
              key={planet.id}
              className={`spin-viewer ${
                activePlanet.id === planet.id ? "visible-model" : ""
              }`}
              data-name={planet.id}
              src={planet.model}
              alt={`A 3D model of ${planet.label}`}
              disable-zoom
              disable-pan
              camera-controls
              interaction-prompt="none"
              interpolation-decay="200"
              min-camera-orbit="auto 90deg auto"
              max-camera-orbit="auto 90deg auto"
            />
          ))}
        </div>

        <div className="controls-panel">
          <span className="controls-label">Theme</span>
          <div className="btn-container" role="group" aria-label="Choose a theme">
            {PLANETS.map((planet) => (
              <button
                key={planet.id}
                type="button"
                className={`select-btn ${
                  activePlanet.id === planet.id ? "selected-target" : ""
                }`}
                onClick={() => handleSelection(planet)}
                aria-pressed={activePlanet.id === planet.id}
                aria-label={`${planet.label} theme`}
                title={`${planet.label} theme`}
              >
                <img src={planet.icon} alt="" width="22" height="22" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
