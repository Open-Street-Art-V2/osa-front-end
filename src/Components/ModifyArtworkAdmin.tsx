/* eslint-disable */
import React, {
  useState,
  useReducer,
  useRef,
  useContext,
  useEffect,
} from "react";
import Divider from "@mui/material/Divider";
import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  Marker,
} from "react-map-gl";
import Pin from "./Pin.map";
import { AnimatePresence, motion } from "framer-motion";
import {
  Container,
  Box,
  CssBaseline,
  TextField,
  Button,
  Alert,
  createTheme,
} from "@mui/material";
import validator from "validator";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { ThemeProvider } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { LoginContext } from "./Context/LoginCtxProvider";
import { useTranslation } from "react-i18next";

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
  NOTMODIFIED,
}
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
          validator.isAlpha(action.value) || validator.isEmpty(action.value)
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
  }
};
type Pics = {
  isModifiedPic1: ValidField;
  isModifiedPic2: ValidField;
  isModifiedPic3: ValidField;
};
type PicsNames = {
  image1Name: string;
  image2Name: string;
  image3Name: string;
};
type PicsFiles = {
  image1File: string;
  image2File: string;
  image3File: string;
};
function ModifyArtWork(props: any) {
  const { t, i18n } = useTranslation();
  const [Artwork, setArtwork] = useState<any>(props.data);
  useEffect(() => {
    if (Artwork === undefined) setArtwork(props.data);
  }, [Artwork]);

  const [state, dispatch] = useReducer(dispatchState, {
    isValidTitle: ValidField.OK,
    isValidArtist: ValidField.OK,
    isValidDescription: ValidField.OK,
    isValidPosition: ValidField.OK,
    isValidImages: ValidField.OK,
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

  const [lat, setLat] = useState<any>(props.coords[1]);
  const [long, setLong] = useState<any>(props.coords[0]);

  const handlePositionChange = () => {
    const latLong = lat && long ? `${long}, ${lat}` : ` `;
    dispatch({
      type: "POSITION_CHANGED",
      value: latLong,
    });
  };

  const [images, setImages] = useState(Artwork.pictures);
  const [Pics, dispatchPics] = useState<Pics>({
    isModifiedPic1: ValidField.NOTMODIFIED,
    isModifiedPic2: ValidField.NOTMODIFIED,
    isModifiedPic3: ValidField.NOTMODIFIED,
  });
  const handleImagesChange = ({ target }: any) => {
    setImages(target.files);
    /* let size = 0;
      Array.from(target.files).forEach((file: any) => {
        size += file.size;
      });
      console.log(target.files);
      console.log(size);
      size < 450
        ? setImages(target.files)
        : (state.isValidImages = ValidField.ERROR); */
  };

  const [imagesNames, setImagesNames] = useState<PicsNames>({
    image1Name: images.length > 0 ? images[0].url : "",
    image2Name: images.length > 1 ? images[1].url : "",
    image3Name: images.length > 2 ? images[2].url : "",
  });

  const [imagesFiles, setImagesFiles] = useState<PicsFiles>({
    image1File: images.length > 0 ? images[0].url : "",
    image2File: images.length > 1 ? images[1].url : "",
    image3File: images.length > 2 ? images[2].url : "",
  });

  const handleImagesChange1 = ({ target }: any) => {
    if (target.files[0].name !== Artwork.pictures[0].url) {
      setImagesNames((prevState) => ({
        ...prevState,
        image1Name: target.files[0].name,
      }));
      Pics.isModifiedPic1 = ValidField.OK;
      let newArr = [...images];
      newArr[0] = target.files;

      setImages(newArr);
      let src;
      const reader = new FileReader();
      reader.onload = function () {
        src = reader.result;
      };
      reader.readAsDataURL(target.files[0]);
      setImagesFiles((prevState) => ({
        ...prevState,
        image1File: URL.createObjectURL(target.files[0]),
      }));
    }
  };

  const handleImagesChange2 = ({ target }: any) => {
    if (target.files[0].name !== Artwork.pictures[1].url) {
      setImagesNames((prevState) => ({
        ...prevState,
        image2Name: target.files[0].name,
      }));
      Pics.isModifiedPic2 = ValidField.OK;
      let newArr = [...images];
      newArr[1] = target.files;
      setImages(newArr);
      let src;
      const reader = new FileReader();
      reader.onload = function () {
        src = reader.result;
      };
      reader.readAsDataURL(target.files[0]);
      setImagesFiles((prevState) => ({
        ...prevState,
        image2File: URL.createObjectURL(target.files[0]),
      }));
    }
  };

  const handleImagesChange3 = ({ target }: any) => {
    if (target.files[0].name !== Artwork.pictures[2].url) {
      setImagesNames((prevState) => ({
        ...prevState,
        image3Name: target.files[0].name,
      }));
      Pics.isModifiedPic3 = ValidField.OK;
      let newArr = [...images];
      newArr[2] = target.files;
      setImages(newArr);

      let src;
      const reader = new FileReader();
      reader.onload = function () {
        src = reader.result;
      };
      reader.readAsDataURL(target.files[0]);
      setImagesFiles((prevState) => ({
        ...prevState,
        image3File: URL.createObjectURL(target.files[0]),
      }));
    }
  };

  useEffect(() => {
    if (images.length !== 0 && Artwork !== undefined) {
      dispatch({
        type: "IMAGES_CHANGED",
        value: images.length.toString(),
      });
    }
  }, [images]);

  const [addr, setAddr] = React.useState(Artwork.address);
  const [city, setCity] = React.useState(Artwork.city);

  async function getAddr() {
    const url = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`;
    const res: Response = await fetch(url);
    const data = await res.json();
    setAddr(data.features[0].properties.display_name);
    let city = data.features[0].properties.address.city;
    if (city === undefined) {
      city = data.features[0].properties.address.town;
      if (city === undefined) {
        city = t("ocean");
      }
    }
    setCity(city);
  }
  const loginCtx = useContext(LoginContext);
  const [requestError, setRequestError] = React.useState(null);
  const [requestValid, setRequestValid] = React.useState(null);

  async function sendArtwork(artwork: any) {
    dispatchState;
    const formData = new FormData();

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
    let index = 1;
    if (Pics.isModifiedPic1 !== ValidField.NOTMODIFIED) {
      formData.append("files", images[0][0]);
      index = 1;
      if (Pics.isModifiedPic2 !== ValidField.NOTMODIFIED) {
        index = 4;
        if (Pics.isModifiedPic3 !== ValidField.NOTMODIFIED) index = 7;
      }
    }
    if (Pics.isModifiedPic2 !== ValidField.NOTMODIFIED) {
      formData.append("files", images[1][0]);
      if (Pics.isModifiedPic1 === ValidField.NOTMODIFIED) index = 2;
      if (Pics.isModifiedPic3 !== ValidField.NOTMODIFIED) index = 6;
    }
    if (Pics.isModifiedPic3 !== ValidField.NOTMODIFIED) {
      formData.append("files", images[2][0]);
      if (
        Pics.isModifiedPic1 === ValidField.NOTMODIFIED &&
        Pics.isModifiedPic2 === ValidField.NOTMODIFIED
      )
        index = 3;
    }
    formData.append("index", index.toString());
    const url = `${process.env.REACT_APP_API}/art/${Artwork.oeuvreId}`;

    try {
      const res: Response = await fetch(url, {
        method: "PATCH",
        body: formData,
        headers: {
          authorization: `Bearer ${loginCtx.user?.jwt}`,
        },
      });
      if (res.ok) {
        const valid: any = t("art.modification");
        setRequestError(null);
        setRequestValid(valid);
        const jsonData = await res.json();
        console.log(jsonData);
      } else if (!res.ok) {
        if (res.status === 409) {
          throw (Error = t("art.exist"));
        } else if (res.status === 401) {
          throw (Error = t("connect.operation"));
        } else if (res.status === 400) {
          throw (Error = t("enter.location"));
        } else if (res.status === 413) {
          throw (Error = t("file.tlarge"));
        } else if (res.status === 413) {
          throw (Error = t("server.maintenance"));
        }
        throw (Error = t("art.title.exist"));
        // throw Error("Une erreur est survenue lors de la modification.");
      }
    } catch (error: any) {
      setRequestValid(null);
      setRequestError(error.message);
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const dataArt = {
      title: data.get("title")?.toString().trim(),
      artist: data.get("artist")?.toString().trim(),
      description: data.get("description")?.toString().trim(),
      longitude: long,
      latitude: lat,
      images: images,
      address: addr,
      city: city,
    };
    console.log(dataArt);
    getAddr();
    sendArtwork(data);
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
      {Artwork !== undefined && (
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
                <Marker latitude={lat} longitude={long}>
                  <Pin size={20} onClick={() => function () {}} />
                </Marker>
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
            <div
              id="btnRetour"
              className="flex flex-row place-content-between hTitle pt-4"
            >
              <Link to="/map/admin" className="inline-flex items-center">
                <button
                  type="button"
                  id="retBtn"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center w-10 h-10 z-10 ml-4 bg-slate-700 text-white text-2xl rounded-2xl"
                >
                  <AiOutlineLeft />
                </button>
              </Link>

              <div id="logo" className="flex flex-row">
                <h1 className="text-3xl pt-1 font-semibold text-slate-900">
                  Street Art
                </h1>
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
                      <use
                        xlinkHref="#image0_211_9"
                        transform="scale(0.0046729)"
                      />
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
              sx={{ mt: 3 }}
            >
              <div className="text-center">
                <label className="py-8 font-sans text-2xl authTitle font-bold ">
                  {t("modify.art")}
                </label>
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
                  inputProps={{
                    defaultValue: Artwork.title,
                  }}
                  id="title"
                  label={t("Title")}
                  onChange={handleTitleChange}
                  name="title"
                  autoComplete="title"
                  error={state.isValidTitle === ValidField.ERROR}
                  helperText={
                    state.isValidTitle === ValidField.ERROR &&
                    t("invalid.title")
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="artist"
                  label="Artist"
                  inputProps={{
                    defaultValue: Artwork.artist,
                  }}
                  onChange={handleArtistChange}
                  name="artist"
                  autoComplete="artist"
                  error={state.isValidArtist === ValidField.ERROR}
                  helperText={
                    state.isValidArtist === ValidField.ERROR &&
                    t("invalid.artist")
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  inputProps={{
                    defaultValue: Artwork.description,
                  }}
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

                <div className="grid grid-cols-2 gap-3 content-around py-2">
                  {imagesFiles.image1File && imagesNames.image1Name && (
                    <figure className="flex flex-col bg-slate-100 w-full h-full rounded-3xl">
                      <img
                        className="w-full rounded-t-3xl m-0"
                        src={`${
                          Artwork.pictures[0].url !== imagesNames.image1Name
                            ? imagesFiles.image1File
                            : `./../${process.env.REACT_APP_IMAGES_PATH}${Artwork.pictures[0].url}`
                        }`}
                        alt=""
                        width="384"
                        height="512"
                      />
                      <div className="text-center md:text-left m-0">
                        <div className="py-2">
                          {/* <label
                            htmlFor="icon-button-delelte-file1"
                            className="my-0 mr-4"
                          >
                            <IconButton
                              aria-label="delelte picture"
                              component="span"
                            >
                              <AiFillDelete className="fill-red-500" />
                            </IconButton>
                          </label> */}
                          <label
                            htmlFor="icon-button-file1"
                            className="my-0 ml-0"
                          >
                            <input
                              accept="image/*"
                              id="icon-button-file1"
                              onChange={handleImagesChange1}
                              type="file"
                              name="file1"
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
                      </div>
                    </figure>
                  )}

                  {imagesFiles.image2File && imagesNames.image2Name && (
                    <figure className="flex flex-col bg-slate-100 w-full h-full rounded-3xl">
                      <img
                        className="w-full rounded-t-3xl m-0"
                        src={`${
                          Artwork.pictures[1].url !== imagesNames.image2Name
                            ? imagesFiles.image2File
                            : `./../${process.env.REACT_APP_IMAGES_PATH}${Artwork.pictures[1].url}`
                        }`}
                        alt=""
                        width="384"
                        height="512"
                      />
                      <div className="text-center md:text-left m-0">
                        <div className="py-2">
                          {/* <label
                            htmlFor="icon-button-delelte-file2"
                            className="my-0 mr-4"
                          >
                            <IconButton
                              aria-label="delelte picture 2"
                              component="span"
                            >
                              <AiFillDelete className="fill-red-500" />
                            </IconButton>
                          </label> */}
                          <label
                            htmlFor="icon-button-file2"
                            className="my-0 ml-0"
                          >
                            <input
                              accept="image/*"
                              id="icon-button-file2"
                              onChange={handleImagesChange2}
                              type="file"
                              name="file2"
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
                      </div>
                    </figure>
                  )}
                  {imagesFiles.image3File && imagesNames.image3Name && (
                    <figure className="flex flex-col bg-slate-100 w-full h-full rounded-3xl">
                      <img
                        className="w-full rounded-t-3xl m-0"
                        src={`${
                          Artwork.pictures[2].url !== imagesNames.image3Name
                            ? imagesFiles.image3File
                            : `./../${process.env.REACT_APP_IMAGES_PATH}${Artwork.pictures[2].url}`
                        }`}
                        alt=""
                        width="384"
                        height="512"
                      />
                      <div className="text-center md:text-left m-0">
                        <div className="py-2">
                          {/* <label
                            htmlFor="icon-button-delelte-file3"
                            className="my-0 mr-4"
                          >
                            <IconButton
                              aria-label="delelte picture 3"
                              component="span"
                            >
                              <AiFillDelete className="fill-red-500" />
                            </IconButton>
                          </label> */}
                          <label
                            htmlFor="icon-button-file3"
                            className="my-0 ml-0"
                          >
                            <input
                              accept="image/*"
                              id="icon-button-file3"
                              onChange={handleImagesChange3}
                              type="file"
                              name="file3"
                              required
                              hidden
                            />
                            <IconButton
                              color="primary"
                              aria-label="upload picture 3"
                              component="span"
                            >
                              <PhotoCamera />
                            </IconButton>
                          </label>
                        </div>
                      </div>
                    </figure>
                  )}
                </div>
                {state.isValidImages === ValidField.ERROR && (
                  <Alert severity="error">{t("images.number")}</Alert>
                )}

                <Button
                  style={{
                    borderRadius: 35,
                    backgroundColor: "#3a4551",
                    padding: "12px 40px",
                    margin: "15px 0 15px 0",
                    fontSize: "13px",
                    color: "white",
                  }}
                  variant="contained"
                  endIcon={<MyLocationIcon />}
                  onClick={handleOpen}
                  // className="mt-4 mb-2"
                >
                  {t("position.enter")}
                </Button>
                {state.isValidPosition === ValidField.ERROR && (
                  <Alert severity="error">{t("position.invalid")}</Alert>
                )}
                <Divider variant="middle" />
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
                        // color: "#ffffff",
                        // background: "#00ab55",
                        // borderRadius: "60px",
                      }}
                      // className="loginBtn m-5"
                      // id="loginBtnForm"
                    >
                      {t("valider")}
                    </LoadingButton>
                  </ThemeProvider>
                </div>
              </div>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}

export default ModifyArtWork;
