// utils/token.js
const jwt = require('jsonwebtoken');

module.exports = {
  generateEmailToken: (email) =>
    jwt.sign({ email }, process.env.EMAIL_SECRET, { expiresIn: '1h' }),

  verifyEmailToken: (token) =>
    jwt.verify(token, process.env.EMAIL_SECRET),
};
