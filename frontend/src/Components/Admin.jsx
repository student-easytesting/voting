import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import AdminRegister from "./AdminRegister";
import { Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import { toast } from "react-toastify";

import CastVote from "./CastVote";
import AdminWrapper from "./AdminWrapper";
const API = import.meta.env.VITE_APP_URI_API;

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [voters, setVoters] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/admin`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("user data ", data.userData);
        setUser(data.userData);
        // console.log(data.userData.isAdmin);
        setIsAdmin(data.userData.isAdmin);
        setIsLoading(false);
      } else {
        // console.error("Error fetching user data");
        setIsLoading(false);
        setUser("");
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  const getVoters = async () => {
    try {
      const response = await axios.get(`${API}/admin/voter`);
      const data = response.data;
      console.log(data.msg);
      setVoters(data.msg);
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  };

  useEffect(() => {
    user && getVoters();
    token && userAuthentication();
  }, [token]);

  const handleLogin = async (e, logindata) => {
    e.preventDefault();
    const username = logindata.username;
    const password = logindata.password;

    const response = await axios.post(`${API}/auth/login`, {
      username,
      password,
    });
    const tokenData = response.data;
    if (response.data) {
      toast.success("Successfully Login");
    } else {
      toast.error("Error Login");
    }
    // console.log(tokenData.token);
    storeTokenInLS(tokenData.token);
  };

  const handleRegister = async (e, registerdata) => {
    e.preventDefault();
    const username = registerdata.username;
    const password = registerdata.password;

    const response = await axios.post(
      `${API}/auth/register`,
      {
        username,
        password,
      },
      {
        headers: {
          Authorization: authorizationToken,
        },
      }
    );
    const data = response.data;
    // console.log(data);
    if (response.data) {
      toast.success("Successfully Registered");
    } else {
      toast.error("Not Registered");
    }
  };

  return (
    <>
      <Routes>
        {!isAdmin && (
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
        )}
        {isAdmin && <Route path="/" element={<AdminWrapper />} />}
        <Route
          path="/register"
          element={<AdminRegister handleRegister={handleRegister} />}
        />
      </Routes>
    </>
  );
};

export default Admin;
