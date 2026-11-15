import { useEffect, useMemo, useState } from "react";
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ScrollPhysicsContext } from "../context/scrollPhysics";

const MAX_VELOCITY = 2200;

function ScrollPhysicsProvider({ children }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, {
    stiffness: 160,
    damping: 26,
    mass: 0.6,
  });
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarsePointer(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  const velocity = useTransform(smoothVelocity, (value) => {
    if (shouldReduceMotion) return 0;
    return Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, value));
  });

  const motionScale = shouldReduceMotion ? 0 : coarsePointer ? 0.55 : 1;

  const value = useMemo(
    () => ({ velocity, motionScale }),
    [velocity, motionScale]
  );

  return (
    <ScrollPhysicsContext.Provider value={value}>
      {children}
    </ScrollPhysicsContext.Provider>
  );
}

export default ScrollPhysicsProvider;
