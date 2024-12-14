import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo2.png";
const UserLogin = () => {
  const [formValue, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formValues",formValue)
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div >
      <img src={Logo} alt="LOGO" className="w-20 mb-5" />
        <form onSubmit={handleSubmit}>
          <h3 className="text-base font-medium mb-2">What's Your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            required
            type="email"
            name="email"
            value={formValue?.email}
            onChange={(e) =>
              setFormValues({ ...formValue, [e.target.name]: e.target.value })
            }
            placeholder="email@example.com"
          />
          <h3 className="text-base font-medium mb-2">Enter your password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            required
            name="password"
            type="password"
            value={formValue?.password}
            placeholder="password"
            onChange={(e) =>
              setFormValues({ ...formValue, [e.target.name]: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
          >
            Login
          </button>
          <p className="text-center mb-2 font-semibold">
            New here ?
            <Link to="/signup" className="text-blue-600">
              {" "}
              Create New Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <button className="bg-[#378a3b] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm">
          <Link to="/captainLogin">
          Sign in as captain
          </Link>
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
