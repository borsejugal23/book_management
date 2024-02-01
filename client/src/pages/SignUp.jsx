import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/AuthReducer/action";
import { useToast } from "@chakra-ui/react";

const SignUpForm = () => {
  
  const toast = useToast();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toggle } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
        roles: checked
          ? [...prevFormData.roles, value]
          : prevFormData.roles.filter((role) => role !== value),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.roles.length === 0) {
      toast({
        position: "top",
        title: "Please select at least one role",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(signup({ formData: formData, callback: handleCallback }));
      console.log(formData);
    } catch (error) {
      console.error("Signup failed:", error);
      toast({
        position: "top",
        title: "Signup failed. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallback = (data) => {
    const { msg } = data;
    toast({
      position: "top",
      title: msg,
      status: msg === "Registered successfully" ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleToggle = () => {
    toggle();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Create Your Account
      </h2>
      <p className="mb-4 text-center">
        Have an account?{" "}
        <strong onClick={handleToggle} className="cursor-pointer text-blue-600">
          Log in now
        </strong>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="text-md font-medium text-gray-600 mb-1 block"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-md font-medium text-gray-600 mb-2">
            Roles
          </label>

          <div className="flex flex-col md:flex-row">
            <div className="flex items-center mb-2 md:mb-0 md:mr-4">
              <input
                type="checkbox"
                id="isCreator"
                name="isCreator"
                value="CREATOR"
                checked={formData.roles.includes("CREATOR")}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="isCreator">Creator</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="viewAll"
                name="viewAll"
                value="VIEW_ALL"
                checked={formData.roles.includes("VIEW_ALL")}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="viewAll">View All</label>
            </div>
          </div>
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
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
