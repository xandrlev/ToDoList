import React from "react";
import ReactDOM from "react-dom/client";
import AppWithRedux from "./AppWithRedux";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  </React.StrictMode>
);
