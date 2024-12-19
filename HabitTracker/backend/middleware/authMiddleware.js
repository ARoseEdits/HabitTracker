const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(200).json({ 
        expired: true,
        message: 'No token provided'
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(200).json({ 
        expired: true,
        message: 'No token provided'
      });
    }

    // Verify token
    const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      // Handle different JWT errors
      if (error.name === 'TokenExpiredError') {
        return res.status(200).json({ 
          expired: true,
          message: 'Session expired'
        });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(200).json({ 
          expired: true,
          message: 'Invalid token'
        });
      }
      return res.status(200).json({ 
        expired: true,
        message: 'Token verification failed'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Server error during authentication' });
  }
};

module.exports = verifyToken; 