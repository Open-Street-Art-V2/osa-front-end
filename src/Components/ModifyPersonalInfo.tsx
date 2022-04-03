/* eslint-disable */
import React, { useState, useReducer, useContext, useEffect } from "react";
import {
  Container,
  Box,
  CssBaseline,
  TextField,
  createTheme,
  Alert,
} from "@mui/material";
import validator from "validator";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { InputAdornment, IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LoginContext } from "./Context/LoginCtxProvider";
import { User } from "../types/user";
import { displayPasswordError } from "../Pages/Guest/SignIn/SignIn.service";
import passwordValidator from "../Pages/Guest/SignUp/utils/password-validator";
import { maxDate } from "../Pages/Guest/SignUp/types/types";

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
  isValidName: ValidField;
  isValidFirstName: ValidField;
  isValidEmail: ValidField;
  isValidNewPassword: ValidField;
  isValidVerifiedNewPassword: ValidField;
  isValidBirthDate: ValidField;
  isValidForm: boolean;
};
type Action =
  | { type: "NAME_CHANGED"; value: string }
  | { type: "FIRSTNAME_CHANGED"; value: string }
  | { type: "EMAIL_CHANGED"; value: string }
  | { type: "NEWPASSWORD_CHANGED"; value: string }
  | { type: "VERIFIED_NEWPASSWORD_CHANGED"; value: string }
  | { type: "BIRTHDATE_CHANGED"; value: Date }
  | { type: "FORM_NOT_VALID"; value: boolean };

type Props = {
  user: User | undefined;
};

