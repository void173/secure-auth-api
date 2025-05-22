// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login, requestPasswordReset, resetPassword, verifyRegistration } = require('../controllers/auth');

const { registerLimiter, loginLimiter } = require('../middleware/rateLimit');
const { logout } = require('../controllers/auth');
const authenticate = require('../middleware/auth');

router.post('/verify-registration', verifyRegistration);
router.post('/logout', authenticate, logout);

router.post('/register', registerLimiter, register);
router.post('/login', loginLimiter, login);

router.post('/register', register);
router.post('/login', login);

// Password reset flow
router.post('/request-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

module.exports = router;

