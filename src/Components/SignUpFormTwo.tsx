import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import ValidField from "../Pages/Guest/SignUp/types/validField";
import { StateTwo } from "../Pages/Guest/SignUp/types/types";
import { displayPasswordError } from "../Pages/Guest/SignIn/SignIn.service";
import passwordValidator from "../Pages/Guest/SignUp/utils/password-validator";

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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
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
              <TextField
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
              <TextField
                required
                fullWidth
                id="email"
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
  );
}
