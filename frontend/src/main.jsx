import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/auth.context.jsx";
import MessageContextProvider from "./context/message.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MessageContextProvider>
          <App />
        </MessageContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
