import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HorizontalNonLinearStepper from "../../Components/Stepper";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00AB55",
    },
  },
});

export default function SignUp() {
  return (
    <ThemeProvider theme={theme}>
      <HorizontalNonLinearStepper />
    </ThemeProvider>
  );
}
