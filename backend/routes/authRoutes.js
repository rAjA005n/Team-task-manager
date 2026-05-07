const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password too short' });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashed,
      role
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token, user });

  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token, user });

  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
