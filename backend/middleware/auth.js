// middleware/auth.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.header('Authorization');

    // Check for Authorization header
    if (!authHeader) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authorization header missing' 
      });
    }

    // Validate Bearer token format
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token format. Use: Bearer <token>' 
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    });

    // Check if user payload exists
    if (!decoded.user || !decoded.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token payload' 
      });
    }

    req.user = decoded.user;
    next();

  } catch (err) {
    console.error('Auth Error:', {
      type: err.name,
      message: err.message,
      token: req.header('Authorization')?.split(' ')[1]?.substring(0, 10) + '...'
    });

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

module.exports = authMiddleware;