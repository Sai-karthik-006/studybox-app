const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const { protect, adminOnly } = require("../middlewares/auth");

// Protect all routes
router.use(protect);
router.use(adminOnly);

// Subject routes
router.get("/semester/:semesterId", subjectController.getSubjectsBySemester);
router.get("/branch/:branchId", subjectController.getSubjectsByBranch);
router.post("/semester/:semesterId", subjectController.addSubject);
router.put("/:subjectId", subjectController.updateSubject);
router.delete("/:subjectId", subjectController.deleteSubject);

module.exports = router;