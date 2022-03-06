import React from "react";
import { useLocation } from "react-router-dom";
import AdminDetailsProposition from "../../../Components/AdminDetailsProposition";
import {
  acceptPropositions,
  refusePropositions,
} from "../../../services/propositions.service";
import NavBar from "../../../Components/NavBar";

function DetailsProposition() {
  const location = useLocation();
  const { data } = location.state as any;

  return (
    <>
      <AdminDetailsProposition
        data={data}
        accept={acceptPropositions}
        refuse={refusePropositions}
      />
      <NavBar />
    </>
  );
}

export default DetailsProposition;
