import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBarUser from "../../Components/NavBarUser";
import NavBar from "../../Components/NavBar";
import Header from "../../Components/Header";
import { LoginContext } from "../../Components/Context/LoginCtxProvider";
import { UpdateInfo } from "../../Components";

interface CustomizedState {
  userInfo: any;
}

function UserProfile() {
  const loginCtx = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loginCtx.isLoggedIn) {
      navigate("/");
    }
  }, [loginCtx]);

  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  const { userInfo } = state;

  return (
    <div className="container">
      <Header />
      <UpdateInfo user={userInfo} />
      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </div>
  );
}

export default UserProfile;
