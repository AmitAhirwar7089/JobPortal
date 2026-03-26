import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

// ✅ POST request to apply for a job
router.route("/apply/:id").post(authenticateToken, applyJob);

// Get all applied jobs for logged-in user
router.route("/get").get(authenticateToken, getAppliedJobs);

// Get all applicants for a particular job
router.route("/:id/applicants").get(authenticateToken, getApplicants);

// Update application status (for admin)
router.route("/status/:id/update").post(authenticateToken, updateStatus);

export default router;
