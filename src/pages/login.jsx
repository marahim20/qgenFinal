import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [formDeets, setFormDeets] = useState({
    id: "idididid",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormDeets((prevFormDeets) => ({
      ...prevFormDeets,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://qgen-final-backend.vercel.app/login",
        formDeets
      );

      const { message } = response.data;
      console.log(message);

      localStorage.setItem("email", formDeets.email);
      navigate("/"); // Redirect to the home page or any desired route
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-red-400 w-screen h-screen flex items-center justify-center p-4 font-mono text-black">
      <div className="bg-yellow-400 w-full rounded-2xl h-full p-4">
        <div className="bg-blue-400 w-full h-full rounded-2xl p-4 ">
          <div className="bg-white w-full rounded-2xl h-full p-4 flex items-center justify-center">
            <div className="bg-gray-400 p-4 rounded-2xl flex flex-col items-center">
              <h1 className="text-2xl font-semibold">Welcome to QGen</h1>
              <h2 className="text-sm">Please login to continue</h2>
              <form onSubmit={handleLogin} className="flex flex-col w-full mt-4">
                <input
                  type="text"
                  name="email"
                  value={formDeets.email}
                  onChange={handleChange}
                  className="bg-gray-200 rounded-2xl p-4 outline-none"
                  placeholder="Email"
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
                <Link
                  to="/register"
                  className="bg-red-200 p-4 mt-4 rounded-2xl font-semibold flex items-center justify-center"
                >
                  Register
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
