import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

// The HTML for each route is prerendered at build time (see scripts/prerender.mjs).
// On the client we render fresh, because several tools show random results that
// would never match the prerendered markup exactly.
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
