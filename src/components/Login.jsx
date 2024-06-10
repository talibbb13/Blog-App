import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authServices from "../appwrite/auth";
import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const storeUserData = useSelector((state) => state.auth.userData);
    useEffect(() => {
      console.log("Updated storeUserData (useEffect):", storeUserData);
    }, [storeUserData]);

  const handleLogin = async (data) => {
    setError("");
    try {
      const session = await authServices.login(data);
      if (session) {
        const userData = await authServices.getCurrentUser();
        if (userData) {
          console.log("userData value is:::", userData);

          dispatch(login(userData));
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
        Sign in to your account
      </h2>
      <p className="mt-2 text-center text-base text-gray-300">
        Don&apos;t have any account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-[#c1e8ff] transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>
      {error && <p className="text-red-600 text-center mt-8">{error}</p>}
      <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
        <div className="space-y-5">
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
            className="w-full py-2 bg-[#007acc] text-black font-medium rounded-lg shadow-md hover:bg-black hover:text-[#c1e8ff] transition-colors duration-300"
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  </div>
);
}

export default Login;
