// backend/src/controllers/adminController.js
const User = require("../models/User");
const College = require("../models/College");
const Branch = require("../models/Branch");
const Year = require("../models/Year");
const Semester = require("../models/Semester");
const Subject = require("../models/Subject");
const Unit = require("../models/Unit");
const Topic = require("../models/Topic");
const Resource = require("../models/Resource");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const { uploadToCloudinary } = require("../services/storage");

// ------------------------
// User Management
// ------------------------
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  return successResponse(res, users, "Users fetched successfully");
});

exports.updateUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['admin', 'student'].includes(role)) {
    return errorResponse(res, "Invalid role", 400);
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  ).select('-password');

  if (!user) return errorResponse(res, "User not found", 404);
  return successResponse(res, user, "User role updated successfully");
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  if (userId === req.user._id.toString()) {
    return errorResponse(res, "Cannot delete your own account", 400);
  }

  const user = await User.findByIdAndDelete(userId);
  if (!user) return errorResponse(res, "User not found", 404);
  return successResponse(res, null, "User deleted successfully");
});

// ------------------------
// College Management
// ------------------------
exports.getColleges = asyncHandler(async (req, res) => {
  const colleges = await College.find().sort({ name: 1 });
  return successResponse(res, colleges, "Colleges fetched successfully");
});

exports.addCollege = asyncHandler(async (req, res) => {
  const { name, description, code, established, location } = req.body;

  const existingCollege = await College.findOne({ 
    $or: [{ name }, { code }] 
  });
  
  if (existingCollege) {
    return errorResponse(res, "College with this name or code already exists", 400);
  }

  const college = await College.create({
    name,
    description,
    code,
    established,
    location
  });

  return successResponse(res, college, "College added successfully", 201);
});

exports.updateCollege = asyncHandler(async (req, res) => {
  const { collegeId } = req.params;
  const college = await College.findByIdAndUpdate(collegeId, req.body, { 
    new: true,
    runValidators: true 
  });

  if (!college) return errorResponse(res, "College not found", 404);
  return successResponse(res, college, "College updated successfully");
});

exports.deleteCollege = asyncHandler(async (req, res) => {
  const { collegeId } = req.params;
  const college = await College.findByIdAndDelete(collegeId);
  
  if (!college) return errorResponse(res, "College not found", 404);
  return successResponse(res, null, "College deleted successfully");
});

// ------------------------
// Branch CRUD
// ------------------------
exports.addBranch = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  try {
    const branch = await Branch.create({ name, description });
    return successResponse(res, branch, "Branch added successfully");
  } catch (err) {
    if (err.code === 11000) {
      return errorResponse(res, `Branch "${name}" already exists`, 400);
    }
    throw err;
  }
});

exports.updateBranch = asyncHandler(async (req, res) => {
  const branch = await Branch.findByIdAndUpdate(req.params.branchId, req.body, { new: true });
  if (!branch) return errorResponse(res, "Branch not found", 404);
  return successResponse(res, branch, "Branch updated successfully");
});

exports.deleteBranch = asyncHandler(async (req, res) => {
  const branch = await Branch.findByIdAndDelete(req.params.branchId);
  if (!branch) return errorResponse(res, "Branch not found", 404);
  return successResponse(res, null, "Branch deleted successfully");
});

// ------------------------
// Year CRUD
// ------------------------
exports.addYear = asyncHandler(async (req, res) => {
  const { branchId } = req.params;
  const { name } = req.body;
  const year = await Year.create({ name, branch: branchId });
  return successResponse(res, year, "Year added successfully");
});

exports.updateYear = asyncHandler(async (req, res) => {
  const year = await Year.findByIdAndUpdate(req.params.yearId, req.body, { new: true });
  if (!year) return errorResponse(res, "Year not found", 404);
  return successResponse(res, year, "Year updated successfully");
});

exports.deleteYear = asyncHandler(async (req, res) => {
  const year = await Year.findByIdAndDelete(req.params.yearId);
  if (!year) return errorResponse(res, "Year not found", 404);
  return successResponse(res, null, "Year deleted successfully");
});

