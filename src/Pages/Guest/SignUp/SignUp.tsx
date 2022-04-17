// import { useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import MyStepper from "../../../Components/Stepper";
import "../../../Assets/css/Header.css";
import { Header, ReturnButton } from "../../../Components";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00AB55",
    },
    secondary: {
      main: "#000000",
    },
  },
});

export default function SignUp() {
  const { t } = useTranslation();
  /* const loginCtx = useContext(LoginContext);
   const darkTheme = createTheme({
    palette: {
      mode: loginCtx.darkMode ? "dark" : "light",
    },
  }); */
  return (
    <div className="container ">
      <Header />
      <div className="ml-4 mt-4 dark:text-white ">
        <ReturnButton url="/" />
      </div>

      <Container component="main" maxWidth="xs">
        <ThemeProvider theme={theme}>
          <Box
            component="div"
            className="mt-4 mx-0.5 border-2 border-gray-300 rounded-lg"
          >
            <MyStepper />
          </Box>

          <Box
            sx={{
              textAlign: "center",
              margin: "auto",
              pt: "36px",
              pb: "20px",
            }}
          >
            <Typography variant="subtitle1" component="div">
              {t("account")}
            </Typography>
            <Link style={{ fontWeight: 600 }} to="/login">
              {t("connect")}
            </Link>
          </Box>
        </ThemeProvider>
      </Container>
    </div>
  );
}
