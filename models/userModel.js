const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Provide a username"],
    },
    email: {
      type: String,
      required: [true, "Provide an email"],
    },
    password: {
      type: String,
      required: [true, "Provide a password"],
    },
  },
  {
    timpestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
