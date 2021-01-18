import React from "react";
import ReactDom from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import allReducers from "./reducers";

import App from "./components/App";

const store = createStore(allReducers);

ReactDom.render(
  <Provider store={store}>
    <App />, document.getElementById("root")
  </Provider>
);
