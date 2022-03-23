/* eslint-disable */
import * as React from "react";
import { Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useContext, useReducer, useState } from "react";
import validator from "validator";
import { LoadingButton } from "@mui/lab";
import { login, logout } from "./SignIn.service";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { Header } from "../../../Components";
import { Link } from "react-router-dom";
import { Alert, createTheme, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../../../Assets/css/Header.css";
import { ArrowBack } from "@mui/icons-material";

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
    borderRadius: 60,
  },
});

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
      return {
        ...state,
        isValidPassword: !validator.isEmpty(action.value),
        isValidForm: !validator.isEmpty(action.value) && state.isValidEmail,
      };
  }
};

export default function SignIn() {
  const { t } = useTranslation();
  const loginCtx = useContext(LoginContext);
  const [password, setPasssword] = useState("");

  const [state, dispatch] = useReducer(dispatchState, {
    isValidEmail: true,
    isValidPassword: true,
    isValidForm: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [unauthorizedError, setUnauthorizedError] = useState<boolean>();

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnauthorizedError(false);
    dispatch({
      type: "EMAIL_CHANGE",
      value: event.target.value.trim(),
    });
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUnauthorizedError(false);
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
      setUnauthorizedError,
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

  //const { setUser } = loginCtx;
  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     const userInfo: User = JSON.parse(localStorage.getItem("user") as string);
  //     setUser({ ...userInfo });
  //     loginCtx.setIsLoggedIn(true);
  //   }
  // }, []);

  if (loginCtx.isLoggedIn /*&& loginCtx.user?.role === "ROLE_ADMIN"*/) {
    return <Navigate to="/map/admin"></Navigate>;
  }
  // if (loginCtx.isLoggedIn && loginCtx.user?.role === "ROLE_USER") {
  //   return <Navigate to="/map/user"></Navigate>;
  // }
  return (
    <>
      <Header />
      <div className="ml-4 mt-4">
        <Link to="/" className="inline-flex items-center">
          <ArrowBack />
          <p className="text-xl ml-3">{t("return")}</p>
        </Link>
      </div>

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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            className="mt-4 mx-0.5 border-2 border-gray-300 rounded-lg"
          >
            <div className="pt-10 pb-5 text-center text-3xl">
              {t("Authentication")}
            </div>

            <div className="px-4">
              <AnimatePresence initial={true} exitBeforeEnter={true}>
                {unauthorizedError && (
                  <motion.div
                    variants={{
                      hidden: {
                        scale: 0.5,
                        y: "+30vh",
                        opacity: 0,
                      },
                      visible: {
                        y: "0",
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          type: "spring",
                          damping: 25,
                          stiffness: 400,
                        },
                      },
                      exit: {
                        x: "-30vh",
                        opacity: 0,
                        scale: 0.5,
                        transition: {
                          duration: 0.3,
                        },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Alert severity="error">{t("incorrect.coordinates")}</Alert>
                  </motion.div>
                )}
              </AnimatePresence>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("mdp")}
                type="password"
                id="password"
                autoComplete="current-password"
                error={!state.isValidPassword}
                helperText={
                  !state.isValidPassword &&
                  "Le mot de passe ne peut pas être vide"
                }
                onChange={passwordChangeHandler}
              />
            </div>

            <Link
              to="#"
              id="mdpF"
              className="pt-2 inline-flex justify-center w-full font-semibold"
            >
              <label>{t("mdpF")}</label>
            </Link>
            <div className="inline-flex justify-center w-full pt-6 pb-5">
              <ThemeProvider theme={loadingBtnTheme}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!state.isValidForm || password === ""}
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
                  {t("connect")}
                </LoadingButton>
              </ThemeProvider>
            </div>
          </Box>

          <Box sx={{ textAlign: "center", margin: "auto", pt: "36px" }}>
            <Typography variant="subtitle1" component="div">
              {t("no.account")}
            </Typography>
            <Link to="/sign-up" style={{ fontWeight: 600 }}>
              {t("register")}
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
