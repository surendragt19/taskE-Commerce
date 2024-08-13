const authMiddleware = require('./auth.middlewear');

const adminMiddleware = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied: Not an admin' });
    }
    next();
};

module.exports = [authMiddleware, adminMiddleware];