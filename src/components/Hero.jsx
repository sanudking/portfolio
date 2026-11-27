import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Inertial from "./Inertial";
import "../styles/hero.css";

// The 3D scene (and the heavy model-viewer bundle) is code-split and mounted
// only after the first paint, so it never delays FCP/LCP.
const HeroPlanetCanvas = lazy(() => import("./HeroPlanetCanvas"));

const RESUME_URL =
  "https://drive.google.com/file/d/1DlFhwU-qSJFwjmpYTiC4WKLnkB_q7GTf/view?usp=sharing";

const PLANETS = [
  {
    id: "earth",
    label: "Earth",
    model: "/models/earth.glb",
    icon: "/images/earth.svg",
    poster: "/images/poster-earth.svg",
    accent: "#38bdf8",
    bg: "#08080c",
  },
  {
    id: "sun",
    label: "Sun",
    model: "/models/sun.glb",
    icon: "/images/sun.svg",
    poster: "/images/poster-sun.svg",
    accent: "#fbbf24",
    bg: "#0d0906",
  },
  {
    id: "moon",
    label: "Moon",
    model: "/models/moon.glb",
    icon: "/images/moon.svg",
    poster: "/images/poster-moon.svg",
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
  const [activePlanet, setActivePlanet] = useState(getSavedPlanet);
  const [showViewer, setShowViewer] = useState(false);
  const [viewerReady, setViewerReady] = useState(false);

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

  // Mount the 3D scene after the first paint so the hero text wins the frame.
  useEffect(() => {
    let idleId;
    let timeoutId;
    const start = () => setShowViewer(true);

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 1500 });
    } else {
      timeoutId = window.setTimeout(start, 250);
    }

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  const handleReady = useCallback(() => setViewerReady(true), []);

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
      <div className="hero-left">
        <span className="hero-tag">
          <span className="dot" aria-hidden="true" />
          Open to internships & collaborations
        </span>

        <h1 className="hero-title">Hi, I&apos;m Sudhanshu</h1>

        <p className="hero-desc">
          Full-stack developer and CSE undergrad at NIT Jalandhar (Class of
          2029). I build fast, accessible web apps — from React interfaces to
          the APIs behind them.
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
          <a
            className="btn btn-ghost"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
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
          <div>
            <dt>Class of</dt>
            <dd>2029</dd>
          </div>
        </dl>
      </div>

      <Inertial as="div" className="hero-right" depth={1.2} lag={16}>
        <div className="viewer-container">
          <div className="viewer-glow" aria-hidden="true" />
          <div className="viewer-ring" aria-hidden="true" />

          <img
            className={`viewer-poster${viewerReady ? " is-hidden" : ""}`}
            src={activePlanet.poster}
            alt=""
            width="512"
            height="512"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            aria-hidden="true"
          />

          {showViewer && (
            <Suspense fallback={null}>
              <HeroPlanetCanvas
                planets={PLANETS}
                activePlanetId={activePlanet.id}
                onReady={handleReady}
              />
            </Suspense>
          )}
        </div>

        <div className="controls-panel">
          <span className="controls-label">Theme</span>
          <div
            className="btn-container"
            role="group"
            aria-label="Choose a theme"
          >
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
      </Inertial>
    </section>
  );
}

export default Hero;
