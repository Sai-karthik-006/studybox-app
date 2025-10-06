

// src/models/Resource.js
const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" }, // optional

    // ✅ Multiple PDFs instead of single pdfUrl
    pdfs: [
      {
        url: { type: String },       // Cloudinary or file URL
        filename: { type: String },  // Original name for download display
      },
    ],

    youtubeLinks: [
      { url: String, rank: Number } // rank = 1 (best), 2, 3...
    ],

    // ✅ Summary field (optional)
    summary: { type: String, trim: true },

    tags: [{ type: String, trim: true }],
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Stats
    rating: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
