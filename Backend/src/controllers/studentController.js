// src/controllers/studentController.js
const College = require("../models/College");
const Branch = require("../models/Branch");
const Year = require("../models/Year");
const Semester = require("../models/Semester");
const Subject = require("../models/Subject");
const Unit = require("../models/Unit");
const Topic = require("../models/Topic");
const Resource = require("../models/Resource");
const Feedback = require("../models/Feedback");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ------------------------
// Get all colleges
// GET /api/student/colleges
// ------------------------
exports.getColleges = asyncHandler(async (req, res) => {
  const colleges = await College.find({ status: "active" }).sort({ name: 1 });
  return successResponse(res, colleges, "Colleges fetched successfully");
});

// ------------------------
// Browse branches
// GET /api/student/branches
// ------------------------
exports.getBranches = asyncHandler(async (req, res) => {
  const branches = await Branch.find();
  return successResponse(res, branches, "Branches fetched successfully");
});

// ------------------------
// Get years of a branch
// GET /api/student/years/:branchId
// ------------------------
exports.getYears = asyncHandler(async (req, res) => {
  const { branchId } = req.params;
  const years = await Year.find({ branch: branchId });
  return successResponse(res, years, "Years fetched successfully");
});

// ------------------------
// Get semesters of a year
// GET /api/student/semesters/:yearId
// ------------------------
exports.getSemesters = asyncHandler(async (req, res) => {
  const { yearId } = req.params;
  const semesters = await Semester.find({ year: yearId });
  return successResponse(res, semesters, "Semesters fetched successfully");
});

// ------------------------
// Get subjects of a semester
// GET /api/student/subjects/:semesterId
// ------------------------
exports.getSubjects = asyncHandler(async (req, res) => {
  const { semesterId } = req.params;
  const subjects = await Subject.find({ semester: semesterId });
  return successResponse(res, subjects, "Subjects fetched successfully");
});

// ------------------------
// Get units of a subject
// GET /api/student/units/:subjectId
// ------------------------
exports.getUnits = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  const units = await Unit.find({ subject: subjectId });
  return successResponse(res, units, "Units fetched successfully");
});

// ------------------------
// Get topics of a unit
// GET /api/student/topics/:unitId
// ------------------------
exports.getTopics = asyncHandler(async (req, res) => {
  const { unitId } = req.params;
  const topics = await Topic.find({ unit: unitId });
  return successResponse(res, topics, "Topics fetched successfully");
});

// ------------------------
// Enhanced resource fetching for students
// GET /api/student/subject/:subjectId/resources
// ------------------------
exports.getResources = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;

  const resources = await Resource.find({ 
    subject: subjectId, 
    status: "approved" 
  })
    .populate('subject', 'name code')
    .populate('semester', 'name')
    .populate('branch', 'name')
    .populate('college', 'name')
    .populate('addedBy', 'firstName lastName')
    .select('-files') // Don't send file data initially
    .sort({ createdAt: -1 });

  return successResponse(res, resources, "Resources fetched successfully");
});

// ------------------------
// Get single resource with all details
// GET /api/student/resource/:resourceId
// ------------------------
exports.getResourceDetails = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;

  const resource = await Resource.findById(resourceId)
    .populate('subject', 'name code')
    .populate('semester', 'name')
    .populate('branch', 'name')
    .populate('college', 'name')
    .populate('addedBy', 'firstName lastName');

  if (!resource) {
    return errorResponse(res, "Resource not found", 404);
  }

  // Increment view count
  resource.views += 1;
  await resource.save();

  return successResponse(res, resource, "Resource details fetched successfully");
});

// ------------------------
// Get resources of a topic
// GET /api/student/resources/:topicId
// ------------------------
exports.getTopicResources = asyncHandler(async (req, res) => {
  const { topicId } = req.params;
  const resources = await Resource.find({ topic: topicId });
  return successResponse(res, resources, "Resources fetched successfully");
});

// ------------------------
// Search resources by keyword
// GET /api/student/resources/search?q=keyword
// ------------------------
exports.searchResources = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) return errorResponse(res, "Query is required", 400);

  const resources = await Resource.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
      { summary: { $regex: q, $options: "i" } },
    ],
  });

  return successResponse(res, resources, "Search results fetched successfully");
});

// ------------------------
// Add feedback for a resource
// POST /api/student/feedback/:resourceId
// ------------------------
exports.addFeedback = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;
  const { rating, comment } = req.body;

  const resource = await Resource.findById(resourceId);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  const feedback = await Feedback.create({
    resource: resourceId,
    user: req.user._id,
    rating,
    comment,
  });

  return successResponse(res, feedback, "Feedback added successfully");
});

// ------------------------
// Get feedbacks of a resource
// GET /api/student/feedback/:resourceId
// ------------------------
exports.getFeedbacks = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;
  const feedbacks = await Feedback.find({ resource: resourceId }).populate(
    "user",
    "firstName lastName"
  );
  return successResponse(res, feedbacks, "Feedbacks fetched successfully");
});

// ------------------------
// Like a resource
// POST /api/student/resource/:id/like
// ------------------------
exports.likeResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  resource.likes += 1;
  await resource.save();
  return successResponse(res, { likes: resource.likes }, "Resource liked");
});

// ------------------------
// Rate a resource
// POST /api/student/resource/:id/rate
// ------------------------
exports.rateResource = asyncHandler(async (req, res) => {
  const { rating } = req.body;
  if (!rating || rating < 1 || rating > 5)
    return errorResponse(res, "Rating must be between 1 and 5", 400);

  const resource = await Resource.findById(req.params.id);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  // Simple average calculation
  resource.rating = (resource.rating + rating) / 2;
  await resource.save();

  return successResponse(res, { rating: resource.rating }, "Resource rated successfully");
});

// ------------------------
// Increment view count
// POST /api/student/resource/:id/view
// ------------------------
exports.incrementView = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  resource.views += 1;
  await resource.save();
  return successResponse(res, { views: resource.views }, "View incremented");
});