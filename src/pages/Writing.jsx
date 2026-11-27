import { useEffect } from "react";
import { Link } from "react-router-dom";
import Inertial from "../components/Inertial";
import entries from "../data/journal";
import posts, { formatPostDate } from "../data/posts";
import "../styles/blog.css";
import "../styles/journal.css";

function Writing() {
  // Deep links such as /writing#learning-log (and the old /journal redirect)
  // target the log section, which only exists after this page renders.
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div>
      <Inertial
        as="header"
        className="page-head inertial-block"
        depth={0.8}
        lag={5}
      >
        <span className="eyebrow">Words</span>
        <h1 className="page-title">Writing</h1>
        <p className="page-subtitle">
          Long-form notes on the things I build, and a shorter log of what
          I&apos;m learning along the way.
        </p>
      </Inertial>

      <section aria-labelledby="essays">
        <div className="section-head">
          <h2 className="section-title" id="essays">
            Essays
          </h2>
          <p className="section-sub">
            Deep dives, post-mortems and the occasional tutorial.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <h2>First essay in progress</h2>
            <p>
              I&apos;m drafting a write-up about building this portfolio. The
              learning log below is updated more often.
            </p>
          </div>
        ) : (
          <div className="post-list">
            {posts.map((post) => (
              <Inertial
                key={post.slug}
                className="inertial-item"
                depth={0.7}
                lag={6}
              >
                <article className="post-card card">
                  <div className="post-meta">
                    <time dateTime={post.date}>
                      {formatPostDate(post.date)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h3 className="post-card-title">
                    <Link to={`/writing/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="post-card-excerpt">{post.excerpt}</p>

                  <div className="post-card-footer">
                    <ul className="post-tags" aria-label="Tags">
                      {post.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>

                    <Link className="post-read" to={`/writing/${post.slug}`}>
                      Read essay <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </Inertial>
            ))}
          </div>
        )}
      </section>

      <section
        id="learning-log"
        className="section writing-log"
        aria-labelledby="learning-log-title"
      >
        <div className="section-head">
          <h2 className="section-title" id="learning-log-title">
            Learning log
          </h2>
          <p className="section-sub">
            Short updates on what I study, build and break — newest first.
          </p>
        </div>

        <div className="timeline">
          {entries.map((entry) => (
            <Inertial
              key={entry.date}
              className="inertial-item"
              depth={0.7}
              lag={6}
            >
              <article className="entry">
                <h3>{entry.date}</h3>
                <p>{entry.text}</p>
              </article>
            </Inertial>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Writing;
