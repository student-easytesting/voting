import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./Components/Register.jsx";
import Getdata from "./Components/Getdata.jsx";
import Admin from "./Components/Admin.jsx";
import AdminRegister from "./Components/AdminRegister.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CastVote from "./Components/CastVote.jsx";
import Result from "./Components/Result.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Register /> },
      {
        path: "/getdata",
        element: <Getdata />,
      },
      {
        path: "/castvote",
        element: <CastVote />,
      },
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "/admin/*",
        element: <Admin />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      bodyClassName="toastBody"
    />
  </React.StrictMode>
);
