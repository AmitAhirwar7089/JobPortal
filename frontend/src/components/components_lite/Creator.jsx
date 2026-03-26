import React from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import AmitPic from "../../../public/Amit pic (2).jpg";
import Navbar from "./Navbar";

const Creator = () => {
  return (
    <div>
    <Navbar/>
    
    <div className="bg-[#020617] text-white min-h-screen overflow-x-hidden mt-3">

      {/* 🔥 FIXED NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#020617]/80 border-b border-gray-800">
        
      </div>

      {/* 🔥 HERO */}
      <div className="pt-28 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Amit
            </span>
          </h1>

          <h2 className="text-2xl mt-4 text-blue-400 font-semibold">
            <ReactTyped
              strings={[
                "Full Stack Developer 🚀",
                "MERN Stack Expert 💻",
                "Problem Solver 🔥",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </h2>

          <p className="text-gray-400 mt-6 leading-relaxed max-w-lg">
            I build modern web applications with smooth UI and powerful backend.
            This Job Portal is one of my real-world projects.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-110 hover:shadow-purple-500/30 transition duration-300">
              Contact Me
            </button>

            <button className="border border-gray-600 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition duration-300">
              My Projects
            </button>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-30 animate-pulse"></div>

            <img
              src={AmitPic}
              alt="Amit"
              className="relative w-72 h-72 object-cover rounded-full border-4 border-gray-800 shadow-2xl hover:scale-105 transition duration-300"
            />
          </div>
        </motion.div>
      </div>

      {/* 🔥 ABOUT */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mt-24 text-center px-6"
      >
        <h2 className="text-3xl font-bold">About Me</h2>
        <p className="text-gray-400 mt-4 leading-relaxed">
          Passionate developer skilled in React, Node.js, and MongoDB.
          I love building real-world applications with smooth user experience.
        </p>
      </motion.div>

      {/* 🔥 SKILLS */}
      <div className="max-w-6xl mx-auto mt-16 px-6 grid md:grid-cols-4 gap-6">
        {["React", "Node.js", "MongoDB", "JavaScript"].map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="bg-[#0f172a] p-6 rounded-2xl text-center cursor-pointer border border-gray-800 hover:border-blue-500 transition"
          >
            <h3 className="text-blue-400 font-semibold">{skill}</h3>
          </motion.div>
        ))}
      </div>

      {/* 🔥 FEATURES */}
      <div className="max-w-6xl mx-auto mt-20 px-6 grid md:grid-cols-3 gap-6">
        {[
          "Smart Job Search 🔍",
          "Advanced Filters 🎯",
          "Fast UI ⚡",
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-[#0f172a] p-6 rounded-2xl border border-gray-800 hover:border-purple-500 transition"
          >
            <h3 className="text-purple-400 text-lg font-semibold">
              {item}
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              Modern and user-friendly experience.
            </p>
          </motion.div>
        ))}
      </div>

      {/* 🔥 FOOTER */}
      <div className="text-center mt-20 py-6 border-t border-gray-800 text-gray-500 text-sm">
        © 2026 Job Portal | Built with ❤️ by Amit
      </div>
    </div>
    </div>
  );
};

export default Creator;