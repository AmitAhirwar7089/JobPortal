import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

// ---------------------- REGISTER COMPANY -----------------------
export const registerCompany = async (req, res) => {
  
  try {
     const userId = req.id;
    const { companyName } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Please login first", success: false });
    }

    if (!companyName || !companyName.trim()) {
      return res.status(400).json({ message: "Company name is required", success: false });
    }

    const existingCompany = await Company.findOne({ name: companyName.trim() });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists", success: false });
    }

    const newCompany = await Company.create({
      name: companyName.trim(),
      userId: userId, // ✅ single ObjectId
    });

    return res.status(201).json({
      message: "Company created successfully",
      company: newCompany,
      success: true,
    });
  } catch (error) {
    console.error("REGISTER COMPANY ERROR 👉", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ---------------------- GET ALL COMPANIES -----------------------
export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.id; // ✅ use correct user id
    if (!userId) {
      return res.status(401).json({ message: "Please login first", success: false });
    }

    const companies = await Company.find({ userId });
    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.error("GET ALL COMPANIES ERROR 👉", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ---------------------- GET COMPANY BY ID -----------------------
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }

    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error("GET COMPANY BY ID ERROR 👉", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ---------------------- UPDATE COMPANY -----------------------
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    let logo;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = { name, description, website, location };
    if (logo) updateData.logo = logo;

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }

    return res.status(200).json({ message: "Company updated successfully", company, success: true });
  } catch (error) {
    console.error("UPDATE COMPANY ERROR 👉", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
