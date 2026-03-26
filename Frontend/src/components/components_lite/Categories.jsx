import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useDispatch } from "react-redux";
import { setSearchJobByText, resetCategoryFilter } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Frontend Developer", color: "from-blue-500 to-cyan-400" },
  { name: "Backend Developer", color: "from-green-500 to-emerald-400" },
  { name: "Full Stack Developer", color: "from-purple-500 to-pink-400" },
  { name: "Data Scientist", color: "from-orange-500 to-yellow-400" },
  { name: "DevOps Engineer", color: "from-gray-700 to-gray-500" },
  { name: "Mobile Developer", color: "from-indigo-500 to-blue-400" },
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (category) => {
    if (category === "All") {
      localStorage.removeItem("categoryFilter");
      dispatch(resetCategoryFilter());
    } else {
      localStorage.setItem("categoryFilter", category);
      dispatch(setSearchJobByText(category));
    }
    navigate("/jobs");
  };

  return (
    <div className="mt-14 px-4">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Explore Job Categories
      </h1>
      <p className="text-center text-gray-500 mt-2">
        Discover opportunities tailored to your skills 🚀
      </p>

      <div className="flex justify-center gap-4 mt-6 mb-4">
        <button
          onClick={() => handleClick("All")}
          className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition"
        >
          All Categories
        </button>
      </div>

      <Carousel className="w-full max-w-5xl mx-auto mt-4">
        <CarouselContent>
          {categories.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div
                onClick={() => handleClick(item.name)}
                className={`cursor-pointer rounded-3xl p-6 h-[160px] flex flex-col justify-between 
                bg-gradient-to-br ${item.color} text-white 
                shadow-lg hover:shadow-2xl 
                transform hover:-translate-y-2 hover:scale-105 
                transition-all duration-300`}
              >
                <div className="text-2xl">💼</div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-sm opacity-80">Click to explore →</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;