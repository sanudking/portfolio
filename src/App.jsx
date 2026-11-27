import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import StarfieldBackground from "./components/StarfieldBackground";
import ScrollPhysicsProvider from "./components/ScrollPhysicsProvider";
import RouteEffects from "./components/RouteEffects";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Writing from "./pages/Writing";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Accomplishments from "./pages/Accomplishments";
import NotFound from "./pages/NotFound";

// Old post links still resolve; only the canonical URL changed.
function LegacyPostRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/writing/${slug}`} replace />;
}

function App() {
  return (
    <div className="app">
      <StarfieldBackground />
      <Analytics />
      <SpeedInsights />
      <RouteEffects />
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <ScrollPhysicsProvider>
        <Navbar />
        <main id="content" className="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/:slug" element={<BlogPost />} />
            <Route path="/blogs" element={<Navigate to="/writing" replace />} />
            <Route path="/blog" element={<Navigate to="/writing" replace />} />
            <Route path="/blog/:slug" element={<LegacyPostRedirect />} />
            <Route path="/journal" element={<Navigate to="/writing#learning-log" replace />} />
            <Route path="/accomplishments" element={<Accomplishments />} />
            <Route path="/skills" element={<Navigate to="/#skills" replace />} />
            <Route path="/education" element={<Navigate to="/#education" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </ScrollPhysicsProvider>
    </div>
  );
}

export default App;
