import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const RESUME_URL =
  "https://drive.google.com/file/d/1DlFhwU-qSJFwjmpYTiC4WKLnkB_q7GTf/view?usp=sharing";

// Scroll direction behaviour (all viewports): hide the bar while scrolling
// down, reveal it again as soon as the page scrolls up.
const HIDE_ON_SCROLL_DOWN = true;

function Navbar() {
  const navbarRef = useRef(null);
  const navLinksRef = useRef(null);
  const toggleRef = useRef(null);
  const pointerYRef = useRef(null);
  const scrollIndexRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { pathname, hash } = useLocation();

  // Close the mobile menu on navigation (including hash-only changes) by
  // adjusting state during render rather than in an effect.
  const locationKey = `${pathname}${hash}`;
  const [lastLocationKey, setLastLocationKey] = useState(locationKey);
  if (locationKey !== lastLocationKey) {
    setLastLocationKey(locationKey);
    setMenuOpen(false);
    setNavHidden(false);
  }

  // Escape closes the menu and hands focus back to the toggle.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    // Leaving mobile while the panel is open would otherwise leave the body
    // permanently scroll-locked, since the panel no longer needs the lock.
    const desktop = window.matchMedia("(min-width: 961px)");
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    const onPointerDown = (event) => {
      const navbar = navbarRef.current;
      if (navbar && !navbar.contains(event.target)) setMenuOpen(false);
    };

    // Lock background scrolling while the panel is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (window.matchMedia("(min-width: 961px)").matches) {
        setNavHidden(false);
        return;
      }
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;

      // Ignore tiny jitters and the top of the page.
      if (Math.abs(delta) < 6) return;
      lastY = y;

      if (y < 40) {
        setNavHidden(false);
        return;
      }

      const movingDown = delta > 0;
      setNavHidden(movingDown === HIDE_ON_SCROLL_DOWN);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    // Anchor jumps and route changes reset the scroll position, so drop any
    // hidden state rather than leaving the bar off-screen at the top.
    const onResize = () => setNavHidden(false);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Keep --nav-h-actual in sync so anchor targets clear the sticky bar.
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const updateNavHeight = () => {
      document.documentElement.style.setProperty(
        "--nav-h-actual",
        `${navbar.getBoundingClientRect().height}px`
      );
    };

    updateNavHeight();
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateNavHeight)
        : null;
    observer?.observe(navbar);
    window.addEventListener("resize", updateNavHeight);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateNavHeight);
      document.documentElement.style.removeProperty("--nav-h-actual");
    };
  }, []);

  // Auto-detect which home section is in view while scrolling, and compute a
  // continuous floating-point index for the dock zoom wave.
  useEffect(() => {
    if (pathname !== "/") {
      scrollIndexRef.current = pathname.startsWith("/projects") ? 2 : null;
      return;
    }

    const sectionIds = [
      "experience",
      "featured-projects",
      "skills",
      "education",
      "achievements",
      "github",
      "reading",
    ];
    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const triggerY = window.innerHeight * 0.42;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0 && window.scrollY >= maxScroll - 24) {
        scrollIndexRef.current = sectionIds.length;
        setActiveSection("reading");
        return;
      }

      const positions = [];
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        const top = el ? el.getBoundingClientRect().top : Infinity;
        positions.push(top);
        if (el && top <= triggerY) {
          current = id;
        }
      }

      // Compute continuous index: 0..1 from scrollY=0 to first section, then
      // between each pair of consecutive sections straddling triggerY.
      let continuous = 0;
      const firstTop = positions[0];
      if (firstTop > triggerY) {
        const firstScrollTarget = firstTop + window.scrollY - triggerY;
        continuous =
          firstScrollTarget > 0
            ? Math.max(0, window.scrollY / firstScrollTarget)
            : 0;
      } else {
        continuous = 1;
        for (let i = 0; i < positions.length - 1; i++) {
          const a = positions[i];
          const b = positions[i + 1];
          if (triggerY >= a && triggerY <= b && b > a) {
            continuous = i + 1 + (triggerY - a) / (b - a);
            break;
          }
          if (triggerY > b) {
            continuous = i + 2;
          }
        }
      }

      scrollIndexRef.current = Math.max(
        0,
        Math.min(sectionIds.length, continuous)
      );
      setActiveSection(window.scrollY < 40 ? "home" : current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Smooth, continuous dock-wave zoom driven by cursor position or scroll.
  useEffect(() => {
    const navEl = navLinksRef.current;
    if (!navEl) return;

    const desktopQuery = window.matchMedia("(min-width: 961px)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const spans = Array.from(
      navEl.querySelectorAll("a:not(.nav-writing):not(.nav-resume-mobile) > span")
    );
    const links = spans.map((s) => s.parentElement);
    const scales = spans.map(() => 1);
    let rafId = 0;
    let running = false;

    const clearTransforms = () => {
      for (let i = 0; i < spans.length; i++) {
        scales[i] = 1;
        spans[i].style.transform = "";
      }
    };

    const step = () => {
      if (!desktopQuery.matches || reducedQuery.matches) {
        clearTransforms();
        running = false;
        return;
      }

      const pointerY = pointerYRef.current;
      let focusIndex = scrollIndexRef.current;

      if (pointerY !== null && links.length > 0) {
        const firstRect = links[0].getBoundingClientRect();
        const lastRect = links[links.length - 1].getBoundingClientRect();
        const stepH =
          links.length > 1
            ? (lastRect.top + lastRect.height / 2 - (firstRect.top + firstRect.height / 2)) /
              (links.length - 1)
            : firstRect.height;
        const firstCenter = firstRect.top + firstRect.height / 2;
        if (stepH > 0) {
          focusIndex = Math.max(
            0,
            Math.min(links.length - 1, (pointerY - firstCenter) / stepH)
          );
        }
      }

      const sigma = 1.65;
      const maxBoost = 0.48;
      let settled = true;

      for (let i = 0; i < spans.length; i++) {
        let target = 1;
        if (focusIndex !== null) {
          const dist = i - focusIndex;
          target = 1 + maxBoost * Math.exp(-(dist * dist) / (2 * sigma * sigma));
        }
        const diff = target - scales[i];
        if (Math.abs(diff) > 0.001) {
          scales[i] += diff * 0.22;
          settled = false;
        } else {
          scales[i] = target;
        }
        spans[i].style.transform = `scale(${scales[i].toFixed(4)})`;
      }

      if (!settled) {
        rafId = window.requestAnimationFrame(step);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (running) return;
      running = true;
      rafId = window.requestAnimationFrame(step);
    };

    const onPointerMove = (e) => {
      if (e.target.closest?.(".nav-writing")) {
        if (pointerYRef.current !== null) {
          pointerYRef.current = null;
          kick();
        }
        return;
      }
      pointerYRef.current = e.clientY;
      kick();
    };

    const onPointerLeave = () => {
      pointerYRef.current = null;
      kick();
    };

    kick();
    navEl.addEventListener("pointermove", onPointerMove);
    navEl.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    desktopQuery.addEventListener("change", kick);
    reducedQuery.addEventListener("change", kick);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      navEl.removeEventListener("pointermove", onPointerMove);
      navEl.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      desktopQuery.removeEventListener("change", kick);
      reducedQuery.removeEventListener("change", kick);
      clearTransforms();
    };
  }, [pathname]);

  return (
    <header
      ref={navbarRef}
      className={`navbar${navHidden ? " navbar-hidden" : ""}`}
    >
      <div className="navbar-inner">
        <nav
          ref={navLinksRef}
          id="primary-nav"
          className={`nav-links${menuOpen ? " nav-open" : ""}`}
          aria-label="Main navigation"
          // Covers re-clicking a link whose route/hash is already current,
          // where the location key never changes and the effect can't fire.
          onClick={(event) => {
            if (event.target.closest?.("a")) setMenuOpen(false);
          }}
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive && (pathname !== "/" || activeSection === "home")
                ? "active"
                : undefined
            }
          >
            <span>Home</span>
          </NavLink>
          <HashLink
            smooth
            to="/#experience"
            className={
              pathname === "/" && activeSection === "experience"
                ? "active"
                : undefined
            }
          >
            <span>Experience</span>
          </HashLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive || (pathname === "/" && activeSection === "featured-projects")
                ? "active"
                : undefined
            }
          >
            <span>
              <i className="nav-dot" aria-hidden="true" />
              Projects
            </span>
          </NavLink>
          <HashLink
            smooth
            to="/#skills"
            className={
              pathname === "/" && activeSection === "skills"
                ? "active"
                : undefined
            }
          >
            <span>Skills</span>
          </HashLink>
          <HashLink
            smooth
            to="/#education"
            className={
              pathname === "/" && activeSection === "education"
                ? "active"
                : undefined
            }
          >
            <span>Education</span>
          </HashLink>
          <HashLink
            smooth
            to="/#achievements"
            className={
              pathname === "/" && activeSection === "achievements"
                ? "active"
                : undefined
            }
          >
            <span>Achievements</span>
          </HashLink>
          <HashLink
            smooth
            to="/#github"
            className={
              pathname === "/" && activeSection === "github"
                ? "active"
                : undefined
            }
          >
            <span>GitHub</span>
          </HashLink>
          <HashLink
            smooth
            to="/#reading"
            className={
              pathname === "/" && activeSection === "reading"
                ? "active"
                : undefined
            }
          >
            <span>Reading</span>
          </HashLink>
          <NavLink
            to="/writing"
            className={({ isActive }) =>
              isActive ? "nav-writing active" : "nav-writing"
            }
          >
            <span>
              <i className="nav-dot" aria-hidden="true" />
              Writing
            </span>
          </NavLink>

          {/* Surfaced inside the mobile panel only. */}
          <a
            className="nav-resume-mobile"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className="nav-actions">
          <a
            href={RESUME_URL}
            className="btn btn-ghost btn-sm nav-resume"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
          <Link to="/contact" className="btn btn-primary btn-sm nav-cta">
            Contact
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className={`nav-toggle${menuOpen ? " is-open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              // The panel hangs below the bar, so a hidden bar would leave it
              // off-screen. Reveal the bar whenever the menu is opened.
              setMenuOpen((open) => !open);
              setNavHidden(false);
            }}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
