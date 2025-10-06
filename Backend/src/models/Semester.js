

// src/models/Semester.js
const mongoose = require("mongoose");

/**
 * Semester Schema
 * Represents a specific semester within an academic year
 * Fields:
 * - name: Semester name (e.g., "Semester 1", "Semester 2")
 * - year: Reference to the parent Year
 * - branch: Reference to the parent Branch (needed for subjects)
 * - description: Optional details
 */
const semesterSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Semester name is required"], trim: true },
    year: { type: mongoose.Schema.Types.ObjectId, ref: "Year", required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true }, // ✅ Add branch
    description: { type: String, trim: true },
  },
  { timestamps: true } // Adds createdAt & updatedAt
);

/**
 * Optional virtual:
 * semesterSchema.virtual('subjects', {
 *   ref: 'Subject',
 *   localField: '_id',
 *   foreignField: 'semester',
 * });
 */

module.exports = mongoose.model("Semester", semesterSchema);
