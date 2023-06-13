import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formDeets, setFormDeets] = useState({
    username: "",
    password: "",
  });

  return (
    <div className=" bg-red-400 w-screen h-screen flex items-center justify-center p-4 font-mono">
      <div className="bg-yellow-400 w-full rounded-2xl h-full p-4">
        <div className="bg-blue-400 w-full h-full rounded-2xl p-4 ">
          <div className="bg-white w-full rounded-2xl h-full p-4 flex items-center justify-center">
            <div className="bg-gray-400 p-4 rounded-2xl flex flex-col items-center">
              <h1 className="text-2xl font-semibold">Welcome to QGen</h1>
              <h2 className="text-sm">Please login to continue</h2>
              <form action="" className="flex flex-col w-full mt-4">
                <input
                  type="text"
                  name="username"
                  id=""
                  className="bg-gray-200 rounded-2xl p-4 outline-none"
                  placeholder="Username"
                />
                <input
                  type="password"
                  name="password"
                  id=""
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
                  type="submit"
                  className="bg-red-200 p-4 mt-4 rounded-2xl font-semibold"
                >
                  <Link to="/register">Register</Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
