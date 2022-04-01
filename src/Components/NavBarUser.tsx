/* eslint-disable */
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaRegCompass, FaRegUserCircle } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";
import "../Assets/css/NavBarUser.css";

function NavBarUser() {
  const location = useLocation();
  const windowWidth = window.innerWidth;
  let bubbleLeft = "0";
  if (windowWidth <= 420) {
    if (location.pathname === "/") bubbleLeft = "4%";
    else if (location.pathname === "/search") bubbleLeft = "29.5%";
    else if (location.pathname === "/user/ProposeArtwork")
      bubbleLeft = "calc(56%)";
    else if (location.pathname === "/profil") bubbleLeft = "82.3%";
  } else {
    if (location.pathname === "/") bubbleLeft = `2%`;
    else if (location.pathname === "/search")
      bubbleLeft = `calc(29.5% + ${(windowWidth * 2.5) / 100}px)`;
    else if (location.pathname === "/user/ProposeArtwork")
      bubbleLeft = `calc(56% + ${(windowWidth * 5.5) / 100}px)`;
    else if (location.pathname === "/profil")
      bubbleLeft = `calc(83% + ${(windowWidth * 8) / 100}px)`;
  }

  return (
    <div
      className="fixed flex w-screen py-2 px-7 bottom-0 bg-black items-center justify-between rounded-t-2xl"
      style={{ filter: "url(#goo)" }}
    >
      <div
        className="nav__ball"
        style={{
          left: bubbleLeft,
        }}
      />
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive ? { transform: "translateY(-10px)" } : {}
        }
      >
        {location.pathname === "/" ? (
          <span className="text-3xl" style={{ color: "rgb(112 207 53)" }}>
            <FaRegCompass />
          </span>
        ) : (
          <span className="text-3xl text-gray-400 font-light">
            <FaRegCompass />
          </span>
        )}
      </NavLink>
      <NavLink
        to="/search"
        style={({ isActive }) =>
          isActive ? { transform: "translateY(-10px)" } : {}
        }
      >
        {location.pathname === "/search" ? (
          <span className="text-3xl" style={{ color: "rgb(112 207 53)" }}>
            <RiSearch2Line />
          </span>
        ) : (
          <span className="text-3xl text-gray-400">
            <RiSearch2Line />
          </span>
        )}
      </NavLink>
      <NavLink
        to="/user/ProposeArtwork"
        style={({ isActive }) =>
          isActive ? { transform: "translateY(-10px)" } : {}
        }
      >
        {location.pathname === "/user/ProposeArtwork" ? (
          <span
            className="text-3xl text-gray-50"
            style={{ color: "rgb(112 207 53)" }}
          >
            <AiOutlinePlusCircle />
          </span>
        ) : (
          <span className="text-3xl text-gray-400">
            <AiOutlinePlusCircle />
          </span>
        )}
      </NavLink>
      <NavLink
        to="/profil"
        style={({ isActive }) =>
          isActive ? { transform: "translateY(-10px)" } : {}
        }
      >
        {location.pathname === "/profil" ? (
          <span
            className="text-3xl text-gray-50"
            style={{ color: "rgb(112 207 53)" }}
          >
            <FaRegUserCircle />
          </span>
        ) : (
          <span className="text-3xl text-gray-400">
            <FaRegUserCircle />
          </span>
        )}
      </NavLink>
    </div>
  );
}
export default NavBarUser;
