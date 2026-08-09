import Hero from "../components/Hero";
import Skills from "../components/Skills";
import VisitorCounter from "../components/VisitorCounter";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const scriptSources = [
      "https://elfsightcdn.com/platform.js",
      "https://counter.websiteout.com/js/5/4/0/0",
      "https://counter.websiteout.com/js/17/4/0/0",
    ];

    const scripts = scriptSources.map((src, index) => {
      const script = document.createElement("script");
      script.src = src;
      script.type = "text/javascript";
      script.async = index === 0;
      document.body.appendChild(script);
      return script;
    });

    return () => {
      scripts.forEach((script) => script.remove());
    };
  }, []);

  
  return (
    <div className="home">
      <h1>Portfolio</h1>
      <Hero />
      <Skills/>
      <div
        className="elfsight-app-813ddc6e-f62b-4aa2-92ea-7b3073a024b5"
        data-elfsight-app-lazy
      ></div>
      <VisitorCounter/>
    </div>
  );
}

export default Home;