import { Link, useParams } from "react-router-dom";
import Inertial from "../components/Inertial";
import posts, { formatPostDate } from "../data/posts";
import NotFound from "./NotFound";
import "../styles/blog.css";

function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) return <NotFound />;

  const Body = post.Body;

  return (
    <article className="post">
      <Inertial
        as="header"
        className="page-head inertial-block post-head"
        depth={0.8}
        lag={5}
      >
        <Link className="post-back" to="/writing">
          <span aria-hidden="true">←</span> All writing
        </Link>

        <span className="eyebrow">Writing</span>
        <h1 className="page-title post-title">{post.title}</h1>
        <p className="page-subtitle post-subtitle">{post.excerpt}</p>

        <div className="post-meta post-meta-head">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>

        <ul className="post-tags" aria-label="Tags">
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </Inertial>

      <div className="post-body">
        <Body />
      </div>

      <footer className="post-footer card">
        <h2>That&apos;s the tour</h2>
        <p>
          If you want to talk about any of this — or you spotted a simpler way
          to do it — I&apos;m easy to reach.
        </p>
        <div className="cta-actions">
          <Link className="btn btn-primary" to="/contact">
            Get in touch
          </Link>
          <Link className="btn btn-ghost" to="/writing">
            Back to writing
          </Link>
        </div>
      </footer>
    </article>
  );
}

export default BlogPost;
