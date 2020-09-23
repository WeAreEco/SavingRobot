import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.css";
import App from "./Components/App";
import { Provider } from "react-redux";
import store from "./redux";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./assets/styles/dashmix.min.css";
import "./assets/styles/global.css";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
