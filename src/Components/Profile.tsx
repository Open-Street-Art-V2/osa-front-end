import { NavLink } from "react-router-dom";
import { AiFillPlusSquare, AiOutlineRight } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { BsPaletteFill } from "react-icons/bs";
import { BiBuildingHouse } from "react-icons/bi";
import { FcManager } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { User } from "../types/user";

type Props = {
  user: User | undefined;
};

function Profile(props: Props) {
  const { t } = useTranslation();
  const { user } = props;

  return (
    <>
      <div className="p-3">
        <div className=" p-6 h-20 grid grid-cols-3 gap-4 content-center">
          <div className="flex items-center text-5xl">
            <FcManager className="items-center text-6xl" />
          </div>
          <div className="col-span-2 items-center">
            <div className="flex items-center text-black-800 font-bold text-xl">
              {user?.firstname} {user?.name}
            </div>
            <p className="text-gray-600 ">
              {user?.role === "ROLE_ADMIN" ? t("admin") : t("contributor")}
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-black ml-8">
        {t("name")}: {user?.name}
      </h1>
      <h1 className="text-black ml-8">
        {t("fname")}: {user?.firstname}
      </h1>
      {user?.email && (
        <h1 className="text-black ml-8">
          {t("email")}: {user?.email}
        </h1>
      )}
      <div className="p-3 mt-3">
        <NavLink to="/contribution">
          <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center rounded-full">
            <div className="flex items-center text-5xl">
              <AiFillPlusSquare className="text-gray-600" />
            </div>
            <div className="col-span-2">
              <div className="flex items-center text-black-800 font-bold text-lg ">
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

        <NavLink to="/favoriteartists">
          <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center rounded-full">
            <div className="flex items-center text-right text-5xl">
              <FaUserGraduate className="text-gray-600" />
            </div>
            <div className="col-span-2">
              <div className="flex items-center text-black-800 font-bold text-lg ">
                {t("favorite.artists")}
              </div>
              {/* <p className="text-gray-600 ">11</p> */}
            </div>
            <div className="flex items-center text-3xl pl-6">
              <AiOutlineRight className="text-gray-600" />
            </div>
          </div>
        </NavLink>
        <br />

        <NavLink to="/favoriteartworks">
          <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center rounded-full">
            <div className="flex items-center text-right text-5xl">
              <BsPaletteFill className="text-gray-600" />
            </div>
            <div className="col-span-2">
              <div className="flex items-center text-black-800 font-bold text-lg ">
                {t("favorite.arts")}
              </div>
              {/* <p className="text-gray-600 ">23</p> */}
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
              <BiBuildingHouse className="text-gray-600" />
            </div>
            <div className="col-span-2">
              <div className="flex items-center text-black-800 font-bold text-lg ">
                {t("favorite.cities")}
              </div>
              {/* <p className="text-gray-600 ">9</p> */}
            </div>
            <div className="flex items-center text-3xl pl-6">
              <AiOutlineRight className="text-gray-600" />
            </div>
          </div>
        </NavLink>
      </div>
      <br />
    </>
  );
}

export default Profile;
