import { useEffect, useRef } from "react";
import "../styles/background.css";

const FIELD_RADIUS = 170;
const WELL_RADIUS = 110;
const LINK_RADIUS = 210;
const LINK_DISTANCE = 104;
const MIN_PARTICLES = 36;
const MAX_PARTICLES = 170;
const MAX_DPR = 2;
const MAX_SPEED = 1.5;
const SCROLL_FORCE = 0.03;
const SCROLL_MAX_DELTA = 80;
const STREAK_MIN_SPEED = 0.9;
const STREAK_SCALE = 8;
const MAX_STREAK = 14;

const STAR_FIRST_DELAY = 1800;
const STAR_MIN_INTERVAL = 4500;
const STAR_MAX_INTERVAL = 12000;
const STAR_SPEED_MIN = 6;
const STAR_SPEED_MAX = 14;
const STAR_INFLUENCE = 150;
const STAR_PUSH = 0.55;
const STAR_WAKE = 0.6;
const STAR_SWIRL = 0.22;
const STAR_FLASH = 0.9;
const STAR_EXIT_MARGIN = 140;
const DEG = Math.PI / 180;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let colors = ["#38bdf8", "#a78bfa"];
    let shootingStars = [];
    let nextStarAt = 0;
    let frame = 0;
    let running = false;
    let lastTime = 0;
    let resizeTimer = 0;
    let lastScrollY = 0;

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      vx: 0,
      vy: 0,
      active: false,
    };

    function readTheme() {
      const styles = getComputedStyle(document.documentElement);
      colors = [
        styles.getPropertyValue("--accent").trim() || "#38bdf8",
        styles.getPropertyValue("--accent-2").trim() || "#a78bfa",
      ];
      if (motionQuery.matches) drawStatic();
    }

    function makeParticle() {
      const depth = 0.3 + Math.random() * 0.7;
      const angle = Math.random() * Math.PI * 2;
      const drift = 0.05 + Math.random() * 0.12;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * drift,
        vy: Math.sin(angle) * drift,
        depth,
        radius: (0.5 + depth * 1.5) * 1.95,
        alpha: 0.16 + depth * 0.42,
        color: Math.random() < 0.7 ? 0 : 1,
        phase: Math.random() * Math.PI * 2,
        flash: 0,
      };
    }

    function seedParticles() {
      const count = clamp(
        Math.floor((width * height) / 12500),
        MIN_PARTICLES,
        MAX_PARTICLES
      );
      particles = Array.from({ length: count }, makeParticle);
    }

    function makeShootingStar(entry) {
      const speed = STAR_SPEED_MIN + Math.random() * (STAR_SPEED_MAX - STAR_SPEED_MIN);
      const angle = (16 + Math.random() * 38) * DEG;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      let x;
      let y;

      if (entry === "top") {
        x = Math.random() * width * 0.75 - width * 0.1;
        y = -STAR_EXIT_MARGIN * 0.5;
      } else {
        x = -STAR_EXIT_MARGIN * 0.5;
        y = Math.random() * height * 0.45;
      }

      // Roughly how long until it leaves the viewport; keeps the fade honest.
      // Travel is measured in frames, so convert to milliseconds for `life`.
      const FRAME_MS = 16.667;
      const travelX = (width + STAR_EXIT_MARGIN - x) / vx;
      const travelY = (height + STAR_EXIT_MARGIN - y) / vy;
      const maxLife = Math.max(travelX, travelY) * FRAME_MS;

      return {
        x,
        y,
        vx,
        vy,
        speed,
        travel: 0,
        maxLife,
        life: maxLife,
        length: 46 + speed * 4.2,
        width: 1.1 + Math.random() * 0.9,
        color: Math.random() < 0.65 ? 0 : 1,
        phase: Math.random() * Math.PI * 2,
      };
    }

    function spawnShootingStars(now) {
      if (motionQuery.matches || now < nextStarAt) return;

      shootingStars.push(makeShootingStar("top"));
      if (Math.random() < 0.08) shootingStars.push(makeShootingStar("left"));

      nextStarAt =
        now + STAR_MIN_INTERVAL + Math.random() * (STAR_MAX_INTERVAL - STAR_MIN_INTERVAL);
    }

    function updateShootingStars(dt) {
      if (shootingStars.length === 0) return;

      for (let i = shootingStars.length - 1; i >= 0; i -= 1) {
        const star = shootingStars[i];
        const frames = dt / 16.667;
        star.x += star.vx * frames;
        star.y += star.vy * frames;
        star.travel += star.speed * frames;
        star.life -= dt;

        const gone =
          star.life <= 0 ||
          star.x - STAR_EXIT_MARGIN > width ||
          star.y - STAR_EXIT_MARGIN > height;

        if (gone) shootingStars.splice(i, 1);
      }
    }

    function stirParticle(particle, star, step) {
      const dx = particle.x - star.x;
      const dy = particle.y - star.y;
      const distSq = dx * dx + dy * dy;

      if (distSq > STAR_INFLUENCE * STAR_INFLUENCE) return;

      const dist = Math.sqrt(distSq) || 1;
      const falloff = 1 - dist / STAR_INFLUENCE;
      const force = falloff * falloff * (0.45 + particle.depth * 0.55);

      // Shockwave pushes dust out of the way...
      particle.vx += (dx / dist) * force * STAR_PUSH * step;
      particle.vy += (dy / dist) * force * STAR_PUSH * step;

      // ...the wake drags it along the direction of travel...
      const speed = Math.hypot(star.vx, star.vy) || 1;
      particle.vx += (star.vx / speed) * force * STAR_WAKE * step;
      particle.vy += (star.vy / speed) * force * STAR_WAKE * step;

      // ...and a touch of swirl bends the path around the passing body.
      particle.vx += (-dy / dist) * force * STAR_SWIRL * step;
      particle.vy += (dx / dist) * force * STAR_SWIRL * step;

      const glow = falloff * STAR_FLASH;
      if (glow > particle.flash) particle.flash = glow;
    }

    function drawShootingStars(now) {
      if (shootingStars.length === 0) return;

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      for (const star of shootingStars) {
        const ux = star.vx / star.speed;
        const uy = star.vy / star.speed;

        const lifeRatio = clamp(star.life / star.maxLife, 0, 1);
        // Fade in over the first ~90px of travel so stars don't blink into
        // existence while still above (or left of) the viewport.
        const fadeIn = clamp(star.travel / 90, 0, 1);
        const fadeOut = clamp(lifeRatio * 3.2, 0, 1);
        const alpha = fadeIn * fadeOut;
        if (alpha <= 0.01) continue;

        const shimmer = 0.9 + Math.sin(now * 0.008 + star.phase) * 0.1;
        const color = colors[star.color];
        const length = star.length * (0.55 + fadeOut * 0.45) * shimmer;
        const tailX = star.x - ux * length;
        const tailY = star.y - uy * length;

        const trail = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        trail.addColorStop(0, "rgba(255, 255, 255, 0)");
        trail.addColorStop(0.55, color);
        trail.addColorStop(1, "#ffffff");

        ctx.globalAlpha = alpha * 0.85;
        ctx.strokeStyle = trail;
        ctx.lineWidth = star.width;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();

        const glowRadius = 12 + star.width * 5;
        const glow = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          glowRadius
        );
        glow.addColorStop(0, color);
        glow.addColorStop(0.35, color);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.globalAlpha = alpha * 0.55;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.width * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.lineCap = "butt";
    }

    function drawParticles(now) {
      ctx.globalCompositeOperation = "lighter";

      for (const particle of particles) {
        const twinkle = 0.85 + Math.sin(now * 0.001 + particle.phase) * 0.15;
        const speed = Math.hypot(particle.vx, particle.vy);
        const glow = 1 + particle.flash * 1.35;

        ctx.globalAlpha = Math.min(1, particle.alpha * twinkle * glow);
        ctx.fillStyle = colors[particle.color];

        // Fast dust (usually from scrolling) stretches into a short comet trail.
        if (speed > STREAK_MIN_SPEED) {
          const streak = Math.min(speed * STREAK_SCALE, MAX_STREAK);
          ctx.strokeStyle = colors[particle.color];
          ctx.lineWidth = particle.radius * 1.4;
          ctx.beginPath();
          ctx.moveTo(
            particle.x - (particle.vx / speed) * streak,
            particle.y - (particle.vy / speed) * streak
          );
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }

    function drawLinks() {
      const nearby = [];
      const linkRadiusSq = LINK_RADIUS * LINK_RADIUS;

      for (const particle of particles) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < linkRadiusSq) {
          nearby.push({ particle, distance: Math.sqrt(distSq) });
        }
      }

      if (nearby.length < 2) return;

      const maxLinkSq = LINK_DISTANCE * LINK_DISTANCE;
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = colors[0];

      for (let i = 0; i < nearby.length; i += 1) {
        for (let j = i + 1; j < nearby.length; j += 1) {
          const a = nearby[i];
          const b = nearby[j];
          const dx = a.particle.x - b.particle.x;
          const dy = a.particle.y - b.particle.y;
          const distSq = dx * dx + dy * dy;

          if (distSq > maxLinkSq) continue;

          const link = 1 - Math.sqrt(distSq) / LINK_DISTANCE;
          const proximity =
            1 - (a.distance + b.distance) / (2 * LINK_RADIUS);

          ctx.globalAlpha = link * proximity * 0.7;
          ctx.beginPath();
          ctx.moveTo(a.particle.x, a.particle.y);
          ctx.lineTo(b.particle.x, b.particle.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
    }

    function drawWell() {
      const gradient = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        WELL_RADIUS
      );
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.45, colors[1]);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, WELL_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }

    function draw(now) {
      ctx.clearRect(0, 0, width, height);
      if (pointer.active && pointerQuery.matches) drawWell();
      drawLinks();
      drawParticles(now);
      drawShootingStars(now);
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      drawParticles(0);
    }

    function update(dt, now) {
      const step = clamp(dt / 16.667, 0.25, 2);
      const damping = Math.pow(0.986, step);

      spawnShootingStars(now);
      updateShootingStars(dt);

      // Scroll velocity feeds the field so the page feels like it is moving
      // through dust. Deltas are per-frame and clamped to avoid jump spikes.
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollDelta = clamp(scrollY - lastScrollY, -SCROLL_MAX_DELTA, SCROLL_MAX_DELTA);
      lastScrollY = scrollY;

      // Ease the cursor so the field has a little weight behind it.
      const ease = 1 - Math.pow(0.78, step);
      const nextX = pointer.x + (pointer.targetX - pointer.x) * ease;
      const nextY = pointer.y + (pointer.targetY - pointer.y) * ease;
      pointer.vx = clamp((nextX - pointer.x) / step, -30, 30);
      pointer.vy = clamp((nextY - pointer.y) / step, -30, 30);
      pointer.x = nextX;
      pointer.y = nextY;

      for (const particle of particles) {
        // A barely-there wander keeps the field alive when the mouse is idle.
        particle.vx +=
          Math.cos(now * 0.00022 + particle.phase) *
          0.0012 *
          particle.depth *
          step;
        particle.vy +=
          Math.sin(now * 0.00019 + particle.phase * 1.3) *
          0.0012 *
          particle.depth *
          step;

        // Scrolling down (positive delta) drives the dust upward past the
        // viewer; nearer (deeper) particles react more for parallax.
        if (scrollDelta !== 0) {
          particle.vy -= scrollDelta * SCROLL_FORCE * particle.depth * step;
        }

        if (pointer.active && pointerQuery.matches) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq > 1 && distSq < FIELD_RADIUS * FIELD_RADIUS) {
            const dist = Math.sqrt(distSq);
            const falloff = 1 - dist / FIELD_RADIUS;
            const force =
              falloff * falloff * (0.4 + particle.depth * 0.3);

            // Push particles away while bending their path around the cursor.
            particle.vx += (dx / dist) * force * step;
            particle.vy += (dy / dist) * force * step;
            particle.vx += (-dy / dist) * force * 0.25 * step;
            particle.vy += (dx / dist) * force * 0.25 * step;

            // Cursor movement carries a wake of dust with it.
            particle.vx += pointer.vx * 0.02 * falloff * step;
            particle.vy += pointer.vy * 0.02 * falloff * step;
          }
        }

        // Passing shooting stars shove, drag and light up nearby dust.
        for (const star of shootingStars) {
          stirParticle(particle, star, step);
        }

        particle.flash *= Math.pow(0.94, step);

        particle.vx *= damping;
        particle.vy *= damping;

        const speed = Math.hypot(particle.vx, particle.vy);
        const maxSpeed =
          MAX_SPEED * (0.65 + particle.depth * 0.35) * (1 + particle.flash * 2.2);

        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }

        particle.x += particle.vx * step;
        particle.y += particle.vy * step;

        const margin = 16;
        if (particle.x < -margin) particle.x = width + margin;
        if (particle.x > width + margin) particle.x = -margin;
        if (particle.y < -margin) particle.y = height + margin;
        if (particle.y > height + margin) particle.y = -margin;
      }
    }

    function tick(now) {
      if (!running) return;

      const dt = Math.min(Math.max(now - lastTime, 0), 34);
      lastTime = now;

      update(dt, now);
      draw(now);

      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (running || motionQuery.matches || document.hidden) return;
      running = true;
      lastTime = performance.now();
      lastScrollY = window.scrollY || window.pageYOffset || 0;
      if (nextStarAt === 0) nextStarAt = lastTime + STAR_FIRST_DELAY;
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function resize() {
      const previousWidth = width;
      const previousHeight = height;

      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        seedParticles();
      } else if (previousWidth > 0 && previousHeight > 0) {
        // Rescale instead of reseeding so mobile URL-bar resizes don't reset the field.
        const scaleX = width / previousWidth;
        const scaleY = height / previousHeight;

        for (const particle of particles) {
          particle.x *= scaleX;
          particle.y *= scaleY;
        }
      }

      if (motionQuery.matches) drawStatic();
    }

    function handleResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    }

    function handlePointerMove(event) {
      if (!pointerQuery.matches) return;

      if (!pointer.active) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.targetX = event.clientX;
        pointer.targetY = event.clientY;
        pointer.active = true;
      } else {
        pointer.targetX = event.clientX;
        pointer.targetY = event.clientY;
      }
    }

    function handlePointerOut(event) {
      if (!event.relatedTarget) pointer.active = false;
    }

    function handleBlur() {
      pointer.active = false;
    }

    function handleVisibility() {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    }

    function handleMotionChange() {
      stop();
      if (motionQuery.matches) {
        drawStatic();
      } else {
        start();
      }
    }

    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    resize();
    readTheme();
    start();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      stop();
      themeObserver.disconnect();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}

export default StarfieldBackground;
