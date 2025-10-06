const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "College name is required"], 
      unique: true,
      trim: true 
    },
    code: { 
      type: String, 
      required: [true, "College code is required"], 
      unique: true,
      uppercase: true,
      trim: true 
    },
    description: { 
      type: String, 
      trim: true 
    },
    established: { 
      type: Number 
    },
    location: { 
      type: String, 
      trim: true 
    },
    logo: { 
      type: String // URL to college logo
    },
    status: { 
      type: String, 
      enum: ["active", "inactive"], 
      default: "active" 
    }
  },
  { timestamps: true }
);

// Index for better search performance
collegeSchema.index({ name: 1, code: 1 });

module.exports = mongoose.model("College", collegeSchema);