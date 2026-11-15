function Blog() {
  return (
    <div>
      <header className="page-head">
        <span className="eyebrow">Blog</span>
        <h1 className="page-title">Writing</h1>
        <p className="page-subtitle">
          Longer notes on the things I learn while building — deep dives,
          post-mortems and the occasional tutorial.
        </p>
      </header>

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
