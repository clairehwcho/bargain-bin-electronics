const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ where: { email } });
    if (!userData) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
    const validPassword = await userData.checkPassword(password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
