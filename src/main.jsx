import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import login from './login.jsx'
import register from './register.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <login />,
  },
  {
    path: "/register",
    element: <register />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
