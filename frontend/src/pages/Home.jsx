import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1597783406018-d862f18be776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHRyYWZmaWMlMjBsaWdodHxlbnwwfDF8MHx8fDA%3D)] h-screen pt-8 flex justify-between bg-red-400 flex-col w-full">
        <img src={Logo} alt="LOGO" className="w-20 ml-16" />
        <div className="bg-white py-5 px-10 pb-7">
          <h2 className="text-2xl font-bold">Get Started With Uber</h2>
          <button className="bg-black text-white w-full py-3 rounded mt-5">
           <Link to="/login">
           Continue
           </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
