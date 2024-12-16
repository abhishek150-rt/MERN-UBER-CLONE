import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthToken = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3001/api/captain/profile",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response && response.data && response.data.status === "success") {
        console.log(response.data.status, "response");
      } else {
        navigate("/captainLogin");
      }
    } catch (error) {
      navigate("/captainLogin");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/captainLogin");
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

export default CaptainProtectedRoute;
