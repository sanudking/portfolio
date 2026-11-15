import "../styles/contact.css";

const channels = [
  {
    label: "Email",
    value: "sanudking@gmail.com",
    href: "mailto:sanudking@gmail.com",
    hint: "Best for internships, freelance and anything detailed.",
  },
  {
    label: "GitHub",
    value: "@sanudking",
    href: "https://github.com/sanudking",
    hint: "Source code for most of what I build.",
  },
  {
    label: "LinkedIn",
    value: "Sudhanshu Kumar",
    href: "https://www.linkedin.com/in/sudhanshu-kumar-9ba993239/",
    hint: "Say hello or connect professionally.",
  },
  {
    label: "Instagram",
    value: "@sudhanshu._.01",
    href: "https://www.instagram.com/sudhanshu._.01/",
    hint: "The non-code side of things.",
  },
];

function Contact() {
  return (
    <div>
      <header className="page-head">
        <span className="eyebrow">Contact</span>
        <h1 className="page-title">Let&apos;s talk</h1>
        <p className="page-subtitle">
          Whether it&apos;s a project, an internship or just a question about
          something I built — my inbox is open and I usually reply within a day
          or two.
        </p>
      </header>

      <div className="contact-grid">
        {channels.map((channel) => (
          <a
            key={channel.label}
            className="contact-card card"
            href={channel.href}
            target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={channel.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          >
            <span className="label">{channel.label}</span>
            <span className="value">{channel.value}</span>
            <span className="hint">{channel.hint}</span>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>

      <div className="contact-note">
        <h2>Based in Jalandhar, India</h2>
        <p>
          Currently studying Computer Science at NIT Jalandhar and building
          side projects in the evenings. Open to remote work and
          on-campus opportunities.
        </p>
      </div>
    </div>
  );
}

export default Contact;
