import * as React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

// import { BsCompass, BsSearch, BsPlusCircle, VscAccount } from "react-icons/all";


function NavBar() {
  return (
    <nav className="navbar-container">
      <NavLink to="/">
        <h2 className="d">
        b
        </h2>
      </NavLink>
      <NavLink to="/about">
        <h2>
          {" "}
eeef
        </h2>
      </NavLink>
      <NavLink to="/contact">
        <h2>
         efefefe
        </h2>
      </NavLink>
      <NavLink to="/contact">
        <h2>
          {" "}
   feefe{" "}
        </h2>
      </NavLink>
    </nav>
  );
}
export default NavBar;
