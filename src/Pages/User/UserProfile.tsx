import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillPlusSquare, AiOutlineRight } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { BsPaletteFill } from "react-icons/bs";
import { BiBuildingHouse } from "react-icons/bi";
import { FcManager } from "react-icons/fc";
import NavBarUser from "../../Components/NavBarUser";
import Header from "../../Components/Header";

function UserProfile() {
  return (
    <>
      <Header />
      <div className="p-3">
        <div className=" p-6 h-20 grid grid-cols-3 gap-4 content-center">
          <div className="flex items-center text-5xl">
            <FcManager className="items-center text-6xl" />
          </div>
          <div className="col-span-2 items-center">
            <div className="flex items-center text-black-800 font-bold text-xl ">
              Kim Hsn
            </div>
            <p className="text-gray-600 ">Contributeur</p>
          </div>
        </div>
      </div>

      <h1 className="text-black ml-8">Nom:</h1>
      <h1 className="text-black ml-8">Prénom:</h1>
      <h1 className="text-black ml-8">Email:</h1>

      <div className="p-3">
        <NavLink to="/contribution">
          <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center rounded-full">
            <div className="flex items-center text-5xl">
              <AiFillPlusSquare className="text-gray-600" />
            </div>
            <div className="col-span-2">
              <div className="flex items-center text-black-800 font-bold text-lg ">
                Contribution
              </div>
              {/*  <p className="text-gray-600 ">64</p> */}
            </div>
            <div className="flex items-center text-3xl">
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
                Artistes favoris
              </div>
              {/* <p className="text-gray-600 ">11</p> */}
            </div>
            <div className="flex items-center text-3xl">
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
                Oeuvres favoris
              </div>
              {/* <p className="text-gray-600 ">23</p> */}
            </div>
            <div className="flex items-center text-3xl">
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
                Villes favoris
              </div>
              {/* <p className="text-gray-600 ">9</p> */}
            </div>
            <div className="flex items-center text-3xl">
              <AiOutlineRight className="text-gray-600" />
            </div>
          </div>
        </NavLink>
      </div>
      <br />
      <NavBarUser />
    </>
  );
}

export default UserProfile;
