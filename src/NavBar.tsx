import * as React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { BsCompass, BsSearch, BsPlusCircle, VscAccount } from "react-icons/all";

function NavBar() {
  return (
    <nav className="navbar-container">
      <NavLink to="/map">
        <h2>
        <BsCompass />
        </h2>
      </NavLink>
      <NavLink to="/search">
        <h2>
        <BsSearch />
        </h2>
      </NavLink>
      <NavLink to="/add">
        <h2>
        <BsPlusCircle />
        </h2>
      </NavLink>
      <NavLink to="/profil">
        <h2>
        <VscAccount />
        </h2>
      </NavLink>
      
    </nav>
  );
}
export default NavBar;
