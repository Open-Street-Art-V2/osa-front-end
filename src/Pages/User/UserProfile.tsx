import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import NavBarUser from "../../Components/NavBarUser";
import NavBar from "../../Components/NavBar";
import Header from "../../Components/Header";
import { LoginContext } from "../../Components/Context/LoginCtxProvider";
import { Profile } from "../../Components";
import { getUserProfile } from "../../services/user.service";
import { User } from "../../types/user";
import { StyledModal, Backdrop } from "../../Components/utils/types";

function UserProfile() {
  const loginCtx = useContext(LoginContext);
  const [user, setUser] = useState<User>();
  const { t } = useTranslation();

  async function getUserInfo() {
    getUserProfile(loginCtx.user?.jwt).then((res) => {
      setUser(res.profile);
    });
  }
  useEffect(() => {
    if (loginCtx.isLoggedIn) getUserInfo();
  }, []);

  return (
    <div className="container">
      <Header />
      {loginCtx.isLoggedIn ? (
        <Profile user={user} />
      ) : (
        <StyledModal
          open
          BackdropComponent={Backdrop}
          className="backdrop-blur-sm"
        >
          <Box className="w-screen">
            <div className="w-80 mx-auto bg-white rounded-3xl shadow-2xl relative flex flex-col w-full p-4 outline-none focus:outline-none">
              <p className="text-lg text-center font-medium text-gray-700 mb-6 mt-3 mx-5">
                {t("alert.profile")}
              </p>
              <div className="flex flex-row justify-around">
                <NavLink to="/">
                  <button
                    type="button"
                    className="bg-slate-100 text-gray-900 text-lg shadow-sm rounded-3xl py-2 px-7"
                    // eslint-disable-next-line react/destructuring-assignment
                    onClick={() => {}}
                  >
                    {t("cancel")}
                  </button>
                </NavLink>
                <NavLink to="/login">
                  <button
                    type="button"
                    className="bg-logoGreen text-white text-xl shadow-sm rounded-3xl py-2 px-7"
                    // eslint-disable-next-line react/destructuring-assignment
                    onClick={() => {}}
                  >
                    {t("login.name")}
                  </button>
                </NavLink>
              </div>
            </div>
          </Box>
        </StyledModal>
      )}
      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </div>
  );
}

export default UserProfile;
