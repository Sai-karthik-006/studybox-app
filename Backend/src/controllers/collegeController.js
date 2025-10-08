const College = require("../models/College");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// Get all colleges
exports.getColleges = asyncHandler(async (req, res) => {
  const colleges = await College.find().populate('branches', 'name fullName');
  return successResponse(res, colleges, "Colleges fetched successfully");
});

// Get college by ID
exports.getCollegeById = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id).populate('branches', 'name fullName');
  if (!college) {
    return errorResponse(res, "College not found", 404);
  }
  return successResponse(res, college, "College fetched successfully");
});

// Create new college
exports.createCollege = asyncHandler(async (req, res) => {
  const { name, fullName, code, established, location, logo, description } = req.body;
  
  // Check if college with same code already exists
  const existingCollege = await College.findOne({ code });
  if (existingCollege) {
    return errorResponse(res, `College with code ${code} already exists`, 400);
  }

  const college = await College.create({
    name,
    fullName,
    code,
    established: established || "Not specified",
    location: location || "Not specified",
    logo,
    description
  });

  return successResponse(res, college, "College created successfully", 201);
});

// Update college
exports.updateCollege = asyncHandler(async (req, res) => {
  const { name, fullName, code, established, location, logo, description, status } = req.body;
  
  const college = await College.findById(req.params.id);
  if (!college) {
    return errorResponse(res, "College not found", 404);
  }

  // Check if code is being changed and if it already exists
  if (code && code !== college.code) {
    const existingCollege = await College.findOne({ code });
    if (existingCollege) {
      return errorResponse(res, `College with code ${code} already exists`, 400);
    }
  }

  // Update fields
  if (name) college.name = name;
  if (fullName) college.fullName = fullName;
  if (code) college.code = code;
  if (established) college.established = established;
  if (location) college.location = location;
  if (logo) college.logo = logo;
  if (description) college.description = description;
  if (status) college.status = status;

  await college.save();

  return successResponse(res, college, "College updated successfully");
});

// Delete college
exports.deleteCollege = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);
  if (!college) {
    return errorResponse(res, "College not found", 404);
  }

  await College.findByIdAndDelete(req.params.id);
  return successResponse(res, null, "College deleted successfully");
});

// Add branch to college
exports.addBranchToCollege = asyncHandler(async (req, res) => {
  const { collegeId, branchId } = req.params;

  const college = await College.findById(collegeId);
  if (!college) {
    return errorResponse(res, "College not found", 404);
  }

  // Check if branch already exists
  if (!college.branches.includes(branchId)) {
    college.branches.push(branchId);
    await college.save();
  }

  const updatedCollege = await College.findById(collegeId).populate('branches', 'name fullName');
  return successResponse(res, updatedCollege, "Branch added to college successfully");
});

// Remove branch from college
exports.removeBranchFromCollege = asyncHandler(async (req, res) => {
  const { collegeId, branchId } = req.params;

  const college = await College.findById(collegeId);
  if (!college) {
    return errorResponse(res, "College not found", 404);
  }

  college.branches = college.branches.filter(bid => bid.toString() !== branchId);
  await college.save();

  const updatedCollege = await College.findById(collegeId).populate('branches', 'name fullName');
  return successResponse(res, updatedCollege, "Branch removed from college successfully");
});