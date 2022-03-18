import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillPlusSquare, AiOutlineRight } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { BsPaletteFill } from "react-icons/bs";
import { BiBuildingHouse } from "react-icons/bi";
import { FcManager } from "react-icons/fc";
import NavBarUser from "../../Components/NavBarUser";
import Header from "../../Components/Header";
import { LoginContext } from "../../Components/Context/LoginCtxProvider";

/* type User = {
  Lastname: string;
  firstName: string;
  email: string;
}; */

function UserProfile() {
  const loginCtx = useContext(LoginContext);

  const [user, setUser] = useState({
    Lastname: "",
    firstName: "",
  });
  // const [lastName, setLastName] = useState();

  async function getUserInfo() {
    const url = `http://localhost:3008/users/profile/${loginCtx.user?.id}`;

    try {
      const res: Response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${loginCtx.user?.jwt}`,
        },
      });
      if (res.ok) {
        const jsonData = await res.json();
        setUser({
          Lastname: jsonData.profile.name,
          firstName: jsonData.profile.firstname,
        });
        // setLastName(jsonData.profile.name);
      } else if (!res.ok) {
        if (res.status === 409) {
          throw Error("Error");
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="p-3">
        <div className=" p-6 h-20 grid grid-cols-3 gap-4 content-center">
          <div className="flex items-center text-5xl">
            <FcManager className="items-center text-6xl" />
          </div>
          <div className="col-span-2 items-center">
            <div className="flex items-center text-black-800 font-bold text-xl uppercase">
              {user.firstName}
            </div>
            <p className="text-gray-600 ">Contributeur</p>
          </div>
        </div>
      </div>
      <h1 className="text-black ml-8">Nom: {user.Lastname} </h1>
      <h1 className="text-black ml-8">Prénom: {user.firstName}</h1>
      <h1 className="text-black ml-8">Email: {loginCtx.user?.email}</h1>
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
    </div>
  );
}

export default UserProfile;
