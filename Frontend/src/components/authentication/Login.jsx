import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select a role");
      return;
    }

    try {
      dispatch(setLoading(true));

      // ✅ FIXED: full backend URL + withCredentials
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-400 to-indigo-600 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 text-center">
            <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
              Welcome Back!
            </h2>
            <p className="text-lg mb-6 drop-shadow-md">
              Log in to explore amazing features and stay connected with the community.
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Illustration"
              className="w-64 h-64 object-contain animate-float"
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
          <form
            onSubmit={submitHandler}
            className="bg-white backdrop-blur-md bg-opacity-70 shadow-xl rounded-3xl p-10 w-4/5 max-w-md transition-transform hover:scale-105"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Login to Your Account
            </h1>

            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="you@example.com"
              className="mb-4 focus:ring-2 focus:ring-indigo-400"
            />

            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="mb-4 focus:ring-2 focus:ring-indigo-400"
            />

            <RadioGroup className="flex gap-6 my-5">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="accent-indigo-500"
                />
                Student
              </label>

              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="accent-indigo-500"
                />
                Recruiter
              </label>
            </RadioGroup>

            {loading ? (
              <Button className="w-full bg-indigo-600 text-white flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-indigo-700 transition">
                <Loader2 className="h-4 w-4 animate-spin" /> Logging in...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition font-semibold"
              >
                Login
              </Button>
            )}

            <p className="text-gray-500 mt-6 text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