// ------------------------
// Semester CRUD
// ------------------------
exports.addSemester = asyncHandler(async (req, res) => {
  const { yearId } = req.params;
  const { name, description } = req.body;

  const year = await Year.findById(yearId);
  if (!year) return errorResponse(res, "Year not found", 404);

  const semester = await Semester.create({
    name,
    description,
    year: yearId,
    branch: year.branch,
  });

  return successResponse(res, semester, "Semester added successfully");
});

exports.updateSemester = asyncHandler(async (req, res) => {
  const semester = await Semester.findByIdAndUpdate(req.params.semesterId, req.body, { new: true });
  if (!semester) return errorResponse(res, "Semester not found", 404);
  return successResponse(res, semester, "Semester updated successfully");
});

exports.deleteSemester = asyncHandler(async (req, res) => {
  const semester = await Semester.findByIdAndDelete(req.params.semesterId);
  if (!semester) return errorResponse(res, "Semester not found", 404);
  return successResponse(res, null, "Semester deleted successfully");
});

// ------------------------
// Subject CRUD
// ------------------------
exports.addSubject = asyncHandler(async (req, res) => {
  const { semesterId } = req.params;
  const { name, description } = req.body;

  const semester = await Semester.findById(semesterId);
  if (!semester) return errorResponse(res, "Semester not found", 404);

  const subject = await Subject.create({
    name,
    description,
    semester: semesterId,
    branch: semester.branch,
  });

  return successResponse(res, subject, "Subject added successfully");
});

exports.updateSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findByIdAndUpdate(req.params.subjectId, req.body, { new: true });
  if (!subject) return errorResponse(res, "Subject not found", 404);
  return successResponse(res, subject, "Subject updated successfully");
});

exports.deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findByIdAndDelete(req.params.subjectId);
  if (!subject) return errorResponse(res, "Subject not found", 404);
  return successResponse(res, null, "Subject deleted successfully");
});

// ------------------------
// Unit CRUD (Add these missing functions)
// ------------------------
exports.addUnit = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  const { name } = req.body;
  const subject = await Subject.findById(subjectId);
  if (!subject) return errorResponse(res, "Subject not found", 404);

  const unit = await Unit.create({ 
    name, 
    subject: subjectId, 
    branch: subject.branch, 
    semester: subject.semester 
  });
  return successResponse(res, unit, "Unit added successfully");
});

exports.updateUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findByIdAndUpdate(req.params.unitId, req.body, { new: true });
  if (!unit) return errorResponse(res, "Unit not found", 404);
  return successResponse(res, unit, "Unit updated successfully");
});

exports.deleteUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findByIdAndDelete(req.params.unitId);
  if (!unit) return errorResponse(res, "Unit not found", 404);
  return successResponse(res, null, "Unit deleted successfully");
});

// ------------------------
// Topic CRUD (Add these missing functions)
// ------------------------
exports.addTopic = asyncHandler(async (req, res) => {
  const { subjectOrUnitId } = req.params;
  const { name } = req.body;

  let topicData = { name };

  if (req.query.unit === "true") {
    const unit = await Unit.findById(subjectOrUnitId);
    if (!unit) return errorResponse(res, "Unit not found", 404);
    topicData.unit = unit._id;
    topicData.subject = unit.subject;
    topicData.branch = unit.branch;
    topicData.semester = unit.semester;
  } else {
    const subject = await Subject.findById(subjectOrUnitId);
    if (!subject) return errorResponse(res, "Subject not found", 404);
    topicData.subject = subject._id;
    topicData.branch = subject.branch;
    topicData.semester = subject.semester;
  }

  const topic = await Topic.create(topicData);
  return successResponse(res, topic, "Topic added successfully");
});

exports.updateTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findByIdAndUpdate(req.params.topicId, req.body, { new: true });
  if (!topic) return errorResponse(res, "Topic not found", 404);
  return successResponse(res, topic, "Topic updated successfully");
});

