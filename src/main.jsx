import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BankProvider from "./context/BankContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BankProvider>
      <App />
    </BankProvider>
  </StrictMode>,
);
