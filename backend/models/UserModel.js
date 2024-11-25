const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minLength: 3,
      maxLength: 70,
    },
    email: {
      type: String,
      required: true,
      uniqiue: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
      enum: ["student", "company"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);