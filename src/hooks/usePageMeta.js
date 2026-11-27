import { useEffect } from "react";
import posts from "../data/posts";

const SITE_NAME = "Sudhanshu Kumar";
const BASE_TITLE = "Sudhanshu Kumar — Full-stack developer";
const BASE_DESCRIPTION =
  "Sudhanshu Kumar — full-stack developer and CSE undergrad at NIT Jalandhar. Projects, writing and contact.";

const META = {
  "/": {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION,
  },
  "/projects": {
    title: `Projects — ${SITE_NAME}`,
    description:
      "Selected projects: distributed LLM inference, 3D physics simulations, computer-vision tooling and this portfolio.",
  },
  "/writing": {
    title: `Writing — ${SITE_NAME}`,
    description:
      "Essays and a learning log on what I build and study — JavaScript internals, low-level design, DSA and side projects.",
  },
  "/contact": {
    title: `Contact — ${SITE_NAME}`,
    description:
      "Get in touch about internships, freelance work or anything I've built. Based in Jalandhar, India.",
  },
  "/accomplishments": {
    title: `Accomplishments — ${SITE_NAME}`,
    description:
      "Hackathon results, competitive programming progress and scholastic achievements at NIT Jalandhar.",
  },
};

const NOT_FOUND = {
  title: `Page not found — ${SITE_NAME}`,
  description: "This page doesn't exist.",
};

/**
 * Fixed pages come from META; essays are resolved from the post data so each
 * one gets its own title, description and canonical URL.
 */
function resolveMeta(path) {
  const match = path.match(/^\/(?:writing|blogs?)\/([^/]+)$/);
  if (match) {
    const post = posts.find((entry) => entry.slug === match[1]);
    if (post) {
      return {
        title: `${post.title} — ${SITE_NAME}`,
        description: post.excerpt,
        type: "article",
        canonicalPath: `/writing/${post.slug}`,
      };
    }
  }

  return META[path] ?? NOT_FOUND;
}

function setMetaTag(attr, key, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Keeps the document title, description and social tags in sync with the
 * current route. Without this every page shared the root title, so tabs,
 * bookmarks and search results were indistinguishable.
 */
export default function usePageMeta(pathname) {
  useEffect(() => {
    const path = pathname?.replace(/\/+$/, "") || "/";
    const meta = resolveMeta(path);
    const canonicalPath = meta.canonicalPath ?? path;

    document.title = meta.title;
    setMetaTag("name", "description", meta.description);
    setMetaTag("property", "og:title", meta.title);
    setMetaTag("property", "og:description", meta.description);
    setMetaTag("property", "og:type", meta.type ?? "website");
    setMetaTag("property", "og:url", `https://sudhanshu.dev${canonicalPath}`);
    setMetaTag("name", "twitter:title", meta.title);
    setMetaTag("name", "twitter:description", meta.description);

    // Canonical link keeps the clean URL as the indexed one.
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://sudhanshu.dev${canonicalPath}`);
  }, [pathname]);
}
