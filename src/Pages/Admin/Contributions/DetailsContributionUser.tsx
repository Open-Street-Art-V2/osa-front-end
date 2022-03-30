import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import UserDetailsContribution from "../../../Components/UserDetailsContribution";
import NavBar from "../../../Components/NavBar";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import NavBarUser from "../../../Components/NavBarUser";

function DetailsContributionUser() {
  const location = useLocation();
  const { data } = location.state as any;
  const loginCtx = useContext(LoginContext);

  return (
    <>
      <UserDetailsContribution data={data} />
      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </>
  );
}

export default DetailsContributionUser;
