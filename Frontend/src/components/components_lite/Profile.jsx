import React from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModel from "./EditProfileModel";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto mt-8 space-y-8">
        {/* PROFILE HEADER */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-5">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="profile"
                />
              </Avatar>

              <div>
                <h1 className="text-2xl font-semibold">{user?.fullname}</h1>
                <p className="text-gray-600 text-sm max-w-lg">
                  {user?.profile?.bio}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="rounded-full"
            >
              <Pen className="h-4 w-4" />
            </Button>
          </div>

          <hr className="my-6" />

          {/* CONTACT INFO */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="h-5 w-5" />
              <a href={`mailto:${user?.email}`} className="text-sm">
                {user?.email}
              </a>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Contact className="h-5 w-5" />
              <a href={`tel:${user?.phoneNumber}`} className="text-sm">
                {user?.phoneNumber}
              </a>
            </div>
          </div>
        </div>

        {/* SKILLS SECTION (SEPARATE) */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>

          {user?.profile?.skills && user.profile.skills.length > 0 ? (
            <ul className="space-y-2">
              {user.profile.skills.map((skill, index) => (
                <li
                  key={index}
                  className="border rounded-lg px-4 py-2 text-sm text-gray-700"
                >
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-500 text-sm">NA</span>
          )}
        </div>

        {/* RESUME SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-xl font-semibold mb-2">Resume</h2>

          {/* Resume */}
          {user?.profile?.resume ? (
            <a
              href={`http://localhost:3000/${user.profile.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Download
            </a>
          ) : (
            <span className="text-gray-500 text-sm">No Resume Found</span>
          )}
        </div>

        {/* APPLIED JOBS */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>
          <AppliedJob />
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      <EditProfileModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
