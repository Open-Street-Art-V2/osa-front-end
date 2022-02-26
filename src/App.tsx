import * as React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import  NavBar from "./NavBar";
import  HomePage  from "./Pages/Map/HomePage";
import  AboutPage  from "./Pages/Map/AboutPage";
import  ContactPage  from "./Pages/Map/ContactPage";

function App() {
  return (
    
      <BrowserRouter>
          <Route path="/" >
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
        <NavBar />
      </BrowserRouter>
    
  );
}
export default App;
