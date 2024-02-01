const mongoose = require("mongoose");

// Define the user schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: ["VIEW_ALL", "CREATOR"],
  },
  {
    versionKey: false, // Disable versioning
  }
);

// Create the user model based on the schema
const userModel = mongoose.model("User", userSchema);

// Export the user model for use in other modules
module.exports = { userModel };
