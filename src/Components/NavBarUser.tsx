import * as React from "react";
import { NavLink } from "react-router-dom";
import "../Assets/css/styles.css";
import { AiOutlineSearch, AiOutlinePlusCircle } from "react-icons/ai";
import { BsPersonCircle, BsCompass } from "react-icons/bs";

function NavBarUser() {
  return (
    <footer>
      <nav className="navbar-container">
        <NavLink to="/">
          <h2>
            <BsCompass />
          </h2>
        </NavLink>
        <NavLink to="/search">
          <h1>
            <AiOutlineSearch />
          </h1>
        </NavLink>
        <NavLink to="user/ProposeArtwork">
          <h1>
            <AiOutlinePlusCircle />
          </h1>
        </NavLink>
        <NavLink to="/profil">
          <h1 className="size">
            <BsPersonCircle />
          </h1>
        </NavLink>
      </nav>
    </footer>
  );
}
export default NavBarUser;
