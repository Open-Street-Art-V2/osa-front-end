import React, { useContext } from "react";
import { Container, Box, CssBaseline, Grid, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useTranslation } from "react-i18next";
import ValidField from "../Pages/Guest/SignUp/types/validField";
import { StateTwo } from "../Pages/Guest/SignUp/types/types";
import { displayPasswordError } from "../Pages/Guest/SignIn/SignIn.service";
import passwordValidator from "../Pages/Guest/SignUp/utils/password-validator";
import RoundedTextField from "./RoundedTextField";
import { LoginContext } from "./Context/LoginCtxProvider";

type Props = {
  formTwo: StateTwo;
  dispatchFormTwo: any;
};

export default function SignUpFormTwo(props: Props) {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const { dispatchFormTwo, formTwo } = props;

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFormTwo({
      type: "FAVORITE_CITY_CHANGED",
      value: event.currentTarget.value,
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFormTwo({
      type: "PASSWORD_CHANGED",
      value: event.currentTarget.value,
    });
  };

  const handleVerifiedPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatchFormTwo({
      type: "VERIFIED_PASSWORD_CHANGED",
      value: event.currentTarget.value,
    });
  };

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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <RoundedTextField
                  autoComplete="favorite-city"
                  name="favorite-city"
                  fullWidth
                  id="favorite-city"
                  label={t("favorite.city")}
                  autoFocus
                  onChange={handleCityChange}
                  error={formTwo.isValidFavoriteCity === ValidField.ERROR}
                  helperText={
                    formTwo.isValidFavoriteCity === ValidField.ERROR &&
                    t("invalid.city")
                  }
                  value={formTwo.favoriteCity}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RoundedTextField
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label={t("mdp")}
                  name="password"
                  autoComplete="password"
                  onChange={handlePasswordChange}
                  error={formTwo.isValidPassword === ValidField.ERROR}
                  helperText={
                    formTwo.isValidPassword === ValidField.ERROR &&
                    displayPasswordError(
                      passwordValidator.validate(formTwo.password, {
                        list: true,
                      }) as string[]
                    )
                  }
                  value={formTwo.password}
                />
              </Grid>
              <Grid item xs={12}>
                <RoundedTextField
                  required
                  fullWidth
                  id="confirmation-password"
                  type="password"
                  label={t("confirmation.password")}
                  name="confirmation"
                  autoComplete="password"
                  onChange={handleVerifiedPasswordChange}
                  error={formTwo.isValidVerifiedPassword === ValidField.ERROR}
                  helperText={
                    formTwo.isValidVerifiedPassword === ValidField.ERROR &&
                    t("pwd.not.match")
                  }
                  value={formTwo.verifiedPassword}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
