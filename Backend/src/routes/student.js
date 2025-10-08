const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { protect } = require("../middlewares/auth");

// ------------------------
// Protect all student routes
// ------------------------
router.use(protect);

// ------------------------
// College browsing
// ------------------------
router.get("/colleges", studentController.getColleges);
router.get("/branches", studentController.getBranches);
router.get("/years/:branchId", studentController.getYears);
router.get("/semesters/:yearId", studentController.getSemesters);
router.get("/subjects/:semesterId", studentController.getSubjects);

// ------------------------
// ADD THESE MISSING ROUTES:
// ------------------------
router.get("/units/:subjectId", studentController.getUnits);
router.get("/topics/:unitId", studentController.getTopics);

// ------------------------
// Fix this route parameter (should be topicId, not subjectId)
// ------------------------
router.get("/resources/:topicId", studentController.getResources);

// Update these routes to include collegeId:

// ------------------------
// Hierarchy browsing
// ------------------------
router.get("/colleges", studentController.getColleges);
router.get("/colleges/:collegeId/branches", studentController.getBranches);
router.get("/colleges/:collegeId/branches/:branchId/years", studentController.getYears);
router.get("/years/:yearId/semesters", studentController.getSemesters);
router.get("/semesters/:semesterId/subjects", studentController.getSubjects);

// ------------------------
// Search resources
// ------------------------
router.get("/resources/search", studentController.searchResources);

// ------------------------
// Feedback
// ------------------------
router.post("/feedback/:resourceId", studentController.addFeedback);
router.get("/feedback/:resourceId", studentController.getFeedbacks);

// ------------------------
// Resource interactions
// ------------------------
router.post("/resource/:id/like", studentController.likeResource);
router.post("/resource/:id/rate", studentController.rateResource);
router.post("/resource/:id/view", studentController.incrementView);

module.exports = router;