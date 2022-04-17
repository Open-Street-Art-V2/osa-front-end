/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import React from "react";
// import { ModifyArtWork } from "../../../Components";
import { useContext } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import ModifyArtWork from "../../../Components/UpdateFormV2";
import "./modifieArtwork.css";
import { useLocation } from "react-router-dom";
import NavBar from "../../../Components/NavBar";
import { Header } from "../../../Components";

interface CustomizedState {
  artwork: any;
  coords: any;
}

function ModifyArtAdmin() {
  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  const { artwork, coords } = state;
  const loginCtx = useContext(LoginContext);
  const darkTheme = loginCtx.darkMode
    ? createTheme({
        palette: {
          mode: "dark",
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              },
            },
          },
        },
      })
    : createTheme({
        palette: {
          mode: "light",
        },
      });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div>
          <Header />
          <ModifyArtWork data={artwork} coords={coords} />
          <NavBar />
        </div>
      </ThemeProvider>
    </>
  );
}

export default ModifyArtAdmin;
