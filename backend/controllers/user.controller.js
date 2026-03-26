import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

/* =========================
   REGISTER
========================= */
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!["Student", "Recruiter"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const file = req.file;

    if (role === "Recruiter" && !file) {
      return res.status(400).json({
        success: false,
        message: "Recruiter profile image is required",
      });
    }

    let profilePhoto = "";

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content
      );
      profilePhoto = cloudResponse.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto },
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

/* =========================
   LOGIN  ✅ FIXED COOKIE BUG
========================= */
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password and role are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Role mismatch",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔥 MAIN FIX IS HERE
    res
  .status(200)
  .cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",   // ✅ change here
  secure: false,     // localhost ke liye ok
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
})
  .json({
    success: true,
    message: `Welcome back ${user.fullname}`,
    user,
  });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

/* =========================
   LOGOUT
========================= */
export const logout = (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    if (skills) {
      let skillsArray = [];

      if (Array.isArray(skills)) {
        skillsArray = skills;
      } else {
        try {
          skillsArray = JSON.parse(skills);
        } catch {
          skillsArray = skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }

      user.profile.skills = skillsArray;
    }

    // Resume upload (local)
    if (req.file) {
      const uploadDir = "uploads/resumes";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${req.file.originalname}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, req.file.buffer);

      user.profile.resume = filePath.replace(/\\/g, "/");
      user.profile.resumeOriginalname = req.file.originalname;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error updating profile",
    });
  }
};
