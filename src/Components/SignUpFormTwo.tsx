import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validator from "validator";
import { FormEvent, Reducer, useReducer } from "react";
import User from "../Pages/Guest/SignUp/types/user";
import ValidField from "../Pages/Guest/SignUp/types/validField";

type Props = {
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<User>>;
  data: User;
};

type FormTwoType = {
  favoriteCity: string;
  password: string;
  verifiedPassword: string;
  isValidFavoriteCity: ValidField;
  isValidPassword: ValidField;
  isValidVerifiedPassword: ValidField;
  isValidForm: boolean;
};

type Action =
  | { type: "FAVORITE_CITY_CHANGED"; value: string }
  | { type: "PASSWORD_CHANGED"; value: string }
  | { type: "VERIFIED_PASSWORD_CHANGED"; value: string };

const dispatchTwo = (state: FormTwoType, action: Action) => {
  switch (action.type) {
    case "FAVORITE_CITY_CHANGED":
      return {
        ...state,
        favoriteCity: action.value,
        isValidFavoriteCity:
          validator.isAlpha(action.value) || validator.isEmpty(action.value)
            ? ValidField.OK
            : ValidField.ERROR,
        isValidForm:
          (validator.isAlpha(action.value) ||
            validator.isEmpty(action.value)) &&
          state.isValidPassword === ValidField.OK &&
          state.isValidVerifiedPassword === ValidField.OK,
      };
    case "PASSWORD_CHANGED":
      return {
        ...state,
        password: action.value,
        isValidPassword: validator.isStrongPassword(action.value)
          ? ValidField.OK
          : ValidField.ERROR,
        isValidForm:
          validator.isStrongPassword(action.value) &&
          state.isValidFavoriteCity === ValidField.OK &&
          state.isValidVerifiedPassword === ValidField.OK,
      };
    default:
      return {
        ...state,
        verifiedPassword: action.value.trim(),
        isValidVerifiedPassword:
          action.value === state.password ? ValidField.OK : ValidField.ERROR,
        isValidForm:
          action.value === state.password &&
          state.isValidPassword === ValidField.OK &&
          state.isValidFavoriteCity === ValidField.OK,
      };
  }
};

export default function SignUpFormTwo(props: Props) {
  const [formTwo, dispatchFormTwo] = useReducer<Reducer<FormTwoType, Action>>(
    dispatchTwo,
    {
      favoriteCity: "",
      password: "",
      verifiedPassword: "",
      isValidFavoriteCity: ValidField.OK,
      isValidPassword: ValidField.NOTFILLED,
      isValidVerifiedPassword: ValidField.NOTFILLED,
      isValidForm: false,
    }
  );

  React.useEffect(() => {
    const { setIsValid, setData, data } = props;
    setIsValid(formTwo.isValidForm);
    setData({
      ...data,
      favoriteCity: formTwo.favoriteCity,
      password: formTwo.password,
      verifiedPassword: formTwo.verifiedPassword,
    });
  }, [formTwo.isValidForm, formTwo.favoriteCity]);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}> </Avatar>
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="favorite-city"
                name="favorite-city"
                fullWidth
                id="favorite-city"
                label="Ville préférée"
                autoFocus
                onChange={handleCityChange}
                error={formTwo.isValidFavoriteCity === ValidField.ERROR}
                helperText={
                  formTwo.isValidFavoriteCity === ValidField.ERROR &&
                  "La ville est invalide"
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="password"
                type="password"
                label="Mot de passe"
                name="password"
                autoComplete="password"
                onChange={handlePasswordChange}
                error={formTwo.isValidPassword === ValidField.ERROR}
                helperText={
                  formTwo.isValidPassword === ValidField.ERROR &&
                  "Le mot de passe n'est pas assez fort"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                type="password"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleVerifiedPasswordChange}
                error={formTwo.isValidVerifiedPassword === ValidField.ERROR}
                helperText={
                  formTwo.isValidVerifiedPassword === ValidField.ERROR &&
                  "Le mot de passe ne correspond pas"
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
