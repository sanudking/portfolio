import Inertial from "../components/Inertial";
import ScholasticAchievements from "../components/ScholasticAchievements";
import "../styles/accomplishments.css";

const highlights = [
  { value: "8.31 / 10", label: "CGPA at NIT Jalandhar" },
  { value: "250+", label: "LeetCode problems solved" },
  { value: "3×", label: "Third-place hackathon finishes" },
];

const activities = [
  {
    tag: "Competitive programming",
    title: "LeetCode",
    detail: "Solved 250+ data structures and algorithms problems.",
  },
  {
    tag: "Open source",
    title: "GirlScript Summer of Code 2026",
    detail: "Contributor to open-source projects through GSSoC.",
  },
  {
    tag: "Training",
    title: "Competitiveness Mindset Institute",
    detail:
      "Completed a soft-skills program by CMI and received a certificate.",
  },
];

function Accomplishments() {
  return (
    <div>
      <Inertial as="header" className="page-head inertial-block" depth={0.8} lag={5}>
        <span className="eyebrow">Milestones</span>
        <h1 className="page-title">Accomplishments</h1>
        <p className="page-subtitle">
          A short list of things I&apos;m proud of — academic, competitive and
          project milestones.
        </p>
      </Inertial>

      <div className="accolade-stats">
        {highlights.map((highlight, index) => (
          <Inertial
            key={highlight.label}
            className="inertial-item"
            depth={0.6}
            lag={4 + (index % 3)}
          >
            <div className="accolade-stat card">
              <strong>{highlight.value}</strong>
              <span>{highlight.label}</span>
            </div>
          </Inertial>
        ))}
      </div>

      <ScholasticAchievements />

      <section className="section">
        <Inertial className="inertial-block" depth={0.7} lag={5}>
          <div className="section-head">
            <span className="eyebrow">Beyond the code</span>
            <h2 className="section-title">Extra curricular</h2>
            <p className="section-sub">
              Practice, community and the non-technical side of growth.
            </p>
          </div>
        </Inertial>

        <div className="activity-grid">
          {activities.map((activity, index) => (
            <Inertial
              key={activity.title}
              className="inertial-item"
              depth={0.6}
              lag={4 + (index % 3)}
            >
              <article className="activity-card card">
                <span className="activity-tag">{activity.tag}</span>
                <h3>{activity.title}</h3>
                <p>{activity.detail}</p>
              </article>
            </Inertial>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Accomplishments;
