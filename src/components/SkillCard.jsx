function SkillCard({ icon, text, invert = false }) {
  return (
    <span className="skill-chip">
      <img
        className={invert ? "invert" : undefined}
        src={icon}
        alt=""
        width="18"
        height="18"
        loading="lazy"
      />
      <span>{text}</span>
    </span>
  );
}

export default SkillCard;
