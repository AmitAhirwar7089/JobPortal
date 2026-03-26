import React, { useEffect } from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import { setAllJobs, setSearchJobByText } from "@/redux/jobSlice";
import axios from "axios";

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs = [], searchedQuery = {}, searchJobByText = "" } =
    useSelector((store) => store.jobs);

  // Load jobs + restore category filter
  useEffect(() => {
    if (!allJobs.length) {
      axios.get("/api/jobs").then((res) => {
        dispatch(setAllJobs(res.data));
      });
    }

    const savedCategory = localStorage.getItem("categoryFilter");
    if (savedCategory && savedCategory !== searchJobByText) {
      dispatch(setSearchJobByText(savedCategory));
    }
  }, []);

  // Filter jobs smartly
  const filteredJobs = allJobs.filter((job) => {
    // SEARCH / CATEGORY filter only if not empty
    if (searchJobByText && searchJobByText !== "" && searchJobByText !== "All") {
      const text = searchJobByText.toLowerCase();
      const title = job?.title?.toLowerCase() || "";
      const company = job?.company?.name?.toLowerCase() || "";
      const industry = job?.industry?.toLowerCase() || "";
      const category = job?.category?.toLowerCase() || "";

      if (
        !title.includes(text) &&
        !company.includes(text) &&
        !industry.includes(text) &&
        !category.includes(text)
      )
        return false;
    }

    // LOCATION filter
    if (searchedQuery?.Location && searchedQuery.Location !== "") {
      const loc = job?.location?.toLowerCase() || "";
      if (!loc.includes(searchedQuery.Location.toLowerCase())) return false;
    }

    // JOB TYPE filter
    if (searchedQuery?.JobType && searchedQuery.JobType !== "") {
      const type = job?.jobType?.toLowerCase() || "";
      if (!type.includes(searchedQuery.JobType.toLowerCase())) return false;
    }

    // EXPERIENCE filter
    if (searchedQuery?.["Experience Level"]?.length > 0) {
      const exp = Number(job?.experienceLevel) || 0;
      const match = searchedQuery["Experience Level"].some((range) => {
        if (range === "0-3 years") return exp <= 3;
        if (range === "3-5 years") return exp >= 3 && exp <= 5;
        if (range === "5-7 years") return exp >= 5 && exp <= 7;
        return false;
      });
      if (!match) return false;
    }

    // SALARY filter
    if (searchedQuery?.Salary?.length > 0) {
      const rawSalary = Number(job?.salary) || 0;
      const salary = rawSalary > 100 ? rawSalary / 100000 : rawSalary;
      const match = searchedQuery.Salary.some((range) => {
        if (range === "0-5 LPA") return salary <= 5;
        if (range === "5-10 LPA") return salary >= 5 && salary <= 10;
        if (range === "10-15 LPA") return salary >= 10 && salary <= 15;
        return false;
      });
      if (!match) return false;
    }

    return true; // ✅ show job if all filters pass or no filter
  });

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4 flex gap-6">
        <div className="w-1/5">
          <FilterCard />
        </div>
        <div className="w-4/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredJobs.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 text-lg">
                No Jobs Found 🚫
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div key={job._id} className="max-w-[300px] mx-auto">
                  <Job job={job} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;