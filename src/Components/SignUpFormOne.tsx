import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validator from "validator";
import { Reducer, useReducer } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import SignUpData from "../types/signUpData";
import ValidField from "../types/validField";

type Props = {
  setIsValid: any;
  setData: any;
  data: SignUpData;
};

type State = {
  firstName: string;
  name: string;
  email: string;
  isValidFirstName: ValidField;
  isValidName: ValidField;
  isValidEmail: ValidField;
  isValidForm: boolean;
};

type Action =
  | { type: "FIRSTNAME_CHANGED"; value: string }
  | { type: "NAME_CHANGED"; value: string }
  | { type: "EMAIL_CHANGED"; value: string };

const dispatchState = (state: State, action: Action) => {
  switch (action.type) {
    case "FIRSTNAME_CHANGED":
      return {
        ...state,
        firstName: action.value,
        isValidFirstName: !validator.isEmpty(action.value)
          ? ValidField.OK
          : ValidField.ERROR,
        isValidForm:
          !validator.isEmpty(action.value) &&
          state.isValidName === ValidField.OK &&
          state.isValidEmail === ValidField.OK,
      };
    case "NAME_CHANGED":
      return {
        ...state,
        name: action.value,
        isValidName: !validator.isEmpty(action.value)
          ? ValidField.OK
          : ValidField.ERROR,
        isValidForm:
          !validator.isEmpty(action.value) &&
          state.isValidFirstName === ValidField.OK &&
          state.isValidEmail === ValidField.OK,
      };
    default:
      return {
        ...state,
        email: action.value.trim(),
        isValidEmail: validator.isEmail(action.value.trim())
          ? ValidField.OK
          : ValidField.ERROR,
        isValidForm:
          validator.isEmail(action.value.trim()) &&
          state.isValidName === ValidField.OK &&
          state.isValidFirstName === ValidField.OK,
      };
  }
};

export default function SignUpFormOne(props: Props) {
  const { data, setData } = props;
  const [formOne, dispatchFormOne] = useReducer<Reducer<State, Action>>(
    dispatchState,
    {
      firstName: "",
      name: "",
      email: "",
      isValidFirstName: ValidField.NOTFILLED,
      isValidName: ValidField.NOTFILLED,
      isValidEmail: ValidField.NOTFILLED,
      isValidForm: false,
    }
  );

  React.useEffect(() => {
    const { setIsValid } = props;
    setIsValid(formOne.isValidForm);
    setData({
      ...data,
      firstName: formOne.firstName,
      name: formOne.name,
      email: formOne.email,
    });
  }, [formOne.isValidForm]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFormOne({
      type: "EMAIL_CHANGED",
      value: event.currentTarget.value.trim(),
    });
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatchFormOne({
      type: "FIRSTNAME_CHANGED",
      value: event.currentTarget.value,
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFormOne({
      type: "NAME_CHANGED",
      value: event.currentTarget.value,
    });
  };

  const handleBirthdayChange = (newValue: any) => {
    setData({ ...data, newValue });
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
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                autoFocus
                onChange={handleFirstNameChange}
                error={formOne.isValidFirstName === ValidField.ERROR}
                helperText={
                  formOne.isValidFirstName === ValidField.ERROR &&
                  "Le prénom est obligatoire"
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                label="Nom"
                name="name"
                autoComplete="family-name"
                onChange={handleNameChange}
                error={formOne.isValidName === ValidField.ERROR}
                helperText={
                  formOne.isValidName === ValidField.ERROR &&
                  "Le nom est obligatoire"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleEmailChange}
                error={formOne.isValidEmail === ValidField.ERROR}
                helperText={
                  formOne.isValidEmail === ValidField.ERROR &&
                  "L'adresse mail est invalide"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="Date de naissance"
                  inputFormat="dd/MM/yyyy"
                  value={data.birthday}
                  onChange={handleBirthdayChange}
                  /* eslint-disable react/jsx-props-no-spreading */
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
