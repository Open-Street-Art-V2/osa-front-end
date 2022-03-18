import { NavLink, useLocation } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaRegCompass, FaRegUserCircle } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";

function NavBarUser() {
  const location = useLocation();
  return (
    <div className="fixed flex w-screen py-4 px-7 bottom-0 bg-black items-center justify-between rounded-t-2xl">
      <NavLink to="/">
        {location.pathname === "/" ? (
          <p className="text-6xl text-gray-50 font-light">
            <FaRegCompass />
          </p>
        ) : (
          <p className="text-6xl text-gray-400 font-light">
            <FaRegCompass />
          </p>
        )}
      </NavLink>
      <NavLink to="/search">
        {location.pathname === "/search" ? (
          <p className="text-3xl text-gray-50">
            <RiSearch2Line />
          </p>
        ) : (
          <p className="text-3xl text-gray-400">
            <RiSearch2Line />
          </p>
        )}
      </NavLink>
      <NavLink to="/user/ProposeArtwork">
        {location.pathname === "/user/ProposeArtwork" ? (
          <p className="text-3xl text-gray-50">
            <AiOutlinePlusCircle />
          </p>
        ) : (
          <p className="text-3xl text-gray-400">
            <AiOutlinePlusCircle />
          </p>
        )}
      </NavLink>
      <NavLink to="/profil">
        {location.pathname === "/profil" ? (
          <p className="text-3xl text-gray-50">
            <FaRegUserCircle />
          </p>
        ) : (
          <p className="text-3xl text-gray-400">
            <FaRegUserCircle />
          </p>
        )}
      </NavLink>
    </div>
  );
}
export default NavBarUser;
