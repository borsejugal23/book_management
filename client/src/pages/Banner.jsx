import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Banner = () => {
  const { handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(name)
  let roles = localStorage.getItem("roles");
  let name= localStorage.getItem("name")
  const handleLogout = () => {
    handleAuth();
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  // console.log(roles);
  return (
    <>
      <nav className="bg-zinc-400 shadow-sm  p-4 flex justify-between items-center">
        <h1 className="text-white text-xl">Books Store</h1>
        <div className="">
          <p className="text-white text-md">User: {name}</p>
          <p className="text-white text-md">ROLE: {roles}</p>
        </div>
        <button
          className="text-white text-lg border border-x-white rounded px-2 py-1 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </>
  );
};

export default Banner;
