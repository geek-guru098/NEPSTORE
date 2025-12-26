import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Create root first
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

// Render app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
