import React from "react";
import NavBarUser from "../../Components/NavBarUser";
import Header from "../../Components/Header";
//import { AiFillPlusSquare,AiOutlineRight } from "react-icons/ai";

function UserProfile() {
  return (
    <>
      <Header />
      <h1 className="text-black ml-8">Nom :</h1>
      <h1 className="text-black ml-8">Prénom :</h1>
      <h1 className="text-black ml-8">Email :</h1>

      <div className="p-20">
        <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center">
          <div></div>
          <div className="col-span-2">
            <div className="text-black-800 font-bold text-xl ">
              Contribution
            </div>
            <p className="text-gray-600 ">64</p>
          </div>
          <div className="text-right">hvh</div>
        </div>
        <br />

        <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center">
          <div></div>
          <div className="col-span-2">
            <div className="text-black-800 font-bold text-xl ">
              Artistes favoris
            </div>
            <p className="text-gray-600 ">64</p>
          </div>
          <div className="text-right">hvh</div>
        </div>
        <br />
        <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center">
          <div></div>
          <div className="col-span-2">
            <div className="text-black-800 font-bold text-xl ">
              Oeuvres favoris
            </div>
            <p className="text-gray-600 ">64</p>
          </div>
          <div className="text-right">hvh</div>
        </div>
        <br />
        <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 p-6 h-20 grid grid-cols-4 gap-4 content-center">
          <div></div>
          <div className="col-span-2">
            <div className="text-black-800 font-bold text-xl ">
              Villes favoris
            </div>
            <p className="text-gray-600 ">64</p>
          </div>
          <div className="text-right">hvh</div>
        </div>
      </div>

      <NavBarUser />
    </>
  );
}

export default UserProfile;
