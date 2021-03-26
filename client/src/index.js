import React from "react";
import ReactDom from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import "font-awesome/css/font-awesome.min.css";
import "@icon/themify-icons/themify-icons.css";
import "./assets/scss/Index.scss";

// test
import App from "./components/App";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
