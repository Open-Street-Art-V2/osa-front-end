import * as React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import NavBar from "./NavBar";
/* import MapPage from "./Pages/Test/MapPage";
import SearchPage from "./Pages/Test/SearchPage";
import AddPage from "./Pages/Test/AddPage";
import ProfilPage from "./Pages/Test/ProfilPage";  */

function App() {
  return (
    <BrowserRouter>
      <Link to="/menu" />
      <Link to="/search" />
      <Link to="/map" />
      <Link to="/add" />
      <Link to="/profil" />
      <NavBar />
    </BrowserRouter>
  );
}
export default App;
