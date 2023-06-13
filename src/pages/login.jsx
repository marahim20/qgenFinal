import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [formDeets, setFormDeets] = useState({
    user_id: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormDeets((prevFormDeets) => ({
      ...prevFormDeets,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://qgenfinal-backend.vercel.app/login",
        formDeets
      );

      const { user_id } = response.data;

      localStorage.setItem("user_id", user_id);
      navigate("/"); // Redirect to the home page or any desired route
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-red-400 w-screen h-screen flex items-center justify-center p-4 font-mono">
      <div className="bg-yellow-400 w-full rounded-2xl h-full p-4">
        <div className="bg-blue-400 w-full h-full rounded-2xl p-4 ">
          <div className="bg-white w-full rounded-2xl h-full p-4 flex items-center justify-center text-black">
            <div className="bg-gray-400 p-4 rounded-2xl flex flex-col items-center">
              <h1 className="text-2xl font-semibold">Welcome to QGen</h1>
              <h2 className="text-sm">Please login to continue</h2>
              <form onSubmit={handleSubmit} className="flex flex-col w-full mt-4">
                <input
                  type="text"
                  name="user_id"
                  value={formDeets.user_id}
                  onChange={handleChange}
                  className="bg-gray-200 rounded-2xl p-4 outline-none"
                  placeholder="E-mail"
                />
                <input
                  type="password"
                  name="password"
                  value={formDeets.password}
                  onChange={handleChange}
                  className="bg-gray-200 rounded-2xl p-4 mt-4 outline-none"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="bg-yellow-200 p-4 mt-4 rounded-2xl font-semibold"
                >
                  Login
                </button>
                <button
                  className="bg-red-200 p-4 mt-4 rounded-2xl font-semibold"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
