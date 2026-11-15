import SkillCard from "./SkillCard";
import "../styles/skills.css";

const skillsData = [
  { text: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { text: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { text: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { text: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { text: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { text: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
  { text: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { text: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { text: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="section-head">
        <span className="eyebrow">Toolbox</span>
        <h2 className="section-title">Skills &amp; technologies</h2>
        <p className="section-sub">
          The stack I reach for when turning an idea into a working product.
        </p>
      </div>

      <div className="skills-grid">
        {skillsData.map((skill) => (
          <SkillCard
            key={skill.text}
            icon={skill.icon}
            text={skill.text}
            invert={skill.invert}
          />
        ))}
      </div>
    </section>
  );
}

export default Skills;
