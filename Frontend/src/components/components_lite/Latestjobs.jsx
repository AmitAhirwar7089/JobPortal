import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import useGetAllJob from "../../hooks/useGetAllJob";

const Latestjobs = () => {
  // ✅ correct redux selector
  const allJobs = useSelector((store) => store.jobs?.allJobs || []);

  // fetch jobs
  useGetAllJob();

 

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-3xl font-bold">
        <span className="text-[#6A38C2] px-5">Latest & Top</span> Job Openings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {allJobs.length === 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <JobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default Latestjobs;
