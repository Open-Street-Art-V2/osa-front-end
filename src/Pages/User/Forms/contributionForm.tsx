/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import React from "react";
// import { ModifyArtWork } from "../../../Components";
import UserContribution from "../../../Components/UserArtworkContribution";
import "./contributionForm.css";
import { useLocation } from "react-router-dom";
import { Header } from "../../../Components";
import NavBarUser from "../../../Components/NavBarUser";

interface CustomizedState {
  artwork: any;
  coords: any;
}

function ContributionToArtUser() {
  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  const { artwork, coords } = state;

  return (
    <div className="dark:bg-darkModePrim">
      <Header />
      <UserContribution data={artwork} coords={coords} />
      <NavBarUser />
    </div>
  );
}

export default ContributionToArtUser;
