import { Job } from "../models/job.model.js";

// ======================
// Admin: Post Job
// ======================
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    // ✅ Correct validation (0 value issue fixed)
    if (
      !title ||
      !description ||
      !requirements ||
      salary === undefined ||
      !location ||
      !jobType ||
      experience === undefined ||
      position === undefined ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(",").map((r) => r.trim()),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experience),
      position: Number(position),
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job posted successfully",
      job,
      success: true, // ✅ frontend compatible
    });

  } catch (error) {
    console.error("POST JOB ERROR 👉", error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// ======================
// Users: Get All Jobs
// ======================
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.error("GET ALL JOBS ERROR 👉", error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// ======================
// Users: Get Job By ID
// ======================
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate([
      { path: "applications" },
      { path: "company" },
    ]);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });

  } catch (error) {
    console.error("GET JOB BY ID ERROR 👉", error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// ======================
// Admin: Get Admin Jobs
// ======================
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.error("GET ADMIN JOBS ERROR 👉", error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
