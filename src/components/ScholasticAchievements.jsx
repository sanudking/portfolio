import Inertial from "./Inertial";
import scholasticAchievements from "../data/achievements";
import "../styles/achievements.css";

function ScholasticAchievements({ id = "achievements" }) {
  return (
    <section id={id} className="section achievements-section">
      <Inertial className="inertial-block" depth={0.7} lag={5}>
        <div className="section-head">
          <span className="eyebrow">Scholastic</span>
          <h2 className="section-title">Achievements</h2>
          <p className="section-sub">
            Hackathons, competitions and academic results.
          </p>
        </div>
      </Inertial>

      <div className="achievements-grid">
        {scholasticAchievements.map((item, index) => (
          <Inertial
            key={`${item.title}-${item.badge}`}
            className="inertial-item"
            depth={0.6}
            lag={4 + (index % 3)}
          >
            <article className="achievement-card card">
              <div className="achievement-top">
                <span className={`badge${item.tone === "alt" ? " alt" : ""}`}>
                  {item.badge}
                </span>
                {item.year && (
                  <span className="achievement-year">{item.year}</span>
                )}
              </div>
              <h3>{item.title}</h3>
              <p className="achievement-venue">{item.venue}</p>
            </article>
          </Inertial>
        ))}
      </div>
    </section>
  );
}

export default ScholasticAchievements;
