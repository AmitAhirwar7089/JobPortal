import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// ✅ PUBLIC ROUTES (NO LOGIN REQUIRED)
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(getJobById);

// 🔒 PROTECTED ROUTES (LOGIN REQUIRED)
router.route("/post").post(authenticateToken, postJob);
router.route("/getadminjobs").get(authenticateToken, getAdminJobs);

export default router;
