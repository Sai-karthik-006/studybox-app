const mongoose = require("mongoose");

/**
 * College Schema
 * Represents educational institutions
 */
const collegeSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "College name is required"], 
      trim: true 
    },
    fullName: { 
      type: String, 
      required: [true, "College full name is required"], 
      trim: true 
    },
    code: { 
      type: String, 
      required: [true, "College code is required"], 
      unique: true, 
      uppercase: true,
      trim: true 
    },
    established: { type: String },
    location: { type: String },
    logo: { type: String }, // URL to college logo
    description: { type: String, trim: true },
    // Branches offered by this college
    branches: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Branch" 
    }],
    status: { 
      type: String, 
      enum: ["active", "inactive"], 
      default: "active" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);