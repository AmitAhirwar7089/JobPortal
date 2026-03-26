import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />

      <div className="flex flex-col lg:flex-row items-center justify-center py-16 px-4 lg:px-20 gap-10">
        {/* Left Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center w-1/2">
          <div className="bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-2xl p-8 shadow-xl flex flex-col items-center">
            <span className="text-6xl mb-4">👩‍💻</span>
            <span className="text-3xl font-semibold text-white mb-2">Welcome!</span>
            <p className="text-white text-center">
              Create your account and explore amazing opportunities. 🚀
            </p>
          </div>
        </div>

        {/* Right Form */}
        <form
          onSubmit={submitHandler}
          className="w-full lg:w-1/2 bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
        >
          <h1 className="font-bold text-2xl mb-6 text-center text-gray-800">
            Registration
          </h1>

          {/* Two-column Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <Label className="font-medium text-gray-700">Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                name="fullname"
                placeholder="Amit Ahirwar"
                className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

           

            {/* Email */}
            <div>
              <Label className="font-medium text-gray-700">Email</Label>
              <Input
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                name="email"
                placeholder="amitahirwar@gmail.com"
                className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Password */}
            <div>
              <Label className="font-medium text-gray-700">Password</Label>
              <Input
                type="password"
                value={input.password}
                onChange={changeEventHandler}
                name="password"
                placeholder="**********"
                className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
             {/* Phone Number */}
            <div>
              <Label className="font-medium text-gray-700">Phone Number</Label>
              <Input
                type="tel"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                name="phoneNumber"
                placeholder="+91 8767635678"
                className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Profile Photo */}
            <div className="md:col-span-2">
              <Label className="font-medium text-gray-700">Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-2 cursor-pointer w-full"
              />
            </div>
          </div>

          {/* Role Selection at the End */}
          <div className="mt-6">
            <Label className="font-medium text-gray-700">Select Role</Label>
            <RadioGroup className="flex gap-6 mt-2">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            {loading ? (
              <Button className="w-full py-3 flex justify-center items-center gap-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </Button>
            ) : (
              <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300"
              >
                Register
              </button>
            )}
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
