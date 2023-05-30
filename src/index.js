import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//context
import { QueryContextProvider } from "./context/QueryContext";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <QueryContextProvider>
      <App />
    </QueryContextProvider>
  </Provider>
);
