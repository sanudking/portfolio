import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const RESUME_URL =
  "https://drive.google.com/file/d/15cMswfi4aUzp7klr28q4yRgJ3a8tXWkq/view?usp=sharing";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/journal", label: "Journal" },
  { to: "/blogs", label: "Blog" },
];

// Scroll direction behaviour (all viewports): hide the bar while scrolling
// down, reveal it again as soon as the page scrolls up.
const HIDE_ON_SCROLL_DOWN = true;

function Navbar() {
  const navbarRef = useRef(null);
  const toggleRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
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

  return (
    <header
      ref={navbarRef}
      className={`navbar${navHidden ? " navbar-hidden" : ""}`}
    >
      <div className="navbar-inner">
        <nav
          id="primary-nav"
          className={`nav-links${menuOpen ? " nav-open" : ""}`}
          aria-label="Main navigation"
          // Covers re-clicking a link whose route/hash is already current,
          // where the location key never changes and the effect can't fire.
          onClick={(event) => {
            if (event.target.closest?.("a")) setMenuOpen(false);
          }}
        >
          {links.slice(0, 2).map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
          <HashLink smooth to="/#skills">
            Skills
          </HashLink>
          <HashLink smooth to="/#experience">
            Experience
          </HashLink>
          <HashLink smooth to="/#education">
            Education
          </HashLink>
          {links.slice(2).map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}

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
