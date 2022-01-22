import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./assets/css/tailwind.css";
import "./assets/css/custom.css";
import reportWebVitals from "./components/reportWebVitals";
import { store } from "./store";
import Signup from "./components/features/auth/Signup";
import App from "./App";
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Signup />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
