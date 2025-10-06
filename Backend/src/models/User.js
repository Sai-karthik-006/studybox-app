

// src/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * User Schema
 * Represents both students and admins.
 * Fields:
 * - firstName, lastName: Basic user info (required, trimmed)
 * - email: Unique identifier, lowercased for consistency
 * - phone: Optional, unique if provided
 * - gender: Enum ['male', 'female', 'other']
 * - password: Hashed password (min 6 chars)
 * - role: 'student' or 'admin', default is 'student'
 */
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First name is required"], trim: true },
    lastName: { type: String, required: [true, "Last name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true },
    phone: { type: String, unique: true, sparse: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    password: { type: String, required: [true, "Password is required"], minlength: 6 },
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

/**
 * Pre-save hook to hash the password
 * - Only hashes if the password field is modified or new
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is not changed
  const salt = await bcrypt.genSalt(10);         // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

/**
 * Compare entered password with hashed password
 * - Used during login to validate credentials
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model to use in controllers
module.exports = mongoose.model("User", userSchema);
