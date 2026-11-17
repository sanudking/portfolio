import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const RESUME_URL =
  "https://drive.google.com/file/d/15cMswfi4aUzp7klr28q4yRgJ3a8tXWkq/view?usp=sharing";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/journal", label: "Journal" },
  { to: "/blogs", label: "Blog" },
];
function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <nav className="nav-links" aria-label="Main navigation">
          {links.slice(0, 2).map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
          <HashLink smooth to="/#skills">
            Skills
          </HashLink>
          <HashLink smooth to="/#education">
            Education
          </HashLink>
          {links.slice(2).map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <a
            href={RESUME_URL}
            className="btn btn-ghost btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
          <Link to="/contact" className="btn btn-primary btn-sm nav-cta">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
