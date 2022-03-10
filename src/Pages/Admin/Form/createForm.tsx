import * as React from "react";
import { CreateArtWork, Header } from "../../../Components";
import NavBar from "../../../Components/NavBar";

function cFormAdmin() {
  return (
    <div>
      <Header />
      <CreateArtWork />
      <NavBar />
    </div>
  );
}

export default cFormAdmin;
