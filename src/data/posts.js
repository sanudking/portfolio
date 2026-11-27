import BuildingThisPortfolio from "../content/posts/building-this-portfolio";

/**
 * Essays, newest first. Adding a post means adding a body component under
 * src/content/posts and one entry here — the listing, routing and page
 * metadata all read from this array.
 */
const posts = [
  {
    slug: "building-this-portfolio",
    title:
      "Building this portfolio: 3D planets, scroll physics and a theme that follows you",
    date: "2026-11-22",
    readingTime: "8 min read",
    tags: ["React", "Vite", "Framer Motion", "Canvas", "Accessibility"],
    excerpt:
      "A tour of the decisions behind this site — a lazy-loaded 3D planet that doubles as a theme switcher, a canvas starfield that reacts to scroll velocity, and motion that gets out of the way when you ask it to.",
    Body: BuildingThisPortfolio,
  },
];

/** "2026-11-22" -> "22 November 2026", without timezone drift. */
export const formatPostDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export default posts;
