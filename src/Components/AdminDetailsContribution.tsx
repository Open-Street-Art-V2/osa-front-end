import React, { useContext, useState } from "react";
import {
  Container,
  Box,
  createTheme,
  CssBaseline,
  Switch,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ThemeProvider } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import Moment from "react-moment";
import { LoginContext } from "./Context/LoginCtxProvider";
import { Carousel } from ".";

const loadingBtnTheme = createTheme({
  palette: {
    primary: {
      main: "#00ab55",
    },
    secondary: {
      main: "#FF5757",
    },
  },
  shape: {
    borderRadius: "60px",
  },
});

const switchTheme = createTheme({
  palette: {
    primary: {
      main: "#3A4551",
    },
  },
});

type Props = {
  data: any;
};

// TODO: à externaliser dans un service
// TODO: à remplacer par les bons appels API
const accept = (contributions: number[], token: string | undefined) => {
  const url = `http://localhost:3008/proposition/validate`;
  const body = { contributions };
  const authorization = `Bearer ${token}`;

  try {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        authorization,
      },
    });
  } catch (error) {
    throw new Error();
  }
};

const refuse = (contributionId: number, token: string | undefined) => {
  const url = `http://localhost:3008/proposition/${contributionId}`;
  const authorization = `Bearer ${token}`;

  try {
    return fetch(url, {
      method: "DELETE",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    throw new Error();
  }
};

function SwitchContribution(props: Props) {
  const { data } = props;
  const numPics = Object.keys(data.pictures).length;

  return (
    <>
      <Box>
        <p className="pt-3 font-sans text-2xl font-bold ">
          {data.user
            ? `${data.user.firstname} ${data.user.name}`
            : "Oeuvre d'origine"}
        </p>
      </Box>

      <Box>
        <p className="pb-5 text-base text-right text-sky-700 ">
          <Moment date={data.created_at} format="DD/MM/YYYY" />
        </p>
      </Box>

      <Box>
        <Carousel pictures={data.pictures} nbPictures={numPics} />
      </Box>

      <Box>
        <div className="py-4">
          <div className="font-bold text-xl mb-2">Titre : {data.title}</div>
          <blockquote>
            <p className="text-gray-700 text-base">{data.description}</p>
          </blockquote>
          <figcaption className="font-medium">
            {data.artist && (
              <div className="text-lg mt-3 mb-2">
                <span className="font-bold">Artiste : </span>
                {data.artist}
              </div>
            )}
            <div className="text-slate-700 dark:text-slate-500">
              {data.address}, {data.city}
            </div>
          </figcaption>
        </div>
      </Box>
    </>
  );
}

function AdminDetailsContribution(props: Props) {
  const { data } = props;
  const loginCtx = useContext(LoginContext);

  const [isLoading, setIsLoading] = useState({
    accept: false,
    refuse: false,
  });

  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestValid, setRequestValid] = useState<string | null>(null);

  const [original, setOriginal] = useState<boolean>(false);

  const handleAccept = async () => {
    setIsLoading({ ...isLoading, accept: true });
    accept([data.id], loginCtx.user?.jwt)
      .then((res) => {
        if (res?.ok) {
          setRequestValid("Contribution validée avec succès.");
          setRequestError(null);
        } else {
          setRequestValid(null);
          setRequestError("Le serveur est en cours de maintenance.");
        }
      })
      .catch(() => {
        setRequestValid(null);
        setRequestError("Une erreur est survenue.");
      })
      .finally(() => {
        setIsLoading({ ...isLoading, accept: false });
      });
  };

  const handleRefuse = () => {
    setIsLoading({ ...isLoading, refuse: true });

    refuse(data.id, loginCtx.user?.jwt)
      .then((res) => {
        if (res?.ok) {
          setRequestValid("Proposition supprimée avec succès.");
          setRequestError(null);
        } else {
          setRequestValid(null);
          setRequestError("Le serveur est en cours de maintenance.");
        }
      })
      .catch(() => {
        setRequestValid(null);
        setRequestError("Une erreur est survenue.");
      })
      .finally(() => {
        setIsLoading({ ...isLoading, refuse: false });
      });
  };

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginal(event.target.checked);
  };

  return (
    <Container component="main" maxWidth="xs" className="px-5 pb-4">
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
        <div
          id="btnRetour"
          className="flex flex-row place-content-between hTitle pt-4"
        >
          <Link to="/map/admin" className="inline-flex items-center">
            <button
              type="button"
              id="retBtn"
              className="inline-flex items-center justify-center w-10 h-10 z-10 ml-4 bg-slate-700 text-white text-2xl rounded-2xl"
            >
              <AiOutlineLeft />
            </button>
          </Link>
        </div>
      </Box>

      <Box>
        <div id="btnSwitch" className="pt-7">
          <ThemeProvider theme={switchTheme}>
            <FormControlLabel
              control={<Switch name="original" onChange={handleSwitch} />}
              label="Oeuvre d'origine"
            />
          </ThemeProvider>
        </div>
      </Box>

      <Box>
        {requestError && (
          <div className="pt-3">
            <AnimatePresence initial exitBeforeEnter>
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
            </AnimatePresence>
          </div>
        )}
        {requestValid && (
          <div className="pt-3">
            <AnimatePresence initial exitBeforeEnter>
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
            </AnimatePresence>
          </div>
        )}
      </Box>

      <SwitchContribution data={original ? data.art : data} />

      <Box>
        <div className="px-5 pb-3 pt-3">
          <div className="centreD">
            <ThemeProvider theme={loadingBtnTheme}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={isLoading.accept}
                disabled={isLoading.refuse}
                onClick={handleAccept}
                sx={{
                  width: "263px",
                  margin: "10px 0px",
                  height: "54px",
                  fontWeight: "500",
                  fontSize: "18px",
                  lineHeight: "21px",
                }}
              >
                Accepter
              </LoadingButton>
            </ThemeProvider>
          </div>
        </div>

        <div className="px-5 pb-3">
          <div className="centreD">
            <ThemeProvider theme={loadingBtnTheme}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                loading={isLoading.refuse}
                disabled={isLoading.accept}
                onClick={handleRefuse}
                sx={{
                  width: "263px",
                  margin: "10px 0px",
                  height: "54px",
                  fontWeight: "500",
                  fontSize: "18px",
                  lineHeight: "21px",
                }}
              >
                Refuser
              </LoadingButton>
            </ThemeProvider>
          </div>
        </div>
      </Box>
    </Container>
  );
}

export default AdminDetailsContribution;
