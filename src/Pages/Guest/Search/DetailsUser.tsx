import { useContext } from "react";
import { Container } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Header, Profile } from "../../../Components";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { User } from "../../../types/user";

type LocationDataType = {
  user: User;
  filter?: string;
  search?: string;
};

function DetailsUser() {
  const { t } = useTranslation();
  const loginCtx = useContext(LoginContext);
  const { user, filter, search } = useLocation().state as LocationDataType;

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
      </Container>

      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </>
  );
}

export default DetailsUser;
