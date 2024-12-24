import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserDataContext);

  const checkAuthToken = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3001/api/user/profile",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response && response.data && response.data.status === "success") {
        setUser(response.data.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    checkAuthToken();
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return <>{children}</>;
};

export default UserProtectedRoute;
