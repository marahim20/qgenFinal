import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";

const Main = () => {
  const navigate = useNavigate();
  const userID = localStorage.getItem("user_ID");

  React.useEffect(() => {
    if (!userID) {
      navigate("/login");
    }
  }, [navigate, userID]);

  return (
    <React.StrictMode>
      {userID ? <App /> : <Login />}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);
