import Inertial from "../components/Inertial";

function Blog() {
  return (
    <div>
      <Inertial as="header" className="page-head inertial-block" depth={0.8} lag={5}>
        <span className="eyebrow">Blog</span>
        <h1 className="page-title">Writing</h1>
        <p className="page-subtitle">
          Longer notes on the things I learn while building — deep dives,
          post-mortems and the occasional tutorial.
        </p>
      </Inertial>

      <div className="empty-state">
        <h2>First post in progress</h2>
        <p>
          I&apos;m drafting a write-up about building this portfolio. In the
          meantime, the journal has shorter, more frequent updates.
        </p>
      </div>
    </div>
  );
}

export default Blog;
