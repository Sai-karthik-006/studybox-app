const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
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
router.post("/branch", adminController.addBranch);
router.put("/branch/:branchId", adminController.updateBranch);
router.delete("/branch/:branchId", adminController.deleteBranch);

// ------------------------
// Year Management
// ------------------------
router.post("/branch/:branchId/year", adminController.addYear);
router.put("/year/:yearId", adminController.updateYear);
router.delete("/year/:yearId", adminController.deleteYear);

// ------------------------
// Semester Management
// ------------------------
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
// ADD THESE MISSING UNIT ROUTES:
// ------------------------
router.post("/subject/:subjectId/unit", adminController.addUnit);
router.put("/unit/:unitId", adminController.updateUnit);
router.delete("/unit/:unitId", adminController.deleteUnit);

// ------------------------
// ADD THESE MISSING TOPIC ROUTES:
// ------------------------
router.post("/topic", adminController.addTopic); // You might need to adjust this based on your addTopic function parameters
router.put("/topic/:topicId", adminController.updateTopic);
router.delete("/topic/:topicId", adminController.deleteTopic);

// ------------------------
// Resource Management
// ------------------------
router.post(
  "/topic/:topicId/resource",
  upload.array("pdfs", 5),
  adminController.addResource
);
router.put(
  "/resource/:resourceId",
  upload.array("pdfs", 5),
  adminController.updateResource
);
router.delete("/resource/:resourceId", adminController.deleteResource);
router.get("/resources", adminController.getAllResources);

// ------------------------
// Dashboard Statistics
// ------------------------
router.get("/dashboard/stats", adminController.getDashboardStats);

module.exports = router;