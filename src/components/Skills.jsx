import React from 'react';
import IconButton from './IconButton';
import '../styles/skills.css'
function Skills() {
  const skillsData = [
    { 
      text: 'HTML5', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' 
    },
    { 
      text: 'CSS3', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' 
    },
    { 
      text: 'JavaScript', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' 
    },
    { 
      text: 'React', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' 
    },
    { 
      text: 'Node.js', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' 
    },
    { 
      text: 'Express', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' 
    },
    { 
      text: 'MongoDB', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' 
    },
    { 
      text: 'PostgreSQL', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' 
    },
    { 
      text: 'Git', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' 
    }
  ];

  return (
    <section id="skills" className="skills-section" >
        <br/>        <br/>
        <br/>        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>


      <h1>Skills</h1>
      <div className="skills-grid">
        {skillsData.map((skill) => (
          <IconButton 
            key={skill.text} 
            icon={skill.icon} 
            text={skill.text} 
          />
        ))}
      </div>
    </section>
  );
}

export default Skills;