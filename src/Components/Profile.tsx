/* eslint-disable react/require-default-props */
import { NavLink, Link } from "react-router-dom";
import { AiFillPlusSquare, AiOutlineRight } from "react-icons/ai";
import { FaUserGraduate, FaTrophy } from "react-icons/fa";
import { BsPaletteFill } from "react-icons/bs";
import { FcManager } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { User } from "../types/user";
import FavoriteStar from "./FavoriteStar";
import { LoginContext } from "./Context/LoginCtxProvider";

type Props = {
  user: User | undefined;
  isEditable: boolean;
};

function Profile(props: Props) {
  const { t } = useTranslation();
  const loginCtx = useContext(LoginContext);
  const { user, isEditable } = props;
  const isOwnProfile = user?.id === loginCtx?.user?.id;

  return (
    <>
      {!isEditable && (
        <div
          className={
            loginCtx.isLoggedIn && !isOwnProfile
              ? "flex justify-end -mb-2 -mt-3 pr-5"
              : ""
          }
        >
          {user && loginCtx.isLoggedIn && !isOwnProfile && (
            <FavoriteStar id={user.id} isArt={false} />
          )}
        </div>
      )}
      <div className="p-3">
        <div className=" p-6 h-20 grid grid-cols-4 content-center">
          <div className="flex items-center text-5xl">
            <FcManager className="items-center text-6xl" />
          </div>
          <div className="col-span-2 items-center">
            <div className="flex items-center text-black-800 font-bold text-xl dark:text-white">
              {user?.firstname} {user?.name}
            </div>
            <p className="text-gray-600 dark:text-zinc-400 ">
              {user?.role === "ROLE_ADMIN" ? t("admin") : t("contributor")}
            </p>
          </div>

          <div className="flex justify-end items-center">
            <NavLink to={`/trophies/${user?.id}`}>
              <div className="">
                <FaTrophy className="text-[#ffa41e] text-3xl" />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <h1 className="text-black ml-8 dark:text-white">
        {t("name")}: {user?.name}
      </h1>
      <h1 className="text-black ml-8 dark:text-white">
        {t("fname")}: {user?.firstname}
      </h1>
      {user?.email && (
        <h1 className="text-black ml-8 dark:text-white">
          {t("email")}: {user?.email}
        </h1>
      )}
      <div className="p-3 mt-3">
        {user?.role === "ROLE_USER" && (
          <>
            <NavLink to={`/contribution/${user?.id}`}>
              <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center rounded-full">
                <div className="flex items-center text-5xl">
                  <AiFillPlusSquare className="text-gray-600 dark:fill-white" />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center text-black-800 font-bold text-lg dark:text-white ">
                    {t("contributions.upper")}
                  </div>
                  {/*  <p className="text-gray-600 ">64</p> */}
                </div>

                <div className="flex items-center text-3xl pl-6">
                  <AiOutlineRight className="text-gray-600" />
                </div>
              </div>
            </NavLink>
            <br />
          </>
        )}

        <NavLink
          to={`/favorite-artists/${user?.id}`}
          state={{ isPrivate: isEditable }}
        >
          <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center rounded-full">
            <div className="flex items-center text-right text-5xl">
              <FaUserGraduate className="text-gray-600 dark:fill-white" />
            </div>
            <div className="col-span-2 flex items-center text-black-800 font-bold text-lg dark:text-white">
              {t("favorite.artists")}
            </div>

            <div className="flex items-center text-3xl pl-6">
              <AiOutlineRight className="text-gray-600" />
            </div>
          </div>
        </NavLink>
        <br />

        <NavLink to={`/favorite-artworks/${user?.id}`}>
          <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center rounded-full">
            <div className="flex items-center text-right text-5xl">
              <BsPaletteFill className="text-gray-600 dark:fill-white" />
            </div>
            {/* <div className="col-span-2">
              <div className="flex items-center text-black-800 font-bold text-lg dark:text-white ">
                {t("favorite.arts")}
              </div>
              {/* <p className="text-gray-600 ">23</p> 
            </div>
            <div className="flex items-center text-3xl pl-6">
              <AiOutlineRight className="text-gray-600" />
            </div>
          </div>
        </NavLink>
        <br />

        <NavLink to="/favoritecities">
          <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center rounded-full">
            <div className="flex items-center text-right text-5xl">
              <BiBuildingHouse className="text-gray-600 dark:fill-white" />
            </div>
            <div className="col-span-2">
              <div className="flex items-center text-black-800 font-bold text-lg dark:text-white ">
                {t("favorite.cities")}
              </div>
              {/* <p className="text-gray-600 ">9</p> */}

            <div className="col-span-2 flex items-center text-black-800 font-bold text-lg dark:text-white">
              {t("favorite.arts")}
            </div>
            <div className="flex items-center text-3xl pl-6">
              <AiOutlineRight className="text-gray-600" />
            </div>
          </div>
        </NavLink>
        <br />
        {isEditable && (
          <div className="px-6 pb-5">
            <div className="flex items-center justify-around">
              <Link to="/updateInfo" state={{ userInfo: user }} className="">
                <button
                  className="bg-logoGreen text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Modify Info
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
