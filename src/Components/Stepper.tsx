import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import SignUpFormOne from "./SignUpFormOne";
import SignUpFormTwo from "./SignUpFormTwo";
import SignUpData from "../Pages/Guest/SignUp/types/signUpData";

const steps = ["Select campaign settings", "Create an ad group"];

export default function MyStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [isValid, setIsValid] = React.useState(false);
  const [data, setData] = React.useState<SignUpData>({
    firstName: "",
    name: "",
    email: "",
    birthday: new Date(),
    city: "",
    password: "",
    verifiedPassword: "",
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
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleSubmit = () => {
    console.log(data);
  };

  return (
    <>
      <Box>
        {activeStep === 0 ? (
          <SignUpFormOne
            setIsValid={setIsValid}
            setData={setData}
            data={data}
          />
        ) : (
          <SignUpFormTwo
            setIsValid={setIsValid}
            setData={setData}
            data={data}
          />
        )}
      </Box>
      <Box sx={{ width: "40%", margin: "auto", pt: "40px" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)} />
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ width: "100%", margin: "auto" }}>
        {!allStepsCompleted() && (
          <Box sx={{ margin: "auto", pt: 2, textAlign: "center" }}>
            {activeStep !== steps.length - 1 ? ( // && completed[activeStep] ? (
              <Button
                style={{ borderRadius: "16px", width: "60%" }}
                variant="contained"
                color="secondary"
                disabled={!isValid}
                onClick={handleComplete}
              >
                Suivant
              </Button>
            ) : (
              <Button
                style={{ borderRadius: "16px", width: "60%" }}
                variant="contained"
                disabled={!isValid}
                onClick={handleSubmit}
              >
                S&apos;inscrire
              </Button>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
