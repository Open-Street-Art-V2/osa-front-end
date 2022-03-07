/* eslint-disable */
import React, { useState, useRef } from "react";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  Marker,
} from "react-map-gl";
import { styled } from "@mui/system";
import Pin from "./Pin.map";
import { Box } from "@mui/material";

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

function FormMap(props: any) {
  const [lat, setLat] = useState<any>(props.lat);
  const [long, setLong] = useState<any>(props.long);
  const [open, setOpen] = React.useState(true);

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
              props.getLat(evt.lngLat[1]);
              setLat(evt.lngLat[1]);
              props.getLong(evt.lngLat[0]);
              setLong(evt.lngLat[0]);
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
            {lat && long && (
              <Marker latitude={lat} longitude={long}>
                <Pin size={20} onClick={() => function () {}} />
              </Marker>
            )}
            <div id="add">
              <button
                type="button"
                id="addBtn"
                onClick={() => props.closeMap(false)}
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
    </>
  );
}

export default FormMap;
