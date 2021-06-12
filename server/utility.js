const jwt = require("jsonwebtoken");

// Generate access token for user object
// {username: ####, roles: ####} <--- User object
module.exports.generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
  });
};

// Generate refresh token for user object
// {username: ####, roles: ####} <--- User object
module.exports.generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
  });
};
