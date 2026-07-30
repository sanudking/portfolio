import { Routes, Route } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";

import Contact from "./pages/Contact";
import Accomplishments from "./pages/Accomplishments";


function App() {

  const [count, setCount] = useState(0);
  const [dark, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch {
        return false;
      }
    }
    return false;
  });

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);


  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);


  const [name, setName] = useState(() => {
  return localStorage.getItem("name") || "";
});
  const imageUrl = "https://example.com";

  const divStyle = {
    // Starting with '/' points automatically to the public folder root
    backgroundImage: "url('/images/image.png')", 
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
    width: '100%',
  };


function saveName() {
  localStorage.setItem("name", "nickname");
  setName("Sanu"); // THIS triggers UI update
}
  
  return (

    <div style={divStyle}>
      <div style={{padding:"60px"}}>
        <Navbar darkMode={dark} setDarkMode={setDarkMode} />
        <h1>Portfolio</h1>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blog/>} />
          <Route path="/accomplishments" element={<Accomplishments />} />
        </Routes>
        <p>hi</p>
      
        <button onClick={saveName}>{name}</button>
        <p></p>
        <p>button clicked {count} times</p>
        <br />
        <button onClick={() => setCount(count + 1)}>Click me!</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <br/><br/><br/><br/><br/>
        
      </div>
      
      <footer >
        <a href="https://github.com/sanudking" target="_blank" rel="noopener noreferrer"><button ><img src="/images/github.png" width="20" height="20"></img></button></a>
        <a href="https://www.linkedin.com/in/sudhanshu-kumar-9ba993239/" target="_blank" rel="noopener noreferrer"><button><img src="/images/linkedin.png" width="20" height="20"></img></button></a>
        <a href="https://www.instagram.com/sudhanshu._.01/" target="_blank" rel="noopener noreferrer"><button><img src="/images/instagram.png" width="20" height="20"></img></button></a>
        
      </footer>
    </div>
  );
}

export default App;