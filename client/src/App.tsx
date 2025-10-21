import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Home from "./pages/Home";
import AddFeedback from "./pages/AddFeedback";
import FeedbackDetail from "./pages/FeedbackDetail";
import EditFeedback from "./pages/EditFeedback";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import RoadMap from "./pages/RoadMap";
import NotFound from "./pages/Notfound";
import { UserProvider, UserContext, User } from "./context/userContext";

type AuthFunction = (value: boolean) => void;

function AppRoutes() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { setUserdata } = useContext(UserContext);

  const setAuth: AuthFunction = (bool) => {
    setAuthenticated(bool);
    if (!bool) {
      localStorage.removeItem("token");
      setUserdata(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { exp: number; user: User } = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setAuthenticated(true);
          setUserdata(decoded.user);
        } else {
          localStorage.removeItem("token");
          setAuthenticated(false);
          setUserdata(null);
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        setAuthenticated(false);
        setUserdata(null);
      }
    }
    setLoading(false);
  }, [setUserdata]);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={authenticated ? <Home setAuth={setAuth} /> : <Navigate to="/login" />}
      />
      <Route
        path="/add"
        element={authenticated ? <AddFeedback /> : <Navigate to="/login" />}
      />
      <Route
        path="/detail/:id"
        element={authenticated ? <FeedbackDetail /> : <Navigate to="/login" />}
      />
      <Route
        path="/edit/:id"
        element={authenticated ? <EditFeedback /> : <Navigate to="/login" />}
      />
      <Route
        path="/roadmap"
        element={authenticated ? <RoadMap /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!authenticated ? <Login setAuth={setAuth} /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!authenticated ? <Registration setAuth={setAuth} /> : <Navigate to="/" />}
      />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
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
