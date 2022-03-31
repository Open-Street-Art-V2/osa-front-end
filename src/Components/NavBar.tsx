import { NavLink, useLocation } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineBars } from "react-icons/ai";
import { FaRegCompass, FaRegUserCircle } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";

function NavBar() {
  const location = useLocation();
  return (
    <div className="fixed flex w-screen py-1 px-7 bottom-0 bg-black items-center justify-between rounded-t-2xl">
      <NavLink to="/admin/validateProposal">
        {location.pathname === "/admin/validateProposal" ? (
          <span className="text-3xl text-gray-50">
            <AiOutlineBars />
          </span>
        ) : (
          <span className="text-3xl text-gray-400">
            <AiOutlineBars />
          </span>
        )}
      </NavLink>
      <NavLink to="/search">
        {location.pathname === "/search" ? (
          <span className="text-3xl text-gray-50">
            <RiSearch2Line />
          </span>
        ) : (
          <span className="text-3xl text-gray-400">
            <RiSearch2Line />
          </span>
        )}
      </NavLink>
      <NavLink to="/map/admin">
        {location.pathname === "/map/admin" ? (
          <span className="text-6xl text-gray-50 font-light">
            <FaRegCompass />
          </span>
        ) : (
          <span className="text-6xl text-gray-400 font-light">
            <FaRegCompass />
          </span>
        )}
      </NavLink>
      <NavLink to="/form/admin">
        {location.pathname === "/form/admin" ? (
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
export default NavBar;
