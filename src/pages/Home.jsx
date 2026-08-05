import Hero from "../components/Hero";
import Skills from "../components/Skills";

function Home() {
  return (
    <div className="home">
      <h1>Portfolio</h1>
      <Hero />
      <Skills/>
    </div>
  );
}

export default Home;