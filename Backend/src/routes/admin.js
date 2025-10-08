const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const collegeController = require("../controllers/collegeController"); // ADD THIS
const { protect, adminOnly } = require("../middlewares/auth");
const multer = require("multer");

// ------------------------
// Multer setup for file uploads
// ------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ------------------------
// Protect all admin routes
// ------------------------
router.use(protect);
router.use(adminOnly);

// ------------------------
// College routes
// ------------------------
router.get("/colleges", collegeController.getColleges);
router.get("/colleges/:id", collegeController.getCollegeById);
router.post("/colleges", collegeController.createCollege);
router.put("/colleges/:id", collegeController.updateCollege);
router.delete("/colleges/:id", collegeController.deleteCollege);
router.post("/colleges/:collegeId/branches/:branchId", collegeController.addBranchToCollege);
router.delete("/colleges/:collegeId/branches/:branchId", collegeController.removeBranchFromCollege);

// ... keep existing br

// ------------------------
// Dashboard Statistics
// ------------------------
router.get("/dashboard/stats", adminController.getDashboardStats);

// ------------------------
// User Management
// ------------------------
router.get("/users", adminController.getUsers);
router.put("/users/:userId/role", adminController.updateUserRole);
router.delete("/users/:userId", adminController.deleteUser);

// ------------------------
// College Management
// ------------------------
router.get("/colleges", adminController.getColleges);
router.post("/college", adminController.addCollege);
router.put("/college/:collegeId", adminController.updateCollege);
router.delete("/college/:collegeId", adminController.deleteCollege);

// ------------------------
// Branch Management
// ------------------------
router.get("/branches", adminController.getAllBranches);
router.post("/branch", adminController.addBranch);
router.put("/branch/:branchId", adminController.updateBranch);
router.delete("/branch/:branchId", adminController.deleteBranch);

// ------------------------
// Assign/remove branches to colleges
// ------------------------
router.post("/college/:collegeId/branch/:branchId", adminController.assignBranchToCollege);
router.delete("/college/:collegeId/branch/:branchId", adminController.removeBranchFromCollege);

// ------------------------
// Year Management
// ------------------------
router.post("/branch/:branchId/year", adminController.addYear);
router.put("/year/:yearId", adminController.updateYear);
router.delete("/year/:yearId", adminController.deleteYear);

// ------------------------
// Semester Management
// ------------------------
router.get("/semester/:semesterId/subjects", adminController.getSubjectsBySemester);
router.post("/year/:yearId/semester", adminController.addSemester);
router.put("/semester/:semesterId", adminController.updateSemester);
router.delete("/semester/:semesterId", adminController.deleteSemester);

// ------------------------
// Subject Management
// ------------------------
router.post("/semester/:semesterId/subject", adminController.addSubject);
router.put("/subject/:subjectId", adminController.updateSubject);
router.delete("/subject/:subjectId", adminController.deleteSubject);

// ------------------------
// Unit Management
// ------------------------
router.post("/subject/:subjectId/unit", adminController.addUnit);
router.put("/unit/:unitId", adminController.updateUnit);
router.delete("/unit/:unitId", adminController.deleteUnit);

// ------------------------
// Topic Management
// ------------------------
router.post("/topic/:subjectOrUnitId", adminController.addTopic); // Use query param ?unit=true for unit topics
router.put("/topic/:topicId", adminController.updateTopic);
router.delete("/topic/:topicId", adminController.deleteTopic);

// ------------------------
// Enhanced Resource Management
// ------------------------

// Get all resources with filtering (admin view)
router.get("/resources", adminController.getAllResources);

// Get resources by subject
router.get("/subject/:subjectId/resources", adminController.getResourcesBySubject);

// Add resource to subject (enhanced with college support)
router.post(
  "/subject/:subjectId/resource",
  upload.array("files", 5),
  adminController.addResource
);

// Add resource to topic (legacy - keep for backward compatibility)
router.post(
  "/topic/:topicId/resource",
  upload.array("files", 5),
  adminController.addResource
);

// Update resource
router.put(
  "/resource/:resourceId",
  upload.array("files", 5),
  adminController.updateResource
);

// Update resource status (approve/reject)
router.put("/resource/:resourceId/status", adminController.updateResourceStatus);

// Delete resource
router.delete("/resource/:resourceId", adminController.deleteResource);

module.exports = router;