// src/models/Year.js
const mongoose = require("mongoose");

/**
 * Year Schema
 * Represents the academic year within a branch
 * Fields:
 * - name: Year name (e.g., "1st Year", "2nd Year")
 * - branch: Reference to parent branch
 * - description: Optional details
 */
const yearSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Year name is required"], trim: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

/**
 * Optional virtual:
 * yearSchema.virtual('semesters', {
 *   ref: 'Semester',
 *   localField: '_id',
 *   foreignField: 'year',
 * });
 */

module.exports = mongoose.model("Year", yearSchema);
