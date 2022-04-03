/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import React from "react";
// import { ModifyArtWork } from "../../../Components";
import ModifyArtWork from "../../../Components/UpdateFormV2";
import "./modifieArtwork.css";
import { useLocation } from "react-router-dom";
import NavBar from "../../../Components/NavBar";
import { Header } from "../../../Components";

interface CustomizedState {
  artwork: any;
  coords: any;
}

function ModifyArtAdmin() {
  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  const { artwork, coords } = state;

  return (
    <>
      <Header />
      <ModifyArtWork data={artwork} coords={coords} />
      <NavBar />
    </>
  );
}

export default ModifyArtAdmin;
