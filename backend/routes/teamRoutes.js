const express = require("express");
const Team = require("../models/Team");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

router.post(
  "/",
  auth,
  role("Admin"),
  async (req, res) => {
    try {

      const team = new Team({
        ...req.body,
        createdBy: req.user.id,
      });

      await team.save();

      res.json(team);

    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {

    const teams = await Team.find()
      .populate("createdBy", "name");

    res.json(teams);

  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;