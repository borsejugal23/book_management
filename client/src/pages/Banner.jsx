import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const { handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(name)
  let roles = localStorage.getItem("roles");
  let name = localStorage.getItem("name");
  const handleLogout = () => {
    handleAuth();
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  // console.log(roles);
  return (
    <>
      <nav className="bg-zinc-300 shadow-sm  p-3 flex justify-between items-center">
        <div>
          
          <h1 className="text-black text-2xl ">Book Store</h1>
        </div>
        <div className="">
          <p className="text-black text-md">User: {name}</p>
          <p className="text-black text-md">ROLE: {roles}</p>
        </div>
        <button
          className="text-black text-lg border border-black rounded px-2 py-1 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </>
  );
};

export default Banner;
