/* eslint-disable */
import React, { useState, useRef, useContext } from "react";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  Marker,
} from "react-map-gl";
import { styled } from "@mui/system";
import { RiMapPinFill } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import { Box } from "@mui/material";
import { StyledModal, Backdrop } from "./utils/types";
import { LoginContext } from "./Context/LoginCtxProvider";

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

const style = {
  width: "90vw",
  bgcolor: "transparent",
  p: 2,
  // px: 2,
  pb: 3,
};

function FormMap(props: any) {
  const [lat, setLat] = useState<any>(props.lat);
  const [long, setLong] = useState<any>(props.long);
  const [open, setOpen] = React.useState(true);

  const [viewport, setViewport] = useState({
    latitude: 49.43424,
    longitude: 1.08972,
    width: "100%",
    height: "90vh",
    zoom: 10,
  });
  const mapRef = useRef<any>();
  const loginCtx = useContext(LoginContext);
  const mapStyle = loginCtx.darkMode
    ? process.env.REACT_APP_MAPBOX_STYLE_DARK_MODE
    : process.env.REACT_APP_MAPBOX_STYLE;
  return (
    <>
      <StyledModal
        open={open}
        onClose={() => {
          props.closeMap(false);
          setOpen(false);
        }}
        BackdropComponent={Backdrop}
        className="backdrop-blur-sm"
      >
        <Box sx={style}>
          <ReactMapGL
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...viewport}
            className="rounded-3xl"
            maxZoom={18}
            mapStyle={mapStyle}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(newViewport: mapView) => {
              setViewport({ ...newViewport });
            }}
            onClick={(evt) => {
              props.getLat(evt.lngLat[1]);
              setLat(evt.lngLat[1]);
              props.getLong(evt.lngLat[0]);
              setLong(evt.lngLat[0]);
            }}
            ref={mapRef}
            keyboard={false}
            attributionControl={false}
          >
            <NavigationControl style={navControlStyle} />
            <GeolocateControl
              style={geolocateControlStyle}
              showUserHeading
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation
              auto
            />
            {lat && long && (
              <Marker latitude={lat} longitude={long}>
                <RiMapPinFill className="text-2xl text-slate-500 dark:text-white" />
              </Marker>
            )}
          </ReactMapGL>
          <button
            type="button"
            onClick={() => {
              props.closeMap(false);
              setOpen(false);
            }}
            className="fixed top-12 right-12 inline-flex items-center justify-center w-10 h-10 z-10 bg-white text-xl shadow-lg rounded-3xl"
          >
            <GrClose />
          </button>
        </Box>
      </StyledModal>
    </>
  );
}

export default FormMap;
