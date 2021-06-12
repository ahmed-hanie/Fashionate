const express = require("express");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../server/utility");
const {
  user: User,
  role: Role,
  userToken: UserToken,
  Sequelize,
} = require("../models");

// Middlewares
const auth = require("../middleware/auth");
const adminAccess = require("../middleware/adminAccess");

router.get("/", auth, adminAccess, async (req, res) => {
  try {
    // Query builder
    const search = new searchBuilder(Sequelize, req.query);
    const whereQuery = search.getWhereQuery();
    const orderQuery = search.getOrderQuery();
    const limitQuery = search.getLimitQuery();
    const offsetQuery = search.getOffsetQuery();

    // Find subcategories
    const data = await User.findAll({
      where: whereQuery,
      order: orderQuery,
      limit: limitQuery,
      offset: offsetQuery,
    });

    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:uuid", auth, adminAccess, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { uuid: req.params.uuid },
    });
    if (!user) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:uuid/disable", auth, adminAccess, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { uuid: req.params.uuid },
    });
    if (!user) {
      return res.status(404).json({ message: "Resource not found" });
    }
    user.disabled = true;
    await user.save();
    res.status(200).json({ message: "User disabled successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Sign up
router.post("/", async (req, res) => {
  try {
    // Create user
    const user = await User.create(req.body);

    // Get user role
    const userRole = await Role.findOne({ where: { name: "user" } });

    // Add user role to account
    await user.addRole(userRole);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Check if username/password exist in DB
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );

    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    // Handle disabled accounts
    if (user.disabled) {
      return res.status(401).json({ message: "Account Disabled" });
    }

    // Generate tokens
    const userObject = { uuid: user.uuid, roles: user.roles };
    const accessToken = generateAccessToken(userObject);
    const refreshToken = generateRefreshToken(userObject);

    // Store refresh token in DB
    const dbToken = await UserToken.create({
      token: refreshToken,
      userId: user.id,
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/logout", auth, async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Body doesn't contain refresh token" });
    }

    // Delete refresh token from db
    await UserToken.destroy({ where: { token } });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Add admin account
router.post("/add", auth, adminAccess, async (req, res) => {
  try {
    // Create user
    const user = await User.create(req.body);

    // Get admin role
    const adminRole = await Role.findOne({ where: { name: "admin" } });

    // Add user role to account
    await user.addRole(adminRole);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Refresh access token
router.post("/token", async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Body doesn't contain refresh token" });
    }

    const dbToken = await UserToken.findOne({ where: { token } });
    if (!dbToken) {
      return res.status(403).json({ message: "Forbidden" });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        console.log(err);

        // Expired token
        await dbToken.destroy();

        return res.status(403).json({ message: "Forbidden" });
      }

      const accessToken = generateAccessToken({
        uuid: user.uuid,
        roles: user.roles,
      });
      res.status(200).json({ accessToken });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
