/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>, Removed as modal css transition throws error
  // https://stackoverflow.com/questions/60802216/warning-finddomnode-is-deprecated-in-strictmode-react-redux-notify
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
