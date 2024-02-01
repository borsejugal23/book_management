// Authentication.js

import React, { useContext } from "react";
import LoginForm from "../pages/Login";
import SignUpForm from "../pages/SignUp";
import { AuthContext } from "../context/AuthContext";

const Authentication = () => {
  const { swap } = useContext(AuthContext);

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/2 overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="books"
          className="w-full h-full object-cover"
        />
        <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-center z-10 md:text-lg lg:text-xl xl:text-2xl">
          Exploring the Books Managemanet
        </p>
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-8">
        
        <div className="max-w-md w-full">
          {swap ? <SignUpForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
