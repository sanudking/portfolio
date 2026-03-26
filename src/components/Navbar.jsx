import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav style={{ display: "flex", gap: "10px", padding: "10px" ,alignItems:"center"}}>
      

      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/contact">Contact</Link>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light" : "Dark"}
      </button>
    </nav>
  );
}

export default Navbar;