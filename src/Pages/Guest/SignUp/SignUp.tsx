import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MyStepper from "../../../Components/Stepper";

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
  return (
    <ThemeProvider theme={theme}>
      <MyStepper />

      <Box sx={{ textAlign: "center", margin: "auto", pt: "40px" }}>
        <Typography variant="subtitle1" gutterBottom component="div">
          Vous avez un compte ?
        </Typography>
        <Link style={{ fontWeight: 600 }} to="/login">
          Connectez-vous
        </Link>
      </Box>
    </ThemeProvider>
  );
}
