import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [formDeets, setFormDeets] = useState({
    email: "",
    username: "",
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
        "https://qgenfinal-backend.vercel.app/register",
        formDeets
      );

      const { message } = response.data;
      console.log(message);

      navigate("/login"); // Redirect to the login page after successful registration
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-red-400 w-screen h-screen flex items-center justify-center p-4 font-mono">
      <div className="bg-yellow-400 w-full rounded-2xl h-full p-4">
        <div className="bg-blue-400 w-full h-full rounded-2xl p-4 ">
          <div className="bg-white w-full rounded-2xl h-full p-4 flex items-center justify-center">
            <div className="bg-gray-400 p-4 rounded-2xl flex flex-col items-center">
              <h1 className="text-2xl font-semibold">Enter your details</h1>
              <h2 className="text-sm">Welcome to QGen!</h2>
              <form onSubmit={handleSubmit} className="flex flex-col w-full mt-4">
                <input
                  type="text"
                  name="username"
                  value={formDeets.username}
                  onChange={handleChange}
                  className="bg-gray-200 rounded-2xl p-4 outline-none"
                  placeholder="Username"
                />
                <input
                  type="text"
                  name="email"
                  value={formDeets.email}
                  onChange={handleChange}
                  className="bg-blue-200 rounded-2xl p-4 mt-4 outline-none"
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
                  Register
                </button>
                <button
                  className="bg-red-200 p-4 mt-4 rounded-2xl font-semibold"
                  onClick={() => navigate("/login")}
                >
                  <Link to="/login">Login</Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
