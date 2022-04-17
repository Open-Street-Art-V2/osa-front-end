import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import UserDetailsContribution from "../../../Components/UserDetailsContribution";
import NavBar from "../../../Components/NavBar";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import NavBarUser from "../../../Components/NavBarUser";
import { Header } from "../../../Components";

function DetailsContributionUser() {
  const { id } = useParams();
  const loginCtx = useContext(LoginContext);
  const darkTheme = createTheme({
    palette: {
      mode: loginCtx.darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      <UserDetailsContribution id={id} />
      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </ThemeProvider>
  );
}

export default DetailsContributionUser;
