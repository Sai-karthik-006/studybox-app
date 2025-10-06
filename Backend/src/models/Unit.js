// const mongoose = require('mongoose');

// const unitSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Unit name is required'],
//       trim: true,
//     },
//     branch: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Branch',
//       required: true,
//     },
//     semester: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Semester',
//       required: true,
//     },
//     subject: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Subject',
//       required: true,
//     },
//     description: {
//       type: String,
//       trim: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Unit = mongoose.model('Unit', unitSchema);

// module.exports = Unit;



// src/models/Unit.js
const mongoose = require("mongoose");

/**
 * Unit Schema
 * Represents a unit or chapter within a subject
 * Fields:
 * - name: Unit name (e.g., "Arrays Chapter")
 * - subject: Reference to parent subject
 * - description: Optional details
 * - topics: Array of topic references (optional)
 */
const unitSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Unit name is required"], trim: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    description: { type: String, trim: true },
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }], // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Unit", unitSchema);
