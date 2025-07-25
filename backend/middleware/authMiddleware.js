const jwt = require('jsonwebtoken');
const User = require('../models/User'); // 👈 Import the User model

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user._id; // ✅ Set only user ID for use in Mongoose queries
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
