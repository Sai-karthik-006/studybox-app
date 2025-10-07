const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, adminOnly } = require("../middlewares/auth");
const multer = require("multer");

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Protect all routes
router.use(protect);
router.use(adminOnly);

// Resource management routes
router.get("/", adminController.getAllResources);
router.get("/subject/:subjectId", adminController.getResourcesBySubject);
router.post(
  "/subject/:subjectId",
  upload.array("files", 5), // max 5 files
  adminController.addResource
);
router.put("/:resourceId/status", adminController.updateResourceStatus);
router.delete("/:resourceId", adminController.deleteResource);

module.exports = router;