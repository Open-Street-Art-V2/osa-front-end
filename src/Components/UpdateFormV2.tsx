/* eslint-disable */
import React, { useState, useReducer, useContext, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  Container,
  Box,
  CssBaseline,
  Button,
  Alert,
  createTheme,
} from "@mui/material";
import { Navigate } from "react-router-dom";
// import { AiFillDelete } from "react-icons/ai";
import Avatar from "@mui/material/Avatar";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import validator from "validator";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { ThemeProvider } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { LoginContext } from "./Context/LoginCtxProvider";
import FormMap from "./FormMap";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import RoundedTextField from "./RoundedTextField";
import { ReturnButton } from ".";

const Input = styled("input")({
  display: "none",
});

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
    action: {
      disabledBackground: "#C7C5C4",
      disabled: "#848484",
    },
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

  const [Pics, dispatchPics] = useState<Pics>({
    isModifiedPic1: ValidField.NOTMODIFIED,
    isModifiedPic2: ValidField.NOTMODIFIED,
    isModifiedPic3: ValidField.NOTMODIFIED,
  });
  const [images, setImages] = useState(Artwork.pictures);
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState<any>(props.coords[1]);
  const [long, setLong] = useState<any>(props.coords[0]);
  const [image2, setImage2] = useState<any>(false);
  const [image3, setImage3] = useState<any>(false);
  const [requestError, setRequestError] = React.useState(null);
  const [requestValid, setRequestValid] = React.useState(null);
  const [imagesNames, setImagesNames] = useState<PicsNames>({
    image1Name: images.length > 0 ? images[0].url : "",
    image2Name: images.length > 1 ? images[1].url : "",
    image3Name: images.length > 2 ? images[2].url : "",
  });
  const [addr, setAddr] = React.useState(Artwork.address);
  const [city, setCity] = React.useState(Artwork.city);
  const [imagesFiles, setImagesFiles] = useState<PicsFiles>({
    image1File: images.length > 0 ? images[0].url : "",
    image2File: images.length > 1 ? images[1].url : "",
    image3File: images.length > 2 ? images[2].url : "",
  });
  const [state, dispatch] = useReducer(dispatchState, {
    isValidTitle: ValidField.OK,
    isValidArtist: ValidField.OK,
    isValidDescription: ValidField.OK,
    isValidPosition: ValidField.OK,
    isValidImages: ValidField.OK,
    isValidForm: false,
  });
  const [addrRequestError, setAddrRequestError] = useState(null);

  const loginCtx = useContext(LoginContext);
  if (loginCtx.isLoggedIn && loginCtx.user?.role === "ROLE_USER") {
    return <Navigate to="/"></Navigate>;
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

  const handlePositionChange = () => {
    // const latLong = lat && long ? `${long}, ${lat}` : ` `;
    // console.log("latLong");
    const latLong = lat && long ? `${long}, ${lat}` : ` `;
    console.log(latLong);
    dispatch({
      type: "POSITION_CHANGED",
      value: latLong,
    });
    getAddr();
  };
  useEffect(() => {});
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
    if (images.length !== 0 && Artwork !== undefined) {
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
        let city = data.features[0].properties.address.municipality;
        if (city === undefined) {
          setAddr("Rouen");
          throw Error(t("valid.location"));
        }
        setCity(city);
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
    console.log(images);
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
    const url = `${process.env.REACT_APP_MODIFY_ART}/${Artwork.oeuvreId}`;

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
          throw Error(t("art.exist"));
        } else if (res.status === 401) {
          throw Error(t("connect.operation"));
        } else if (res.status === 400) {
          throw Error(t("enter.location"));
        } else if (res.status === 413) {
          throw Error(t("file.tlarge"));
        } else if (res.status === 413) {
          throw Error(t("server.maintenance"));
        }
        throw Error(t("art.title.exist"));
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

  const [mapState, setMapState] = useState(false);

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
      setImagesFiles((prevState) => ({
        ...prevState,
        image3File: URL.createObjectURL(target.files[0]),
      }));
    }
  };

  const addImage = ({ target }: any) => {
    if (images.length === 1) {
      setImagesNames((prevState) => ({
        ...prevState,
        image2Name: target.files[0].name,
      }));
      Pics.isModifiedPic2 = ValidField.OK;
      let newArr = [...images];
      newArr[1] = target.files;
      setImages(newArr);
      setImagesFiles((prevState) => ({
        ...prevState,
        image2File: URL.createObjectURL(target.files[0]),
      }));
      setImage2(true);
    } else if (images.length === 2) {
      setImagesNames((prevState) => ({
        ...prevState,
        image3Name: target.files[0].name,
      }));
      Pics.isModifiedPic3 = ValidField.OK;
      let newArr = [...images];
      newArr[2] = target.files;
      setImages(newArr);
      setImagesFiles((prevState) => ({
        ...prevState,
        image3File: URL.createObjectURL(target.files[0]),
      }));
      setImage3(true);
    }
  };

  /* function removeImage1() {
    let ImageState = [...images] as any;
    let newImageState = [] as any;
    if (ImageState.length === 1) {
      setImages([]);
      setImagesFiles({
        image1File: "",
        image2File: "",
        image3File: "",
      });
    } else if (ImageState.length === 2) {
      newImageState[0] = ImageState[1];
      setImages(newImageState);
      setImagesFiles({
        image1File: imagesFiles.image2File,
        image2File: "",
        image3File: "",
      });
    } else if (ImageState.length === 3) {
      newImageState[0] = ImageState[1];
      newImageState[1] = ImageState[2];
      setImages(newImageState);
      setImagesFiles({
        image1File: imagesFiles.image2File,
        image2File: imagesFiles.image3File,
        image3File: "",
      });
    }
  }
  function removeImage2() {
    let ImageState = [...images] as any;
    let newImageState = [] as any;
    if (ImageState.length === 2) {
      newImageState[0] = ImageState[0];
      setImages(newImageState);
      setImagesFiles({
        image1File: imagesFiles.image1File,
        image2File: "",
        image3File: "",
      });
    } else if (ImageState.length === 3) {
      newImageState[0] = ImageState[0];
      newImageState[1] = ImageState[2];
      setImages(newImageState);
      setImagesFiles({
        image1File: imagesFiles.image1File,
        image2File: imagesFiles.image3File,
        image3File: "",
      });
    }
  }
  function removeImage3() {
    let ImageState = [...images] as any;
    let newImageState = [] as any;
    newImageState[0] = ImageState[0];
    newImageState[1] = ImageState[1];
    setImages(newImageState);
    setImagesFiles({
      image1File: imagesFiles.image1File,
      image2File: imagesFiles.image2File,
      image3File: "",
    });
  } */
  const darkTheme = loginCtx.darkMode
    ? createTheme({
        palette: {
          mode: loginCtx.darkMode ? "dark" : "light",
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: loginCtx.darkMode ? "white" : "black",
                  },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: loginCtx.darkMode ? "white" : "black",
                },
              },
            },
          },
        },
      })
    : createTheme({
        palette: {
          mode: loginCtx.darkMode ? "dark" : "light",
        },
      });

  return (
    <>
      {Artwork !== undefined && (
        <ThemeProvider theme={darkTheme}>
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
              <div id="btnRetour" className="mt-4 -mb-1">
                <ReturnButton url="/map/admin" />
              </div>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 3 }}
              >
                <div className="text-center">
                  <label className="py-8 font-sans text-2xl authTitle font-bold">
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
                          <Alert
                            severity="error"
                            className="dark:text-white dark:bg-[#FB9B9B]"
                          >
                            {requestError}
                          </Alert>
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
                          <Alert
                            severity="success"
                            className="dark:text-white dark:bg-[#00ab55]"
                          >
                            {requestValid}
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <RoundedTextField
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
                  <RoundedTextField
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
                  <RoundedTextField
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
                  <div className="flex justify-center ">
                    {(images.length === 1 || images.length === 2) && (
                      <div className="rounded-full bg-gray-100 w-12">
                        <label htmlFor="icon-add-file">
                          <Input
                            accept="image/*"
                            onChange={addImage}
                            hidden
                            id="icon-add-file"
                            type="file"
                          />
                          <IconButton
                            aria-label="icon-add-file"
                            component="span"
                          >
                            <AddAPhotoRoundedIcon
                              sx={{ color: "#3a4551", fontSize: 23 }}
                            />
                          </IconButton>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center grid-col-2 gap-2 content-around py-2">
                    {imagesFiles.image1File && (
                      <div>
                        <Avatar
                          variant={"rounded"}
                          alt=""
                          src={`${
                            Artwork.pictures[0].url !== imagesNames.image1Name
                              ? imagesFiles.image1File
                              : `./../${process.env.REACT_APP_IMAGES_PATH}${Artwork.pictures[0].url}`
                          }`}
                          sx={{ width: 180, height: 180 }}
                        ></Avatar>
                        <div className="text-center md:text-left m-0 bg-gray-100 dark:bg-[#3a4551] rounded-b-lg">
                          <div className="py-2">
                            {/* <label
                            htmlFor="icon-button-delelte-file1"
                            className="my-0 mr-4"
                          >
                            <IconButton
                              aria-label="delelte picture"
                              component="span"
                              onClick={removeImage1}
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
                      </div>
                    )}
                    {imagesFiles.image2File && (
                      <div>
                        <Avatar
                          variant={"rounded"}
                          alt=""
                          src={`${
                            image2
                              ? imagesFiles.image2File
                              : Artwork.pictures[1].url !==
                                imagesNames.image2Name
                              ? imagesFiles.image2File
                              : `./../${process.env.REACT_APP_IMAGES_PATH}${Artwork.pictures[1].url}`
                          }`}
                          sx={{ width: 180, height: 180 }}
                        ></Avatar>
                        <div className="text-center md:text-left m-0 bg-gray-100 dark:bg-[#3a4551] rounded-b-lg">
                          <div className="py-2">
                            {/* <label
                            htmlFor="icon-button-delelte-file1"
                            className="my-0 mr-4"
                          >
                            <IconButton
                              aria-label="delelte picture"
                              component="span"
                              onClick={removeImage2}
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
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center  content-around py-2">
                    {imagesFiles.image3File && (
                      <div>
                        <Avatar
                          variant={"rounded"}
                          alt=""
                          src={`${
                            image3
                              ? imagesFiles.image3File
                              : Artwork.pictures[2].url !==
                                imagesNames.image3Name
                              ? imagesFiles.image3File
                              : `./../${process.env.REACT_APP_IMAGES_PATH}${Artwork.pictures[2].url}`
                          }`}
                          sx={{ width: 180, height: 180 }}
                        ></Avatar>
                        <div className="text-center md:text-left m-0 bg-gray-100 dark:bg-[#3a4551] rounded-b-lg">
                          <div className="py-2">
                            {/*<label
                            htmlFor="icon-button-delelte-file1"
                            className="my-0 mr-4"
                          >
                            <IconButton
                              aria-label="delelte picture"
                              component="span"
                              onClick={removeImage3}
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
                      </div>
                    )}
                  </div>
                  {state.isValidImages === ValidField.ERROR && (
                    <Alert
                      severity="error"
                      className="dark:text-white dark:bg-[#FB9B9B]"
                    >
                      {t("images.number")}
                    </Alert>
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
                    onClick={(evt) => {
                      setMapState(true);
                    }}
                    // className="mt-4 mb-2"
                  >
                    {t("location")}
                  </Button>
                  {addr !== "Rouen" && (
                    <div className="pt-2 pb-3">
                      <span className="font-medium text-sky-700 dark:text-[#00ab55] ">
                        Address :
                      </span>
                      <span className="text-slate-700 dark:text-slate-400">
                        &ensp;{addr}
                      </span>
                    </div>
                  )}
                  {mapState && (
                    <FormMap
                      closeMap={(mapState: any) => {
                        setMapState(mapState);
                        handlePositionChange();
                      }}
                      lat={lat}
                      long={long}
                      getLat={(mapLat: any) => setLat(mapLat)}
                      getLong={(mapLong: any) => setLong(mapLong)}
                    />
                  )}
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
                        }}
                      >
                        {t("Valider")}
                      </LoadingButton>
                    </ThemeProvider>
                  </div>
                </div>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}

export default ModifyArtWork;
