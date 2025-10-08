const mongoose = require("mongoose");

/**
 * Branch Schema
 * Represents engineering branches that can be assigned to colleges
 */
const branchSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Branch name is required"], 
      unique: true, 
      trim: true,
      uppercase: true 
    },
    fullName: { 
      type: String, 
      required: [true, "Branch full name is required"], 
      trim: true 
    },
    description: { type: String, trim: true },
    icon: { type: String, default: "FaCode" },
    color: { type: String, default: "#4F46E5" },
    // Add college reference to link branches to colleges
    colleges: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "College" 
    }],
    status: { 
      type: String, 
      enum: ["active", "inactive"], 
      default: "active" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", branchSchema);