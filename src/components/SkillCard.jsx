function SkillCard({ icon, text, invert = false }) {
  return (
    <div className="skill-card card">
      <img
        className={invert ? "invert" : undefined}
        src={icon}
        alt=""
        width="34"
        height="34"
        loading="lazy"
      />
      <span>{text}</span>
    </div>
  );
}

export default SkillCard;
