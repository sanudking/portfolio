import SkillCard from "./SkillCard";
import Inertial from "./Inertial";
import "../styles/skills.css";

const skillsData = [
  // Languages
  { text: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { text: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { text: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { text: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { text: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  // Frontend
  { text: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { text: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { text: "Framer Motion", icon: "https://cdn.simpleicons.org/framer" },
  { text: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", invert: true },
  // Backend & data
  { text: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { text: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
  { text: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { text: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  // AI & computer vision
  { text: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { text: "MediaPipe", icon: "https://cdn.simpleicons.org/mediapipe" },
  { text: "YOLO", icon: "https://cdn.simpleicons.org/yolo/93c5fd" },
  { text: "LangChain", icon: "https://cdn.simpleicons.org/langchain" },
  // Tools & cloud
  { text: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { text: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
  { text: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { text: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { text: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { text: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain.svg" },
  { text: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
];

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <Inertial className="inertial-block" depth={0.8} lag={5}>
        <div className="section-head">
          <span className="eyebrow">Toolbox</span>
          <h2 className="section-title">Skills &amp; technologies</h2>
          <p className="section-sub">
            The stack I reach for when turning an idea into a working product.
          </p>
        </div>
      </Inertial>

      <div className="skills-grid">
        {skillsData.map((skill, index) => (
          <Inertial
            key={skill.text}
            className="inertial-item"
            depth={0.6}
            lag={4 + (index % 3)}
          >
            <SkillCard
              icon={skill.icon}
              text={skill.text}
              invert={skill.invert}
            />
          </Inertial>
        ))}
      </div>
    </section>
  );
}

export default Skills;
