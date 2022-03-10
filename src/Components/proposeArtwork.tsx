/* eslint-disable */
import React, { useState, useReducer, useContext, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Container,
  Box,
  CssBaseline,
  TextField,
  Button,
  Alert,
  Typography,
  createTheme,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import validator from "validator";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { ThemeProvider } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { LoginContext } from "./Context/LoginCtxProvider";
import FormMap from "./FormMap";
import FileUploader from "./FileUploader";
import { useTranslation } from "react-i18next";

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
}
type State = {
  isValidTitle: ValidField;
  isValidArtist: ValidField;
  isValidDescription: ValidField;
  isValidPosition: ValidField;
  isValidImages: ValidField;
  isValidForm: boolean;
};

type Action =
  | { type: "TITLE_CHANGED"; value: string }
  | { type: "ARTIST_CHANGED"; value: string }
  | { type: "DESCRIPTION_CHANGED"; value: string }
  | { type: "POSITION_CHANGED"; value: string }
  | { type: "IMAGES_CHANGED"; value: string };

const dispatchState = function (state: State, action: Action): State {
  switch (action.type) {
    case "TITLE_CHANGED":
      return {
        ...state,
        isValidTitle: validator.isLength(action.value, {
          min: 2,
          max: 25,
        })
          ? ValidField.OK
          : ValidField.ERROR,
        isValidForm:
          validator.isLength(action.value, {
            min: 2,
            max: 25,
          }) &&
          state.isValidArtist === ValidField.OK &&
          state.isValidDescription === ValidField.OK &&
          state.isValidPosition === ValidField.OK &&
          state.isValidImages === ValidField.OK,
      };
    case "ARTIST_CHANGED":
      return {
        ...state,
        isValidArtist:
          validator.isEmpty(action.value) ||
          (validator.isLength(action.value, {
            min: 3,
            max: 25,
          }) &&
            validator.isAlpha(action.value.replace(" ", "")))
            ? ValidField.OK
            : ValidField.ERROR,
        isValidForm:
          (validator.isEmpty(action.value) ||
            (validator.isLength(action.value, {
              min: 3,
              max: 25,
            }) &&
              validator.isAlpha(action.value.replace(" ", "")))) &&
          state.isValidTitle === ValidField.OK &&
          state.isValidDescription === ValidField.OK &&
          state.isValidPosition === ValidField.OK &&
          state.isValidImages === ValidField.OK,
      };
    case "DESCRIPTION_CHANGED":
      return {
        ...state,
        isValidDescription: validator.isLength(action.value, {
          min: 2,
          max: 300,
        })
          ? ValidField.OK
          : ValidField.ERROR,
        isValidForm:
          validator.isLength(action.value, {
            min: 2,
            max: 300,
          }) &&
          state.isValidArtist === ValidField.OK &&
          state.isValidTitle === ValidField.OK &&
          state.isValidPosition === ValidField.OK &&
          state.isValidImages === ValidField.OK,
      };
    case "POSITION_CHANGED":
      return {
        ...state,
        isValidPosition: validator.isLatLong(action.value)
          ? ValidField.OK
          : ValidField.ERROR,
        isValidForm:
          validator.isLatLong(action.value) &&
          state.isValidArtist === ValidField.OK &&
          state.isValidTitle === ValidField.OK &&
          state.isValidDescription === ValidField.OK &&
          state.isValidImages === ValidField.OK,
      };
    case "IMAGES_CHANGED":
      return {
        ...state,
        isValidImages: validator.isInt(action.value, {
          min: 1,
          max: 3,
        })
          ? ValidField.OK
          : ValidField.ERROR,
        isValidForm:
          validator.isInt(action.value, {
            min: 1,
            max: 3,
          }) &&
          state.isValidArtist === ValidField.OK &&
          state.isValidDescription === ValidField.OK &&
          state.isValidPosition === ValidField.OK &&
          state.isValidTitle === ValidField.OK,
      };
    default:
      return {
        ...state,
      };
  }
};

