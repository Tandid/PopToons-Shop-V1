import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "./history";
import store from "./store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={history}>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
