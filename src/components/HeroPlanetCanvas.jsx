import { useEffect, useRef, useState } from "react";
import "@google/model-viewer";

/**
 * The 3D planet scene is kept in its own module so it can be lazy-loaded and
 * mounted only after the hero has painted. The heavy `@google/model-viewer`
 * bundle therefore never blocks the initial render.
 *
 * Only the active planet's model is given a `src`. The other themes stay
 * mounted (so switching still cross-fades) but their GLBs are not downloaded
 * until the visitor actually selects them — that's ~4.6 MB versus ~1.3 MB.
 */
function HeroPlanetCanvas({ planets, activePlanetId, onReady }) {
  const containerRef = useRef(null);
  const [visited, setVisited] = useState(() => [activePlanetId]);

  // Adjust state during render rather than in an effect — React's documented
  // pattern for derived state, and it avoids a cascading re-render.
  if (!visited.includes(activePlanetId)) {
    setVisited([...visited, activePlanetId]);
  }

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
  }, [onReady, visited]);

  return (
    <div className="viewer-canvas" ref={containerRef}>
      {planets.map((planet) => (
        <model-viewer
          key={planet.id}
          className={`spin-viewer ${
            activePlanetId === planet.id ? "visible-model" : ""
          }`}
          data-name={planet.id}
          src={visited.includes(planet.id) ? planet.model : undefined}
          alt={`A 3D model of ${planet.label}`}
          poster={planet.poster}
          reveal="auto"
          disable-zoom
          disable-pan
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
