import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import StarfieldBackground from "./components/StarfieldBackground";
import ScrollPhysicsProvider from "./components/ScrollPhysicsProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Accomplishments from "./pages/Accomplishments";
import Journal from "./pages/Journal";

function App() {
  return (
    <div className="app">
      <StarfieldBackground />
      <Analytics />
      <SpeedInsights />
      <ScrollPhysicsProvider>
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/accomplishments" element={<Accomplishments />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </ScrollPhysicsProvider>
    </div>
  );
}

export default App;
