import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import NavBarUser from "../../../Components/NavBarUser";
import { CreatePropositionArtWork, Header } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { StyledModal, Backdrop } from "../../../Components/utils/types";

function cForm() {
  const { t } = useTranslation();
  const loginCtx = useContext(LoginContext);

  return (
    <div>
      <Header />
      {loginCtx.isLoggedIn ? (
        <CreatePropositionArtWork />
      ) : (
        <StyledModal
          open
          BackdropComponent={Backdrop}
          className="backdrop-blur-sm"
        >
          <Box className="w-screen">
            <div className="w-80 mx-auto bg-white rounded-3xl shadow-2xl relative flex flex-col w-full p-4 outline-none focus:outline-none">
              <p className="text-lg text-center font-medium text-gray-700 mb-6 mt-3 mx-5">
                {t("alert.addArtwork")}
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
                    {t("Sign in")}
                  </button>
                </NavLink>
              </div>
            </div>
          </Box>
        </StyledModal>
      )}
      <NavBarUser />
    </div>
  );
}

export default cForm;
