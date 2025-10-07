const Subject = require("../models/Subject");
const Semester = require("../models/Semester");
const Branch = require("../models/Branch");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// Get all subjects for a semester
exports.getSubjectsBySemester = asyncHandler(async (req, res) => {
  const { semesterId } = req.params;
  
  const subjects = await Subject.find({ semester: semesterId })
    .populate('branch', 'name code')
    .populate('semester', 'name');
  
  return successResponse(res, subjects, "Subjects fetched successfully");
});

// Get all subjects for a branch
exports.getSubjectsByBranch = asyncHandler(async (req, res) => {
  const { branchId } = req.params;
  
  const subjects = await Subject.find({ branch: branchId })
    .populate('branch', 'name code')
    .populate('semester', 'name');
  
  return successResponse(res, subjects, "Subjects fetched successfully");
});

// Add new subject to semester
exports.addSubject = asyncHandler(async (req, res) => {
  const { semesterId } = req.params;
  const { name, code, credits, description } = req.body;

  // Check if semester exists
  const semester = await Semester.findById(semesterId);
  if (!semester) {
    return errorResponse(res, "Semester not found", 404);
  }

  // Check if subject already exists in this semester
  const existingSubject = await Subject.findOne({ 
    semester: semesterId, 
    $or: [{ name }, { code }] 
  });
  
  if (existingSubject) {
    return errorResponse(res, "Subject with this name or code already exists in this semester", 400);
  }

  const subject = await Subject.create({
    name,
    code,
    credits: credits || 3,
    description,
    semester: semesterId,
    branch: semester.branch,
  });

  const populatedSubject = await Subject.findById(subject._id)
    .populate('branch', 'name code')
    .populate('semester', 'name');

  return successResponse(res, populatedSubject, "Subject added successfully");
});

// Update subject
exports.updateSubject = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  const { name, code, credits, description } = req.body;

  const subject = await Subject.findByIdAndUpdate(
    subjectId,
    { name, code, credits, description },
    { new: true, runValidators: true }
  ).populate('branch', 'name code').populate('semester', 'name');

  if (!subject) {
    return errorResponse(res, "Subject not found", 404);
  }

  return successResponse(res, subject, "Subject updated successfully");
});

// Delete subject
exports.deleteSubject = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;

  const subject = await Subject.findByIdAndDelete(subjectId);
  if (!subject) {
    return errorResponse(res, "Subject not found", 404);
  }

  return successResponse(res, null, "Subject deleted successfully");
});