import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/journal", label: "Journal" },
  { to: "/blogs", label: "Blog" },
  { to: "/accomplishments", label: "Accomplishments" },
];
function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="Sudhanshu Kumar — home">
          <span className="brand-mark" aria-hidden="true">
            SK
          </span>
          <span className="brand-name">Sudhanshu</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {links.slice(0, 2).map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
          <HashLink smooth to="/#skills">
            Skills
          </HashLink>
          {links.slice(2).map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="btn btn-primary btn-sm nav-cta">
          Contact
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
