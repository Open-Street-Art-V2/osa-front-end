/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
import { logout } from "../Pages/Guest/SignIn/SignIn.service";
import { LoginContext } from "./Context/LoginCtxProvider";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  padding: 3vh;
`;
const style = {
  bgcolor: "transparent",
};
export default function SettingsBtn() {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const loginCtx = useContext(LoginContext);
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center w-10 h-10 outline-none focus:outline-none bg-white text-slate-900 text-3xl shadow-center rounded-full z-50"
        onClick={() => setShowModal(true)}
        data-modal-toggle="defaultModal"
      >
        <AiOutlineSetting />
      </button>
      <StyledModal
        open={showModal}
        onClose={() => setShowModal(false)}
        BackdropComponent={Backdrop}
        className="blure"
      >
        <Box sx={style} className="absolute w-100 inset-0">
          <button
            type="button"
            className="fixed inline-flex items-center justify-center w-11 h-11 top-2 right-2 outline-none focus:outline-none bg-slate-600 text-white text-3xl shadow-lg rounded-full z-50"
            onClick={() => setShowModal(false)}
            data-modal-toggle="defaultModal"
          >
            <AiOutlineSetting />
          </button>
          <div className="fixed w-screen top-12 z-10">
            <div className="w-72 mx-auto my-3 bg-white w-100 rounded-3xl shadow-2xl relative flex flex-col w-full p-3 outline-none focus:outline-none">
              <div className="flex flex-row my-3 justify-between gap-14">
                <div className="flex flex-row">
                  <div className="mr-4 text-lg my-auto">
                    <GrLanguage />
                  </div>
                  <p className="text-blueGray-500 text-lg font-medium leading-relaxed">
                    {t("language")}
                  </p>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    i18n.changeLanguage("fr");
                    setShowModal(false);
                  }}
                  className="flex flex-row"
                >
                  <p className="text-slate-500 text-md mx-2 leading-7">
                    {t("french")}
                  </p>
                  <div className="text-lg my-auto">
                    <ReactCountryFlag countryCode="FR" />
                  </div>
                </div>
              </div>

              <div className="flex flex-row my-3 justify-between gap-14">
                <div className="flex flex-row">
                  <div className="mr-4 text-lg my-auto">
                    <GrLanguage />
                  </div>
                  <p className="text-blueGray-500 text-lg font-medium leading-relaxed">
                    {t("language")}
                  </p>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    i18n.changeLanguage("en");
                    setShowModal(false);
                  }}
                  className="flex flex-row"
                >
                  <p className="text-slate-500 text-md mx-2 leading-7">
                    {t("english")}
                  </p>
                  <div className="text-lg my-auto">
                    <ReactCountryFlag countryCode="US" />
                  </div>
                </div>
              </div>

              <div className="flex flex-row my-3 justify-between gap-14">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    logout(loginCtx.setUser, loginCtx.setIsLoggedIn);
                  }}
                  className="flex flex-row"
                >
                  <div className="mr-4 text-lg my-auto">
                    <BiLogOut />
                  </div>
                  <p className="text-blueGray-500 text-lg font-medium leading-relaxed">
                    {t("logout")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </StyledModal>
    </>
  );
}
