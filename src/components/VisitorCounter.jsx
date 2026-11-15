import { useEffect, useState } from "react";
import { Counter } from "counterapi";

const counter = new Counter({ workspace: "my-portfolio-workspace" });

const VisitorCounter = () => {
  const [views, setViews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function trackVisit() {
      try {
        const result = await counter.up("portfolio-page-views");
        const countValue =
          result.value ??
          result.data?.value ??
          result.data?.up_count ??
          result.data?.count ??
          result.count;
        if (!cancelled) setViews(countValue);
      } catch (err) {
        console.error("Error fetching visitor count:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    trackVisit();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!loading && (views === null || views === undefined)) {
    // The counter service is optional — don't leave a broken widget on the page.
    return null;
  }

  return (
    <p className="visitor-count" aria-live="polite">
      <span aria-hidden="true">👀</span>
      {loading ? (
        "Counting visits…"
      ) : (
        <>
          Total portfolio visits: <strong>{views}</strong>
        </>
      )}
    </p>
  );
};

export default VisitorCounter;
