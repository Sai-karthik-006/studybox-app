const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Title is required"], 
      trim: true 
    },
    
    // Enhanced YouTube links structure
    youtubeLinks: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        channel: { type: String },
        duration: { type: String },
        description: { type: String },
        thumbnail: { type: String } // YouTube thumbnail URL
      }
    ],

    // Academic hierarchy - all required
    subject: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Subject", 
      required: true 
    },
    semester: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Semester", 
      required: true 
    },
    branch: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Branch", 
      required: true 
    },
    college: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "College", 
      required: true 
    },

    // Resource details
    description: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    difficulty: { 
      type: String, 
      enum: ["easy", "medium", "hard"], 
      default: "medium" 
    },
    
    // Files (PDFs, notes, etc.)
    files: [
      {
        filename: { type: String },
        originalName: { type: String },
        url: { type: String },
        size: { type: Number },
        fileType: { type: String }
      }
    ],

    addedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    // Stats
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },

    // Status for moderation
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved"
    }
  },
  { timestamps: true }
);

// Index for better query performance
resourceSchema.index({ subject: 1, semester: 1 });
resourceSchema.index({ college: 1, branch: 1 });

module.exports = mongoose.model("Resource", resourceSchema);