import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

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
    label: "X",
    href: "https://x.com/sanudking2",
    icon: "/images/x.png",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sudhanshu._.01/",
    icon: "/images/instagram.png",
  },
];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#skills", label: "Skills", hash: true },
  { to: "/#experience", label: "Experience", hash: true },
  { to: "/#education", label: "Education", hash: true },
  { to: "/projects", label: "Projects" },
  { to: "/writing", label: "Writing" },
  { to: "/contact", label: "Contact" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <nav className="footer-links" aria-label="Footer navigation">
          {navLinks.map((link) =>
            link.hash ? (
              <HashLink key={link.to} smooth to={link.to}>
                {link.label}
              </HashLink>
            ) : (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            )
          )}
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

      <p className="footer-quote">
        “You can’t connect the dots looking forward; you can only connect them
        looking backwards. So you have to trust that the dots will somehow
        connect in your future.”
        <span className="footer-quote-author">— Steve Jobs</span>
      </p>

      <div className="footer-bottom">
        <p>Built with ❤️ by Sudhanshu</p>
      </div>
    </footer>
  );
}

export default Footer;
