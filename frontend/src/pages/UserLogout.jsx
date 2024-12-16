import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function handleLogout() {
      try {
        const response = await fetch("http://localhost:3001/api/user/logout", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Logout failed with status: ${response.status}`);
        }

        await response.json(); // Parse response if needed
        localStorage.removeItem("token");
        navigate("/"); // Redirect to home or login page
      } catch (error) {
        console.error("Error during logout:", error);
        // Optionally, you can handle this error by showing a user-friendly message
        alert("An error occurred during logout. Please try again.");
      }
    }

    if (token) {
      handleLogout();
    } else {
      navigate("/"); // If no token, navigate to the home or login page directly
    }
  }, [token, navigate]);

  return null;
};

export default UserLogout;
