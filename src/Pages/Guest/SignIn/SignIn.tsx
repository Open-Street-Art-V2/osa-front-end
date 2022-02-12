/* eslint-disable */
import * as React from "react";
import { Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext, useEffect, useReducer, useState } from "react";
import validator from "validator";
import { LoadingButton } from "@mui/lab";
import passwordValidator from "./utils/password-validator";
import { displayPasswordError, login, logout } from "./utils/utility-functions";
import { User } from "./utils/types";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";

type State = {
  isValidEmail: boolean;
  isValidPassword: boolean;
  isValidForm: boolean;
};

type Action =
  | { type: "EMAIL_CHANGE"; value: string }
  | { type: "PASSWORD_CHANGE"; value: string };

const dispatchState = function (state: State, action: Action): State {
  switch (action.type) {
    case "EMAIL_CHANGE":
      return {
        ...state,
        isValidEmail: validator.isEmail(action.value),
        isValidForm: validator.isEmail(action.value) && state.isValidPassword,
      };
    case "PASSWORD_CHANGE":
      const validationErrs: any[] = passwordValidator.validate(action.value, {
        list: true,
      }) as any[];
      return {
        ...state,
        isValidPassword: validationErrs.length == 0,
        isValidForm: validationErrs.length == 0 && state.isValidEmail,
      };
  }
};

export default function SignIn() {
  const loginCtx = useContext(LoginContext);
  const { setUser } = loginCtx;
  const [password, setPasssword] = useState("");

  const [state, dispatch] = useReducer(dispatchState, {
    isValidEmail: true,
    isValidPassword: true,
    isValidForm: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "EMAIL_CHANGE",
      value: event.target.value.trim(),
    });
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasssword(event.currentTarget.value.trim());
    dispatch({
      type: "PASSWORD_CHANGE",
      value: event.target.value.trim(),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(
      setIsLoading,
      {
        email: data.get("email")?.toString().trim(),
        password: data.get("password")?.toString().trim(),
      },
      loginCtx.setUser,
      loginCtx.setIsLoggedIn
    );
  };

  const handleLogout = (event: React.FormEvent<HTMLButtonElement>) => {
    logout(loginCtx.setUser, loginCtx.setIsLoggedIn);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userInfo: User = JSON.parse(localStorage.getItem("user") as string);
      setUser({ ...userInfo });
      loginCtx.setIsLoggedIn(true);
    }
  }, []);

  if (loginCtx.isLoggedIn /*&& loginCtx.user?.role === "ROLE_ADMIN"*/) {
    return <Navigate to="/map/admin"></Navigate>;
  }
  // if (loginCtx.isLoggedIn && loginCtx.user?.role === "ROLE_USER") {
  //   return <Navigate to="/map/user"></Navigate>;
  // }
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
        <Avatar
          sx={{ m: 1, bgcolor: "#FFF" }}
          src="https://cdn.discordapp.com/attachments/905905042790424596/941800764450410577/image_1.png"
        ></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            onChange={emailChangeHandler}
            name="email"
            autoComplete="email"
            error={!state.isValidEmail}
            helperText={!state.isValidEmail && "Invalid email"}
            className="shadow-xl"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!state.isValidPassword}
            helperText={
              !state.isValidPassword &&
              displayPasswordError(
                passwordValidator.validate(password, {
                  list: true,
                }) as string[]
              )
            }
            onChange={passwordChangeHandler}
            className="shadow-xl"
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={!state.isValidForm || password === ""}
            loading={isLoading}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#000",
              borderRadius: "10px",
              boxShadow: "0px 6px 10px 0px rgb(0 0 0 / 40%)",
              "&:hover": {
                background: "#000",
              },
            }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: "#000",
                  textDecorationColor: "#000",
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: "#000",
                  textDecorationColor: "#000",
                }}
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {}
    </Container>
  );
}
