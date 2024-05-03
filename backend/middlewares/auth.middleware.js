const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized',
      data: null,
    });
  }

  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
      data: null,
    });
  }

  try {
    const { user } = jwt.verify(token, jwtSecretKey);
    req.user = user;
    return next();
  } catch (error) {
    res.status(500).json({
      message: 'Error authenticating user',
      data: null,
    });
  }
};

module.exports = { authMiddleware };
