import { Link, useLocation } from "react-router-dom";
import Inertial from "../components/Inertial";

function NotFound() {
  const { pathname } = useLocation();

  return (
    <div>
      <Inertial as="header" className="page-head inertial-block" depth={0.8} lag={5}>
        <span className="eyebrow">404</span>
        <h1 className="page-title">Lost in space</h1>
        <p className="page-subtitle">
          <code>{pathname}</code> doesn&apos;t exist on this site.
        </p>
      </Inertial>

      <div className="empty-state">
        <h2>Nothing orbiting here</h2>
        <p>The page may have moved, or the link might be mistyped.</p>
        <div className="cta-actions" style={{ marginTop: 20 }}>
          <Link className="btn btn-primary" to="/">
            Back home
          </Link>
          <Link className="btn btn-ghost" to="/projects">
            Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
