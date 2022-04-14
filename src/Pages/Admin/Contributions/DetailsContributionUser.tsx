import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import UserDetailsContribution from "../../../Components/UserDetailsContribution";
import NavBar from "../../../Components/NavBar";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import NavBarUser from "../../../Components/NavBarUser";
import { Header } from "../../../Components";
import { User } from "../../../types/user";

type LocationDataType = {
  data: any;
  user: User;
  // to know if we are on our personnal profil or on another user profil
  isOwnProfil: boolean;
  // in the case of a search
  filter?: string;
  search?: string;
};

function DetailsContributionUser() {
  const location = useLocation();
  const { data, user, isOwnProfil, filter, search } =
    location.state as LocationDataType;
  const loginCtx = useContext(LoginContext);

  return (
    <>
      <Header />
      <UserDetailsContribution
        data={data}
        user={user}
        isOwnProfil={isOwnProfil}
        filter={filter}
        search={search}
      />
      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </>
  );
}

export default DetailsContributionUser;
