import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [captainLoginData, setCaptainLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formValues", captainLoginData);
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          src={
            "https://animationvisarts.com/wp-content/uploads/2023/10/image-10.png"
          }
          alt="LOGO"
          className="w-20 mb-5"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's Your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="email"
            name="email"
            value={captainLoginData?.email}
            onChange={(e) =>
              setCaptainLoginData({
                ...captainLoginData,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            name="password"
            type="password"
            value={captainLoginData?.password}
            placeholder="password"
            onChange={(e) =>
              setCaptainLoginData({
                ...captainLoginData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          >
            Login
          </button>
          <p className="text-center mb-2 font-semibold">
            Join a fleet ? &nbsp;
            <Link to="/captainSignup" className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <button className="bg-[#378a3b] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base">
          <Link to="/login ">Sign in as User</Link>
        </button>
      </div>
    </div>
  );
};

export default CaptainLogin;
