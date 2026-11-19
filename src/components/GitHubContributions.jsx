import { useEffect, useMemo, useState } from "react";
import Inertial from "./Inertial";
import "../styles/github.css";

const API_URL =
  "https://github-contributions-api.jogruber.de/v4/sanudking?y=last";
const GITHUB_URL = "https://github.com/sanudking";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Weekday labels sit on rows 1, 3 and 5 so they can never collide with the
// month labels above and stay short enough for the narrow gutter.
const ROW_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function formatDate(iso) {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function buildWeeks(contributions) {
  if (!contributions.length) return [];

  // The API range does not start on a Sunday, so pad the first column with
  // empty cells to keep every column aligned to real weekdays.
  const leading = new Date(`${contributions[0].date}T00:00:00`).getDay();
  const cells = [
    ...Array.from({ length: leading }, () => null),
    ...contributions,
  ];

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function GitHubContributions() {
  const [contributions, setContributions] = useState(null);
  const [total, setTotal] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadContributions() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (cancelled) return;

        const days = Array.isArray(data.contributions) ? data.contributions : [];
        const lastYear =
          data.total?.lastYear ??
          days.reduce((sum, day) => sum + (day.count ?? 0), 0);

        setContributions(days);
        setTotal(lastYear);
      } catch (err) {
        console.error("Error fetching GitHub contributions:", err);
        if (!cancelled) setFailed(true);
      }
    }

    loadContributions();

    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(
    () => (contributions ? buildWeeks(contributions) : []),
    [contributions]
  );

  // Label the column where each new month first appears, like GitHub does.
  // Dedupe on year + month: the range spans two Novembers (a partial one at
  // each edge), so keying on the month alone would swallow the current one.
  const monthLabels = useMemo(() => {
    const seen = new Set();
    return weeks.map((week) => {
      const first = week.find(Boolean);
      if (!first) return "";
      const date = new Date(`${first.date}T00:00:00`);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (seen.has(key)) return "";
      seen.add(key);
      return MONTH_LABELS[date.getMonth()];
    });
  }, [weeks]);

  const columnCount = weeks.length || 53;

  // Optional widget — never leave a broken section on the page.
  if (failed) return null;

  const isLoading = contributions === null;

  return (
    <section id="github" className="section github-section">
      <Inertial className="inertial-block" depth={0.8} lag={5}>
        <div className="section-head">
          <span className="eyebrow">Open source</span>
          <h2 className="section-title">Contribution activity</h2>
          <p className="section-sub">
            {total === null ? (
              "Loading the last year of commits, reviews and issues…"
            ) : (
              <>
                <strong>{total}</strong> contributions in the last year on{" "}
                <a
                  className="github-link"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                .
              </>
            )}
          </p>
        </div>
      </Inertial>

      <Inertial className="inertial-block" depth={0.5} lag={4}>
        <div className="github-card card">
          <div className="github-body">
            <div className="github-weekdays" aria-hidden="true">
              {ROW_LABELS.map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>

            <div className="github-plot">
              <div
                className="github-months"
                aria-hidden="true"
                style={{
                  gridTemplateColumns: `repeat(${columnCount}, minmax(var(--cell), 1fr))`,
                }}
              >
                {isLoading
                  ? Array.from({ length: columnCount }, (_, i) => (
                      <span key={i} />
                    ))
                  : monthLabels.map((label, i) => <span key={i}>{label}</span>)}
              </div>

              <div
                className="github-grid"
                style={{
                  gridTemplateColumns: `repeat(${columnCount}, minmax(var(--cell), 1fr))`,
                }}
                role="img"
                aria-label={
                  isLoading
                    ? "Loading GitHub contribution activity"
                    : `${total} GitHub contributions in the last year`
                }
              >
                {isLoading
                  ? Array.from({ length: columnCount * 7 }, (_, i) => (
                      <span
                        key={i}
                        className="github-cell"
                        data-level="0"
                      />
                    ))
                  : weeks.map((week, weekIndex) =>
                      week.map((day, dayIndex) => (
                        <span
                          key={`${weekIndex}-${dayIndex}`}
                          className="github-cell"
                          data-level={day ? day.level : 0}
                          title={
                            day
                              ? `${day.count} contribution${
                                  day.count === 1 ? "" : "s"
                                } on ${formatDate(day.date)}`
                              : undefined
                          }
                        />
                      ))
                    )}
              </div>
            </div>
          </div>

          <div className="github-footer">
            <span className="github-legend" aria-hidden="true">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <span key={level} className="github-cell" data-level={level} />
              ))}
              <span>More</span>
            </span>
            <a
              className="github-link"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </Inertial>
    </section>
  );
}

export default GitHubContributions;
