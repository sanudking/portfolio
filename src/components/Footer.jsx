import { Link } from "react-router-dom";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/sanudking",
    icon: "/images/github.png",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sudhanshu-kumar-9ba993239/",
    icon: "/images/linkedin.png",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sudhanshu._.01/",
    icon: "/images/instagram.png",
  },
];

const navLinks = [
  { to: "/projects", label: "Projects" },
  { to: "/journal", label: "Journal" },
  { to: "/blogs", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              SK
            </span>
            <span className="brand-name">Sudhanshu</span>
          </Link>
          <p className="footer-tagline">
            Full-stack developer · CSE @ NIT Jalandhar
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="socials">
          {socials.map((social) => (
            <a
              key={social.label}
              className="social-btn"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
            >
              <img src={social.icon} alt="" loading="lazy" />
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Sudhanshu Kumar · Built with React, Vite & Framer Motion</p>
      </div>
    </footer>
  );
}

export default Footer;
