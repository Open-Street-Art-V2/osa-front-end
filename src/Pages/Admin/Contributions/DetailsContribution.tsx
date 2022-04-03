import React from "react";
import { useLocation } from "react-router-dom";
import AdminDetailsProposition from "../../../Components/AdminDetailsProposition";
import {
  acceptContributions,
  refuseContributions,
} from "../../../services/contribution.service";
import NavBar from "../../../Components/NavBar";
import { Header } from "../../../Components";

function DetailsContribution() {
  const location = useLocation();
  const { data } = location.state as any;

  return (
    <>
      <Header />
      <AdminDetailsProposition
        data={data}
        accept={acceptContributions}
        refuse={refuseContributions}
      />
      <NavBar />
    </>
  );
}

export default DetailsContribution;
