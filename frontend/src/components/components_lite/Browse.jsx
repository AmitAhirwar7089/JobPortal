import React from "react";
import Navbar from "./Navbar";
import Job from "./Job";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Browse = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h1 className="font-bold text-3xl mb-10 tracking-wide">
          Search Results 
          <span className="text-blue-600"> ({randomJobs.length})</span>
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {randomJobs.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Job />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
