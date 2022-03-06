import React from "react";
import { useLocation } from "react-router-dom";
import AdminDetailsProposition from "../../../Components/AdminDetailsProposition";
import {
  acceptContributions,
  refuseContributions,
} from "../../../services/contribution.service";

function DetailsContribution() {
  const location = useLocation();
  const { data } = location.state as any;

  return (
    <AdminDetailsProposition
      data={data}
      accept={acceptContributions}
      refuse={refuseContributions}
    />
  );
}

export default DetailsContribution;
