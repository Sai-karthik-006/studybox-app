const mongoose = require("mongoose");

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
    established: { 
      type: String, 
      default: "Not specified" 
    },
    location: { 
      type: String, 
      default: "Not specified" 
    },
    logo: { type: String },
    description: { type: String },
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
  { 
    timestamps: true 
  }
);

// Add index for better performance
collegeSchema.index({ code: 1 });
collegeSchema.index({ status: 1 });

module.exports = mongoose.model("College", collegeSchema);