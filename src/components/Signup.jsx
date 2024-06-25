import { useState } from "react";
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1E1E1E] to-[#3e3e42] text-white">
      <div className="mx-auto w-full max-w-lg bg-gray-900 text-[#c1e8ff] rounded-3xl p-8 border border-gray-700 shadow-lg">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[80px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-extrabold leading-tight">
          Create Your Account
        </h2>
        <p className="mt-3 text-center text-base text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-[#c1e8ff] transition-colors duration-300 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff] transition-all duration-300"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff] transition-all duration-300"
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
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8ff] transition-all duration-300"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            className="w-full py-3 bg-[#007acc] text-black font-semibold rounded-lg shadow-md hover:bg-[#005bb5] hover:text-[#c1e8ff] transition-colors duration-300 transform hover:scale-105"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
