import { useEffect, useRef } from "react";
import "@google/model-viewer";

/**
 * The 3D planet scene is kept in its own module so it can be lazy-loaded and
 * mounted only after the hero has painted. The heavy `@google/model-viewer`
 * bundle therefore never blocks the initial render.
 */
function HeroPlanetCanvas({ planets, activePlanetId, onReady }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const viewers = containerRef.current
      ? Array.from(containerRef.current.querySelectorAll("model-viewer"))
      : [];
    if (viewers.length === 0) return;

    let done = false;
    const handleLoad = () => {
      if (done) return;
      done = true;
      onReady?.();
    };

    viewers.forEach((viewer) => {
      if (viewer.loaded) {
        handleLoad();
        return;
      }
      viewer.addEventListener("load", handleLoad, { once: true });
    });

    return () => {
      viewers.forEach((viewer) => viewer.removeEventListener("load", handleLoad));
    };
  }, [onReady]);

  return (
    <div className="viewer-canvas" ref={containerRef}>
      {planets.map((planet) => (
        <model-viewer
          key={planet.id}
          className={`spin-viewer ${
            activePlanetId === planet.id ? "visible-model" : ""
          }`}
          data-name={planet.id}
          src={planet.model}
          alt={`A 3D model of ${planet.label}`}
          disable-zoom
          disable-pan
          touch-action="pan-y"
          camera-controls
          auto-rotate
          auto-rotate-delay="0"
          rotation-per-second="8deg"
          interaction-prompt="none"
          interpolation-decay="200"
          min-camera-orbit="auto 90deg auto"
          max-camera-orbit="auto 90deg auto"
        />
      ))}
    </div>
  );
}

export default HeroPlanetCanvas;
