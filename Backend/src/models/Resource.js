const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Title is required"], 
      trim: true 
    },
    topic: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Topic", 
      required: true 
    },
    unit: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Unit" 
    },
    branch: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Branch", 
      required: true 
    },
    semester: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Semester", 
      required: true 
    },
    subject: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Subject", 
      required: true 
    },
    
    // Multiple PDFs
    pdfs: [
      {
        url: { type: String },
        filename: { type: String },
        size: { type: String }
      }
    ],

    // YouTube links as URLs (not embed codes)
    youtubeLinks: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        description: { type: String }
      }
    ],

    summary: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    difficulty: { 
      type: String, 
      enum: ["easy", "medium", "hard"], 
      default: "medium" 
    },
    addedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    // Stats
    rating: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    downloadCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);