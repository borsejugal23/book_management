import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { login } from "../Redux/AuthReducer/action";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { toggle } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Disable the submit button during the login process
    setIsSubmitting(true);

    dispatch(login({ formData: formData, callback: handleCallback }));
  };

  const handleCallback = (data) => {
    // console.log(data);
    // Enable the submit button after the login process completes
    setIsSubmitting(false);

    if (data.token) {
      toast({
        position: "top",
        title: `${data?.msg}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return navigate("/book");
    } else {
      toast({
        position: "top",
        title: `${data?.msg}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleToggle = () => {
    toggle();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Login to Your Account
      </h2>
      <p className="mb-6 text-center">
        Don't have an account?{" "}
        <strong onClick={handleToggle} className="cursor-pointer text-blue-600">
          Sign Up
        </strong>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-md font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-md font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className={`${
            isSubmitting ? "bg-blue-300" : "bg-blue-500"
          } text-white p-2 rounded-md w-full ${
            isSubmitting ? "cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
