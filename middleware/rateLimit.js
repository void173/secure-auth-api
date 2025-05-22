const rateLimit = require('express-rate-limit');

// General registration limit
exports.registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many registration attempts, try again later"
});

// Per-user login limiter (in-memory example)
const loginAttempts = new Map();

exports.loginLimiter = (req, res, next) => {
    const { email } = req.body;
    const key = email;
    const attempts = loginAttempts.get(key) || 0;

    if (attempts >= 5) {
        return res.status(429).json({ message: 'Too many failed login attempts' });
    }

    res.on('finish', () => {
        if (res.statusCode === 401) {
            loginAttempts.set(key, attempts + 1);
            setTimeout(() => loginAttempts.set(key, attempts), 15 * 60 * 1000);
        }
    });

    next();
};

