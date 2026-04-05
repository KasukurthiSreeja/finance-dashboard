import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FinanceProvider } from "./context/FinanceContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FinanceProvider>
    <App />
  </FinanceProvider>
);