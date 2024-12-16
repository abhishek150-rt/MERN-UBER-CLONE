import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import { UserDataContext } from "./context/UserContext";

import Start from "./pages/Start";
import Home from "./pages/Home";
import UserLogout from "./pages/UserLogout";
import UserProtectedRoute from "./pages/UserProtectedRoute";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedRoute from "./pages/CaptainProtectedRoute";

const App = () => {
  const answer = useContext(UserDataContext);

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signUp" element={<UserSignup />} />
      <Route path="/captainLogin" element={<CaptainLogin />} />
      <Route path="/captainSignup" element={<CaptainSignup />} />
      <Route
        path="/home"
        element={
          <UserProtectedRoute>
            <Home />
          </UserProtectedRoute>
        }
      />
       <Route
        path="/captainHome"
        element={
          <CaptainProtectedRoute>
            <CaptainHome />
          </CaptainProtectedRoute>
        }
      />
      <Route
        path="/userLogout"
        element={
          <UserProtectedRoute>
            <UserLogout />
          </UserProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
