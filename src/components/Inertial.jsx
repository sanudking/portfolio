import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useScrollPhysics } from "../context/scrollPhysics";
import "../styles/motion.css";

const VELOCITY_RANGE = [-2200, 0, 2200];

function useInertialMotion(depth, lag, tilt) {
  const { velocity, motionScale } = useScrollPhysics();
  const distance = lag * depth * motionScale;
  const angle = tilt * depth * motionScale;

  const y = useTransform(velocity, VELOCITY_RANGE, [-distance, 0, distance], {
    clamp: true,
  });
  const rotateX = useTransform(velocity, VELOCITY_RANGE, [-angle, 0, angle], {
    clamp: true,
  });
  const lineStretch = useTransform(velocity, (value) => {
    const intensity = Math.min(Math.abs(value) / 2200, 1);
    return 1 + intensity * 0.3;
  });

  return { y, rotateX, lineStretch };
}

function Inertial({
  as = "div",
  children,
  className = "",
  depth = 1,
  lag = 8,
  tilt = 0,
}) {
  const { y, rotateX, lineStretch } = useInertialMotion(depth, lag, tilt);
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      style={{
        "--line-stretch": lineStretch,
        y,
        rotateX,
        transformPerspective: tilt ? 900 : undefined,
      }}
    >
      {children}
    </MotionTag>
  );
}

function FocusInertial({
  children,
  className = "",
  depth = 1,
  lag = 9,
  tilt = 0,
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { y, rotateX, lineStretch } = useInertialMotion(depth, lag, tilt);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const focus = useTransform(
    scrollYProgress,
    [0, 0.32, 0.5, 0.68, 1],
    [0.02, 0.18, 0.5, 0.18, 0.02],
    { clamp: true }
  );

  return (
    <motion.div
      ref={ref}
      className={`inertial-focus ${className}`.trim()}
      style={{
        "--line-stretch": lineStretch,
        y,
        rotateX,
        transformPerspective: tilt ? 900 : undefined,
      }}
    >
      <motion.span
        className="focus-glow"
        style={{ opacity: shouldReduceMotion ? 0 : focus }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}

export { FocusInertial };
export default Inertial;
