


// src/models/Branch.js
const mongoose = require("mongoose");

/**
 * Branch Schema
 * Top-level category for StudyBox (e.g., CSE, ECE)
 * Fields:
 * - name: Branch name, required & unique
 * - description: Optional details about the branch
 */
const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Branch name is required"], unique: true, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Export Branch model
module.exports = mongoose.model("Branch", branchSchema);
