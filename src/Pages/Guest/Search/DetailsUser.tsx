/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { styled } from "@mui/system";
import { GrClose } from "react-icons/gr";
import { Header, Profile } from "../../../Components";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { User } from "../../../types/user";
import { blockUser, unblockUser, changeUserRole } from "./DetailsUser.service";
import { StyledModal, Backdrop } from "../../../Components/utils/types";

type LocationDataType = {
  user: User;
  filter?: string;
  search?: string;
};

function DetailsUser() {
  const { t } = useTranslation();
  const loginCtx = useContext(LoginContext);
  const { user, filter, search } = useLocation().state as LocationDataType;
  const [showModalRole, setShowModalRole] = useState(false);
  const [showModalBan, setShowModalBan] = useState(false);
  const [userAB, setUserAB] = useState({
    admin: false,
    banned: false,
  });
  useEffect(() => {
    setUserAB({
      admin: user.role === "ROLE_ADMIN",
      banned: user.blocked,
    });
  }, []);

  return (
    <>
      <Header />
      <div className="ml-7 mt-4">
        <Link
          to="/search"
          state={{ oldFilter: filter, oldSearch: search }}
          className="inline-flex items-center"
        >
          <ArrowBack />
          <p className="text-xl ml-3">{t("return")}</p>
        </Link>
      </div>

      <Container component="main" maxWidth="xs" className="px-5 pb-20">
        <Profile user={user} />
        {loginCtx.user?.role === "ROLE_ADMIN" && !userAB.admin ? (
          <>
            <div className="flex flex-row justify-around p-3 pb-5">
              <button
                type="button"
                className="h-10 px-5 text-amber-600 transition-colors duration-150 border border-amber-500 focus:shadow-outline hover:bg-amber-500 hover:text-amber-100  rounded-3xl"
                onClick={() => setShowModalRole(true)}
                data-modal-toggle="defaultModal"
              >
                {t("role.admin")}
              </button>
              {userAB.banned ? (
                <button
                  type="button"
                  className="w-28 h-10 px-5 text-red-700 transition-colors duration-150 border border-red-500 focus:shadow-outline hover:bg-red-500 hover:text-red-100  rounded-3xl"
                  onClick={() => {
                    setShowModalBan(true);
                  }}
                >
                  {t("unban")}
                </button>
              ) : (
                <button
                  type="button"
                  className="w-28 h-10 px-5 text-red-700 transition-colors duration-150 border border-red-500 focus:shadow-outline hover:bg-red-500 hover:text-red-100  rounded-3xl"
                  onClick={() => {
                    setShowModalBan(true);
                  }}
                >
                  {t("ban")}
                </button>
              )}
            </div>
            <StyledModal
              open={showModalBan || showModalRole}
              onClose={() => {
                setShowModalRole(false);
                setShowModalBan(false);
              }}
              BackdropComponent={Backdrop}
              className="backdrop-blur-sm"
            >
              <Box className="w-screen">
                <div className="w-80 mx-auto bg-white rounded-3xl shadow-2xl relative flex flex-col w-full p-4 outline-none focus:outline-none">
                  <button
                    type="button"
                    className="bg-slate-100 text-white place-self-center rounded-full p-2 ml-auto"
                    // eslint-disable-next-line react/destructuring-assignment
                    onClick={() => {
                      setShowModalRole(false);
                      setShowModalBan(false);
                    }}
                  >
                    <GrClose />
                  </button>

                  <p className="text-xl font-semibold text-slate-900 text-center">
                    {showModalBan ? t("alert.banTitle") : t("alert.roleTitle")}
                  </p>
                  <div className="flex flex-col mb-6 mt-3 mx-5 justify-between">
                    <p className="text-md font-medium text-slate-500">
                      {t("alert.msg")}
                    </p>
                  </div>
                  <div className="flex flex-row justify-around">
                    <button
                      type="button"
                      className="bg-slate-100 text-slate-800 shadow-sm rounded-3xl py-2 px-4"
                      // eslint-disable-next-line react/destructuring-assignment
                      onClick={() => {
                        setShowModalRole(false);
                        setShowModalBan(false);
                      }}
                    >
                      {t("cancel")}
                    </button>
                    {showModalBan && userAB.banned ? (
                      <button
                        type="button"
                        className="bg-red-500 text-white shadow-sm rounded-3xl py-2 px-4"
                        // eslint-disable-next-line react/destructuring-assignment
                        onClick={() => {
                          unblockUser(user.id, loginCtx.user?.jwt, setUserAB);
                          setShowModalBan(false);
                        }}
                      >
                        {t("unban")}
                      </button>
                    ) : null}
                    {showModalBan && !userAB.banned ? (
                      <button
                        type="button"
                        className="bg-red-500 text-white shadow-sm rounded-3xl py-2 px-4"
                        // eslint-disable-next-line react/destructuring-assignment
                        onClick={() => {
                          blockUser(user.id, loginCtx.user?.jwt, setUserAB);
                          setShowModalBan(false);
                        }}
                      >
                        {t("ban")}
                      </button>
                    ) : null}

                    {showModalRole ? (
                      <button
                        type="button"
                        className="bg-red-500 text-white shadow-sm rounded-3xl py-2 px-4"
                        // eslint-disable-next-line react/destructuring-assignment
                        onClick={() => {
                          changeUserRole(
                            user.id,
                            loginCtx.user?.jwt,
                            setUserAB
                          );
                          setShowModalRole(false);
                        }}
                      >
                        {t("change")}
                      </button>
                    ) : null}
                  </div>
                </div>
              </Box>
            </StyledModal>
          </>
        ) : null}
      </Container>
      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </>
  );
}

export default DetailsUser;
