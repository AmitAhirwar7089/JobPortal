import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (time) => {
    if (!time) return "Today";
    const diff =
      (new Date().getTime() - new Date(time).getTime()) /
      (1000 * 60 * 60 * 24);
    return Math.floor(diff);
  };

  return (
    <div
      className="h-full p-4 rounded-2xl bg-white border border-gray-200
      shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300
      flex flex-col justify-between"
    >
      {/* Top */}
      <div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            {daysAgo(job?.createdAt) === 0
              ? "Today"
              : `${daysAgo(job?.createdAt)} days ago`}
          </p>
          <Bookmark
            size={16}
            className="text-gray-500 cursor-pointer hover:text-[#7209b7]"
          />
        </div>

        {/* Company */}
        <div className="flex items-center gap-3 mt-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                job?.company?.logo ||
                "https://i.pravatar.cc/100"
              }
            />
          </Avatar>

          <div>
            <h1 className="text-sm font-semibold leading-tight">
              {job?.company?.name || "Company Name"}
            </h1>
            <p className="text-xs text-gray-500">
              {job?.location || "India"}
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-blue-600 mt-3 leading-snug">
          {job?.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {job?.description || "No description available"}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className="text-xs bg-blue-50 text-blue-700">
            {job?.position || 1} Position
          </Badge>

          <Badge className="text-xs bg-orange-50 text-orange-600">
            {job?.salary || "N/A"} LPA
          </Badge>

          <Badge className="text-xs bg-gray-100 text-gray-700">
            {job?.jobType || "Full Time"}
          </Badge>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>

        <Button
          size="sm"
          className="bg-[#7209b7] hover:bg-[#5e0794] text-white"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Job;
