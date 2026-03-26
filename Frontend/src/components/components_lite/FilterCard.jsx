import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const FilterCard = () => {
  const dispatch = useDispatch();
  const { allJobs = [] } = useSelector((store) => store.jobs);

  const [selectedValues, setSelectedValues] = useState({});

  const uniqueLocations = [
    ...new Set(allJobs.map((j) => j.location).filter(Boolean)),
  ];
  const uniqueJobTypes = [
    ...new Set(allJobs.map((j) => j.jobType).filter(Boolean)),
  ];

  const experienceRanges = ["0-3 years", "3-5 years", "5-7 years"];
  const salaryRanges = ["0-5 LPA", "5-10 LPA", "10-15 LPA"];

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValues));
  }, [selectedValues, dispatch]);

  // ✅ RADIO
  const handleRadio = (type, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // ✅ CHECKBOX
  const handleCheckbox = (type, value) => {
    setSelectedValues((prev) => {
      const arr = prev[type] || [];
      return arr.includes(value)
        ? { ...prev, [type]: arr.filter((v) => v !== value) }
        : { ...prev, [type]: [...arr, value] };
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 border sticky top-20">
      <h1 className="text-xl font-semibold mb-4">Filter Jobs</h1>

      {/* 📍 LOCATION */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Location</h2>
        {uniqueLocations.map((loc, i) => (
          <label key={i} className="block hover:bg-gray-100 p-1 rounded">
            <input
              type="radio"
              className="mr-2"
              checked={selectedValues.Location === loc}
              onChange={() => handleRadio("Location", loc)}
            />
            {loc}
          </label>
        ))}
      </div>

      {/* 💼 JOB TYPE */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Job Type</h2>
        {uniqueJobTypes.map((type, i) => (
          <label key={i} className="block hover:bg-gray-100 p-1 rounded">
            <input
              type="radio"
              className="mr-2"
              checked={selectedValues.JobType === type}
              onChange={() => handleRadio("JobType", type)}
            />
            {type}
          </label>
        ))}
      </div>

      {/* 🎯 EXPERIENCE */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Experience</h2>
        {experienceRanges.map((exp, i) => (
          <label key={i} className="block hover:bg-gray-100 p-1 rounded">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedValues["Experience Level"]?.includes(exp) || false}
              onChange={() => handleCheckbox("Experience Level", exp)}
            />
            {exp}
          </label>
        ))}
      </div>

      {/* 💰 SALARY */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Salary</h2>
        {salaryRanges.map((sal, i) => (
          <label key={i} className="block hover:bg-gray-100 p-1 rounded">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedValues.Salary?.includes(sal) || false}
              onChange={() => handleCheckbox("Salary", sal)}
            />
            {sal}
          </label>
        ))}
      </div>

      {/* 🔄 RESET */}
      <button
        onClick={() => {
          setSelectedValues({});
          dispatch(setSearchedQuery({}));
        }}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default FilterCard;