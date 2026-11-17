import Inertial from "./Inertial";
import "../styles/education.css";

const education = [
  {
    institution: "Dr B R Ambedkar National Institute of Technology, Jalandhar",
    qualification: "B.Tech, Computer Science and Engineering",
    period: "2025 – 2029 (expected)",
    score: "CGPA 8.31 / 10",
    current: true,
  },
  {
    institution: "The Earth Public School, Patna",
    qualification: "Class XII — PCM",
    period: "2024",
    score: "90.3%",
  },
  {
    institution: "Holy Cross Public School, Muzaffarpur",
    qualification: "Class X",
    period: "2022",
    score: "96.4%",
  },
];

const courses = [
  "C",
  "Python",
  "Object Oriented Programming",
  "Data Structures",
  "Data Analytics and Statistics",
  "Probability and Statistics",
];

function Education() {
  return (
    <section id="education" className="section education-section">
      <Inertial className="inertial-block" depth={0.8} lag={5}>
        <div className="section-head">
          <span className="eyebrow">Academics</span>
          <h2 className="section-title">Education</h2>
          <p className="section-sub">
            Where I&apos;m studying, and the grades that got me here.
          </p>
        </div>
      </Inertial>

      <div className="education-grid">
        {education.map((item, index) => (
          <Inertial
            key={item.institution}
            className="inertial-item"
            depth={0.6}
            lag={4 + (index % 3)}
          >
            <article
              className={`education-card card${item.current ? " is-current" : ""}`}
            >
              <div className="education-top">
                <span className="education-period">{item.period}</span>
                {item.current && <span className="badge">Current</span>}
              </div>
              <h3 className="education-institution">{item.institution}</h3>
              <p className="education-qualification">{item.qualification}</p>
              <span className="education-score">{item.score}</span>
            </article>
          </Inertial>
        ))}
      </div>

      <Inertial className="education-courses card inertial-block" depth={0.5} lag={4}>
        <h3>Relevant coursework</h3>
        <ul className="stack" aria-label="Relevant coursework">
          {courses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </Inertial>
    </section>
  );
}

export default Education;
