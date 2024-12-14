import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [formValue, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formValues", formValue);
    const payload = {
      fullName: {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
      },
      email: formValue.email,
      password: formValue.password,
    };
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
          <h3 className=" text-base font-medium mb-2">What's Your Name</h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-sm"
              required
              type="text"
              name="firstName"
              value={formValue?.firstName}
              onChange={(e) =>
                setFormValues({ ...formValue, [e.target.name]: e.target.value })
              }
              placeholder="First name"
            />
            <input
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-sm"
              type="text"
              name="lastName"
              value={formValue?.lastName}
              onChange={(e) =>
                setFormValues({ ...formValue, [e.target.name]: e.target.value })
              }
              placeholder="Last name"
            />
          </div>

          <h3 className=" text-base font-medium mb-2">What's Your email</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            required
            type="email"
            name="email"
            value={formValue?.email}
            onChange={(e) =>
              setFormValues({ ...formValue, [e.target.name]: e.target.value })
            }
            placeholder="email@example.com"
          />
          <h3 className=" text-base font-medium mb-2">Enter your password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
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
            Register
          </button>
          <p className="text-center mb-2 font-semibold">
            Already had an account ?
            <Link to="/captainLogin" className="text-blue-600">
              {" "}
              Login now
            </Link>
          </p>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default CaptainSignup;
