/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { logout } from "../Pages/Guest/SignIn/SignIn.service";
import { LoginContext } from "./Context/LoginCtxProvider";

export default function SettingsBtn() {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const loginCtx = useContext(LoginContext);
  return (
    <div className="z-50">
      {!showModal ? (
        <button
          type="button"
          className="inline-flex items-center justify-center w-11 h-11 outline-none focus:outline-none bg-slate-50 text-slate-900 text-3xl shadow-lg rounded-full z-50"
          onClick={() => setShowModal(true)}
          data-modal-toggle="defaultModal"
        >
          <AiOutlineSetting />
        </button>
      ) : (
        <button
          type="button"
          className="inline-flex items-center justify-center w-11 h-11 outline-none focus:outline-none bg-slate-600 text-white text-3xl shadow-lg rounded-full z-50"
          onClick={() => setShowModal(false)}
          data-modal-toggle="defaultModal"
        >
          <AiOutlineSetting />
        </button>
      )}
      {showModal ? (
        <>
          <div className="fixed w-screen left-0 z-10">
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
                <div className="flex flex-row">
                  <button
                    type="button"
                    className="text-slate-500 text-md mx-2 leading-relaxed"
                    onClick={() => {
                      i18n.changeLanguage("fr");
                    }}
                  >
                    {t("french")}
                  </button>
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
                <div className="flex flex-row">
                  <button
                    type="button"
                    className="text-slate-500 text-md mx-2 leading-relaxed"
                    onClick={() => {
                      i18n.changeLanguage("en");
                    }}
                  >
                    {t("english")}
                  </button>
                  <div className="text-lg my-auto">
                    <ReactCountryFlag countryCode="US" />
                  </div>
                </div>
              </div>

              <div className="flex flex-row my-3 justify-between gap-14">
                <div className="flex flex-row">
                  <div className="mr-4 text-lg my-auto">
                    <BiLogOut />
                  </div>
                  <button
                    type="button"
                    className="text-blueGray-500 text-lg font-medium leading-relaxed"
                    onClick={() => {
                      logout(loginCtx.setUser, loginCtx.setIsLoggedIn);
                    }}
                  >
                    {t("logout")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            role="button"
            className="fixed inset-0 -z-10 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
            tabIndex={0}
            onKeyPress={() => {}}
          />
        </>
      ) : null}
    </div>
  );
}
