const express = require("express");
const Project = require("../models/Project");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

router.post(
  "/",
  auth,
  role("Admin"),
  async (req, res) => {
    try {

      const project = new Project({
        ...req.body,
        createdBy: req.user.id,
      });

      await project.save();

      res.json(project);

    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {

    const projects = await Project.find()
      .populate("team")
      .populate("createdBy", "name email");

    res.json(projects);

  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;