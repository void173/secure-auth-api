// routes/protected.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
  res.json({ message: "Access granted to protected route", user: req.user });
});

module.exports = router;
