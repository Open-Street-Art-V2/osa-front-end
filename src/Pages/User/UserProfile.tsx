import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarUser from "../../Components/NavBarUser";
import NavBar from "../../Components/NavBar";
import Header from "../../Components/Header";
import { LoginContext } from "../../Components/Context/LoginCtxProvider";
import { Profile } from "../../Components";
import { getUserProfile } from "../../services/user.service";
import { User } from "../../types/user";

function UserProfile() {
  const loginCtx = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginCtx.isLoggedIn) {
      navigate("/");
    }
  }, [loginCtx]);

  const [user, setUser] = useState<User>();

  async function getUserInfo() {
    getUserProfile(loginCtx.user?.jwt).then((res) => {
      setUser(res.profile);
    });
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="container">
      <Header />
      <Profile user={user} />
      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </div>
  );
}

export default UserProfile;