const dispatchState = function (state: State, action: Action): State {
  switch (action.type) {
    case "NAME_CHANGED":
      return {
        ...state,
        isValidName:
          validator.isLength(action.value, {
            min: 2,
            max: 25,
          }) && validator.isAlpha(action.value.replace(" ", ""))
            ? ValidField.OK
            : ValidField.ERROR,
        isValidForm:
          validator.isLength(action.value, {
            min: 2,
            max: 25,
          }) && validator.isAlpha(action.value.replace(" ", "")),
      };
    case "FIRSTNAME_CHANGED":
      return {
        ...state,
        isValidFirstName:
          validator.isLength(action.value, {
            min: 2,
            max: 25,
          }) && validator.isAlpha(action.value.replace(" ", ""))
            ? ValidField.OK
            : ValidField.ERROR,
        isValidForm:
          validator.isLength(action.value, {
            min: 2,
            max: 25,
          }) && validator.isAlpha(action.value.replace(" ", "")),
      };
    case "EMAIL_CHANGED":
      return {
        ...state,
        isValidEmail: validator.isEmail(action.value.trim())
          ? ValidField.OK
          : ValidField.ERROR,
        isValidForm: validator.isEmail(action.value.trim()),
      };
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
    case "BIRTHDATE_CHANGED":
      return {
        ...state,
        isValidBirthDate: isValidDate(action.value)
          ? ValidField.OK
          : ValidField.ERROR,
        isValidForm: isValidDate(action.value),
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

const isValidDate = (date: Date) => {
  const tenYearFromNow = new Date(
    new Date().setFullYear(new Date().getFullYear() - 10)
  );
  return date > new Date("01/01/1900") && date < tenYearFromNow;
};

function ModifyPersonalInfo(props: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading] = useState(false);
  const { user } = props;
  const loginCtx = useContext(LoginContext);
  const [name, setName] = useState(user?.name);
  const [firstName, setFirstName] = useState(user?.firstname);
  const [email, setEmail] = useState(user?.email);
  const [date, setDate] = useState(user?.birthDate);
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [state, dispatch] = useReducer(dispatchState, {
    newPassword: "",
    verifiedNewPassword: "",
    isValidName: ValidField.OK,
    isValidFirstName: ValidField.OK,
    isValidEmail: ValidField.OK,
    isValidBirthDate: ValidField.OK,
    isValidNewPassword: ValidField.NOTFILLED,
    isValidVerifiedNewPassword: ValidField.NOTFILLED,
    isValidForm: false,
  });
  const [requestError, setRequestError] = useState(null);
  const [requestValid, setRequestValid] = useState(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "NAME_CHANGED",
      value: event.currentTarget.value,
    });
    setName(event.currentTarget.value);
  };
  const handleNameReset = () => {
    setName(user?.name);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "FIRSTNAME_CHANGED",
      value: event.currentTarget.value,
    });
    setFirstName(event.currentTarget.value);
  };
  const handleFirstNameReset = () => {
    setFirstName(user?.firstname);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "EMAIL_CHANGED",
      value: event.currentTarget.value,
    });
    setEmail(event.currentTarget.value);
  };
  const handleEmailReset = () => {
    setEmail(user?.email);
  };

  const handleBirthDateChange = (newValue: any) => {
    dispatch({
      type: "BIRTHDATE_CHANGED",
      value: newValue,
    });
    setDate(newValue);
  };
  const handleDateReset = () => {
    setDate(user?.birthDate);
  };

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
  const handleCurrentPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(event.currentTarget.value);
  };
  const handlePasswordReset = () => {
    setPassword("");
    setVerifiedPassword("");
    setCurrentPassword("");
  };

  async function updateUser(userData: any) {
    dispatchState;
    const url = `${process.env.REACT_APP_API}/users`;
    if (password === "") {
      try {
        const res: Response = await fetch(url, {
          method: "PATCH",
          body: JSON.stringify({
            name: userData.name.trim(),
            firstname: userData.firstName.trim(),
            email: userData.email,
            birthDate: date,
          }),
          headers: {
            authorization: `Bearer ${loginCtx.user?.jwt}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const valid: any = t("updateS");
          setRequestError(null);
          setRequestValid(valid);
          setTimeout(() => setRedirectNow(true), 1000);
          const jsonData = await res.json();
          console.log(jsonData);
        } else if (!res.ok) {
          if (res.status === 500) {
            throw Error(t("server.maintenance"));
          } else {
            throw Error(t("updateE"));
          }
        }
      } catch (error: any) {
        setRequestValid(null);
        setRequestError(error.message);
        console.log(error.message);
      }
    } else {
      const url2 = `${process.env.REACT_APP_API}/auth/login`;
      try {
        const res2: Response = await fetch(url2, {
          method: "POST",
          body: JSON.stringify({
            email: loginCtx.user?.email,
            password: currentPassword,
          }),
          headers: {
            authorization: `Bearer ${loginCtx.user?.jwt}`,
            "Content-Type": "application/json",
          },
        });
        if (res2.ok) {
          try {
            const res: Response = await fetch(url, {
              method: "PATCH",
              body: JSON.stringify({
                name: userData.name.trim(),
                firstname: userData.firstName.trim(),
                email: userData.email,
                password: password,
                birthDate: date,
              }),
              headers: {
                authorization: `Bearer ${loginCtx.user?.jwt}`,
                "Content-Type": "application/json",
              },
            });
            if (res.ok) {
              const valid: any = t("updateS");
              setRequestError(null);
              setRequestValid(valid);
              setTimeout(() => setRedirectNow(true), 1000);
              const jsonData = await res.json();
              console.log(jsonData);
            } else if (!res.ok) {
              if (res.status === 500) {
                throw Error(t("server.maintenance"));
              } else {
                throw Error(t("updateE"));
              }
            }
          } catch (error: any) {
            setRequestValid(null);
            setRequestError(error.message);
            console.log(error.message);
          }
        } else if (!res2.ok) {
          throw Error(t("imdp"));
        }
      } catch (error: any) {
        setRequestValid(null);
        setRequestError(error.message);
        console.log(error.message);
      }
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataUser = {
      name: name,
      firstName: firstName,
      email: email,
    };
    updateUser(dataUser);
  };

  const [firstNameDis, setFirstNameDis] = useState(true);
  const [nameDis, setNameDis] = useState(true);
  const [emailDis, setEmailDis] = useState(true);
  const [passwordDis, setPasswordDis] = useState(true);
  const [dateDis, setDateDis] = useState(true);
  const [redirectNow, setRedirectNow] = useState(false);

  useEffect(() => {
    if (redirectNow) {
      navigate("/profil");
    }
  }, [redirectNow]);

  useEffect(() => {
    if (firstNameDis && nameDis && emailDis && passwordDis && dateDis) {
      dispatch({
        type: "FORM_NOT_VALID",
        value: false,
      });
    }
  }, [firstNameDis, nameDis, emailDis, passwordDis, dateDis]);
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
              {t("upateProfil")}
            </p>
            <div className="px-5 pb-4">
              <AnimatePresence initial exitBeforeEnter>
                {requestError && (
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
                    <Alert severity="error">{requestError}</Alert>
                  </motion.div>
                )}
                {requestValid && (
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
                    <Alert severity="success">{requestValid}</Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              label={t("name")}
              onChange={handleNameChange}
              value={name}
              name="lastName"
              autoComplete="lastName"
              error={state.isValidName === ValidField.ERROR}
              helperText={
                state.isValidName === ValidField.ERROR && t("invalid.name")
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setNameDis(!nameDis);
                        handleNameReset();
                      }}
                    >
                      {nameDis && <ModeEditOutlineOutlinedIcon />}
                      {!nameDis && <CancelOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={nameDis}
            />
            <TextField
              margin="normal"
              fullWidth
              id="firstName"
              label={t("fname")}
              onChange={handleFirstNameChange}
              value={firstName}
              name="firstName"
              autoComplete="firstName"
              error={state.isValidFirstName === ValidField.ERROR}
              helperText={
                state.isValidFirstName === ValidField.ERROR &&
                t("invalid.fname")
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setFirstNameDis(!firstNameDis);
                        handleFirstNameReset();
                      }}
                    >
                      {firstNameDis && <ModeEditOutlineOutlinedIcon />}
                      {!firstNameDis && <CancelOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={firstNameDis}
            />
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                label={t("dbrith")}
                inputFormat="dd/MM/yyyy"
                value={date}
                onChange={handleBirthDateChange}
                maxDate={maxDate}
                /* eslint-disable react/jsx-props-no-spreading */
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={state.isValidBirthDate === ValidField.ERROR}
                    helperText={
                      state.isValidBirthDate === ValidField.ERROR && t("years")
                    }
                    sx={{ marginTop: "10px" }}
                  />
                )}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setDateDis(!dateDis);
                          handleDateReset();
                        }}
                      >
                        {dateDis && <ModeEditOutlineOutlinedIcon />}
                        {!dateDis && <CancelOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={dateDis}
              />
            </LocalizationProvider>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label={t("email")}
              onChange={handleEmailChange}
              value={email}
              name="email"
              autoComplete="email"
              error={state.isValidEmail === ValidField.ERROR}
              helperText={
                state.isValidEmail === ValidField.ERROR && t("invalid.mail")
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setEmailDis(!emailDis);
                        handleEmailReset();
                      }}
                    >
                      {emailDis && <ModeEditOutlineOutlinedIcon />}
                      {!emailDis && <CancelOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={emailDis}
            />
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setPasswordDis(!passwordDis);
                        handlePasswordReset();
                      }}
                    >
                      {passwordDis && <ModeEditOutlineOutlinedIcon />}
                      {!passwordDis && <CancelOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={passwordDis}
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
              disabled={passwordDis}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="currentPassword"
              label={t("amdp")}
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              name="currentPassword"
              autoComplete="currentPassword"
              disabled={passwordDis}
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
                  {t("valider")}
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
