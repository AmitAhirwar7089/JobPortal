import React from "react";
import { Badge } from "../ui/badge";

const JobCards = ({ job }) => {
  return (
    <div className="h-full">
      <div className="h-full p-5 rounded-2xl bg-white border border-gray-200 shadow-sm
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300
        flex flex-col justify-between">

        {/* Top Section */}
        <div>
          {/* Company & Location */}
          <div className="flex justify-between items-start">
            <h1 className="text-lg font-semibold text-gray-800 truncate">
              {job?.company?.name || "Company Name"}
            </h1>
            <p className="text-xs text-gray-500 whitespace-nowrap">
              📍 {job?.location || "India"}
            </p>
          </div>

          {/* Job Title */}
          <h2 className="mt-3 text-xl font-bold text-blue-600 leading-tight">
            {job?.title}
          </h2>

          {/* Description (fixed height) */}
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {job?.description || "No description provided"}
          </p>
        </div>

        {/* Bottom Section */}
        <div>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-5">
            <Badge className="bg-blue-50 text-blue-700 text-xs">
              {job?.position || "Role"}
            </Badge>

            <Badge className="bg-orange-50 text-orange-600 text-xs">
              {job?.salary || "0"} LPA
            </Badge>

            <Badge className="bg-purple-50 text-purple-600 text-xs">
              {job?.jobType || "Full Time"}
            </Badge>

            <Badge className="bg-gray-100 text-gray-700 text-xs">
              {job?.experienceLevel || "Fresher"} Exp
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCards;
