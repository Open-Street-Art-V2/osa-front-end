import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import AdminDetailsProposition from "../../../Components/AdminDetailsProposition";
import {
  acceptContributions,
  refuseContributions,
} from "../../../services/contribution.service";
import NavBar from "../../../Components/NavBar";
import { Header } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";

function DetailsContribution() {
  const location = useLocation();
  const { data } = location.state as any;
  const loginCtx = useContext(LoginContext);
  const darkTheme = createTheme({
    palette: {
      mode: loginCtx.darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      <AdminDetailsProposition
        data={data}
        accept={acceptContributions}
        refuse={refuseContributions}
      />
      <NavBar />
    </ThemeProvider>
  );
}

export default DetailsContribution;
