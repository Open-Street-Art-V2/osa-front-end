/* eslint-disable */
import * as React from "react";
import { Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
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
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./SingIn.css";

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
          marginTop: 0,
          width: "100%",
          display: "absolute",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div id="" className="flex flex-row place-content-between pt-6">
          <Link to="/" className="inline-flex items-center">
            <button
              type="button"
              id="retBtn"
              className="inline-flex items-center justify-center w-10 h-10 z-10 bg-slate-700 text-white text-2xl rounded-2xl"
            >
              <AiOutlineLeft />
            </button>
          </Link>
          <div id="logo" className="flex flex-row">
            <h1 className="pt-1 hTitle semi-bold">Street Art</h1>
            <svg
              width="44"
              height="48"
              viewBox="0 0 214 218"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="mx-3"
            >
              <rect width="214" height="218" fill="url(#pattern0)" />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_211_9" transform="scale(0.0046729)" />
                </pattern>
                <image
                  id="image0_211_9"
                  width="214"
                  height="214"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className="auth"
          sx={{ mt: 7 }}
        >
          <div className="authTitle pt-5 pb-12">Authentification</div>
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
            helperText={!state.isValidEmail && "Email invalide"}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
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
          />

          <Link to="#" id="mdpF" className="mdpF pt-2">
            <label> Mot de passe oublié ?</label>
          </Link>
        </Box>
        <div className="centreD pt-6">
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={!state.isValidForm || password === ""}
            loading={isLoading}
            // className="loginBtn m-5"
            id="loginBtnForm"
          >
            Se connecter
          </LoadingButton>
        </div>

        <div id="insc" className="py-5">
          <label className="mdpF">Vous n’avez pas de compte ?</label>
          <Link to="/sign-up" id="inscB" className="mdpF">
            Inscrivez-vous
          </Link>
        </div>
      </Box>
    </Container>
  );
}
