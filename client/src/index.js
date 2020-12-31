import React from "react";
import ReactDom from "react-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./components/App";

ReactDom.render(<App />, document.getElementById("root"));
