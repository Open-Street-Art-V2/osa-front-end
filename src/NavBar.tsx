import * as React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { AiOutlineSearch, AiOutlinePlusCircle } from "react-icons/ai";
import { BsPersonCircle, BsCompass } from "react-icons/bs";

function NavBar() {
  return (
    <footer>
      <nav className="navbar-container">
        <NavLink to="/map">
          <h1>
            <BsCompass />
          </h1>
        </NavLink>
        <NavLink to="/search">
          <h1>
            <AiOutlineSearch />
          </h1>
        </NavLink>
        <NavLink to="/add">
          <h1>
            <AiOutlinePlusCircle />
          </h1>
        </NavLink>
        <NavLink to="/profil">
          <h1>
            <BsPersonCircle />
          </h1>
        </NavLink>
      </nav>
    </footer>
  );
}
export default NavBar;
