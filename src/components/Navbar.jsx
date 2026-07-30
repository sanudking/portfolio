import { Link } from "react-router-dom";
import Skills from "./Skills";
import { HashLink } from "react-router-hash-link"; // 1. Import HashLink

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "10px", padding: "10px" ,alignItems:"center"}}>
      

      <Link to="/">Home</Link>
      <HashLink to="#skills">Skills</HashLink>

      <Link to="/projects">Projects</Link>
      <Link to="/contact">Contact</Link>

      {/* <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light" : "Dark"}
      </button> */}
    </nav>
  );
}

export default Navbar;