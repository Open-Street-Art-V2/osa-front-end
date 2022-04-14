import React from "react";
import ReactDOM from "react-dom";
import "./Assets/css/index.css";
import App from "./App";
import LoginCtxProvider from "./Components/Context/LoginCtxProvider";
import "./i18n";
import "tw-elements";

if (localStorage.theme === "dark")
  window.document.documentElement.classList.toggle("dark");

ReactDOM.render(
  <React.StrictMode>
    <LoginCtxProvider>
      <App />
    </LoginCtxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
