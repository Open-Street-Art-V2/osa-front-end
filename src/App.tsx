import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import  NavBar from "./NavBar";
import MapPage from "./Pages/Test/MapPage";
import  SearchPage  from "./Pages/Test/SearchPage";
import AddPage from "./Pages/Test/AddPage";
import ProfilPage from "./Pages/Test/ProfilPage";

function App() {
  return (
      <BrowserRouter>
      <Route path="/" >
        <MapPage />
      </Route>
      <Route path="/search">
        <SearchPage />
      </Route>
      <Route path="/add">
        <AddPage />
      </Route>
      <Route path="/profil">
        <ProfilPage />
      </Route>
      <NavBar />
      </BrowserRouter>
    
  );
}
export default App;
