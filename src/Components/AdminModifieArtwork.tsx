/* eslint-disable */
import React, {
  useState,
  useReducer,
  useRef,
  useContext,
  Fragment,
  useEffect,
} from "react";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import { PhotoCamera } from "@mui/icons-material";
import { IconButton, Tooltip } from "@material-ui/core";
import { styled } from "@mui/system";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import ReactMapGL, { NavigationControl, GeolocateControl } from "react-map-gl";
import { AnimatePresence, motion } from "framer-motion";
import {
  Container,
  Box,
  CssBaseline,
  TextField,
  Button,
  Alert,
  Input,
  Typography,
  createTheme,
} from "@mui/material";
import validator from "validator";
import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { ThemeProvider } from "@emotion/react";
import { LoadingButton } from "@mui/lab";

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

type mapView = {
  latitude: number;
  longitude: number;
  width: string;
  height: string;
  zoom: number;
};

const navControlStyle = {
  left: 10,
  top: 60,
  zIndex: 1,
};
const geolocateControlStyle = {
  left: 10,
  top: 20,
  zIndex: 1,
};
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  padding: 3vh;
`;

const style = {
  width: "90vw",
  bgcolor: "transparent",
  p: 2,
  // px: 2,
  pb: 3,
};
enum ValidField {
  OK,
  ERROR,
  NOTFILLED,
}
const dispatchState = function (state: State, action: Action): State {
  switch (action.type) {
    case "TITLE_CHANGED":
      return {
        ...state,
        isValidTitle: !validator.isLength(action.value, {
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
        isValidArtist: !(
          validator.isAlpha(action.value) || validator.isEmpty(action.value)
        )
          ? ValidField.OK
          : ValidField.ERROR,
        isValidForm:
          (validator.isAlpha(action.value) ||
            validator.isEmpty(action.value)) &&
          state.isValidTitle === ValidField.OK &&
          state.isValidDescription === ValidField.OK &&
          state.isValidPosition === ValidField.OK &&
          state.isValidImages === ValidField.OK,
      };
    case "DESCRIPTION_CHANGED":
      return {
        ...state,
        isValidDescription: !validator.isLength(action.value, {
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
  }
};

function ModifieArtWork(props: any) {
  // MEEEEEEEEEEEEEE

  const [state, dispatch] = useReducer(dispatchState, {
    isValidTitle: ValidField.NOTFILLED,
    isValidArtist: ValidField.NOTFILLED,
    isValidDescription: ValidField.NOTFILLED,
    isValidPosition: ValidField.NOTFILLED,
    isValidImages: ValidField.NOTFILLED,
    isValidForm: false,
  });

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
  const [isLoading, setIsLoading] = useState(false);

  const [lat, setLat] = useState<any>("");
  const [long, setLong] = useState<any>("");
  const handlePositionChange = () => {
    const latLong = lat && long ? `${long}, ${lat}` : ` `;
    console.log(latLong);
    dispatch({
      type: "POSITION_CHANGED",
      value: latLong,
    });
  };

  const [images, setImages] = useState([]);

  const handleImagesChange = ({ target }: any) => {
    setImages(target.files);
  };

  useEffect(() => {
    console.log(images);
    console.log(images.length.toString());

    dispatch({
      type: "IMAGES_CHANGED",
      value: images.length.toString(),
    });
  }, [images]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const dataR = {
      title: data.get("title")?.toString().trim(),
      artist: data.get("artist")?.toString().trim(),
      description: data.get("description")?.toString().trim(),
      longitude: long,
      latitude: lat,
      images: images,
    };
    dispatchState;
    console.log(dataR);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [viewport, setViewport] = useState({
    latitude: 49.43424,
    longitude: 1.08972,
    width: "100%",
    height: "90vh",
    zoom: 10,
  });
  const mapRef = useRef<any>();
  return (
    <>
      <Container component="main" maxWidth="xs" className="px-5 pb-4">
        <CssBaseline />
        <StyledModal
          open={open}
          onClose={handleClose}
          BackdropComponent={Backdrop}
          className="blure"
        >
          <Box sx={style}>
            <ReactMapGL
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...viewport}
              className="rounded-3xl"
              maxZoom={18}
              mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              onViewportChange={(newViewport: mapView) => {
                setViewport({ ...newViewport });
              }}
              onClick={(evt) => {
                setLat(evt.lngLat[1]);
                setLong(evt.lngLat[0]);
                handlePositionChange();
                console.log(evt.lngLat[1]);
                console.log(evt.lngLat[0]);
              }}
              ref={mapRef}
              keyboard={false}
            >
              <NavigationControl style={navControlStyle} />
              <GeolocateControl
                style={geolocateControlStyle}
                showUserHeading
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation
                auto
              />
              <div id="add">
                <button
                  type="button"
                  id="addBtn"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center w-10 h-10 z-10 bg-slate-700 text-white text-2xl rounded-3xl"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </ReactMapGL>
          </Box>
        </StyledModal>
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
            sx={{ mt: 3 }}
          >
            <div className="text-center">
              <p className="py-8 font-sans text-2xl font-bold ">
                Modification d'une oeuvre
              </p>

              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Titre"
                onChange={handleTitleChange}
                name="title"
                autoComplete="title"
                error={!state.isValidTitle}
                helperText={!state.isValidTitle && "Titre invalide"}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="artist"
                label="Artist"
                onChange={handleArtistChange}
                name="artist"
                autoComplete="artist"
                error={!state.isValidArtist}
                helperText={!state.isValidArtist && "Artist invalide"}
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
                error={!state.isValidDescription}
                helperText={
                  !state.isValidDescription &&
                  "Description doit contenir entre 2 et 250 caractéres"
                }
              />
              <Divider variant="middle" />

              <div className="flex flex-row px-5 pb-3 pt-4 ">
                <Typography gutterBottom variant="h5" component="div">
                  Ajouter des photos :
                </Typography>
                <label htmlFor="icon-button-file">
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    onChange={handleImagesChange}
                    type="file"
                    multiple
                    required
                    hidden
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
              {state.isValidImages === ValidField.ERROR && (
                <Alert severity="error">
                  Le nombre des images possible entre 1 et 3 avec 3Mo au max
                </Alert>
              )}
              <Divider variant="middle" />

              <Button
                style={{
                  borderRadius: 35,
                  backgroundColor: "#3a4551",
                  padding: "12px 40px",
                  fontSize: "13px",
                  color: "white",
                }}
                variant="contained"
                endIcon={<MyLocationIcon />}
                onClick={handleOpen}
              >
                Saisir la position
              </Button>
              {state.isValidPosition === ValidField.ERROR && (
                <Alert severity="error">
                  Le nombre des position possible entre 1 et 3 avec 3Mo au max
                </Alert>
              )}

              <div className="px-5 pb-3 pt-4">
                <Button
                  style={{
                    borderRadius: 35,
                    backgroundColor: "#00ab55",
                    padding: "12px 70px",
                    fontSize: "13px",
                    color: "white",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Valider
                </Button>
                <div className="centreD pt-6">
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
                        //color: "#ffffff",
                        // background: "#00ab55",
                        // borderRadius: "60px",
                      }}
                      // className="loginBtn m-5"
                      //id="loginBtnForm"
                    >
                      Se connecter
                    </LoadingButton>
                  </ThemeProvider>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ModifieArtWork;
