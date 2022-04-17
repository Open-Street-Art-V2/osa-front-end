import { NavLink, useLocation } from "react-router-dom";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { FaRegCompass } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";

function NavBarUser() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="fixed flex w-screen py-3 px-3 bottom-0 bg-white dark:bg-darkModeSec items-center justify-between rounded-t-2xl shadow-center">
      <NavLink
        to="/"
        className="flex-1"
        style={({ isActive }) =>
          isActive ? { transform: "translateY(-22px)" } : {}
        }
      >
        {location.pathname === "/" ? (
          <button
            type="button"
            className="bg-logoGreen flex-none -my-3 mx-auto w-16 h-16 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          >
            <span className="text-3xl text-white">
              <FaRegCompass />
            </span>
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl text-logoSlate dark:text-darkModeTextPrem">
              <FaRegCompass />
            </span>
            <p className="text-xs text-logoSlate dark:text-darkModeTextPrem items-center justify-center pt-1">
              {t("menu.map")}
            </p>
          </div>
        )}
      </NavLink>
      <NavLink
        to="/search"
        className="flex-1"
        style={({ isActive }) =>
          isActive ? { transform: "translateY(-22px)" } : {}
        }
      >
        {location.pathname.startsWith("/search") ? (
          <button
            type="button"
            className="bg-logoGreen flex-none -my-3 mx-auto w-16 h-16 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          >
            <span className="text-3xl text-white">
              <RiSearch2Line />
            </span>
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl text-logoSlate dark:text-darkModeTextPrem">
              <RiSearch2Line />
            </span>
            <p className="text-xs text-logoSlate dark:text-darkModeTextPrem items-center justify-center pt-1">
              {t("menu.search")}
            </p>
          </div>
        )}
      </NavLink>
      <NavLink
        to="/user/ProposeArtwork"
        className="flex-1"
        style={({ isActive }) =>
          isActive ? { transform: "translateY(-22px)" } : {}
        }
      >
        {location.pathname === "/user/ProposeArtwork" ? (
          <button
            type="button"
            className="bg-logoGreen flex-none -my-3 mx-auto w-16 h-16 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          >
            <span className="text-3xl text-white">
              <AiOutlinePlus />
            </span>
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl text-logoSlate dark:text-darkModeTextPrem">
              <AiOutlinePlus />
            </span>
            <p className="text-xs text-logoSlate dark:text-darkModeTextPrem items-center justify-center pt-1">
              {t("menu.add")}
            </p>
          </div>
        )}
      </NavLink>
      <NavLink
        to="/profil"
        className="flex-1"
        style={({ isActive }) =>
          isActive ? { transform: "translateY(-22px)" } : {}
        }
      >
        {location.pathname === "/profil" ? (
          <button
            type="button"
            className="bg-logoGreen flex-none -my-3 mx-auto w-16 h-16 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          >
            <span className="text-3xl text-white">
              <AiOutlineUser />
            </span>
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl text-logoSlate dark:text-darkModeTextPrem">
              <AiOutlineUser />
            </span>
            <p className="text-xs text-logoSlate dark:text-darkModeTextPrem items-center justify-center pt-1">
              {t("menu.profile")}
            </p>
          </div>
        )}
      </NavLink>
    </div>
  );
}
export default NavBarUser;
