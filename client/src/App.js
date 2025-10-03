import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./App.css";
import Home from "./pages/Home";
import AddFeedback from "./pages/AddFeedback";
import FeedbackDetail from "./pages/FeedbackDetail";
import EditFeedback from "./pages/EditFeedback";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import RoadMap from "./pages/RoadMap";
import { UserProvider, UserContext } from "./context/userContext";

function AppRoutes() {
  const [authenticated, setauthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUserdata } = useContext(UserContext);

  const setAuth = (bool) => {
    setauthenticated(bool);
    if (!bool) {
      localStorage.removeItem("token");
      setUserdata(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          console.log(decoded);
          
          setauthenticated(true);
          setUserdata(decoded);
        } else {
          localStorage.removeItem("token");
          setauthenticated(false);
          setUserdata(null);
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        setauthenticated(false);
        setUserdata(null);
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={authenticated ? <Home setAuth={setAuth} /> : <Navigate to="/login" />} />
      <Route path="/add" element={authenticated ? <AddFeedback /> : <Navigate to="/login" />} />
      <Route path="/detail" element={authenticated ? <FeedbackDetail /> : <Navigate to="/login" />} />
      <Route path="/edit" element={authenticated ? <EditFeedback /> : <Navigate to="/login" />} />
      <Route path="/roadmap" element={authenticated ? <RoadMap /> : <Navigate to="/login" />} />
      <Route path="/login" element={!authenticated ? <Login setAuth={setAuth} /> : <Navigate to="/" />} />
      <Route path="/register" element={!authenticated ? <Registration setAuth={setAuth} /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <div className="font-jost">
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  );
}
