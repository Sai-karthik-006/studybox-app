


// src/models/Topic.js
const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Topic name is required"], trim: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" }, // optional
    description: { type: String, trim: true },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }], // all resources for this topic
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
