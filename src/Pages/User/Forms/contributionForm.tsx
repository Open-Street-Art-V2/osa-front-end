/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import { useContext } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import UserContribution from "../../../Components/UserArtworkContribution";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import "./contributionForm.css";
import { useLocation } from "react-router-dom";
import { Header } from "../../../Components";
import NavBarUser from "../../../Components/NavBarUser";

interface CustomizedState {
  artwork: any;
  coords: any;
}

function ContributionToArtUser() {
  const loginCtx = useContext(LoginContext);
  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  const { artwork, coords } = state;

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
    <div>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <UserContribution data={artwork} coords={coords} />
        <NavBarUser />
      </ThemeProvider>
    </div>
  );
}

export default ContributionToArtUser;
