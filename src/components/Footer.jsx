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
  {
    label: "X",
    href: "https://x.com/sanudking2",
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
              {social.icon ? (
                <img src={social.icon} alt="" loading="lazy" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              )}
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
