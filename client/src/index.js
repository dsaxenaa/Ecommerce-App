import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

import App from "./App";
import { AuthProvider } from "./context/auth.js";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cart.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { SearchProvider } from "./context/search.js";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            theme="colored"
            autoClose={2000}
          />
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
