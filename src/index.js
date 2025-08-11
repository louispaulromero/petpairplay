import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css"; // Your CSS file
import '/bootstrap/js/bootstrap.bundle.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
