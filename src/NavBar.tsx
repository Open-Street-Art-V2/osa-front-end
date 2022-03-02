import * as React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { AiFillAlert } from "react-icons/ai";

function NavBar() {
  return (
    <nav className="navbar-container">
      <NavLink to="/map">
        <h2>
          <AiFillAlert />
        </h2>
      </NavLink>
      <NavLink to="/search">
        <h2>
          <AiFillAlert />
        </h2>
      </NavLink>
      <NavLink to="/add">
        <h2>
          <AiFillAlert />
        </h2>
      </NavLink>
      <NavLink to="/profil">
        <h2>
          <AiFillAlert />
        </h2>
      </NavLink>
    </nav>
  );
}
export default NavBar;
