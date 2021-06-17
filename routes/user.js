const express = require("express");
const jwt = require("jsonwebtoken");
const searchBuilder = require("sequelize-search-builder");
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

/**
 * @api {get} /user Request users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiPermission admin
 *
 * @apiSuccess {Object[]} data List of users
 **/
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

/**
 * @api {get} /user/:uuid Request user
 * @apiParam  {String} uuid Unique identifier of user
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiPermission admin
 *
 * @apiSuccess {String} uuid User uuid
 * @apiSuccess {String} username
 * @apiSuccess {String} email
 **/
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

/**
 * @api {put} /user/:uuid/disable Disable user
 * @apiParam  {String} uuid Unique identifier of user
 * @apiName DisableUser
 * @apiGroup User
 *
 * @apiPermission admin
 *
 * @apiSuccess {String} message Success informational message
 **/
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

/**
 * @api {post} /register Register user
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiParam {String} email
 *
 *
 * @apiSuccess {String} uuid User uuid
 * @apiSuccess {String} username
 * @apiSuccess {String} email
 **/
// Sign up
router.post("/register", async (req, res) => {
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

/**
 * @api {post} /login Login user
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String} username
 * @apiParam {String} password
 *
 *
 * @apiSuccess {String} AccessToken JWT token for authenticating user
 * @apiSuccess {String} RefreshToken JWT token for refreshing access token before expiry
 * @apiSuccess {Object[]} roles List of account roles
 **/
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

    res.status(200).json({ accessToken, refreshToken, roles: user.roles });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * @api {delete} /user Logout user
 * @apiName LogoutUser
 * @apiGroup User
 *
 * @apiPermission authenticated
 **/
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

/**
 * @api {post} /register Register admin user
 * @apiName RegisterAdminUser
 * @apiGroup User
 *
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiParam {String} email
 *
 * @apiPermission admin
 *
 * @apiSuccess {String} uuid User uuid
 * @apiSuccess {String} username
 * @apiSuccess {String} email
 **/
// Add admin account
router.post("/", auth, adminAccess, async (req, res) => {
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

/**
 * @api {post} /register Refresh access token user
 * @apiName RefreshTokenUser
 * @apiGroup User
 *
 * @apiParam {String} token Refresh token
 *
 * @apiPermission authenticated
 *
 * @apiSuccess {String} AccessToken New valid access token
 **/
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
