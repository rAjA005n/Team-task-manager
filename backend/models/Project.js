const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Project",
  ProjectSchema
);