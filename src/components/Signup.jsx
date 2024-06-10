import React, { useState } from "react";
import authServices from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authServices.createAccount(data);
      if (userData) {
        const userData = await authServices.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

return (
  <div className="flex items-center justify-center min-h-screen bg-[#042659]">
    <div className="mx-auto w-full max-w-lg bg-gray-800 text-[#c1e8ff] rounded-xl p-10 border border-gray-700">
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign up to create account
      </h2>
      <p className="mt-2 text-center text-base text-gray-300">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-[#c1e8ff] transition-all duration-200 hover:underline"
        >
          Sign In
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

      <form onSubmit={handleSubmit(create)} className="mt-8">
        <div className="space-y-5">
          <Input
            label="Full Name: "
            placeholder="Enter your full name"
            className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff]"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff]"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff]"
            {...register("password", {
              required: true,
            })}
          />
          <Button
            type="submit"
            className="w-full py-2 bg-[#007acc] text-black font-medium rounded-lg shadow-md hover:bg-[#042659] hover:text-[#c1e8ff] transition-colors duration-300"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  </div>
);

}

export default Signup;
