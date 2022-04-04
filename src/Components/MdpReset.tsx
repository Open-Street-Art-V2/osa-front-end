/* eslint-disable */
import React, { useState, useReducer } from "react";
import {
  Container,
  Box,
  CssBaseline,
  TextField,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import InputAdornment from "@material-ui/core/InputAdornment";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import IconButton from "@material-ui/core/IconButton";
import { useTranslation } from "react-i18next";
import { displayPasswordError } from "../Pages/Guest/SignIn/SignIn.service";
import passwordValidator from "../Pages/Guest/SignUp/utils/password-validator";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const loadingBtnTheme = createTheme({
  palette: {
    primary: {
      main: "#00ab55",
    },
  },
  shape: {
    borderRadius: "60px",
  },
});
enum ValidField {
  OK,
  ERROR,
  NOTFILLED,
  NOTMODIFIED,
}
type State = {
  newPassword: string;
  verifiedNewPassword: string;
  isValidNewPassword: ValidField;
  isValidVerifiedNewPassword: ValidField;
  isValidForm: boolean;
};
type Action =
  | { type: "NEWPASSWORD_CHANGED"; value: string }
  | { type: "VERIFIED_NEWPASSWORD_CHANGED"; value: string }
  | { type: "FORM_NOT_VALID"; value: boolean };

const dispatchState = function (state: State, action: Action): State {
  switch (action.type) {
    case "NEWPASSWORD_CHANGED":
      const validationErrs: any[] = passwordValidator.validate(action.value, {
        list: true,
      }) as any[];
      return {
        ...state,
        newPassword: action.value,
        isValidNewPassword:
          validationErrs.length === 0 ? ValidField.OK : ValidField.ERROR,
        isValidForm:
          validationErrs.length === 0 &&
          state.isValidVerifiedNewPassword === ValidField.OK,
      };
    case "VERIFIED_NEWPASSWORD_CHANGED":
      return {
        ...state,
        verifiedNewPassword: action.value.trim(),
        isValidVerifiedNewPassword:
          action.value === state.newPassword ? ValidField.OK : ValidField.ERROR,
        isValidForm:
          action.value === state.newPassword &&
          state.isValidNewPassword === ValidField.OK,
      };
    case "FORM_NOT_VALID":
      return {
        ...state,
        isValidForm: action.value,
      };
    default:
      return {
        ...state,
      };
  }
};

function ModifyPersonalInfo() {
  const { t } = useTranslation();
  const [isLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [state, dispatch] = useReducer(dispatchState, {
    newPassword: "",
    verifiedNewPassword: "",
    isValidNewPassword: ValidField.NOTFILLED,
    isValidVerifiedNewPassword: ValidField.NOTFILLED,
    isValidForm: false,
  });

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "NEWPASSWORD_CHANGED",
      value: event.currentTarget.value,
    });
    setPassword(event.currentTarget.value);
  };
  const handleVerifiedNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "VERIFIED_NEWPASSWORD_CHANGED",
      value: event.currentTarget.value,
    });
    setVerifiedPassword(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(password);
    console.log(verifiedPassword);
  };

  return (
    <Container component="main" maxWidth="xs" className="px-5 pb-20">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          width: "100%",
          display: "absolute",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <div className="text-center">
            <p className="py-1 font-sans text-2xl authTitle font-bold ">
              Password reset
            </p>

            <TextField
              margin="normal"
              fullWidth
              id="newPassword"
              type="password"
              label={t("nmdp")}
              value={password}
              onChange={handleNewPasswordChange}
              name="newPassword"
              autoComplete="newPassword"
              error={state.isValidNewPassword === ValidField.ERROR}
              helperText={
                state.isValidNewPassword === ValidField.ERROR &&
                displayPasswordError(
                  passwordValidator.validate(password, {
                    list: true,
                  }) as string[]
                )
              }
            />
            <TextField
              margin="normal"
              fullWidth
              type="password"
              id="confirmNewPassword"
              label={t("cnmdp")}
              onChange={handleVerifiedNewPasswordChange}
              value={verifiedPassword}
              name="confirmNewPassword"
              autoComplete="confirmNewPassword"
              error={state.isValidVerifiedNewPassword === ValidField.ERROR}
              helperText={
                state.isValidVerifiedNewPassword === ValidField.ERROR &&
                t("pwd.not.match")
              }
            />
            <div className="centreD p-5 ">
              <ThemeProvider theme={loadingBtnTheme}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!state.isValidForm}
                  loading={isLoading}
                  sx={{
                    width: "263px",
                    margin: "10px 0px",
                    height: "54px",
                    fontWeight: "500",
                    fontSize: "18px",
                    lineHeight: "21px",
                  }}
                >
                  {t("Valider")}
                </LoadingButton>
              </ThemeProvider>
            </div>
          </div>
        </Box>
      </Box>
    </Container>
  );
}

export default ModifyPersonalInfo;
