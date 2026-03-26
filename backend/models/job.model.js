import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    requirements: [{ type: String }],

    // ✅ FIXED
    salary: {
      type: Number, // 💰 LPA me store karo
    },

    // ✅ already correct
    experienceLevel: {
      type: Number, // years
    },

    location: String,
    jobType: String,
    position: Number,

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);