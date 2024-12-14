import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import { UserDataContext } from "./context/UserContext";

const App = () => {
  const answer = useContext(UserDataContext);
  console.log("answer",answer)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signUp" element={<UserSignup />} />
      <Route path="/captainLogin" element={<CaptainLogin />} />
      <Route path="/captainSignup" element={<CaptainSignup />} />
    </Routes>
  );
};

export default App;
