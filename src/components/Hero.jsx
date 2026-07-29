import { useState, useEffect } from "react";
import "../styles/hero.css"; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// 1. Import model-viewer side-effects to register custom elements globally
import "@google/model-viewer";

function Hero() {
  const navigate = useNavigate();
  
  // 2. State to track the currently selected active target model
  const [activeTarget, setActiveTarget] = useState("earth");

  const handleSelection = (newTarget) => {
    if (activeTarget === newTarget) return;

    // 3. Find and query the custom nodes matching our operational conditions
    const viewers = document.querySelectorAll(".spin-viewer");

    viewers.forEach((v) => {
      const name = v.getAttribute("data-name");
      // If it's the model we are leaving or the model we are entering, spin it!
      if (name === activeTarget || name === newTarget) {
        if (typeof v.getCameraOrbit === "function") {
          const o = v.getCameraOrbit();
          const targetTheta = o.theta + Math.PI - 0.001; // Pure clockwise tie-breaker math
          v.cameraOrbit = `${targetTheta}rad ${o.phi}rad ${o.radius}m`;
        }
      }
    });

    // Update state to trigger structural fade-in/fade-out classes
    setActiveTarget(newTarget);
  };

  return (
    <section className="hero">
      <motion.div 
        className="hero-left" 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <h1> Hi, I'm <br /> <span>Sudhanshu</span> </h1>
        <p> 
          B.Tech student building real-world projects with focus on performance and clean systems. 
        </p>
        <div className="hero-buttons">
          <button onClick={() => navigate("/projects")}> View Projects </button>
          <button> Contact Me </button>
        </div>
      </motion.div>

      {/* 4. Integrated 3D Portfolio Showcase Element into hero-right */}
      <div className="hero-right">
        <div className="viewer-container">
          <model-viewer 
            className={`spin-viewer ${activeTarget === "earth" ? "visible-model" : ""}`}
            data-name="earth" 
            src="/models/earth.glb"
            alt="A 3D model of Earth" 
            disable-zoom 
            disable-pan 
            camera-controls 
            interaction-prompt="none" 
            interpolation-decay="200" 
            min-camera-orbit="auto 90deg auto" 
            max-camera-orbit="auto 90deg auto"
          />

          <model-viewer 
            className={`spin-viewer ${activeTarget === "sun" ? "visible-model" : ""}`}
            data-name="sun" 
            src="/models/sun.glb" 
            alt="A 3D model of the Sun" 
            disable-zoom 
            disable-pan 
            camera-controls 
            interaction-prompt="none" 
            interpolation-decay="200" 
            min-camera-orbit="auto 90deg auto" 
            max-camera-orbit="auto 90deg auto"
          />

          <model-viewer 
            className={`spin-viewer ${activeTarget === "moon" ? "visible-model" : ""}`}
            data-name="moon" 
            src="/models/moon.glb" 
            alt="A 3D model of the Moon" 
            disable-zoom 
            disable-pan 
            camera-controls 
            interaction-prompt="none" 
            interpolation-decay="200" 
            min-camera-orbit="auto 90deg auto" 
            max-camera-orbit="auto 90deg auto"
          />
        </div>

        {/* 5. Integrated selection dashboard row */}
        <div class="controls-panel">
          <div className="btn-container">
            <button 
              className={`select-btn ${activeTarget === "earth" ? "selected-target" : ""}`} 
              onClick={() => handleSelection("earth")}
            >
                                  <img src="/images/earth.svg" alt="icon" width="20" height="20" />

              
            </button>
            <button 
              className={`select-btn ${activeTarget === "sun" ? "selected-target" : ""}`} 
              onClick={() => handleSelection("sun")}
            >
                                  <img src="/images/sun.svg" alt="icon" width="20" height="20" />

              
            </button>
            <button 
              className={`select-btn ${activeTarget === "moon" ? "selected-target" : ""}`} 
              onClick={() => handleSelection("moon")}
            >
                    <img src="/images/moon.svg" alt="icon" width="20" height="20" />

              
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
