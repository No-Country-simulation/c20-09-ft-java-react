// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ChakraProvider>
);
