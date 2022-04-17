import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import UserDetailsContribution from "../../../Components/UserDetailsContribution";
import NavBar from "../../../Components/NavBar";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import NavBarUser from "../../../Components/NavBarUser";
import { Header } from "../../../Components";

function DetailsContributionUser() {
  const { id } = useParams();
  const loginCtx = useContext(LoginContext);

  return (
    <>
      <Header />
      <UserDetailsContribution id={id} />
      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </>
  );
}

export default DetailsContributionUser;
