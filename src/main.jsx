import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import App from "./App";
import "./index.css";
import Login from "./pages/login";
import Register from "./pages/register";
import Loading from "./loading"

function Main() {
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/app" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);
