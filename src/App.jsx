import { Routes, Route } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

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

function saveName() {
  localStorage.setItem("name", "nickname");
  setName("Sanu"); // THIS triggers UI update
}
  
  return (

    <div style={{padding:"60px"}}>
      <Navbar darkMode={dark} setDarkMode={setDarkMode} />
      <h1>Portfolio</h1>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <p>hi</p>
     
      <button onClick={saveName}>{name}</button>
      <p></p>
      <p>button clicked {count} times</p>
      <br />
      <button onClick={() => setCount(count + 1)}>Click me!</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default App;