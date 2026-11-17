import Inertial from "./Inertial";
import readingList from "../data/reading";
import "../styles/reading.css";

function Reading() {
  return (
    <section id="reading" className="section reading-section">
      <Inertial className="inertial-block" depth={0.8} lag={5}>
        <div className="section-head">
          <span className="eyebrow">On my desk</span>
          <h2 className="section-title">Currently reading</h2>
          <p className="section-sub">
            Books and papers shaping how I think about systems, browser
            networking and LLM inference.
          </p>
        </div>
      </Inertial>

      <Inertial className="inertial-block" depth={0.5} lag={4}>
        <ul className="reading-list">
          {readingList.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </Inertial>
    </section>
  );
}

export default Reading;
