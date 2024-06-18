import React from "react";
import { render } from "react-dom";
import './index.css';
import App from "./components/App.jsx";

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

render(<App />, root);