function CreateArtWork() {
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useReducer(dispatchState, {
    isValidTitle: ValidField.NOTFILLED,
    isValidArtist: ValidField.OK,
    isValidDescription: ValidField.NOTFILLED,
    isValidPosition: ValidField.NOTFILLED,
    isValidImages: ValidField.NOTFILLED,
    isValidForm: false,
  });
  const [images, setImages] = useState([]);
  const [isLoading] = useState(false);
  const [lat, setLat] = useState<any>();
  const [long, setLong] = useState<any>();
  const [addr, setAddr] = useState("Rouen");
  const [city, setCity] = useState("Rouen");
  const [mapState, setMapState] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [requestValid, setRequestValid] = useState(null);
  const [addrRequestError, setAddrRequestError] = useState(null);

  const loginCtx = useContext(LoginContext);
  if (loginCtx.isLoggedIn && loginCtx.user?.role === "ROLE_ADMIN") {
    return <Navigate to="/map/admin"></Navigate>;
  } else if (!loginCtx.isLoggedIn) {
    return <Navigate to="/"></Navigate>;
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "TITLE_CHANGED",
      value: event.currentTarget.value,
    });
  };

  const handleArtistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "ARTIST_CHANGED",
      value: event.currentTarget.value,
    });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "DESCRIPTION_CHANGED",
      value: event.currentTarget.value,
    });
  };

  useEffect(() => {
    const latLong = lat && long ? `${long}, ${lat}` : ` `;
    if (long && lat) {
      console.log(latLong);

      dispatch({
        type: "POSITION_CHANGED",
        value: latLong,
      });
    }
  }, [long]);

  useEffect(() => {
    if (images.length !== 0) {
      dispatch({
        type: "IMAGES_CHANGED",
        value: images.length.toString(),
      });
    }
  }, [images]);

  async function getAddr() {
    const url = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${long}&zoom=14&addressdetails=1&accept-language=<browser language string>`;
    try {
      const res: Response = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setAddr(data.features[0].properties.display_name);
        const artCity = data.features[0].properties.address.municipality;
        if (artCity === undefined) {
          setAddr("Rouen");
          throw Error(t("valid.location"));
        }
        setCity(artCity);
        setAddrRequestError(null);
      }
    } catch (error: any) {
      if (
        error.message === "Cannot read properties of undefined (reading '0')"
      ) {
        error.message = t("valid.location");
      }
      setAddrRequestError(error.message);
    }
  }
  const handlePositionChange = () => {
    const latLong = lat && long ? `${long}, ${lat}` : ` `;
    console.log(latLong);
    dispatch({
      type: "POSITION_CHANGED",
      value: latLong,
    });
    getAddr();
  };

  async function sendArtwork(artwork: any) {
    // eslint-disable-next-line no-unused-expressions
    dispatchState;
    const formData = new FormData();
    const index = 0;

    formData.append("title", artwork.get("title")?.toString().trim());
    formData.append("artist", artwork.get("artist")?.toString().trim());
    formData.append(
      "description",
      artwork.get("description")?.toString().trim()
    );
    formData.append("latitude", lat);
    formData.append("longitude", long);
    formData.append("address", addr);
    formData.append("city", city);
    formData.append("index", index.toString());
    for (let i = 0; i < images.length; i += 1) {
      formData.append("files", images[i]);
    }

    const url = `${process.env.REACT_APP_PROPOSE_ART}`;

    try {
      const res: Response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          authorization: `Bearer ${loginCtx.user?.jwt}`,
        },
      });
      if (res.ok) {
        const valid: any = t("art.created.success");
        setRequestValid(valid);
        setRequestError(null);
        const jsonData = await res.json();
        console.log(jsonData);
      } else if (!res.ok) {
        if (res.status === 409) {
          throw Error(t("art.exist"));
        } else if (res.status === 401) {
          throw Error(t("connect.operation"));
        } else if (res.status === 407) {
          throw Error(t("file.large"));
        }
        throw Error(t("server.maintenance"));
      }
    } catch (error: any) {
      setRequestError(error.message);
      setRequestValid(null);
      console.log(error.message);
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    sendArtwork(data);
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
            <p className="py-8 font-sans text-2xl font-bold ">
              {t("propose.art")}
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
              required
              fullWidth
              id="title"
              label="Titre"
              onChange={handleTitleChange}
              name="title"
              autoComplete="title"
              error={state.isValidTitle === ValidField.ERROR}
              helperText={
                state.isValidTitle === ValidField.ERROR && t("invalid.title")
              }
            />

            <TextField
              margin="normal"
              fullWidth
              id="artist"
              label="Artiste*"
              onChange={handleArtistChange}
              name="artist"
              autoComplete="artist"
              error={state.isValidArtist === ValidField.ERROR}
              helperText={
                state.isValidArtist === ValidField.ERROR && "Artist invalide"
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              multiline
              rows={4}
              onChange={handleDescriptionChange}
              name="description"
              autoComplete="description"
              error={state.isValidDescription === ValidField.ERROR}
              helperText={
                state.isValidDescription === ValidField.ERROR &&
                t("description.characters")
              }
            />
            <Divider variant="middle" />

            <div className="flex flex-row px-5 pb-0 pt-4 ">
              <Typography gutterBottom variant="h5" component="div">
                {t("add.photos")}
              </Typography>
            </div>
            <div className="text-center justify-center">
              <FileUploader
                getImages={(imagesF: any) => setImages(imagesF)}
                updateImage={(imagesF: any) => {
                  setImages(imagesF);
                }}
                removeImage={(imagesF: any) => {
                  setImages(imagesF);
                }}
                addImage={(imagesF: any) => {
                  setImages(imagesF);
                }}
              />
            </div>
            {state.isValidImages === ValidField.ERROR && (
              <Alert severity="error">{t("images.number")}</Alert>
            )}

            <Button
              style={{
                borderRadius: 35,
                backgroundColor: "#3a4551",
                padding: "12px 40px",
                margin: "10px 0 10px 0",
                fontSize: "13px",
                color: "white",
              }}
              variant="contained"
              endIcon={<MyLocationIcon />}
              onClick={() => {
                setMapState(true);
              }}
            >
              {t("position.enter")}
            </Button>
            {addr !== "Rouen" && (
              <div className="pt-2 pb-3">
                <span className="font-medium text-sky-700 ">Address :</span>
                <span className="text-slate-700 dark:text-slate-500">
                  &ensp;{addr}
                </span>
              </div>
            )}
            {mapState && (
              <FormMap
                closeMap={(mapstate: any) => {
                  setMapState(mapstate);
                  handlePositionChange();
                }}
                getLat={(mapLat: any) => setLat(mapLat)}
                getLong={(mapLong: any) => setLong(mapLong)}
              />
            )}
            {addrRequestError && (
              <Alert severity="error">{addrRequestError}</Alert>
            )}
            {state.isValidPosition === ValidField.ERROR && (
              <Alert severity="error">{t("position.invalid")}</Alert>
            )}

            <Divider variant="middle" />

            <div className="px-5 pb-3 pt-4">
              <div className="centreD pt-6">
                <ThemeProvider theme={loadingBtnTheme}>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={
                      !state.isValidForm ||
                      addrRequestError === t("valid.location")
                    }
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
          </div>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateArtWork;
