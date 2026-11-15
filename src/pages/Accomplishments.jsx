import Inertial from "../components/Inertial";

function Accomplishments() {
  return (
    <div>
      <Inertial as="header" className="page-head inertial-block" depth={0.8} lag={5}>
        <span className="eyebrow">Milestones</span>
        <h1 className="page-title">Accomplishments</h1>
        <p className="page-subtitle">
          A short list of things I&apos;m proud of — academic, competitive and
          project milestones.
        </p>
      </Inertial>

      <div className="empty-state">
        <h2>Write-up coming soon</h2>
        <p>
          This page is being put together. For now, the projects page is the best
          look at what I&apos;ve built.
        </p>
      </div>
    </div>
  );
}

export default Accomplishments;
