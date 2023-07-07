import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage";
import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import Loading from "./loading";

function AppRoutes() {
    useEffect(() => {
        const email = localStorage.getItem("email");
        if (!email && window.location.pathname !== "/login") {
            window.location.href = "/login";
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/app" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default function App() {
    return <AppRoutes />;
}
