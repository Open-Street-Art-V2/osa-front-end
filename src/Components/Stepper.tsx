/* eslint-disable */
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Alert, autocompleteClasses } from "@mui/material";
import SignUpFormOne from "./SignUpFormOne";
import SignUpFormTwo from "./SignUpFormTwo";
import register from "../Pages/Guest/SignUp/SignUp.services";
import ValidField from "../Pages/Guest/SignUp/types/validField";
import validator from "validator";
import {
  ActionOne,
  ActionTwo,
  StateOne,
  StateTwo,
} from "../Pages/Guest/SignUp/types/types";
import { AnimatePresence, motion } from "framer-motion";

const dispatchStateTwo = (state: StateTwo, action: ActionTwo) => {
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

const steps = ["1", "2"];

const isValidDate = (date: Date) => {
  const tenYearFromNow = new Date(
    new Date().setFullYear(new Date().getFullYear() - 10)
  );
  return date > new Date("01/01/1900") && date < tenYearFromNow;
};

export default function MyStepper() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const [error, setError] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const dispatchStateOne = (state: StateOne, action: ActionOne) => {
    switch (action.type) {
      case "FIRSTNAME_CHANGED":
        return {
          ...state,
          firstname: action.value,
          isValidFirstname: !validator.isEmpty(action.value)
            ? ValidField.OK
            : ValidField.ERROR,
          isValidForm:
            !validator.isEmpty(action.value) &&
            state.isValidName === ValidField.OK &&
            state.isValidEmail === ValidField.OK &&
            state.isValidBirthDate === ValidField.OK,
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
            state.isValidFirstname === ValidField.OK &&
            state.isValidEmail === ValidField.OK &&
            state.isValidBirthDate === ValidField.OK,
        };
      case "EMAIL_CHANGED":
        setError(false);
        return {
          ...state,
          email: action.value.trim(),
          isValidEmail: validator.isEmail(action.value.trim())
            ? ValidField.OK
            : ValidField.ERROR,
          isValidForm:
            validator.isEmail(action.value.trim()) &&
            state.isValidName === ValidField.OK &&
            state.isValidFirstname === ValidField.OK &&
            state.isValidBirthDate === ValidField.OK,
        };
      default:
        return {
          ...state,
          birthDate: action.value,
          isValidBirthDate: isValidDate(action.value)
            ? ValidField.OK
            : ValidField.ERROR,
          isValidForm:
            isValidDate(action.value) &&
            state.isValidName === ValidField.OK &&
            state.isValidFirstname === ValidField.OK &&
            state.isValidEmail === ValidField.OK,
        };
    }
  };

  const [formOne, dispatchFormOne] = React.useReducer<
    React.Reducer<StateOne, ActionOne>
  >(dispatchStateOne, {
    firstname: "",
    name: "",
    email: "",
    birthDate: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    isValidFirstname: ValidField.NOTFILLED,
    isValidName: ValidField.NOTFILLED,
    isValidEmail: ValidField.NOTFILLED,
    isValidBirthDate: ValidField.NOTFILLED,
    isValidForm: false,
  });

  const [formTwo, dispatchFormTwo] = React.useReducer<
    React.Reducer<StateTwo, ActionTwo>
  >(dispatchStateTwo, {
    favoriteCity: "",
    password: "",
    verifiedPassword: "",
    isValidFavoriteCity: ValidField.OK,
    isValidPassword: ValidField.NOTFILLED,
    isValidVerifiedPassword: ValidField.NOTFILLED,
    isValidForm: false,
  });

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step: number) => () => {
    if (step === 0 || formOne.isValidForm) setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleSubmit = () => {
    // TODO: gérer les erreurs 500
    // TODO: rediriger vers la page de Sign In
    register({
      firstname: formOne.firstname,
      name: formOne.name,
      email: formOne.email,
      birthDate: formOne.birthDate,
      favoriteCity: formTwo.favoriteCity,
      password: formTwo.password,
    }).then((response) => {
      setSubmitted(true);
      if (response.status === 409) {
        setError(true);
      } else {
        setTimeout(() => navigate("/"), 1000);
      }
    });
  };

  return (
    <>
      <Box>
        {activeStep === 0 ? (
          <SignUpFormOne
            // setIsValid={setIsValid}
            // setData={setData}
            // data={data}
            formOne={formOne}
            dispatchFormOne={dispatchFormOne}
          />
        ) : (
          <SignUpFormTwo
            // setIsValid={setIsValid}
            // setData={setData}
            // data={data}
            formTwo={formTwo}
            dispatchFormTwo={dispatchFormTwo}
          />
        )}
      </Box>
      <Box sx={{ width: "40%", margin: "auto", pt: "40px" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)} />
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ width: "100%", margin: "auto", mb: 4 }}>
        {!allStepsCompleted() && (
          <Box sx={{ margin: "auto", pt: 2, textAlign: "center" }}>
            {activeStep !== steps.length - 1 ? (
              <Button
                style={{ borderRadius: "16px", width: "60%" }}
                variant="contained"
                color="secondary"
                disabled={!formOne.isValidForm}
                onClick={handleComplete}
              >
                Suivant
              </Button>
            ) : (
              <Button
                style={{ borderRadius: "16px", width: "60%" }}
                variant="contained"
                disabled={!formTwo.isValidForm}
                onClick={handleSubmit}
              >
                S&apos;inscrire
              </Button>
            )}
          </Box>
        )}
        {submitted && (
          <Box sx={{ width: "100%", margin: "auto", pt: "30px" }}>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
              {error && (
                <motion.div
                  style={{ width: "80%", margin: "auto", borderRadius: "10px" }}
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
                      y: "30vh",
                      opacity: 0,
                      scale: 0.5,
                      transition: {
                        duration: 0.5,
                        damping: 25,
                        stiffness: 400,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Alert severity="error">Email saisi est déjà utilisé</Alert>
                </motion.div>
              )}
            </AnimatePresence>
            {/* <Alert severity="success">
                    Le compte a été créé avec succès.
                  </Alert> */}
          </Box>
        )}
      </Box>
    </>
  );
}
