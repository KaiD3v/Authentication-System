import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <h1>
        <Link>Dash Users</Link>
      </h1>
      <ol>
        <Link to={"/"}>Home</Link>
        <Link to={"/register"}>Register</Link>
        <Link to={"/login"}>Login</Link>
      </ol>
    </nav>
  );
};

export default NavBar;
