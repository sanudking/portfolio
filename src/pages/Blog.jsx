import { Link } from "react-router-dom";
import Inertial from "../components/Inertial";
import posts, { formatPostDate } from "../data/posts";
import "../styles/blog.css";

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

      {posts.length === 0 ? (
        <div className="empty-state">
          <h2>First post in progress</h2>
          <p>
            I&apos;m drafting a write-up about building this portfolio. In the
            meantime, the journal has shorter, more frequent updates.
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
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>

                <h2 className="post-card-title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="post-card-excerpt">{post.excerpt}</p>

                <div className="post-card-footer">
                  <ul className="post-tags" aria-label="Tags">
                    {post.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <Link className="post-read" to={`/blog/${post.slug}`}>
                    Read post <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </Inertial>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