exports.deleteTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findByIdAndDelete(req.params.topicId);
  if (!topic) return errorResponse(res, "Topic not found", 404);
  return successResponse(res, null, "Topic deleted successfully");
});

// ------------------------
// Resource CRUD
// ------------------------
exports.addResource = asyncHandler(async (req, res) => {
  const { topicId } = req.params;
  const { title, summary, tags, difficulty, youtubeLinks } = req.body;

  const topic = await Topic.findById(topicId);
  if (!topic) return errorResponse(res, "Topic not found", 404);

  let pdfs = [];
  if (req.files && req.files.length > 0) {
    pdfs = await Promise.all(
      req.files.map(async (file) => {
        const url = await uploadToCloudinary(file);
        return { url, filename: file.originalname };
      })
    );
  }

  let parsedYoutubeLinks = [];
  if (youtubeLinks) {
    parsedYoutubeLinks = typeof youtubeLinks === "string" ? JSON.parse(youtubeLinks) : youtubeLinks;
  }

  const resource = await Resource.create({
    title,
    topic: topic._id,
    unit: topic.unit || null,
    branch: topic.branch,
    semester: topic.semester,
    subject: topic.subject,
    pdfs,
    youtubeLinks: parsedYoutubeLinks,
    summary: summary || "",
    tags: tags ? (typeof tags === "string" ? JSON.parse(tags) : tags) : [],
    difficulty: difficulty || "medium",
    addedBy: req.user._id,
  });

  return successResponse(res, resource, "Resource added successfully");
});

exports.updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.resourceId);
  if (!resource) return errorResponse(res, "Resource not found", 404);

  const { title, summary, tags, difficulty, youtubeLinks } = req.body;

  if (req.files && req.files.length > 0) {
    const newPdfs = await Promise.all(
      req.files.map(async (file) => {
        const url = await uploadToCloudinary(file);
        return { url, filename: file.originalname };
      })
    );
    resource.pdfs.push(...newPdfs);
  }

  if (title) resource.title = title;
  if (summary) resource.summary = summary;
  if (tags) resource.tags = typeof tags === "string" ? JSON.parse(tags) : tags;
  if (difficulty) resource.difficulty = difficulty;
  if (youtubeLinks) {
    resource.youtubeLinks = typeof youtubeLinks === "string" ? JSON.parse(youtubeLinks) : youtubeLinks;
  }

  await resource.save();
  return successResponse(res, resource, "Resource updated successfully");
});

exports.deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndDelete(req.params.resourceId);
  if (!resource) return errorResponse(res, "Resource not found", 404);
  return successResponse(res, null, "Resource deleted successfully");
});

exports.getAllResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  return successResponse(res, resources, "Resources fetched successfully");
});

// ------------------------
// Dashboard Statistics - ADD THIS COMPLETE FUNCTION
// ------------------------
exports.getDashboardStats = asyncHandler(async (req, res) => {
  try {
    const [
      totalUsers,
      totalColleges,
      totalResources,
      totalBranches,
      totalSubjects
    ] = await Promise.all([
      User.countDocuments(),
      College.countDocuments(),
      Resource.countDocuments(),
      Branch.countDocuments(),
      Subject.countDocuments()
    ]);

    // Get recent users (last 5)
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email role createdAt');

    const stats = {
      totalUsers,
      totalColleges,
      totalResources,
      totalBranches,
      totalSubjects,
      totalYears: await Year.countDocuments(),
      totalSemesters: await Semester.countDocuments(),
      recentUsers,
      recentActivity: recentUsers.map(user => ({
        action: 'User Registered',
        description: `${user.firstName} ${user.lastName} (${user.role}) signed up`,
        time: user.createdAt
      }))
    };

    return successResponse(res, stats, "Dashboard stats fetched successfully");
  } catch (error) {
    return errorResponse(res, "Error fetching dashboard stats: " + error.message, 500);
  }
});