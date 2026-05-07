const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["Admin", "Member"],
      default: "Member",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  UserSchema
);