import Inertial from "./Inertial";
import experience from "../data/experience";
import "../styles/experience.css";

const MONTHS = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function getDuration(item) {
  if (!item.current || !item.period) {
    return item.duration;
  }

  const match = item.period.match(/^([A-Za-z]{3})\s+(\d{4})/);
  if (!match) {
    return item.duration;
  }

  const startMonth = MONTHS[match[1].toLowerCase()];
  const startYear = Number(match[2]);
  if (startMonth === undefined || Number.isNaN(startYear)) {
    return item.duration;
  }

  const now = new Date();
  const totalMonths =
    (now.getFullYear() - startYear) * 12 + (now.getMonth() - startMonth) + 1;

  if (totalMonths < 1) {
    return item.duration;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return parts.join(" ");
}

function Experience({ id = "experience" }) {
  return (
    <section id={id} className="section experience-section">
      <Inertial className="inertial-block" depth={0.8} lag={5}>
        <div className="section-head">
          <span className="eyebrow">Where I work</span>
          <h2 className="section-title">Experience</h2>
          <p className="section-sub">
            Roles, teams and the work I do outside my own projects.
          </p>
        </div>
      </Inertial>

      <div className="experience-list">
        {experience.map((item, index) => (
          <Inertial
            key={`${item.role}-${item.org}`}
            className="inertial-item"
            depth={0.6}
            lag={4 + (index % 3)}
          >
            <article
              className={`experience-card card${item.current ? " is-current" : ""}`}
            >
              <div className="experience-logo">
                <img
                  src={item.logo}
                  alt={item.logoAlt}
                  width="56"
                  height="56"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="experience-body">
                <div className="experience-top">
                  <h3 className="experience-role">{item.role}</h3>
                  {item.current && <span className="badge">Present</span>}
                </div>

                <p className="experience-org">{item.org}</p>

                <p className="experience-meta">
                  <span>{item.period}</span>
                  {getDuration(item) && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{getDuration(item)}</span>
                    </>
                  )}
                  {item.location && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{item.location}</span>
                    </>
                  )}
                </p>

                {item.summary && (
                  <p className="experience-summary">{item.summary}</p>
                )}

                {item.highlights?.length > 0 && (
                  <ul className="experience-highlights">
                    {item.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}

                {item.tags?.length > 0 && (
                  <ul className="experience-tags" aria-label="Focus areas">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Inertial>
        ))}
      </div>
    </section>
  );
}

export default Experience;
