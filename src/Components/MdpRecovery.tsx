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
//import InputAdornment from "@material-ui/core/InputAdornment";

//import IconButton from "@material-ui/core/IconButton";
import { useTranslation } from "react-i18next";

import validator from "validator";
import Header from "./Header";

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

type State = {
  isValidForm: boolean;
  isValidEmail: boolean;
  email: String
};
type Action = { type: "EMAIL_CHANGE"; value: string };

const dispatchState = function (state: State, action: Action): State {
  switch (action.type) {
      case "EMAIL_CHANGE":
        return {
          ...state,
          isValidEmail: validator.isEmail(action.value),
          isValidForm: validator.isEmail(action.value),
          email: action.value
        };
    default:
      return {
        ...state,
      };
  }
};

function RecoverPasswordEmail() {
    
  const { t } = useTranslation();
  const [isLoading] = useState(false);


  const [state, dispatch] = useReducer(dispatchState, {
    isValidEmail: true,
    isValidForm: false,
    email: ""
  });


  const [unauthorizedError, setUnauthorizedError] = useState<boolean>();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state.email);
    const url = `${process.env.REACT_APP_API}/forgot-password/${state.email}`;
  };


  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnauthorizedError(false);
    dispatch({
      type: "EMAIL_CHANGE",
      value: event.target.value.trim(),
    });
  };


  return (
      <>
         <Header />
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
            <p className="py-1 font-sans text-2xl authTitle font-bold " >
              {t("Rmdp")}
            </p>

            <TextField
             margin="normal"
             required
             fullWidth
             id="email"
             label="Email"
             onChange={emailChangeHandler}
             name="email"
             autoComplete="email"
             error={!state.isValidEmail}
             helperText={!state.isValidEmail && t("invalid.mail")}
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
                    color: "#ffffff",
                    background: "#00ab55",
                    borderRadius: 60,
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
      </>
   
  );
}

export default RecoverPasswordEmail;
