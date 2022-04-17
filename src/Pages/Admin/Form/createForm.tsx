import { useContext } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { CreateArtWork, Header } from "../../../Components";
import NavBar from "../../../Components/NavBar";

function cFormAdmin() {
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
    <ThemeProvider theme={darkTheme}>
      <div>
        <Header />
        <CreateArtWork />
        <NavBar />
      </div>
    </ThemeProvider>
  );
}

export default cFormAdmin;
