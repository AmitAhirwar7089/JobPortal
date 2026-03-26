import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Logged out successfully");
        dispatch(setUser(null));
        navigate("/");
      } else {
        toast.error("Failed to log out");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-5xl h-16">
        <div className="">
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#022bf8]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  {" "}
                  <Link to={"/Home"}>Home</Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/Browse"}>Browse</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to={"/Jobs"}>Jobs</Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/Creator"}>About</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-4">
              <Link to="/login">
                {" "}
                <Button variant="outline">Login</Button>
              </Link>

              <Link to="/register">
                {" "}
                <Button className="bg-blue-500 hover:bg-blue-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 rounded-xl bg-white shadow-xl border border-gray-100 mr-5 mt-3">
                <div className="flex items-center gap-4">
                  <Avatar className="cursor-pointer h-14 w-14">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Amit Ahirwar"
                    />
                  </Avatar>

                  <div>
                    <h3 className="font-semibold text-base">
                      {user?.fullname}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600  ">
                  {user && user.role === "Student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Button variant="link">
                        {" "}
                        <Link to={"/Profile"}> Profile</Link>{" "}
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-black">
                    <LogOut></LogOut>
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
