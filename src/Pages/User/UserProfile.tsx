import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarUser from "../../Components/NavBarUser";
import NavBar from "../../Components/NavBar";
import Header from "../../Components/Header";
import { LoginContext } from "../../Components/Context/LoginCtxProvider";
import { Profile } from "../../Components";

type User = {
  name: string;
  firstname: string;
};

function UserProfile() {
  const loginCtx = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginCtx.isLoggedIn) {
      navigate("/");
    }
  }, [loginCtx]);

  const [user, setUser] = useState<User>({
    name: "",
    firstname: "",
  });

  async function getUserInfo() {
    const url = `${process.env.REACT_APP_API}/users/profile/${loginCtx.user?.id}`;

    try {
      const res: Response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${loginCtx.user?.jwt}`,
        },
      });
      if (res.ok) {
        const jsonData = await res.json();
        setUser({
          name: jsonData.profile.name,
          firstname: jsonData.profile.firstname,
        });
      } else if (!res.ok) {
        if (res.status === 409) {
          throw Error("Error");
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
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
