import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Carrega Tailwind, Flowbite e camadas base
import "./App.css"; // Sobrescreve regras do Flowbite com compatibilidade
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>

);