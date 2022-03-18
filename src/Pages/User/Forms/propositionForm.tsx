import * as React from "react";
import { CreatePropositionArtWork, Header } from "../../../Components";
import NavBarUser from "../../../Components/NavBarUser";

function cForm() {
  return (
    <div>
      <Header />
      <CreatePropositionArtWork />
      <NavBarUser />
    </div>
  );
}

export default cForm;
