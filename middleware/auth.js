const jwt = require("jsonwebtoken");
const { userToken: UserToken } = require("../models");

// Authenticate user using access token
// Append user to request
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthenticated" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = auth;
