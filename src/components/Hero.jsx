import "../styles/hero.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">

      <motion.div
        className="hero-left"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>
          Hi, I'm <br />
          <span>Sudhanshu</span>
        </h1>

        <p>
          B.Tech student building real-world projects with focus on
          performance and clean systems.
        </p>

        <div className="hero-buttons">
          <button onClick={() => navigate("/projects")}>
            View Projects
          </button>

          <button>
            Contact Me
          </button>
        </div>
      </motion.div>

    </section>
  );
}

export default Hero;