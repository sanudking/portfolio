import { useEffect, useState } from "react";

const API_BASE = "https://abacus.jasoncameron.dev";
const NAMESPACE = "sanudking";
const KEY = "portfolio-visits-2026";
const TIMEOUT_MS = 8000;

const VisitorCounter = () => {
  const [views, setViews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    let cancelled = false;

    async function trackVisit() {
      try {
        const response = await fetch(
          `${API_BASE}/hit/${NAMESPACE}/${KEY}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        if (typeof data?.value !== "number") {
          throw new Error("Unexpected counter payload");
        }
        if (!cancelled) setViews(data.value);
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching visitor count:", err);
        }
      } finally {
        clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      }
    }

    trackVisit();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
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
          Total portfolio visits: <strong>{views.toLocaleString()}</strong>
        </>
      )}
    </p>
  );
};

export default VisitorCounter;
