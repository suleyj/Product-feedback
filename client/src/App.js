import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddFeedback from "./pages/AddFeedback";
import FeedbackDetail from "./pages/FeedbackDetail";
import EditFeedback from "./pages/EditFeedback";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import RoadMap from "./pages/RoadMap";
import { UserProvider } from "./context/userContext";

function App() {
  const [authenticated, setauthenticated] = useState(false);

  const setAuth = (bool) => {
    setauthenticated(bool);
  };
  return (
    <div className="font-jost">
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={authenticated ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/add"
            element={authenticated ? <AddFeedback /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/detail"
            element={
              authenticated ? <FeedbackDetail /> : <Navigate to="/login" />
            }
          ></Route>
          <Route
            path="/edit"
            element={
              authenticated ? <EditFeedback /> : <Navigate to="/login" />
            }
          ></Route>
          <Route
            path="/roadmap"
            element={authenticated ? <RoadMap /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/login"
            element={
              !authenticated ? <Login setAuth={setAuth} /> : <Navigate to="/" />
            }
          ></Route>
          <Route
            path="/register"
            element={
              !authenticated ? (
                <Registration setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
