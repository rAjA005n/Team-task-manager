const express = require("express");

const Task = require("../models/Task");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

router.post(
  "/",
  auth,
  role("Admin"),
  async (req, res) => {
    try {

      const task = new Task({
        ...req.body,
        createdBy: req.user.id,
      });

      await task.save();

      res.json(task);

    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {

    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "name")
      .populate("createdBy", "name");

    res.json(tasks);

  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        msg: "Task not found",
      });
    }

    // Member can update only own task
    if (
      req.user.role === "Member" &&
      task.assignedTo &&
      task.assignedTo.toString() !==
        req.user.id
    ) {
      return res.status(403).json({
        msg: "Access Denied",
      });
    }

    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedTask);

  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.delete(
  "/:id",
  auth,
  role("Admin"),
  async (req, res) => {
    try {

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({
        msg: "Task deleted",
      });

    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;