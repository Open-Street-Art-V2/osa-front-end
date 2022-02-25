import React, { useContext, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Container, Box, CssBaseline, createTheme, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ThemeProvider } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { LoginContext } from "./Context/LoginCtxProvider";

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

type Props = {
  data: any;
};

// TODO: à externaliser dans un service
// FIXME: le body n'est pas accepté
const accept = (propositions: number[], token: string | undefined) => {
  const url = `http://localhost:3008/proposition/validate`;
  const body = { propositions };
  const authorization = `Bearer ${token}`;

  console.log(JSON.stringify(body));

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

const refuse = (propositionId: number, token: string | undefined) => {
  const url = `http://localhost:3008/proposition/${propositionId}`;
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

function AdminDetailsProposition(props: Props) {
  const { data } = props;
  const numPics = Object.keys(data.pictures).length;
  const loginCtx = useContext(LoginContext);

  const [isLoading, setIsLoading] = useState({
    accept: false,
    refuse: false,
  });

  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestValid, setRequestValid] = useState<string | null>(null);

  const handleAccept = async () => {
    setIsLoading({ ...isLoading, accept: true });
    accept([data.id], loginCtx.user?.jwt)
      .then((res) => {
        if (res?.ok) {
          setRequestValid("Proposition ajoutée avec succès.");
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
        {requestError && (
          <div className="pt-7">
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
          <div className="pt-7">
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

      <Box>
        <p className="pt-7 pb-5 font-sans text-2xl font-bold ">
          {data.user.firstname} {data.user.name}
        </p>
      </Box>

      {/* TODO: externaliser le carousel */}
      <Box>
        <div
          id="carouselExampleCaptions"
          className="carousel slide relative"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
            {numPics !== 1 &&
              data.pictures.map((pic: any, index: any) => {
                if (index === 0) {
                  return (
                    <button
                      type="button"
                      key={pic.position}
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to={index}
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    />
                  );
                }
                return (
                  <button
                    type="button"
                    key={pic.position}
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to={index}
                    aria-label="Slide 1"
                  />
                );
              })}
          </div>

          <div className="carousel-inner relative w-full overflow-hidden">
            {data.pictures.map((pic: any, index: any) => {
              if (index === 0) {
                return (
                  <div
                    key={pic.position}
                    className="carousel-item active relative float-left w-full"
                  >
                    <div className="relative overflow-hidden bg-no-repeat bg-cover">
                      <img
                        src={`${process.env.REACT_APP_IMAGES_PATH}${pic.url}`}
                        className="block w-full"
                        alt="Failed to load"
                      />
                      <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-0" />
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={pic.position}
                  className="carousel-item relative float-left w-full"
                >
                  <div className="relative overflow-hidden bg-no-repeat bg-cover">
                    <img
                      src={`${process.env.REACT_APP_IMAGES_PATH}${pic.url}`}
                      className="block object-fill w-full"
                      alt="Failed to load"
                    />
                    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-0" />
                  </div>
                </div>
              );
            })}
          </div>

          {numPics !== 1 && (
            <div>
              <button
                id="btnPrevImg"
                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon inline-block bg-no-repeat"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                id="btnNextImg"
                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon inline-block bg-no-repeat"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          )}
        </div>
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

export default AdminDetailsProposition;
